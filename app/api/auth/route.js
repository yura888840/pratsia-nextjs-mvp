
import { translate } from "../../../i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as nextHeaders from "next/headers";
import * as validationTypes from "../../../vendor/recovered/module-6061.js";
import * as auth from "../../../lib/auth.js";
let i = validationTypes.Ik({
  accountType: validationTypes.k5(["candidate", "employer"]).optional(),
  action: validationTypes.k5(["login", "register"]),
  email: validationTypes.Yj().trim().toLowerCase().email().max(254),
  password: validationTypes.Yj().min(12).max(128),
  name: validationTypes.Yj().trim().min(2).max(100).optional()
});
async function j(a) {
  let b = new URL(a.url),
    c = process.env.PRATSIA_ORIGIN || b.protocol + "//" + (a.headers.get("host") || b.host);
  if (a.headers.get("origin") !== c) return Response.json({
    error: translate("app.api.auth.recovery.route.nedozvolenyy_zapyt")
  }, {
    status: 403
  });
  try {
    let b,
      c = await a.text();
    if (c.length > 4e3) return Response.json({
      error: translate("app.api.auth.recovery.route.zavelykyy_zapyt")
    }, {
      status: 413
    });
    let e = JSON.parse(c),
      g = await (0, nextHeaders.cookies)(),
      h = {
        httpOnly: true,
        secure: new URL(process.env.PRATSIA_ORIGIN || a.url).protocol === "https:",
        sameSite: "lax",
        path: "/"
      };
    if ("logout" === e.action) return (0, auth.deleteSession)(g.get("pratsia_session")?.value), g.set("pratsia_session", "", {
      ...h,
      maxAge: 0
    }), Response.json({
      ok: true
    });
    let j = i.safeParse(e);
    if (!j.success) return Response.json({
      error: translate("app.api.auth.route.perevir_email_im_ya_ta_parol_vid_12_do_128_symvoliv")
    }, {
      status: 400
    });
    let {
      email: k,
      password: l,
      name: m,
      action: n
    } = j.data;
    if (!(0, auth.checkRateLimit)("auth-global", 300, 6e5) || !(0, auth.checkRateLimit)((0, auth.emailRateLimitKey)(k), 10, 9e5)) return Response.json({
      error: translate("app.api.auth.route.zabahato_sprob_sprobuy_cherez_15_khvylyn")
    }, {
      status: 429,
      headers: {
        "Retry-After": "900"
      }
    });
    if ("register" === n) {
      if (!m) return Response.json({
        error: translate("app.api.auth.route.vkazhy_im_ya")
      }, {
        status: 400
      });
      if (!(0, auth.checkRateLimit)("registration", 30, 36e5)) return Response.json({
        error: translate("app.api.auth.route.sprobuy_zareyestruvatysya_piznishe")
      }, {
        status: 429
      });
      try {
        b = await (0, auth.registerAccount)(k, m, l, j.data.accountType);
      } catch {
        return Response.json({
          error: translate("app.api.auth.route.ne_vdalosya_stvoryty_akaunt_yakshcho_vzhe_reyestruvavsya_skorystaysya_vkhodom")
        }, {
          status: 400
        });
      }
    } else b = await (0, auth.authenticate)(k, l);
    if (!b) return Response.json({
      error: translate("app.api.auth.route.nevirnyy_email_abo_parol")
    }, {
      status: 401
    });
    (0, auth.deleteSession)(g.get("pratsia_session")?.value);
    let o = (0, auth.createSession)(b);
    return g.set("pratsia_session", o.token, {
      ...h,
      maxAge: 604800
    }), Response.json({
      ok: true
    }, {
      headers: {
        "Cache-Control": "no-store"
      }
    });
  } catch (a) {
    return console.error("native_auth_failed", a instanceof Error ? a.name : "unknown"), Response.json({
      error: translate("app.api.auth.route.ne_vdalosya_vykonaty_vkhid_sprobuy_shche_raz")
    }, {
      status: 500
    });
  }
}
export { j as POST };
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
