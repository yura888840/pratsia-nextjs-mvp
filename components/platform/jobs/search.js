import { occupationAliases } from "../catalog/occupation-aliases.js";
import { catalogValue } from "../../../i18n/index.js";
const DEFAULT_FILTERS = {
  query: "",
  city: "",
  category: "all",
  remote: false,
  noExperience: false,
  minSalary: 0,
  schedule: "",
  sort: "newest",
};
function normalizeSearch(searchText) {
  return searchText
    .toLocaleLowerCase("uk")
    .replace(/[’'`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
function filterJobs(jobs, filters, now = Date.now()) {
  const normalizedQuery = normalizeSearch(filters.query);
  const matchingOccupationNames = normalizedQuery
    ? Object.entries(occupationAliases)
        .filter(
          ([occupationName, aliases]) =>
            normalizeSearch(occupationName).includes(normalizedQuery) ||
            aliases.some((alias) =>
              normalizeSearch(alias).includes(normalizedQuery),
            ),
        )
        .map(([matchedOccupation]) => normalizeSearch(matchedOccupation))
    : [];
  return jobs
    .filter(
      (job) =>
        "active" === job.status &&
        "approved" === job.moderationStatus &&
        Date.parse(job.expiresAt) > now &&
        (!normalizedQuery ||
          normalizeSearch(
            [job.title, job.company, job.occupation].join(" "),
          ).includes(normalizedQuery) ||
          matchingOccupationNames.includes(normalizeSearch(job.occupation))) &&
        (!filters.city ||
          normalizeSearch(job.city).includes(normalizeSearch(filters.city))) &&
        ("all" === filters.category || job.category === filters.category) &&
        (!filters.remote ||
          catalogValue("catalog.remote") === job.arrangement) &&
        (!filters.noExperience ||
          catalogValue("catalog.noExperience") === job.experience) &&
        (!filters.minSalary || job.salaryMin >= filters.minSalary) &&
        (!filters.schedule || job.schedule === filters.schedule),
    )
    .sort((job, job4) =>
      "salary" === filters.sort
        ? job4.salaryMin - job.salaryMin
        : Date.parse(job4.createdAt) - Date.parse(job.createdAt),
    );
}
export { DEFAULT_FILTERS, normalizeSearch, filterJobs };
