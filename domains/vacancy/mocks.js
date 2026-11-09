import { translate } from "../../i18n/index.js";
import { demoJobs } from "./fixtures.js";
import { createVacancy } from "./model.js";
const skills = {
  it: "JavaScript, React, HTML, CSS, SEO",
  sales: "CRM, Excel, communication",
  legal: "Excel, documentation",
  hospitality: "service, teamwork",
  logistics: "navigation, planning",
  education: "training, communication",
};
export const mockVacancies = demoJobs.map((job, index) =>
  createVacancy({
    ...job,
    skills: skills[job.category] || "teamwork",
    // Fictional eligibility flags for testing guest filter interactions.
    reservation: index % 4 === 0,
    partTime: index % 3 === 0,
    schedule:
      index % 3 === 0 ? translate("guestSearch.partTime") : job.schedule,
    noResume: index % 2 === 0,
    disability: index % 5 === 0,
    veteran: index % 3 === 1,
  }),
);
export const findMockVacancy = (id) =>
  mockVacancies.find((job) => job.id === id);
