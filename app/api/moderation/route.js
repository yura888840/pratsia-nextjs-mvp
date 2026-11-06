
import { translate } from "../../../i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as session from "../../../lib/session.js";
import * as connection from "../../../db/connection.js";
import * as f from "node:crypto";
import * as validation from "../../../lib/validation.js";
import * as validationTypes from "../../../vendor/recovered/module-6061.js";
function g(a) {
  return !!(0, connection.getSqlite)().prepare("SELECT id FROM accounts WHERE id=? AND role='admin' AND email_verified_at IS NOT NULL").get(a);
}
let l = (a, b = 200) => Response.json(a, {
  status: b,
  headers: {
    "Cache-Control": "no-store"
  }
});
async function m(a) {
  let b = await (0, session.getCurrentUser)();
  if (!b || !g(b.userId)) return l({
    error: translate("app.api.moderation.route.dostup_lyshe_dlya_moderatora")
  }, 403);
  let c = new URL(a.url).searchParams,
    f = c.get("scope") || "reports";
  if (!["reports", "recent", "blocked", "pending"].includes(f)) return l({
    error: translate("app.api.moderation.route.nekorektnyy_rozdil")
  }, 400);
  let h = Number(c.get("offset") || 0);
  if (!Number.isSafeInteger(h) || h < 0 || h > 1e5) return l({
    error: translate("app.api.moderation.route.nekorektna_storinka")
  }, 400);
  try {
    return l(function (a, b = "reports", c = 0) {
      if (!g(a)) throw Error("forbidden");
      let d = (0, connection.getSqlite)(),
        f = d.prepare(`SELECT j.id,j.title,j.company,j.city,j.occupation,j.description,j.status,j.moderation_status AS moderationStatus,j.moderation_reason AS moderationReason,j.expires_at AS expiresAt,(SELECT count(*) FROM reports r WHERE r.job_id=j.id AND r.status='open') AS openReports FROM jobs j WHERE ${"pending" === b ? "j.moderation_status='pending'" : "blocked" === b ? "j.moderation_status='blocked'" : "reports" === b ? "EXISTS(SELECT 1 FROM reports r WHERE r.job_id=j.id AND r.status='open')" : "1=1"} ORDER BY j.created_at DESC,j.id DESC LIMIT 31 OFFSET ?`).all(c),
        h = f.length > 30;
      return {
        jobs: f.slice(0, 30).map(a => ({
          ...a,
          reports: d.prepare("SELECT id,reason,created_at AS createdAt FROM reports WHERE job_id=? AND status='open' ORDER BY created_at DESC LIMIT 20").all(a.id),
          events: d.prepare("SELECT action,reason,created_at AS createdAt FROM moderation_events WHERE job_id=? ORDER BY created_at DESC,id DESC LIMIT 10").all(a.id)
        })),
        hasMore: h,
        offset: c
      };
    }(b.userId, f, h));
  } catch {
    return l({
      error: translate("app.api.moderation.route.ne_vdalosya_zavantazhyty_cherhu")
    }, 500);
  }
}
let n = validationTypes.Ik({
  jobId: validationTypes.Yj().min(1).max(100),
  action: validationTypes.k5(["hide", "restore", "dismiss"]),
  reason: validationTypes.Yj().trim().min(5).max(2e3)
});
async function o(a) {
  if (!(0, validation.isAllowedOrigin)(a)) return l({
    error: translate("app.api.auth.recovery.route.nedozvolenyy_zapyt")
  }, 403);
  let b = await (0, session.getCurrentUser)();
  if (!b || !g(b.userId)) return l({
    error: translate("app.api.moderation.route.dostup_lyshe_dlya_moderatora")
  }, 403);
  try {
    let c = await a.text();
    if (c.length > 5e3) return l({
      error: translate("app.api.auth.recovery.route.zavelykyy_zapyt")
    }, 413);
    let d = n.safeParse(JSON.parse(c));
    if (!d.success) return l({
      error: translate("app.api.moderation.route.vkazhy_prychynu_vid_5_do_2000_symvoliv")
    }, 400);
    return l(function (a, b, c, d) {
      let h = (0, connection.getSqlite)();
      h.exec("BEGIN IMMEDIATE");
      try {
        if (!g(a)) throw Error("forbidden");
        if (!["hide", "restore", "dismiss"].includes(c) || "string" != typeof d || d.trim().length < 5 || d.length > 2e3) throw Error("invalid");
        if (!h.prepare("SELECT id FROM jobs WHERE id=?").get(b)) throw Error("not_found");
        let e = new Date().toISOString();
        if(c === "restore") h.prepare("UPDATE jobs SET expires_at=? WHERE id=? AND moderation_status='pending'").run(new Date(Date.now()+30*86400000).toISOString(),b);
        return "dismiss" !== c && h.prepare("UPDATE jobs SET moderation_status=?,moderation_reason=? WHERE id=?").run("hide" === c ? "blocked" : "approved", d.trim(), b), h.prepare("UPDATE reports SET status='resolved',resolved_at=? WHERE job_id=? AND status='open'").run(e, b), h.prepare("INSERT INTO moderation_events(id,actor_id,job_id,action,reason,created_at) VALUES (?,?,?,?,?,?)").run((0, f.randomUUID)(), a, b, c, d.trim(), e), h.exec("COMMIT"), {
          ok: true
        };
      } catch (a) {
        throw h.exec("ROLLBACK"), a;
      }
    }(b.userId, d.data.jobId, d.data.action, d.data.reason));
  } catch (a) {
    return l({
      error: translate("app.api.moderation.route.ne_vdalosya_opratsyuvaty_vakansiyu")
    }, a instanceof Error && "not_found" === a.message ? 404 : 500);
  }
}
export { m as GET };
export { o as POST };
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
