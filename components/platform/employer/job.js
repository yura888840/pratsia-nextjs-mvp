import { catalogValue } from "../../../i18n/index.js";
const EMPTY_JOB = {
  title: "",
  company: "",
  occupation: "",
  category: "other",
  city: "",
  arrangement: catalogValue("catalog.onsite"),
  schedule: catalogValue("catalog.fullTime"),
  salaryMin: 0,
  salaryMax: 0,
  experience: catalogValue("catalog.noExperience"),
  description: "",
  requirements: "",
  benefits: "",
};
export { EMPTY_JOB };
