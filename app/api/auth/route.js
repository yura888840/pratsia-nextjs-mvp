import { cookies } from "next/headers";
import { translate } from "../../../i18n/index.js";
import {
  Ik as objectSchema,
  k5 as enumSchema,
  Yj as stringSchema
} from "../../../vendor/recovered/module-6061.js";
import {
  authenticate,
  checkRateLimit,
  createSession,
  deleteSession,
  emailRateLimitKey,
  registerAccount
} from "../../../lib/auth.js";

const SESSION_COOKIE_NAME = "pratsia_session";
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;
const MAX_REQUEST_BODY_CHARACTERS = 4000;
const GLOBAL_AUTH_WINDOW_MS = 10 * 60 * 1000;
const EMAIL_AUTH_WINDOW_MS = 15 * 60 * 1000;
const REGISTRATION_WINDOW_MS = 60 * 60 * 1000;

const authRequestSchema = objectSchema({
  accountType: enumSchema(["candidate", "employer"]).optional(),
  action: enumSchema(["login", "register"]),
  email: stringSchema().trim().toLowerCase().email().max(254),
  password: stringSchema().min(12).max(128),
  name: stringSchema().trim().min(2).max(100).optional()
});

export async function POST(request) {
  const requestUrl = new URL(request.url);
  const allowedOrigin = process.env.PRATSIA_ORIGIN ||
    requestUrl.protocol + "//" + (request.headers.get("host") || requestUrl.host);

  if (request.headers.get("origin") !== allowedOrigin) {
    return Response.json({
      error: translate("app.api.auth.recovery.route.nedozvolenyy_zapyt")
    }, { status: 403 });
  }

  try {
    const requestBody = await request.text();
    if (requestBody.length > MAX_REQUEST_BODY_CHARACTERS) {
      return Response.json({
        error: translate("app.api.auth.recovery.route.zavelykyy_zapyt")
      }, { status: 413 });
    }

    const authPayload = JSON.parse(requestBody);
    const cookieStore = await cookies();
    const sessionCookieOptions = {
      httpOnly: true,
      secure: new URL(process.env.PRATSIA_ORIGIN || request.url).protocol === "https:",
      sameSite: "lax",
      path: "/"
    };

    if (authPayload.action === "logout") {
      deleteSession(cookieStore.get(SESSION_COOKIE_NAME)?.value);
      cookieStore.set(SESSION_COOKIE_NAME, "", {
        ...sessionCookieOptions,
        maxAge: 0
      });
      return Response.json({ ok: true });
    }

    const validationResult = authRequestSchema.safeParse(authPayload);
    if (!validationResult.success) {
      return Response.json({
        error: translate("app.api.auth.route.perevir_email_im_ya_ta_parol_vid_12_do_128_symvoliv")
      }, { status: 400 });
    }

    const { email, password, name, action, accountType } = validationResult.data;
    if (
      !checkRateLimit("auth-global", 300, GLOBAL_AUTH_WINDOW_MS) ||
      !checkRateLimit(emailRateLimitKey(email), 10, EMAIL_AUTH_WINDOW_MS)
    ) {
      return Response.json({
        error: translate("app.api.auth.route.zabahato_sprob_sprobuy_cherez_15_khvylyn")
      }, {
        status: 429,
        headers: { "Retry-After": "900" }
      });
    }

    let accountId;
    if (action === "register") {
      if (!name) {
        return Response.json({
          error: translate("app.api.auth.route.vkazhy_im_ya")
        }, { status: 400 });
      }

      if (!checkRateLimit("registration", 30, REGISTRATION_WINDOW_MS)) {
        return Response.json({
          error: translate("app.api.auth.route.sprobuy_zareyestruvatysya_piznishe")
        }, { status: 429 });
      }

      try {
        accountId = await registerAccount(email, name, password, accountType);
      } catch {
        return Response.json({
          error: translate("app.api.auth.route.ne_vdalosya_stvoryty_akaunt_yakshcho_vzhe_reyestruvavsya_skorystaysya_vkhodom")
        }, { status: 400 });
      }
    } else {
      accountId = await authenticate(email, password);
    }

    if (!accountId) {
      return Response.json({
        error: translate("app.api.auth.route.nevirnyy_email_abo_parol")
      }, { status: 401 });
    }

    deleteSession(cookieStore.get(SESSION_COOKIE_NAME)?.value);
    const session = createSession(accountId);
    cookieStore.set(SESSION_COOKIE_NAME, session.token, {
      ...sessionCookieOptions,
      maxAge: SESSION_MAX_AGE_SECONDS
    });
    return Response.json({ ok: true }, {
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    console.error("native_auth_failed", error instanceof Error ? error.name : "unknown");
    return Response.json({
      error: translate("app.api.auth.route.ne_vdalosya_vykonaty_vkhid_sprobuy_shche_raz")
    }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
