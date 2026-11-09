/** A resume is one flat record, shared by manual entry and PDF import. */
export const resumeFields = [
  "fullName",
  "profession",
  "experienceYears",
  "desiredSalary",
  "city",
  "email",
  "phone",
  "skills",
  "about",
];
export function createResume(input = {}) {
  return Object.fromEntries(
    resumeFields.map((key) => [key, String(input?.[key] ?? "").trim()]),
  );
}
export function isResumeReady(resume) {
  return Boolean(resume.fullName && resume.profession);
}

// Only extract explicitly labelled fields; do not guess experience or salary.
// Unstructured PDF content remains available for manual review in `about`.
const labels = {
  fullName: [
    "full name",
    "name",
    "піб",
    "фио",
    "ім’я та прізвище",
    "ім'я та прізвище",
  ],
  profession: ["profession", "position", "професія", "посада", "профессия"],
  experienceYears: [
    "years of experience",
    "experience years",
    "досвід років",
    "роки досвіду",
    "лет опыта",
  ],
  desiredSalary: [
    "desired salary",
    "salary",
    "бажана зарплата",
    "желаемая зарплата",
  ],
  city: ["city", "місто", "город"],
  email: ["email", "e-mail"],
  phone: ["phone", "телефон"],
  skills: ["skills", "навички", "навыки"],
};
export function resumeFromText(text) {
  const result = createResume({ about: text });
  for (const line of text.split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const label = line.slice(0, separator).trim().toLowerCase();
    const field = Object.keys(labels).find((key) =>
      labels[key].includes(label),
    );
    if (field) result[field] = line.slice(separator + 1).trim();
  }
  if (!result.email)
    result.email = text.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i)?.[0] || "";
  for (const key of ["experienceYears", "desiredSalary"]) {
    if (result[key] && !/^\d+(?:[.,]\d+)?$/.test(result[key])) result[key] = "";
    result[key] = result[key].replace(",", ".");
  }
  return result;
}
