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
export const mockVacancies = demoJobs.map((job) =>
  createVacancy({ ...job, skills: skills[job.category] || "teamwork" }),
);
export const findMockVacancy = (id) =>
  mockVacancies.find((job) => job.id === id);
