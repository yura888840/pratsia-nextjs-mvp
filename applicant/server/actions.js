import { translate } from "../../common/i18n/index.js";
import { jsonNoStore } from "../../core/http/json.js";
import { getDatabase } from "../../core/db/index.js";
import { and, eq, sql } from "drizzle-orm";
import { jobs, profiles, favorites, searches, reports } from "../../core/db/schema.js";
import { profileSchema } from "./profile-schema.js";
import { submitApplication } from "./applications.js";

export async function handleApplicantAction(currentUser, actionPayload) {
  const connection = getDatabase();
  const nowIso = new Date().toISOString();
  const recordId = crypto.randomUUID();
  if ("profile" === actionPayload.action && currentUser.accountType !== "candidate") return jsonNoStore({ error: translate("candidate.accessDenied") }, 403);
  if ("profile" === actionPayload.action) {
    const profileValidation = profileSchema.safeParse(actionPayload.data);
    if (!profileValidation.success)
      return jsonNoStore(
        {
          error: translate("app.api.platform.route.perevirte_polya_ankety"),
          fields: profileValidation.error.flatten(),
        },
        400,
      );
    const profileData = {
      ...profileValidation.data,
      specialties: JSON.stringify(profileValidation.data.specialties),
      workHistory: JSON.stringify(profileValidation.data.workHistory),
      education: JSON.stringify(profileValidation.data.education),
      updatedAt: nowIso,
    };
    await connection
      .insert(profiles)
      .values({
        ...profileData,
        userId: currentUser.userId,
      })
      .onConflictDoUpdate({
        target: profiles.userId,
        set: profileData,
      });
    return jsonNoStore({
      ok: true,
    });
  }
  if (
    "favorite" === actionPayload.action &&
    "string" == typeof actionPayload.jobId &&
    actionPayload.jobId.length < 100
  ) {
    {
      if (actionPayload.remove) {
        await connection
          .delete(favorites)
          .where(
            and(
              eq(favorites.userId, currentUser.userId),
              eq(favorites.jobId, actionPayload.jobId),
            ),
          );
      } else {
        await connection
          .insert(favorites)
          .values({
            id: recordId,
            userId: currentUser.userId,
            jobId: actionPayload.jobId,
          })
          .onConflictDoNothing();
      }
    }
    return jsonNoStore({
      ok: true,
    });
  }
  if (
    "apply" === actionPayload.action &&
    "string" === typeof actionPayload.jobId
  ) {
    const result = submitApplication(
      currentUser,
      actionPayload.jobId,
      actionPayload.message,
    );
    const { status = 200, ...body } = result;
    return jsonNoStore(body, status);
  }
  if (
    "saveSearch" === actionPayload.action &&
    "string" == typeof actionPayload.name &&
    actionPayload.name.length <= 150 &&
    actionPayload.filters &&
    JSON.stringify(actionPayload.filters).length < 3e3
  ) {
    if (
      (
        await connection
          .select({
            count: sql`count(*)`,
          })
          .from(searches)
          .where(eq(searches.userId, currentUser.userId))
      )[0].count >= 30
    )
      return jsonNoStore(
        {
          error: translate(
            "app.api.platform.route.mozhna_zberehty_do_30_poshukiv",
          ),
        },
        409,
      );
    await connection.insert(searches).values({
      id: recordId,
      userId: currentUser.userId,
      name: actionPayload.name,
      filters: JSON.stringify(actionPayload.filters),
      createdAt: nowIso,
    });
    return jsonNoStore({
      ok: true,
    });
  }
  if (
    "deleteSearch" === actionPayload.action &&
    "string" == typeof actionPayload.id
  ) {
    await connection
      .delete(searches)
      .where(
        and(
          eq(searches.id, actionPayload.id),
          eq(searches.userId, currentUser.userId),
        ),
      );
    return jsonNoStore({
      ok: true,
    });
  }
  if (
    "report" === actionPayload.action &&
    "string" == typeof actionPayload.jobId &&
    "string" == typeof actionPayload.reason &&
    actionPayload.reason.trim().length >= 5 &&
    actionPayload.reason.length <= 2e3
  ) {
    if (
      !(
        await connection
          .select({
            id: jobs.id,
          })
          .from(jobs)
          .where(eq(jobs.id, actionPayload.jobId))
          .limit(1)
      ).length
    )
      return jsonNoStore(
        {
          error: translate("app.api.platform.route.vakansiyu_ne_znaydeno"),
        },
        404,
      );
    if (
      (
        await connection
          .select({
            id: reports.id,
          })
          .from(reports)
          .where(
            and(
              eq(reports.jobId, actionPayload.jobId),
              eq(reports.userId, currentUser.userId),
              eq(reports.status, "open"),
            ),
          )
          .limit(1)
      ).length
    )
      return jsonNoStore({
        ok: true,
      });
    if (
      (
        await connection
          .select({
            count: sql`count(*)`,
          })
          .from(reports)
          .where(
            and(
              eq(reports.userId, currentUser.userId),
              (0,
              sql)`${reports.createdAt}>${new Date(Date.now() - 864e5).toISOString()}`,
            ),
          )
      )[0].count >= 10
    )
      return jsonNoStore(
        {
          error: translate(
            "app.api.platform.route.dosyahnuto_limit_povidomlen_na_sohodni",
          ),
        },
        429,
      );
    await connection.insert(reports).values({
      id: recordId,
      userId: currentUser.userId,
      jobId: actionPayload.jobId,
      reason: actionPayload.reason.trim(),
      createdAt: nowIso,
    });
    return jsonNoStore({
      ok: true,
    });
  }
}
