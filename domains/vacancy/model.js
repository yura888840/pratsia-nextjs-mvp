import { matchesSearchFilters } from "./search-filters.js";
import { matchesQuickFilter } from "./filters.js";
/** Vacancy records are independent of resumes and of the selected list. */
export function createVacancy(input) {
  if (!input?.id || !input.title || !input.company)
    throw new TypeError("Vacancy identity, title and company are required");
  return {
    id: String(input.id),
    title: String(input.title),
    company: String(input.company),
    profession: String(input.profession ?? input.occupation ?? ""),
    city: String(input.city ?? ""),
    category: String(input.category || ""),
    country: String(input.country || "UA"),
    reservation: input.reservation === true,
    partTime: input.partTime === true,
    noResume: input.noResume === true,
    disability: input.disability === true,
    veteran: input.veteran === true,
    salaryMin: Number(input.salaryMin) || 0,
    salaryMax: Number(input.salaryMax) || 0,
    currency: String(input.currency || "UAH"),
    skills: String(input.skills ?? ""),
    experience: String(input.experience ?? ""),
    arrangement: String(input.arrangement ?? ""),
    schedule: String(input.schedule ?? ""),
    description: String(input.description ?? ""),
    requirements: String(input.requirements ?? ""),
    benefits: String(input.benefits ?? ""),
  };
}
export function selectVacancies(
  vacancies,
  {
    view = "search",
    favorites = [],
    applications = [],
    query = "",
    city = "",
    quickFilter = "",
    searchFilters = {},
  } = {},
) {
  const ids =
    view === "saved"
      ? new Set(favorites)
      : view === "applications"
        ? new Set(applications.map((item) => item.vacancyId))
        : null;
  const words = String(query)
    .toLocaleLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const place = String(city).toLocaleLowerCase().trim();
  return vacancies.filter((job) => {
    const text = [job.title, job.profession, job.company, job.skills]
      .join(" ")
      .toLocaleLowerCase();
    return (
      (!ids || ids.has(job.id)) &&
      words.every((word) => text.includes(word)) &&
      (place === "__abroad"
        ? job.country !== "UA"
        : job.city.toLocaleLowerCase().includes(place)) &&
      matchesQuickFilter(job, quickFilter) &&
      matchesSearchFilters(job, searchFilters)
    );
  });
}
