import { safeAuthReturnTo } from "../../../../../../lib/auth-redirect.js";
import { cookies } from "next/headers";
import {
  googleClient,
  consumeGoogleFlow,
  googleAccount,
  googleFlowCookie,
} from "../../../../../../lib/google-auth.js";
import {
  authCookieOptions,
  sessionCookieName,
} from "../../../../../../lib/auth-cookies.js";
import { createSession, deleteSession } from "../../../../../../lib/auth.js";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request) {
  const jar = await cookies();
  const params = new URL(request.url).searchParams;
  let role = "candidate";
  let returnTo = "/";
  const redirect = (path) =>
    new Response(null, {
      status: 303,
      headers: {
        Location: path,
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer",
      },
    });
  try {
    const flow = consumeGoogleFlow(
      params.get("state"),
      jar.get(googleFlowCookie)?.value,
    );
    role = flow.account_type;
    returnTo = safeAuthReturnTo(flow.return_to);
    jar.set(googleFlowCookie, "", { ...authCookieOptions(), maxAge: 0 });
    if (params.has("error") || !params.get("code"))
      throw Error("google-failed");
    const client = googleClient();
    const { tokens } = await client.getToken({
      code: params.get("code"),
      codeVerifier: flow.verifier,
    });
    if (!tokens.id_token) throw Error("invalid-identity");
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const id = googleAccount(ticket.getPayload(), role, flow.nonce);
    deleteSession(jar.get(sessionCookieName)?.value);
    jar.set(sessionCookieName, createSession(id).token, {
      ...authCookieOptions(),
      maxAge: 604800,
    });
    return redirect(returnTo);
  } catch (error) {
    jar.set(googleFlowCookie, "", { ...authCookieOptions(), maxAge: 0 });
    return redirect(
      `/register?accountType=${role}&returnTo=${encodeURIComponent(returnTo)}&error=${error.message === "account-exists" ? "account-exists" : "google-failed"}`,
    );
  }
}
