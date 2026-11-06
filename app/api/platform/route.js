
import { translate } from "../../../i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import { submitApplication } from "../../../lib/applications.js";
import { getSqlite } from "../../../db/connection.js";
import * as d from "../../../vendor/recovered/module-2811.js";
import * as e from "../../../vendor/recovered/module-1029.js";
import * as f from "../../../vendor/recovered/module-2486.js";
import * as database from "../../../db/index.js";
import * as schema from "../../../db/schema.js";
import * as session from "../../../lib/session.js";
import * as validation from "../../../lib/validation.js";
function l(a, b = 200) {
  return Response.json(a, {
    status: b,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
async function m() {
  try {
    let a = (0, database.getDatabase)(),
      b = await (0, session.getCurrentUser)(),
      c = new Date().toISOString(),
      j = (await a.select().from(schema.jobs).where((0, d.Uo)((0, d.eq)(schema.jobs.status, "active"), (0, d.eq)(schema.jobs.moderationStatus, "approved"), (0, e.ll)`${schema.jobs.expiresAt}>${c}`)).orderBy((0, f.i)(schema.jobs.createdAt)).limit(16)).map(({
        ownerId: a,
        moderationReason: b,
        ...c
      }) => c);
    if (!b) return l({
      jobs: j,
      user: null,
      profile: null,
      favorites: [],
      searches: [],
      applications: [],
      myJobs: [],
      incoming: []
    });
    let [k, m, n, o, p, q] = await Promise.all([a.select().from(schema.profiles).where((0, d.eq)(schema.profiles.userId, b.userId)).limit(1), a.select().from(schema.favorites).where((0, d.eq)(schema.favorites.userId, b.userId)), a.select().from(schema.searches).where((0, d.eq)(schema.searches.userId, b.userId)), a.select({
      application: schema.applications,
      job: schema.jobs
    }).from(schema.applications).innerJoin(schema.jobs, (0, d.eq)(schema.jobs.id, schema.applications.jobId)).where((0, d.eq)(schema.applications.candidateId, b.userId)), a.select().from(schema.jobs).where((0, d.eq)(schema.jobs.ownerId, b.userId)).orderBy((0, f.i)(schema.jobs.createdAt)), a.select({
      application: schema.applications,
      job: schema.jobs
    }).from(schema.applications).innerJoin(schema.jobs, (0, d.eq)(schema.jobs.id, schema.applications.jobId)).where((0, d.eq)(schema.jobs.ownerId, b.userId))]);
    return l({
      jobs: j,
      user: {
        name: b.displayName,
        accountType: b.accountType,
        email: b.email,
        isAdmin: !!b.isAdmin
      },
      profile: k[0] ?? null,
      favorites: m.map(a => a.jobId),
      searches: n,
      applications: o.map(({
        application: a,
        job: {
          moderationReason: b,
          ...c
        }
      }) => ({
        application: a,
        job: c
      })),
      myJobs: b.accountType === "employer" ? p : [],
      incoming: b.accountType === "employer" ? q : []
    });
  } catch (a) {
    return console.error("platform_read_failed", a instanceof Error ? a.message : "unknown"), l({
      error: translate("app.api.platform.route.ne_vdalosya_zavantazhyty_dani_sprobuyte_shche_raz")
    }, 503);
  }
}
async function n(a) {
  if (!(0, validation.isAllowedOrigin)(a)) return l({
    error: translate("app.api.auth.recovery.route.nedozvolenyy_zapyt")
  }, 403);
  let b = await (0, session.getCurrentUser)();
  if (!b) return l({
    error: translate("app.api.platform.route.uviydit_shchob_zberehty_zminy"),
    needsAuth: true
  }, 401);
  if (Number(a.headers.get("content-length") || 0) > 4e4) return l({
    error: translate("app.api.auth.recovery.route.zavelykyy_zapyt")
  }, 413);
  try {
    let c = await a.text();
    if (c.length > 4e4) return l({
      error: translate("app.api.auth.recovery.route.zavelykyy_zapyt")
    }, 413);
    let f = JSON.parse(c),
      i = (0, database.getDatabase)(),
      k = new Date().toISOString(),
      m = crypto.randomUUID();
    if (["publish", "editJob", "jobStatus", "applicationStatus"].includes(f.action) && b.accountType !== "employer") return l({error: translate("app.api.company.route.tsey_rozdil_dostupnyy_lyshe_robotodavtsyam")}, 403);
    if ("profile" === f.action) {
      let a = validation.profileSchema.safeParse(f.data);
      if (!a.success) return l({
        error: translate("app.api.platform.route.perevirte_polya_ankety"),
        fields: a.error.flatten()
      }, 400);
      let c = {
        ...a.data,
        specialties: JSON.stringify(a.data.specialties),
        workHistory: JSON.stringify(a.data.workHistory),
        education: JSON.stringify(a.data.education),
        updatedAt: k
      };
      return await i.insert(schema.profiles).values({
        ...c,
        userId: b.userId
      }).onConflictDoUpdate({
        target: schema.profiles.userId,
        set: c
      }), l({
        ok: true
      });
    }
    if ("publish" === f.action) {
      let a = validation.jobSchema.safeParse(f.data);
      if (!a.success) return l({
        error: translate("app.api.platform.route.perevirte_polya_vakansiyi"),
        fields: a.error.flatten()
      }, 400);
      if ((await i.select({
        count: (0, e.ll)`count(*)`
      }).from(schema.jobs).where((0, d.Uo)((0, d.eq)(schema.jobs.ownerId, b.userId), (0, d.eq)(schema.jobs.status, "active"))))[0].count >= 100) return l({
        error: translate("app.api.platform.route.dosyahnuto_limit_100_aktyvnykh_vakansiy")
      }, 409);
      return await i.insert(schema.jobs).values({
        ...a.data,
        id: m,
        ownerId: b.userId,
        company: getSqlite().prepare("SELECT name FROM companies WHERE owner_id=?").get(b.userId)?.name || a.data.company,
        moderationStatus: "pending",
        country: "UA",
        currency: "UAH",
        createdAt: k,
        expiresAt: new Date(Date.now() + 2592e6).toISOString(),
        status: "active"
      }), l({
        ok: true,
        id: m
      });
    }
    if ("editJob" === f.action && "string" == typeof f.jobId) {
      if (getSqlite().prepare("SELECT id FROM jobs WHERE id=? AND owner_id=? AND moderation_status='blocked'").get(f.jobId,b.userId)) return l({error:translate("app.api.platform.route.vakansiya_zablokovana_zvernitsya_do_moderatora")},409);
      let a = validation.jobSchema.safeParse(f.data);
      if (!a.success) return l({
        error: translate("app.api.platform.route.perevirte_polya_vakansiyi")
      }, 400);
      return (await i.update(schema.jobs).set({...a.data, company: getSqlite().prepare("SELECT name FROM companies WHERE owner_id=?").get(b.userId)?.name || a.data.company, moderationStatus: "pending", moderationReason: ""}).where((0, d.Uo)((0, d.eq)(schema.jobs.id, f.jobId), (0, d.eq)(schema.jobs.ownerId, b.userId))).returning({
        id: schema.jobs.id
      })).length ? l({
        ok: true,
        id: f.jobId
      }) : l({
        error: translate("app.api.platform.route.vakansiyu_ne_znaydeno")
      }, 404);
    }
    if ("favorite" === f.action && "string" == typeof f.jobId && f.jobId.length < 100) return f.remove ? await i.delete(schema.favorites).where((0, d.Uo)((0, d.eq)(schema.favorites.userId, b.userId), (0, d.eq)(schema.favorites.jobId, f.jobId))) : await i.insert(schema.favorites).values({
      id: m,
      userId: b.userId,
      jobId: f.jobId
    }).onConflictDoNothing(), l({
      ok: true
    });
    if ("apply" === f.action && "string" === typeof f.jobId) {
      const result = submitApplication(b,f.jobId,f.message);
      const {status = 200,...body} = result;
      return l(body,status);
    }
    if ("jobStatus" === f.action && f.status === "active" && getSqlite().prepare("SELECT id FROM jobs WHERE id=? AND owner_id=? AND moderation_status='blocked'").get(String(f.jobId),b.userId)) return l({error:translate("app.api.platform.route.vakansiya_zablokovana_moderatorom")},409);
    if ("jobStatus" === f.action && "string" == typeof f.jobId && ["active", "closed"].includes(f.status)) return (await i.update(schema.jobs).set({
      status: f.status,
      ...("active" === f.status ? {
        expiresAt: new Date(Date.now() + 2592e6).toISOString(),
        moderationStatus: "pending"
      } : {})
    }).where((0, d.Uo)((0, d.eq)(schema.jobs.id, f.jobId), (0, d.eq)(schema.jobs.ownerId, b.userId))).returning({
      id: schema.jobs.id
    })).length ? l({
      ok: true
    }) : l({
      error: translate("app.api.platform.route.vakansiyu_ne_znaydeno")
    }, 404);
    if ("applicationStatus" === f.action && "string" == typeof f.id && ["viewed", "invited", "rejected"].includes(f.status)) {
      if (!(await i.select({
        id: schema.applications.id
      }).from(schema.applications).innerJoin(schema.jobs, (0, d.eq)(schema.jobs.id, schema.applications.jobId)).where((0, d.Uo)((0, d.eq)(schema.applications.id, f.id), (0, d.eq)(schema.jobs.ownerId, b.userId))).limit(1)).length) return l({
        error: translate("app.api.platform.route.vidhuk_ne_znaydeno")
      }, 404);
      return await i.update(schema.applications).set({
        status: f.status
      }).where((0, d.eq)(schema.applications.id, f.id)), l({
        ok: true
      });
    }
    if ("saveSearch" === f.action && "string" == typeof f.name && f.name.length <= 150 && f.filters && JSON.stringify(f.filters).length < 3e3) {
      if ((await i.select({
        count: (0, e.ll)`count(*)`
      }).from(schema.searches).where((0, d.eq)(schema.searches.userId, b.userId)))[0].count >= 30) return l({
        error: translate("app.api.platform.route.mozhna_zberehty_do_30_poshukiv")
      }, 409);
      return await i.insert(schema.searches).values({
        id: m,
        userId: b.userId,
        name: f.name,
        filters: JSON.stringify(f.filters),
        createdAt: k
      }), l({
        ok: true
      });
    }
    if ("deleteSearch" === f.action && "string" == typeof f.id) return await i.delete(schema.searches).where((0, d.Uo)((0, d.eq)(schema.searches.id, f.id), (0, d.eq)(schema.searches.userId, b.userId))), l({
      ok: true
    });
    if ("report" === f.action && "string" == typeof f.jobId && "string" == typeof f.reason && f.reason.trim().length >= 5 && f.reason.length <= 2e3) {
      if (!(await i.select({
        id: schema.jobs.id
      }).from(schema.jobs).where((0, d.eq)(schema.jobs.id, f.jobId)).limit(1)).length) return l({
        error: translate("app.api.platform.route.vakansiyu_ne_znaydeno")
      }, 404);
      if ((await i.select({
        id: schema.reports.id
      }).from(schema.reports).where((0, d.Uo)((0, d.eq)(schema.reports.jobId, f.jobId), (0, d.eq)(schema.reports.userId, b.userId), (0, d.eq)(schema.reports.status, "open"))).limit(1)).length) return l({
        ok: true
      });
      if ((await i.select({
        count: (0, e.ll)`count(*)`
      }).from(schema.reports).where((0, d.Uo)((0, d.eq)(schema.reports.userId, b.userId), (0, e.ll)`${schema.reports.createdAt}>${new Date(Date.now() - 864e5).toISOString()}`)))[0].count >= 10) return l({
        error: translate("app.api.platform.route.dosyahnuto_limit_povidomlen_na_sohodni")
      }, 429);
      return await i.insert(schema.reports).values({
        id: m,
        userId: b.userId,
        jobId: f.jobId,
        reason: f.reason.trim(),
        createdAt: k
      }), l({
        ok: true
      });
    }
    return l({
      error: translate("app.api.platform.route.nevidoma_diya_abo_nekorektni_dani")
    }, 400);
  } catch (a) {
    return console.error("platform_write_failed", a instanceof Error ? a.message : "unknown"), l({
      error: translate("app.api.platform.route.ne_vdalosya_zberehty_perevirte_z_yednannya_ta_povtorit")
    }, 500);
  }
}
export { m as GET };
export { n as POST };
export const dynamic = "force-dynamic";
