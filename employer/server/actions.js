import { canUseEmployerFeatures } from "../access.js";
import { translate } from "../../common/i18n/index.js";
import { jsonNoStore } from "../../core/http/json.js";
import { getDatabase } from "../../core/db/index.js";
import { and, eq } from "drizzle-orm";
import { jobs, applications } from "../../core/db/schema.js";
import { editVacancy, isBlockedVacancy, publishVacancy, setVacancyStatus } from "./vacancy-repository.js";
import { jobSchema } from "./job-schema.js";

export const employerActions = new Set(["publish", "editJob", "jobStatus", "applicationStatus"]);

export async function handleEmployerAction(currentUser, actionPayload) {
  if (!employerActions.has(actionPayload?.action)) return;
  if (!canUseEmployerFeatures(currentUser)) return jsonNoStore({ error: translate("app.api.company.route.tsey_rozdil_dostupnyy_lyshe_robotodavtsyam") }, 403);
  const connection = getDatabase();
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
    const recordId = await publishVacancy(connection, currentUser.userId, jobValidation.data);
    if (!recordId)
      return jsonNoStore(
        {
          error: translate(
            "app.api.platform.route.dosyahnuto_limit_100_aktyvnykh_vakansiy",
          ),
        },
        409,
      );
    return jsonNoStore({
      ok: true,
      id: recordId,
    });
  }
  if (
    "editJob" === actionPayload.action &&
    "string" == typeof actionPayload.jobId
  ) {
    if (isBlockedVacancy(currentUser.userId, actionPayload.jobId))
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
    return await editVacancy(connection, currentUser.userId, actionPayload.jobId, jobValidation.data)
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
    isBlockedVacancy(currentUser.userId, String(actionPayload.jobId))
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
    return await setVacancyStatus(connection, currentUser.userId, actionPayload.jobId, actionPayload.status)
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
