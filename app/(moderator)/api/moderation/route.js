import { translate } from "../../../../i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import { getCurrentUser } from "../../../../lib/session.js";
import { getSqlite } from "../../../../db/connection.js";
import { randomUUID } from "node:crypto";
import { isAllowedOrigin } from "../../../../lib/validation.js";
import {
  object as objectSchema,
  string as stringSchema,
  enum as enumSchema,
} from "zod";
function isVerifiedModerator(accountId) {
  return !!getSqlite()
    .prepare(
      "SELECT id FROM accounts WHERE id=? AND role='admin' AND email_verified_at IS NOT NULL",
    )
    .get(accountId);
}
const jsonNoStore = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
async function getModerationQueue(request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || !isVerifiedModerator(currentUser.userId))
    return jsonNoStore(
      {
        error: translate(
          "app.api.moderation.route.dostup_lyshe_dlya_moderatora",
        ),
      },
      403,
    );
  const searchParams = new URL(request.url).searchParams;
  const queueScope = searchParams.get("scope") || "reports";
  if (!["reports", "recent", "blocked", "pending"].includes(queueScope))
    return jsonNoStore(
      {
        error: translate("app.api.moderation.route.nekorektnyy_rozdil"),
      },
      400,
    );
  const offset = Number(searchParams.get("offset") || 0);
  if (!Number.isSafeInteger(offset) || offset < 0 || offset > 1e5)
    return jsonNoStore(
      {
        error: translate("app.api.moderation.route.nekorektna_storinka"),
      },
      400,
    );
  try {
    return jsonNoStore(
      (function (moderatorId, scope = "reports", pageOffset = 0) {
        if (!isVerifiedModerator(moderatorId)) throw Error("forbidden");
        const database = getSqlite();
        const jobRows = database
          .prepare(
            `SELECT j.id,j.title,j.company,j.city,j.occupation,j.description,j.status,j.moderation_status AS moderationStatus,j.moderation_reason AS moderationReason,j.expires_at AS expiresAt,(SELECT count(*) FROM reports r WHERE r.job_id=j.id AND r.status='open') AS openReports FROM jobs j WHERE ${"pending" === scope ? "j.moderation_status='pending'" : "blocked" === scope ? "j.moderation_status='blocked'" : "reports" === scope ? "EXISTS(SELECT 1 FROM reports r WHERE r.job_id=j.id AND r.status='open')" : "1=1"} ORDER BY j.created_at DESC,j.id DESC LIMIT 31 OFFSET ?`,
          )
          .all(pageOffset);
        const hasMore = jobRows.length > 30;
        return {
          jobs: jobRows.slice(0, 30).map((job) => ({
            ...job,
            reports: database
              .prepare(
                "SELECT id,reason,created_at AS createdAt FROM reports WHERE job_id=? AND status='open' ORDER BY created_at DESC LIMIT 20",
              )
              .all(job.id),
            events: database
              .prepare(
                "SELECT action,reason,created_at AS createdAt FROM moderation_events WHERE job_id=? ORDER BY created_at DESC,id DESC LIMIT 10",
              )
              .all(job.id),
          })),
          hasMore,
          offset: pageOffset,
        };
      })(currentUser.userId, queueScope, offset),
    );
  } catch {
    return jsonNoStore(
      {
        error: translate(
          "app.api.moderation.route.ne_vdalosya_zavantazhyty_cherhu",
        ),
      },
      500,
    );
  }
}
const moderationActionSchema = objectSchema({
  jobId: stringSchema().min(1).max(100),
  action: enumSchema(["hide", "restore", "dismiss"]),
  reason: stringSchema().trim().min(5).max(2e3),
});
async function postModerationAction(request) {
  if (!isAllowedOrigin(request))
    return jsonNoStore(
      {
        error: translate("app.api.auth.recovery.route.nedozvolenyy_zapyt"),
      },
      403,
    );
  const currentUser = await getCurrentUser();
  if (!currentUser || !isVerifiedModerator(currentUser.userId))
    return jsonNoStore(
      {
        error: translate(
          "app.api.moderation.route.dostup_lyshe_dlya_moderatora",
        ),
      },
      403,
    );
  try {
    const requestBody = await request.text();
    if (requestBody.length > 5e3)
      return jsonNoStore(
        {
          error: translate("app.api.auth.recovery.route.zavelykyy_zapyt"),
        },
        413,
      );
    const validationResult = moderationActionSchema.safeParse(
      JSON.parse(requestBody),
    );
    if (!validationResult.success)
      return jsonNoStore(
        {
          error: translate(
            "app.api.moderation.route.vkazhy_prychynu_vid_5_do_2000_symvoliv",
          ),
        },
        400,
      );
    return jsonNoStore(
      (function (actorId, jobId, action, reason) {
        const database = getSqlite();
        database.exec("BEGIN IMMEDIATE");
        try {
          if (!isVerifiedModerator(actorId)) throw Error("forbidden");
          if (
            !["hide", "restore", "dismiss"].includes(action) ||
            "string" != typeof reason ||
            reason.trim().length < 5 ||
            reason.length > 2e3
          )
            throw Error("invalid");
          if (!database.prepare("SELECT id FROM jobs WHERE id=?").get(jobId))
            throw Error("not_found");
          const timestamp = new Date().toISOString();
          if (action === "restore")
            database
              .prepare(
                "UPDATE jobs SET expires_at=? WHERE id=? AND moderation_status='pending'",
              )
              .run(new Date(Date.now() + 30 * 86400000).toISOString(), jobId);
          if ("dismiss" !== action) {
            database
              .prepare(
                "UPDATE jobs SET moderation_status=?,moderation_reason=? WHERE id=?",
              )
              .run(
                "hide" === action ? "blocked" : "approved",
                reason.trim(),
                jobId,
              );
          }
          database
            .prepare(
              "UPDATE reports SET status='resolved',resolved_at=? WHERE job_id=? AND status='open'",
            )
            .run(timestamp, jobId);
          database
            .prepare(
              "INSERT INTO moderation_events(id,actor_id,job_id,action,reason,created_at) VALUES (?,?,?,?,?,?)",
            )
            .run(
              randomUUID(),
              actorId,
              jobId,
              action,
              reason.trim(),
              timestamp,
            );
          database.exec("COMMIT");
          return {
            ok: true,
          };
        } catch (error) {
          database.exec("ROLLBACK");
          throw error;
        }
      })(
        currentUser.userId,
        validationResult.data.jobId,
        validationResult.data.action,
        validationResult.data.reason,
      ),
    );
  } catch (error) {
    return jsonNoStore(
      {
        error: translate(
          "app.api.moderation.route.ne_vdalosya_opratsyuvaty_vakansiyu",
        ),
      },
      error instanceof Error && "not_found" === error.message ? 404 : 500,
    );
  }
}
export { getModerationQueue as GET };
export { postModerationAction as POST };
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
