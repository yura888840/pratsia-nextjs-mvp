import { translate } from "../../../../i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import { submitApplication } from "../../../../lib/applications.js";
import { getSqlite } from "../../../../db/connection.js";
import { and, eq, sql, desc } from "drizzle-orm";

import { getDatabase } from "../../../../db/index.js";
import {
  jobs,
  profiles,
  favorites,
  searches,
  applications,
  reports,
} from "../../../../db/schema.js";
import { getCurrentUser } from "../../../../lib/session.js";
import {
  isAllowedOrigin,
  profileSchema,
  jobSchema,
} from "../../../../lib/validation.js";
function jsonNoStore(body, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
async function getPlatformState() {
  try {
    const connection = getDatabase();
    const currentUser = await getCurrentUser();
    const nowIso = new Date().toISOString();
    const publicJobs = (
      await connection
        .select()
        .from(jobs)
        .where(
          and(
            eq(jobs.status, "active"),
            eq(jobs.moderationStatus, "approved"),
            sql`${jobs.expiresAt}>${nowIso}`,
          ),
        )
        .orderBy(desc(jobs.createdAt))
        .limit(16)
    ).map(({ ownerId, moderationReason, ...publicJob }) => publicJob);
    if (!currentUser)
      return jsonNoStore({
        jobs: publicJobs,
        user: null,
        profile: null,
        favorites: [],
        searches: [],
        applications: [],
        myJobs: [],
        incoming: [],
      });
    const [
      userProfiles,
      userFavorites,
      savedSearches,
      submittedApplications,
      ownedJobs,
      incomingApplications,
    ] = await Promise.all([
      connection
        .select()
        .from(profiles)
        .where(eq(profiles.userId, currentUser.userId))
        .limit(1),
      connection
        .select()
        .from(favorites)
        .where(eq(favorites.userId, currentUser.userId)),
      connection
        .select()
        .from(searches)
        .where(eq(searches.userId, currentUser.userId)),
      connection
        .select({
          application: applications,
          job: jobs,
        })
        .from(applications)
        .innerJoin(jobs, eq(jobs.id, applications.jobId))
        .where(eq(applications.candidateId, currentUser.userId)),
      connection
        .select()
        .from(jobs)
        .where(eq(jobs.ownerId, currentUser.userId))
        .orderBy(desc(jobs.createdAt)),
      connection
        .select({
          application: applications,
          job: jobs,
        })
        .from(applications)
        .innerJoin(jobs, eq(jobs.id, applications.jobId))
        .where(eq(jobs.ownerId, currentUser.userId)),
    ]);
    return jsonNoStore({
      jobs: publicJobs,
      user: {
        name: currentUser.displayName,
        accountType: currentUser.accountType,
        email: currentUser.email,
        isAdmin: !!currentUser.isAdmin,
      },
      profile: userProfiles[0] ?? null,
      favorites: userFavorites.map((favorite) => favorite.jobId),
      searches: savedSearches,
      applications: submittedApplications.map(
        ({ application, job: { moderationReason, ...applicationJob } }) => ({
          application,
          job: applicationJob,
        }),
      ),
      myJobs: currentUser.accountType === "employer" ? ownedJobs : [],
      incoming:
        currentUser.accountType === "employer" ? incomingApplications : [],
    });
  } catch (error) {
    console.error(
      "platform_read_failed",
      error instanceof Error ? error.message : "unknown",
    );
    return jsonNoStore(
      {
        error: translate(
          "app.api.platform.route.ne_vdalosya_zavantazhyty_dani_sprobuyte_shche_raz",
        ),
      },
      503,
    );
  }
}
async function postPlatformAction(request) {
  if (!isAllowedOrigin(request))
    return jsonNoStore(
      {
        error: translate("app.api.auth.recovery.route.nedozvolenyy_zapyt"),
      },
      403,
    );
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return jsonNoStore(
      {
        error: translate(
          "app.api.platform.route.uviydit_shchob_zberehty_zminy",
        ),
        needsAuth: true,
      },
      401,
    );
  if (Number(request.headers.get("content-length") || 0) > 4e4)
    return jsonNoStore(
      {
        error: translate("app.api.auth.recovery.route.zavelykyy_zapyt"),
      },
      413,
    );
  try {
    const requestBody = await request.text();
    if (requestBody.length > 4e4)
      return jsonNoStore(
        {
          error: translate("app.api.auth.recovery.route.zavelykyy_zapyt"),
        },
        413,
      );
    const actionPayload = JSON.parse(requestBody);
    const connection = getDatabase();
    const nowIso = new Date().toISOString();
    const recordId = crypto.randomUUID();
    if (
      ["publish", "editJob", "jobStatus", "applicationStatus"].includes(
        actionPayload.action,
      ) &&
      currentUser.accountType !== "employer"
    )
      return jsonNoStore(
        {
          error: translate(
            "app.api.company.route.tsey_rozdil_dostupnyy_lyshe_robotodavtsyam",
          ),
        },
        403,
      );
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
    return jsonNoStore(
      {
        error: translate(
          "app.api.platform.route.nevidoma_diya_abo_nekorektni_dani",
        ),
      },
      400,
    );
  } catch (error) {
    console.error(
      "platform_write_failed",
      error instanceof Error ? error.message : "unknown",
    );
    return jsonNoStore(
      {
        error: translate(
          "app.api.platform.route.ne_vdalosya_zberehty_perevirte_z_yednannya_ta_povtorit",
        ),
      },
      500,
    );
  }
}
export { getPlatformState as GET };
export { postPlatformAction as POST };
export const dynamic = "force-dynamic";
