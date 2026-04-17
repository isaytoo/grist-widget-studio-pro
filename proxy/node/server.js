/**
 * CORS Proxy - Node.js (self-hosted)
 * Grist Widget Studio Pro
 *
 * Run:
 *   npm install
 *   node server.js
 *
 * Or Docker:
 *   docker build -t grist-proxy .
 *   docker run -p 8080:8080 -e PROXY_TOKEN=secret grist-proxy
 *
 * Env vars:
 *   PORT            - Default 8080
 *   PROXY_TOKEN     - Optional auth token
 *   ALLOWED_HOSTS   - CSV of allowed hosts
 *   BLOCKED_HOSTS   - CSV of blocked hosts
 */

const http = require('http');
const { URL } = require('url');

const PORT = Number(process.env.PORT || 8080);
const MAX_SIZE = 1024 * 1024;
const TIMEOUT_MS = 25000;
const PROXY_TOKEN = process.env.PROXY_TOKEN;
const ALLOWED_HOSTS = (process.env.ALLOWED_HOSTS || '').split(',').map(s => s.trim()).filter(Boolean);
const BLOCKED_HOSTS = (process.env.BLOCKED_HOSTS || '').split(',').map(s => s.trim()).filter(Boolean);

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

function writeJson(res, status, obj, extra = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json', ...CORS_HEADERS, ...extra });
  res.end(JSON.stringify(obj));
}

async function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_SIZE) return reject(new Error('Request too large'));
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // Health check
  if (req.url === '/health' || req.url === '/') {
    return writeJson(res, 200, { status: 'ok', service: 'grist-widget-studio-proxy' });
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS_HEADERS);
    return res.end();
  }

  // Auth
  if (PROXY_TOKEN && req.headers['x-proxy-token'] !== PROXY_TOKEN) {
    return writeJson(res, 401, { error: 'Unauthorized' });
  }

  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  const targetUrl = reqUrl.searchParams.get('url');
  if (!targetUrl) return writeJson(res, 400, { error: 'Missing url param' });

  let parsed;
  try { parsed = new URL(targetUrl); }
  catch { return writeJson(res, 400, { error: 'Invalid URL' }); }

  const host = parsed.hostname.toLowerCase();
  if (isPrivateHost(host)) return writeJson(res, 403, { error: 'Private addresses blocked' });
  if (BLOCKED_HOSTS.includes(host)) return writeJson(res, 403, { error: 'Host blocked' });
  if (ALLOWED_HOSTS.length && !ALLOWED_HOSTS.some(h => host === h || host.endsWith('.' + h))) {
    return writeJson(res, 403, { error: 'Host not allowed' });
  }

  const forwardHeaders = {};
  const skip = new Set(['host', 'connection', 'content-length', 'accept-encoding', 'origin', 'referer', 'x-proxy-token']);
  Object.entries(req.headers).forEach(([k, v]) => {
    if (!skip.has(k.toLowerCase())) forwardHeaders[k] = v;
  });

  const body = ['GET', 'HEAD'].includes(req.method) ? undefined : await readBody(req);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const upstream = await fetch(targetUrl, {
      method: req.method,
      headers: forwardHeaders,
      body,
      signal: controller.signal,
      redirect: 'follow',
    });
    clearTimeout(timeout);

    const buffer = Buffer.from(await upstream.arrayBuffer());
    if (buffer.byteLength > MAX_SIZE) {
      return writeJson(res, 413, { error: 'Response too large' });
    }

    const respHeaders = { ...CORS_HEADERS };
    upstream.headers.forEach((value, key) => {
      if (!['content-encoding', 'transfer-encoding'].includes(key.toLowerCase()) && !key.toLowerCase().startsWith('access-control-')) {
        respHeaders[key] = value;
      }
    });

    res.writeHead(upstream.status, respHeaders);
    res.end(buffer);
  } catch (err) {
    clearTimeout(timeout);
    const code = err.name === 'AbortError' ? 504 : 502;
    writeJson(res, code, { error: err.name === 'AbortError' ? 'Timeout' : 'Proxy error', message: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`🚀 CORS Proxy running on http://localhost:${PORT}`);
  console.log(`   Auth: ${PROXY_TOKEN ? 'enabled' : 'disabled'}`);
  console.log(`   Allowed hosts: ${ALLOWED_HOSTS.length ? ALLOWED_HOSTS.join(', ') : 'any (except private)'}`);
});
