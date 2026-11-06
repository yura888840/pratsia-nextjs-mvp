// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as nextHeaders from "next/headers";
import * as validationTypes from "../../../vendor/recovered/module-6061.js";
import * as auth from "../../../lib/auth.js";
let i = validationTypes.Ik({
  action: validationTypes.k5(["login", "register"]),
  email: validationTypes.Yj().trim().toLowerCase().email().max(254),
  password: validationTypes.Yj().min(12).max(128),
  name: validationTypes.Yj().trim().min(2).max(100).optional()
});
async function j(a) {
  let b = new URL(a.url),
    c = process.env.PRATSIA_ORIGIN || b.protocol + "//" + (a.headers.get("host") || b.host);
  if (a.headers.get("origin") !== c) return Response.json({
    error: "Недозволений запит"
  }, {
    status: 403
  });
  try {
    let b,
      c = await a.text();
    if (c.length > 4e3) return Response.json({
      error: "Завеликий запит"
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
      error: "Перевір email, ім’я та пароль (від 12 до 128 символів)."
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
      error: "Забагато спроб. Спробуй через 15 хвилин."
    }, {
      status: 429,
      headers: {
        "Retry-After": "900"
      }
    });
    if ("register" === n) {
      if (!m) return Response.json({
        error: "Вкажи ім’я."
      }, {
        status: 400
      });
      if (!(0, auth.checkRateLimit)("registration", 30, 36e5)) return Response.json({
        error: "Спробуй зареєструватися пізніше."
      }, {
        status: 429
      });
      try {
        b = await (0, auth.registerAccount)(k, m, l);
      } catch {
        return Response.json({
          error: "Не вдалося створити акаунт. Якщо вже реєструвався — скористайся входом."
        }, {
          status: 400
        });
      }
    } else b = await (0, auth.authenticate)(k, l);
    if (!b) return Response.json({
      error: "Невірний email або пароль."
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
      error: "Не вдалося виконати вхід. Спробуй ще раз."
    }, {
      status: 500
    });
  }
}
export { j as POST };
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
