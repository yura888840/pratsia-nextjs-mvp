import { catalogValue } from "../../../i18n/index.js";
function parseArray(serializedArray) {
  if (Array.isArray(serializedArray)) return serializedArray;
  try {
    const parsedArray = JSON.parse(
      "string" == typeof serializedArray ? serializedArray : "[]",
    );
    return Array.isArray(parsedArray) ? parsedArray : [];
  } catch {
    return [];
  }
}
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
