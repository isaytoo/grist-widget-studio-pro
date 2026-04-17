/**
 * CORS Proxy Serverless Function (Vercel)
 * Grist Widget Studio Pro
 * 
 * Usage: /api/proxy?url=https://api.example.com/endpoint
 * 
 * Security:
 * - Rate limiting via Vercel
 * - Optional domain whitelist via BLOCKED_HOSTS env var
 * - Max request size: 1MB
 * - Timeout: 25s
 */

const BLOCKED_HOSTS = (process.env.BLOCKED_HOSTS || '').split(',').map(s => s.trim()).filter(Boolean);
const ALLOWED_HOSTS = (process.env.ALLOWED_HOSTS || '').split(',').map(s => s.trim()).filter(Boolean);
const MAX_SIZE = 1024 * 1024; // 1 MB
const TIMEOUT = 25000; // 25s

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const targetUrl = req.query.url || (req.body && req.body.url);
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing "url" parameter' });
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(targetUrl);
  } catch (e) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  // Security: block private IPs, localhost
  const host = parsedUrl.hostname.toLowerCase();
  if (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '0.0.0.0' ||
    host.startsWith('192.168.') ||
    host.startsWith('10.') ||
    host.startsWith('172.') ||
    host.endsWith('.local') ||
    host.endsWith('.internal')
  ) {
    return res.status(403).json({ error: 'Private/local addresses not allowed' });
  }

  // Whitelist/blacklist
  if (BLOCKED_HOSTS.includes(host)) {
    return res.status(403).json({ error: 'Host is blocked' });
  }
  if (ALLOWED_HOSTS.length && !ALLOWED_HOSTS.some(h => host === h || host.endsWith('.' + h))) {
    return res.status(403).json({ error: 'Host is not in the allowed list' });
  }

  // Forward request
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    // Forward headers (except ones that would cause issues)
    const forwardHeaders = {};
    const skipHeaders = new Set([
      'host', 'connection', 'content-length', 'accept-encoding',
      'origin', 'referer', 'x-forwarded-for', 'x-forwarded-host',
      'x-forwarded-proto', 'x-vercel-id', 'x-real-ip', 'cdn-loop'
    ]);
    Object.entries(req.headers).forEach(([k, v]) => {
      if (!skipHeaders.has(k.toLowerCase())) {
        forwardHeaders[k] = v;
      }
    });

    // Build body
    let body;
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      if (req.body) {
        body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      }
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: forwardHeaders,
      body,
      signal: controller.signal,
      redirect: 'follow'
    });

    clearTimeout(timeoutId);

    // Forward response headers (filtered)
    const skipResp = new Set(['content-encoding', 'transfer-encoding', 'content-length']);
    response.headers.forEach((value, key) => {
      if (!skipResp.has(key.toLowerCase()) && !key.toLowerCase().startsWith('access-control-')) {
        res.setHeader(key, value);
      }
    });

    res.status(response.status);

    // Stream response with size limit
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > MAX_SIZE) {
      return res.status(413).json({ error: 'Response too large (max 1MB)' });
    }
    res.send(Buffer.from(buffer));
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Upstream timeout' });
    }
    return res.status(502).json({ error: 'Proxy error', message: err.message });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb'
    }
  }
};
