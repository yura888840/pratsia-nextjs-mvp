import { cookies } from "next/headers";
import {
  beginGoogleFlow,
  googleFlowCookie,
  googleConfigured,
} from "../../../../../lib/google-auth.js";
import { authCookieOptions } from "../../../../../lib/auth-cookies.js";
import { isAllowedOrigin } from "../../../../../lib/validation.js";
import { checkRateLimit } from "../../../../../lib/auth.js";
export const runtime = "nodejs";
export async function POST(request) {
  if (!isAllowedOrigin(request)) return new Response(null, { status: 403 });
  if (!googleConfigured())
    return Response.json({ error: "google-unavailable" }, { status: 503 });
  if (!checkRateLimit("google-start", 300, 600000))
    return new Response(null, { status: 429 });
  const body = await request.text();
  if (body.length > 200) return new Response(null, { status: 413 });
  const accountType = new URLSearchParams(body).get("accountType");
  if (!["candidate", "employer"].includes(accountType))
    return new Response(null, { status: 400 });
  try {
    const flow = await beginGoogleFlow(
      accountType,
      new URLSearchParams(body).get("returnTo"),
    );
    (await cookies()).set(googleFlowCookie, flow.state, {
      ...authCookieOptions(),
      maxAge: 600,
    });
    return new Response(null, {
      status: 303,
      headers: { Location: flow.url, "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json({ error: "google-unavailable" }, { status: 503 });
  }
}
