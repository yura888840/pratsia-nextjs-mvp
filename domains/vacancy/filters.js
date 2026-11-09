import { catalogValue } from "../../i18n/index.js";
export const quickFilters = [
  "",
  "remote",
  "reservation",
  "noExperience",
  "partTime",
  "noResume",
  "disability",
  "veteran",
];
export function matchesQuickFilter(job, filter) {
  switch (filter) {
    case "remote":
      return job.arrangement === catalogValue("catalog.remote");
    case "noExperience":
      return job.experience === catalogValue("catalog.noExperience");
    case "reservation":
    case "partTime":
    case "noResume":
    case "disability":
    case "veteran":
      return job[filter] === true;
    default:
      return true;
  }
}
