/**
 * CORS Proxy - Cloudflare Worker
 * Grist Widget Studio Pro
 * 
 * Deploy:
 *   npx wrangler deploy
 * 
 * Usage: https://your-worker.workers.dev/?url=https://api.example.com
 * 
 * Env vars (set via `wrangler secret put`):
 *   PROXY_TOKEN     - Optional auth token (required in X-Proxy-Token header)
 *   ALLOWED_HOSTS   - CSV of allowed hosts (whitelist)
 *   BLOCKED_HOSTS   - CSV of blocked hosts (blacklist)
 */

const MAX_SIZE = 1024 * 1024; // 1 MB
const TIMEOUT_MS = 25000;

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key, X-Proxy-Token, X-Requested-With',
      'Access-Control-Max-Age': '86400',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Auth check
    if (env.PROXY_TOKEN) {
      const token = request.headers.get('X-Proxy-Token');
      if (token !== env.PROXY_TOKEN) {
        return json({ error: 'Unauthorized' }, 401, corsHeaders);
      }
    }

    // Extract target URL
    const reqUrl = new URL(request.url);
    const targetUrl = reqUrl.searchParams.get('url');
    if (!targetUrl) {
      return json({ error: 'Missing "url" query parameter' }, 400, corsHeaders);
    }

    let parsed;
    try {
      parsed = new URL(targetUrl);
    } catch {
      return json({ error: 'Invalid URL' }, 400, corsHeaders);
    }

    // Security: block private addresses
    const host = parsed.hostname.toLowerCase();
    if (isPrivateHost(host)) {
      return json({ error: 'Private/local addresses not allowed' }, 403, corsHeaders);
    }

    const blocked = (env.BLOCKED_HOSTS || '').split(',').map(s => s.trim()).filter(Boolean);
    const allowed = (env.ALLOWED_HOSTS || '').split(',').map(s => s.trim()).filter(Boolean);
    if (blocked.includes(host)) return json({ error: 'Host blocked' }, 403, corsHeaders);
    if (allowed.length && !allowed.some(h => host === h || host.endsWith('.' + h))) {
      return json({ error: 'Host not in allow list' }, 403, corsHeaders);
    }

    // Forward headers
    const forwardHeaders = new Headers();
    const skip = new Set([
      'host', 'connection', 'content-length', 'accept-encoding',
      'origin', 'referer', 'x-proxy-token', 'cf-connecting-ip',
      'cf-ray', 'cf-visitor', 'x-forwarded-for', 'x-forwarded-proto'
    ]);
    for (const [k, v] of request.headers) {
      if (!skip.has(k.toLowerCase())) forwardHeaders.set(k, v);
    }

    const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const upstream = await fetch(targetUrl, {
        method: request.method,
        headers: forwardHeaders,
        body,
        signal: controller.signal,
        redirect: 'follow',
      });
      clearTimeout(timeout);

      // Check size
      const contentLength = upstream.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > MAX_SIZE) {
        return json({ error: 'Response too large (max 1MB)' }, 413, corsHeaders);
      }

      const buffer = await upstream.arrayBuffer();
      if (buffer.byteLength > MAX_SIZE) {
        return json({ error: 'Response too large (max 1MB)' }, 413, corsHeaders);
      }

      const respHeaders = new Headers(corsHeaders);
      const skipResp = new Set(['content-encoding', 'transfer-encoding']);
      upstream.headers.forEach((value, key) => {
        if (!skipResp.has(key.toLowerCase()) && !key.toLowerCase().startsWith('access-control-')) {
          respHeaders.set(key, value);
        }
      });

      return new Response(buffer, { status: upstream.status, headers: respHeaders });
    } catch (err) {
      clearTimeout(timeout);
      if (err.name === 'AbortError') {
        return json({ error: 'Upstream timeout' }, 504, corsHeaders);
      }
      return json({ error: 'Proxy error', message: err.message }, 502, corsHeaders);
    }
  },
};

function json(obj, status, extraHeaders = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

function isPrivateHost(host) {
  if (host === 'localhost' || host === '0.0.0.0' || host === '127.0.0.1') return true;
  if (host.endsWith('.local') || host.endsWith('.internal')) return true;
  if (host.startsWith('192.168.') || host.startsWith('10.')) return true;
  const m = host.match(/^172\.(\d+)\./);
  if (m && parseInt(m[1]) >= 16 && parseInt(m[1]) <= 31) return true;
  return false;
}
