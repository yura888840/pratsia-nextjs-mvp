
import { translate } from "../../../i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as database from "../../../db/index.js";
import * as session from "../../../lib/session.js";
import * as catalog from "../../../lib/catalog.js";
import * as jobSearch from "../../../lib/job-search.js";
async function i(a) {
  let b,
    c,
    h = new URL(a.url).searchParams,
    i = (c = Number(h.get("minSalary") || 0), {
      query: (h.get("q") || "").trim().slice(0, 150),
      city: (h.get("city") || "").trim().slice(0, 100),
      category: catalog.categories.some(a => a.id === h.get("category")) ? h.get("category") : "all",
      remote: "1" === h.get("remote"),
      noExperience: "1" === h.get("noExperience"),
      minSalary: Number.isFinite(c) ? Math.min(1e7, Math.max(0, Math.floor(c))) : 0,
      schedule: catalog.schedules.includes(h.get("schedule") || "") ? h.get("schedule") : "",
      sort: "salary" === h.get("sort") ? "salary" : "newest"
    });
  try {
    b = (0, jobSearch.buildJobFilters)(h.get("cursor"), i.sort);
  } catch {
    return Response.json({
      error: translate("app.api.jobs.route.nekorektna_storinka_poshuku_onovy_rezultaty")
    }, {
      status: 400
    });
  }
  try {
    let a = h.get("scope"),
      c = "saved" === a ? await (0, session.getCurrentUser)() : null;
    if ("saved" === a && !c) return Response.json({
      jobs: [],
      total: 0,
      nextCursor: null
    }, {
      headers: {
        "Cache-Control": "no-store"
      }
    });
    let f = Number(h.get("limit") || 16),
      j = Number.isSafeInteger(f) ? Math.min(50, Math.max(1, f)) : 16,
      k = await (0, jobSearch.searchJobs)((0, database.getDatabase)(), i, {
        cursor: b,
        limit: j,
        savedUserId: c?.userId,
        jobId: h.get("id")?.slice(0, 100)
      });
    return Response.json(k, {
      headers: {
        "Cache-Control": "no-store"
      }
    });
  } catch (a) {
    return console.error("job_search_failed", a instanceof Error ? a.message : "unknown"), Response.json({
      error: translate("app.api.jobs.route.ne_vdalosya_zavantazhyty_vakansiyi_sprobuy_shche_raz")
    }, {
      status: 503
    });
  }
}
export { i as GET };
export const dynamic = "force-dynamic";
