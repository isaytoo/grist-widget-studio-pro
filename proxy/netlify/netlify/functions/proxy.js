/**
 * CORS Proxy - Netlify Function
 * Grist Widget Studio Pro
 * 
 * Deploy: `netlify deploy --prod` or push to GitHub (connected to Netlify)
 * 
 * Endpoint: /.netlify/functions/proxy?url=https://api.example.com
 * 
 * Env vars (Netlify dashboard):
 *   PROXY_TOKEN     - Optional auth token
 *   ALLOWED_HOSTS   - CSV
 *   BLOCKED_HOSTS   - CSV
 */

const MAX_SIZE = 1024 * 1024;
const TIMEOUT_MS = 25000;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key, X-Proxy-Token, X-Requested-With',
  'Access-Control-Max-Age': '86400',
};

function isPrivateHost(host) {
  if (host === 'localhost' || host === '0.0.0.0' || host === '127.0.0.1') return true;
  if (host.endsWith('.local') || host.endsWith('.internal')) return true;
  if (host.startsWith('192.168.') || host.startsWith('10.')) return true;
  const m = host.match(/^172\.(\d+)\./);
  if (m && +m[1] >= 16 && +m[1] <= 31) return true;
  return false;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  if (process.env.PROXY_TOKEN) {
    const token = event.headers['x-proxy-token'] || event.headers['X-Proxy-Token'];
    if (token !== process.env.PROXY_TOKEN) {
      return { statusCode: 401, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Unauthorized' }) };
    }
  }

  const targetUrl = event.queryStringParameters?.url;
  if (!targetUrl) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Missing url param' }) };
  }

  let parsed;
  try { parsed = new URL(targetUrl); }
  catch { return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Invalid URL' }) }; }

  const host = parsed.hostname.toLowerCase();
  if (isPrivateHost(host)) {
    return { statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Private addresses blocked' }) };
  }

  const blocked = (process.env.BLOCKED_HOSTS || '').split(',').map(s => s.trim()).filter(Boolean);
  const allowed = (process.env.ALLOWED_HOSTS || '').split(',').map(s => s.trim()).filter(Boolean);
  if (blocked.includes(host)) {
    return { statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Host blocked' }) };
  }
  if (allowed.length && !allowed.some(h => host === h || host.endsWith('.' + h))) {
    return { statusCode: 403, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Host not allowed' }) };
  }

  const forwardHeaders = {};
  const skip = new Set(['host', 'connection', 'content-length', 'accept-encoding', 'origin', 'referer', 'x-proxy-token']);
  Object.entries(event.headers || {}).forEach(([k, v]) => {
    if (!skip.has(k.toLowerCase())) forwardHeaders[k] = v;
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: forwardHeaders,
      body: ['GET', 'HEAD'].includes(event.httpMethod) ? undefined : event.body,
      signal: controller.signal,
      redirect: 'follow',
    });
    clearTimeout(timeout);

    const buffer = await res.arrayBuffer();
    if (buffer.byteLength > MAX_SIZE) {
      return { statusCode: 413, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Response too large' }) };
    }

    const respHeaders = { ...CORS_HEADERS };
    res.headers.forEach((value, key) => {
      if (!['content-encoding', 'transfer-encoding'].includes(key.toLowerCase()) && !key.toLowerCase().startsWith('access-control-')) {
        respHeaders[key] = value;
      }
    });

    return {
      statusCode: res.status,
      headers: respHeaders,
      body: Buffer.from(buffer).toString('base64'),
      isBase64Encoded: true,
    };
  } catch (err) {
    clearTimeout(timeout);
    const code = err.name === 'AbortError' ? 504 : 502;
    return {
      statusCode: code,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: err.name === 'AbortError' ? 'Timeout' : 'Proxy error', message: err.message }),
    };
  }
};
