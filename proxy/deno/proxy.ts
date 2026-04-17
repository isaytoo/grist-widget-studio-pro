// @ts-nocheck
// deno-lint-ignore-file
/**
 * CORS Proxy - Deno Deploy
 * Grist Widget Studio Pro
 *
 * Deploy: push to GitHub + connect to Deno Deploy (https://dash.deno.com)
 * Or local: deno run --allow-net --allow-env proxy.ts
 *
 * Env vars:
 *   PROXY_TOKEN     - Optional auth token (required in X-Proxy-Token header)
 *   ALLOWED_HOSTS   - CSV of allowed hosts
 *   BLOCKED_HOSTS   - CSV of blocked hosts
 *   PORT            - Local port (default 8000)
 */

const MAX_SIZE = 1024 * 1024; // 1 MB
const TIMEOUT_MS = 25000;

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-API-Key, X-Proxy-Token, X-Requested-With",
  "Access-Control-Max-Age": "86400",
};

function isPrivateHost(host: string): boolean {
  if (host === "localhost" || host === "0.0.0.0" || host === "127.0.0.1") return true;
  if (host.endsWith(".local") || host.endsWith(".internal")) return true;
  if (host.startsWith("192.168.") || host.startsWith("10.")) return true;
  const m = host.match(/^172\.(\d+)\./);
  if (m && +m[1] >= 16 && +m[1] <= 31) return true;
  return false;
}

function jsonResp(obj: unknown, status: number): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

async function handler(request: Request): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  const proxyToken = Deno.env.get("PROXY_TOKEN");
  if (proxyToken) {
    if (request.headers.get("X-Proxy-Token") !== proxyToken) {
      return jsonResp({ error: "Unauthorized" }, 401);
    }
  }

  const reqUrl = new URL(request.url);
  const targetUrl = reqUrl.searchParams.get("url");
  if (!targetUrl) return jsonResp({ error: "Missing 'url' query parameter" }, 400);

  let parsed: URL;
  try {
    parsed = new URL(targetUrl);
  } catch {
    return jsonResp({ error: "Invalid URL" }, 400);
  }

  const host = parsed.hostname.toLowerCase();
  if (isPrivateHost(host)) {
    return jsonResp({ error: "Private/local addresses not allowed" }, 403);
  }

  const blocked = (Deno.env.get("BLOCKED_HOSTS") || "")
    .split(",").map((s) => s.trim()).filter(Boolean);
  const allowed = (Deno.env.get("ALLOWED_HOSTS") || "")
    .split(",").map((s) => s.trim()).filter(Boolean);
  if (blocked.includes(host)) return jsonResp({ error: "Host blocked" }, 403);
  if (allowed.length && !allowed.some((h) => host === h || host.endsWith("." + h))) {
    return jsonResp({ error: "Host not in allow list" }, 403);
  }

  const forwardHeaders = new Headers();
  const skip = new Set([
    "host", "connection", "content-length", "accept-encoding",
    "origin", "referer", "x-proxy-token",
  ]);
  for (const [k, v] of request.headers) {
    if (!skip.has(k.toLowerCase())) forwardHeaders.set(k, v);
  }

  const body = ["GET", "HEAD"].includes(request.method)
    ? undefined
    : await request.arrayBuffer();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const upstream = await fetch(targetUrl, {
      method: request.method,
      headers: forwardHeaders,
      body,
      signal: controller.signal,
      redirect: "follow",
    });
    clearTimeout(timeout);

    const buffer = await upstream.arrayBuffer();
    if (buffer.byteLength > MAX_SIZE) {
      return jsonResp({ error: "Response too large (max 1MB)" }, 413);
    }

    const respHeaders = new Headers(CORS_HEADERS);
    const skipResp = new Set(["content-encoding", "transfer-encoding"]);
    upstream.headers.forEach((value, key) => {
      if (!skipResp.has(key.toLowerCase()) && !key.toLowerCase().startsWith("access-control-")) {
        respHeaders.set(key, value);
      }
    });

    return new Response(buffer, { status: upstream.status, headers: respHeaders });
  } catch (err) {
    clearTimeout(timeout);
    if ((err as Error).name === "AbortError") {
      return jsonResp({ error: "Upstream timeout" }, 504);
    }
    return jsonResp({ error: "Proxy error", message: (err as Error).message }, 502);
  }
}

const port = Number(Deno.env.get("PORT") || 8000);
Deno.serve({ port }, handler);
console.log(`CORS proxy running on :${port}`);
