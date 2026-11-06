
import { translate } from "../../../../i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as validationTypes from "../../../../vendor/recovered/module-6061.js";
import * as auth from "../../../../lib/auth.js";
import * as nativeModule2 from "node:fs/promises";
import * as g from "node:fs";
import * as nativeModule4 from "node:child_process";
import * as i from "node:crypto";
let f = nativeModule2;
let h = nativeModule4;
let j = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
function k() {
  return {
    path: process.env.PRATSIA_SENDMAIL_PATH || "/usr/sbin/sendmail",
    from: process.env.PRATSIA_MAIL_FROM || "no-reply@pratsia.com.ua"
  };
}
async function l() {
  if ("1" === process.env.PRATSIA_MAIL_DISABLED) return false;
  let a = k();
  if (!j.test(a.from) || /[\r\n]/.test(a.from)) return false;
  try {
    return await (0, f.access)(a.path, g.constants.X_OK), true;
  } catch {
    return false;
  }
}
async function m(a, b) {
  let c = k(),
    d = function (a, b, c = k().from) {
      if (!j.test(a) || !j.test(c) || /[\r\n]/.test(a + c) || !b.startsWith("https://")) throw Error("Invalid mail envelope");
      let d = Buffer.from(translate("app.api.auth.recovery.route.pratsya_vidnovlennya_dostupu"), "utf8").toString("base64");
      return `From: Pratsia <${c}>\r
To: ${a}\r
Subject: =?UTF-8?B?${d}?=\r
Date: ${new Date().toUTCString()}\r
Message-ID: <${(0, i.randomUUID)()}@${c.split("@")[1]}>\r
MIME-Version: 1.0\r
Content-Type: text/plain; charset=UTF-8\r
Content-Transfer-Encoding: 8bit\r
\r
${translate("auth.recovery.emailBody", { resetUrl: b })}`;
    }(a, b, c.from);
  await new Promise((a, b) => {
    let e = (0, h.spawn)(c.path, ["-i", "-t", "-f", c.from], {
        stdio: ["pipe", "ignore", "pipe"],
        shell: false
      }),
      f = false,
      g = c => {
        f || (f = true, clearTimeout(i), c ? b(c) : a());
      },
      i = setTimeout(() => {
        e.kill("SIGTERM");
        g(Error("Mail submission timeout"));
      }, 1e4);
    e.on("error", () => g(Error("Mail submission failed")));
    e.on("close", a => g(0 === a ? null : Error("Mail submission failed")));
    e.stderr.on("data", () => {});
    e.stdin.on("error", () => g(Error("Mail submission failed")));
    e.stdin.end(d);
  });
}
let p = validationTypes.gM("action", [validationTypes.Ik({
  action: validationTypes.eu("request"),
  email: validationTypes.Yj().trim().toLowerCase().email().max(254)
}), validationTypes.Ik({
  action: validationTypes.eu("complete"),
  token: validationTypes.Yj().regex(/^[a-f0-9]{64}$/),
  password: validationTypes.Yj().min(12).max(128)
})]);
async function q(a) {
  let b = Date.now(),
    c = new URL(a.url),
    d = process.env.PRATSIA_ORIGIN || c.protocol + "//" + (a.headers.get("host") || c.host),
    f = (a, b = 200) => Response.json(a, {
      status: b,
      headers: {
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer"
      }
    });
  if (a.headers.get("origin") !== d) return f({
    error: translate("app.api.auth.recovery.route.nedozvolenyy_zapyt")
  }, 403);
  try {
    let c,
      g = await a.text();
    if (g.length > 2e3) return f({
      error: translate("app.api.auth.recovery.route.zavelykyy_zapyt")
    }, 413);
    try {
      c = p.safeParse(JSON.parse(g));
    } catch {
      return f({
        error: translate("app.api.auth.recovery.route.nekorektnyy_zapyt")
      }, 400);
    }
    if (!c.success) return f({
      error: translate("app.api.auth.recovery.route.perevir_email_abo_novyy_parol_vid_12_do_128_symvoliv")
    }, 400);
    if (!(0, auth.checkRateLimit)("recovery-global", 100, 36e5)) return f({
      error: translate("app.api.auth.recovery.route.zabahato_sprob_sprobuy_piznishe")
    }, 429);
    if ("complete" === c.data.action) {
      if (!(0, auth.checkRateLimit)("recovery-complete", 30, 9e5)) return f({
        error: translate("app.api.auth.recovery.route.zabahato_sprob_sprobuy_piznishe")
      }, 429);
      return (await (0, auth.completePasswordReset)(c.data.token, c.data.password)) ? f({
        ok: true,
        message: translate("app.api.auth.recovery.route.parol_zmineno_uviydy_z_novym_parolem")
      }) : f({
        error: translate("app.api.auth.recovery.route.posylannya_vzhe_vykorystane_abo_termin_diyi_mynuv_zapytay_nove")
      }, 400);
    }
    if (!(await l())) return f({
      error: translate("app.api.auth.recovery.route.vidnovlennya_poshtoyu_zaraz_nedostupne_sprobuy_piznishe")
    }, 503);
    let h = c.data.email;
    if ((0, auth.checkRateLimit)("recovery:" + (0, auth.emailRateLimitKey)(h), 3, 36e5)) {
      let a = (0, auth.createPasswordReset)(h),
        b = new URL("/", d);
      if (b.protocol = "https:", a) try {
        await m(h, b.toString() + "#reset=" + a);
      } catch {
        (0, auth.deletePasswordReset)(a);
        console.error("recovery_mail_submission_failed");
      }
    }
    let i = 500 - (Date.now() - b);
    return i > 0 && (await new Promise(a => setTimeout(a, i))), f({
      ok: true,
      message: translate("app.api.auth.recovery.route.yakshcho_akaunt_iz_takoyu_poshtoyu_isnuye_my_nadislaly_posylannya_dlya_vidnovlennya_p")
    });
  } catch {
    return console.error("recovery_request_failed"), f({
      error: translate("app.api.auth.recovery.route.ne_vdalosya_vykonaty_zapyt_sprobuy_piznishe")
    }, 500);
  }
}
export { q as POST };
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
