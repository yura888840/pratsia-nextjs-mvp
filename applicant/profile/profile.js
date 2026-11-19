import { catalogValue } from "../../common/i18n/index.js";
import { parseArray } from "../../common/resume/parse-array.js";
const EMPTY_PROFILE = {
  workHistory: [],
  education: [],
  name: "",
  phone: "",
  city: "",
  occupation: "",
  salary: 0,
  experience: catalogValue("catalog.noExperience"),
  skills: "",
  about: "",
  schedule: catalogValue("catalog.fullTime"),
  specialties: {},
};
export { parseArray, EMPTY_PROFILE };
