import { translate } from "../../../../i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import { getDatabase } from "../../../../db/index.js";
import { getCurrentUser } from "../../../../lib/session.js";
import { categories, schedules } from "../../../../lib/catalog.js";
import { buildJobFilters, searchJobs } from "../../../../lib/job-search.js";
const DEFAULT_LIMIT = 16;
const MAX_LIMIT = 50;
const MAX_SALARY = 10_000_000;
const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
};
function parseSearchFilters(searchParams) {
  const rawMinSalary = Number(searchParams.get("minSalary") || 0);
  return {
    query: (searchParams.get("q") || "").trim().slice(0, 150),
    city: (searchParams.get("city") || "").trim().slice(0, 100),
    category: categories.some(
      (item) => item.id === searchParams.get("category"),
    )
      ? searchParams.get("category")
      : "all",
    remote: searchParams.get("remote") === "1",
    noExperience: searchParams.get("noExperience") === "1",
    minSalary: Number.isFinite(rawMinSalary)
      ? Math.min(MAX_SALARY, Math.max(0, Math.floor(rawMinSalary)))
      : 0,
    schedule: schedules.includes(searchParams.get("schedule") || "")
      ? searchParams.get("schedule")
      : "",
    sort: searchParams.get("sort") === "salary" ? "salary" : "newest",
  };
}
function parseLimit(searchParams) {
  const rawLimit = Number(searchParams.get("limit") || DEFAULT_LIMIT);
  if (!Number.isSafeInteger(rawLimit)) {
    return DEFAULT_LIMIT;
  }
  return Math.min(MAX_LIMIT, Math.max(1, rawLimit));
}
function jsonNoStore(body) {
  return Response.json(body, {
    headers: NO_STORE_HEADERS,
  });
}
async function getJobs(request) {
  const searchParams = new URL(request.url).searchParams;
  const filters = parseSearchFilters(searchParams);
  let cursor;
  try {
    cursor = buildJobFilters(searchParams.get("cursor"), filters.sort);
  } catch {
    return Response.json(
      {
        error: translate(
          "app.api.jobs.route.nekorektna_storinka_poshuku_onovy_rezultaty",
        ),
      },
      {
        status: 400,
      },
    );
  }
  try {
    const scope = searchParams.get("scope");
    const savedUser = scope === "saved" ? await getCurrentUser() : null;
    if (scope === "saved" && !savedUser) {
      return jsonNoStore({
        jobs: [],
        total: 0,
        nextCursor: null,
      });
    }
    const result = await searchJobs(getDatabase(), filters, {
      cursor,
      limit: parseLimit(searchParams),
      savedUserId: savedUser?.userId,
      jobId: searchParams.get("id")?.slice(0, 100),
    });
    return jsonNoStore(result);
  } catch (error) {
    console.error(
      "job_search_failed",
      error instanceof Error ? error.message : "unknown",
    );
    return Response.json(
      {
        error: translate(
          "app.api.jobs.route.ne_vdalosya_zavantazhyty_vakansiyi_sprobuy_shche_raz",
        ),
      },
      {
        status: 503,
      },
    );
  }
}
export { getJobs as GET };
export const dynamic = "force-dynamic";
