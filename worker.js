export default {
  async fetch(request, env, headers) {
    const maintenanceMode = env.MAINTENANCE;


    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      });
    }

    if (maintenanceMode == "true" ) {
      return new Response("Challenge is currently down for maintenance. Please try again later.", {
        status: 503,
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      });
    }

    const targetUrl = env.TARGET_URL;
    const clientIp = request.headers.get("CF-Connecting-IP") || "unknown-ip";
    const rateLimitKey = `rate-limit:${clientIp}`;


    // Create a new request to the target API
    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== "GET" && request.method !== "HEAD" ? await request.text() : null,
      redirect: "follow"
    });

    const { success } = await env.RATE_LIMITER.limit({ key: rateLimitKey });

    if (!success) {
      return new Response("You are being rate limited! Please chill with the requests.", {
        status: 429,
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      });
    }

    return fetch(modifiedRequest);
  }
};