import { matchesQuickFilter } from "./filters.js";
export const professionalFields = ["it", "sales", "legal", "hospitality", "logistics", "education"];
export const additionalFilters = ["reservation", "noResume", "disability", "veteran"];
export function normalizeSearchFilters(params = {}) {
  const get = (key) => typeof params.get === "function" ? params.get(key) : params[key];
  const legacy = get("filter");
  const employment = get("employment") || (legacy === "partTime" ? "partTime" : "");
  const salary = Number(get("salary"));
  return {
    employment: ["fullTime", "partTime"].includes(employment) ? employment : "",
    category: professionalFields.includes(get("category")) ? get("category") : "",
    salary: Number.isFinite(salary) && salary > 0 ? Math.min(salary, 1000000) : 0,
    ...Object.fromEntries(["remote", "noExperience", ...additionalFilters].map((key) => [key, get(key) === "1" || legacy === key])),
  };
}
export function matchesSearchFilters(job, filters) {
  return (!filters.employment || job.partTime === (filters.employment === "partTime")) &&
    (!filters.category || job.category === filters.category) &&
    (!filters.salary || (job.currency === "UAH" && Math.max(job.salaryMin, job.salaryMax) >= filters.salary)) &&
    ["remote", "noExperience", ...additionalFilters].every((key) => !filters[key] || matchesQuickFilter(job, key));
}
