import { canUseEmployerFeatures } from "../access.js";
import { translate } from "../../common/i18n/index.js";
import { jsonNoStore } from "../../core/http/json.js";
import { getDatabase } from "../../core/db/index.js";
import { and, eq, sql } from "drizzle-orm";
import { jobs, applications } from "../../core/db/schema.js";
import { getSqlite } from "../../core/db/connection.js";
import { jobSchema } from "./job-schema.js";

export const employerActions = new Set(["publish", "editJob", "jobStatus", "applicationStatus"]);

export async function handleEmployerAction(currentUser, actionPayload) {
  if (!employerActions.has(actionPayload?.action)) return;
  if (!canUseEmployerFeatures(currentUser)) return jsonNoStore({ error: translate("app.api.company.route.tsey_rozdil_dostupnyy_lyshe_robotodavtsyam") }, 403);
  const connection = getDatabase();
  const nowIso = new Date().toISOString();
  const recordId = crypto.randomUUID();
  if ("publish" === actionPayload.action) {
    const jobValidation = jobSchema.safeParse(actionPayload.data);
    if (!jobValidation.success)
      return jsonNoStore(
        {
          error: translate(
            "app.api.platform.route.perevirte_polya_vakansiyi",
          ),
          fields: jobValidation.error.flatten(),
        },
        400,
      );
    if (
      (
        await connection
          .select({
            count: sql`count(*)`,
          })
          .from(jobs)
          .where(
            and(
              eq(jobs.ownerId, currentUser.userId),
              eq(jobs.status, "active"),
            ),
          )
      )[0].count >= 100
    )
      return jsonNoStore(
        {
          error: translate(
            "app.api.platform.route.dosyahnuto_limit_100_aktyvnykh_vakansiy",
          ),
        },
        409,
      );
    await connection.insert(jobs).values({
      ...jobValidation.data,
      id: recordId,
      ownerId: currentUser.userId,
      company:
        getSqlite()
          .prepare("SELECT name FROM companies WHERE owner_id=?")
          .get(currentUser.userId)?.name || jobValidation.data.company,
      moderationStatus: "pending",
      country: "UA",
      currency: "UAH",
      createdAt: nowIso,
      expiresAt: new Date(Date.now() + 2592e6).toISOString(),
      status: "active",
    });
    return jsonNoStore({
      ok: true,
      id: recordId,
    });
  }
  if (
    "editJob" === actionPayload.action &&
    "string" == typeof actionPayload.jobId
  ) {
    if (
      getSqlite()
        .prepare(
          "SELECT id FROM jobs WHERE id=? AND owner_id=? AND moderation_status='blocked'",
        )
        .get(actionPayload.jobId, currentUser.userId)
    )
      return jsonNoStore(
        {
          error: translate(
            "app.api.platform.route.vakansiya_zablokovana_zvernitsya_do_moderatora",
          ),
        },
        409,
      );
    const jobValidation = jobSchema.safeParse(actionPayload.data);
    if (!jobValidation.success)
      return jsonNoStore(
        {
          error: translate(
            "app.api.platform.route.perevirte_polya_vakansiyi",
          ),
        },
        400,
      );
    return (
      await connection
        .update(jobs)
        .set({
          ...jobValidation.data,
          company:
            getSqlite()
              .prepare("SELECT name FROM companies WHERE owner_id=?")
              .get(currentUser.userId)?.name || jobValidation.data.company,
          moderationStatus: "pending",
          moderationReason: "",
        })
        .where(
          and(
            eq(jobs.id, actionPayload.jobId),
            eq(jobs.ownerId, currentUser.userId),
          ),
        )
        .returning({
          id: jobs.id,
        })
    ).length
      ? jsonNoStore({
          ok: true,
          id: actionPayload.jobId,
        })
      : jsonNoStore(
          {
            error: translate("app.api.platform.route.vakansiyu_ne_znaydeno"),
          },
          404,
        );
  }
  if (
    "jobStatus" === actionPayload.action &&
    actionPayload.status === "active" &&
    getSqlite()
      .prepare(
        "SELECT id FROM jobs WHERE id=? AND owner_id=? AND moderation_status='blocked'",
      )
      .get(String(actionPayload.jobId), currentUser.userId)
  )
    return jsonNoStore(
      {
        error: translate(
          "app.api.platform.route.vakansiya_zablokovana_moderatorom",
        ),
      },
      409,
    );
  if (
    "jobStatus" === actionPayload.action &&
    "string" == typeof actionPayload.jobId &&
    ["active", "closed"].includes(actionPayload.status)
  )
    return (
      await connection
        .update(jobs)
        .set({
          status: actionPayload.status,
          ...("active" === actionPayload.status
            ? {
                expiresAt: new Date(Date.now() + 2592e6).toISOString(),
                moderationStatus: "pending",
              }
            : {}),
        })
        .where(
          and(
            eq(jobs.id, actionPayload.jobId),
            eq(jobs.ownerId, currentUser.userId),
          ),
        )
        .returning({
          id: jobs.id,
        })
    ).length
      ? jsonNoStore({
          ok: true,
        })
      : jsonNoStore(
          {
            error: translate("app.api.platform.route.vakansiyu_ne_znaydeno"),
          },
          404,
        );
  if (
    "applicationStatus" === actionPayload.action &&
    "string" == typeof actionPayload.id &&
    ["viewed", "invited", "rejected"].includes(actionPayload.status)
  ) {
    if (
      !(
        await connection
          .select({
            id: applications.id,
          })
          .from(applications)
          .innerJoin(jobs, eq(jobs.id, applications.jobId))
          .where(
            and(
              eq(applications.id, actionPayload.id),
              eq(jobs.ownerId, currentUser.userId),
            ),
          )
          .limit(1)
      ).length
    )
      return jsonNoStore(
        {
          error: translate("app.api.platform.route.vidhuk_ne_znaydeno"),
        },
        404,
      );
    await connection
      .update(applications)
      .set({
        status: actionPayload.status,
      })
      .where(eq(applications.id, actionPayload.id));
    return jsonNoStore({
      ok: true,
    });
  }
}
