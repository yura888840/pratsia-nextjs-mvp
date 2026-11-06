
import { catalogValue, translate } from "../i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as validationTypes from "../vendor/recovered/module-6061.js";
import * as catalog from "./catalog.js";
let f = (a, b) => validationTypes.Yj().trim().min(a).max(b),
  jobSchema = validationTypes.Ik({
    title: f(3, 120),
    company: f(2, 100),
    occupation: f(2, 100),
    category: validationTypes.Yj().refine(a => catalog.categories.some(b => b.id === a && "all" !== a)),
    city: f(2, 100),
    arrangement: validationTypes.k5([catalogValue("catalog.onsite"), catalogValue("catalog.hybrid"), catalogValue("catalog.remote")]),
    schedule: validationTypes.Yj().refine(a => catalog.schedules.includes(a)),
    salaryMin: validationTypes.ai().int().min(0).max(1e7),
    salaryMax: validationTypes.ai().int().min(0).max(1e7),
    experience: validationTypes.Yj().refine(a => catalog.experienceLevels.includes(a)),
    description: f(40, 1e4),
    requirements: f(10, 5e3),
    benefits: validationTypes.Yj().trim().max(3e3)
  }).refine(a => a.salaryMax >= a.salaryMin, {
    message: translate("lib.validation.verkhnya_mezha_zarplaty_maye_buty_ne_menshoyu_za_nyzhnyu"),
    path: ["salaryMax"]
  }),
  h = validationTypes.Yj().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  i = validationTypes.Ik({
    company: f(2, 100),
    position: f(2, 120),
    start: h,
    end: validationTypes.KC([h, validationTypes.eu("")]),
    current: validationTypes.zM(),
    description: validationTypes.Yj().trim().max(2e3)
  }).refine(a => a.current || !!a.end, {
    message: translate("lib.validation.vkazhy_misyats_zavershennya_abo_poznach_potochnu_robotu"),
    path: ["end"]
  }).refine(a => a.current || !a.end || a.end >= a.start, {
    message: translate("lib.validation.zavershennya_ne_mozhe_buty_ranishe_pochatku"),
    path: ["end"]
  }),
  j = validationTypes.Ik({
    institution: f(2, 150),
    qualification: f(2, 150),
    year: validationTypes.ai().int().min(1940).max(2100)
  }),
  profileSchema = validationTypes.Ik({
    name: f(2, 100),
    phone: f(7, 30).regex(/^[+\d\s()\-]+$/),
    city: f(2, 100),
    occupation: f(2, 100),
    salary: validationTypes.ai().int().min(0).max(1e7),
    experience: validationTypes.Yj().refine(a => catalog.experienceLevels.includes(a)),
    skills: f(2, 2e3),
    about: validationTypes.Yj().trim().max(5e3),
    schedule: validationTypes.Yj().refine(a => catalog.schedules.includes(a)),
    workHistory: validationTypes.YO(i).max(10).default([]),
    education: validationTypes.YO(j).max(10).default([]),
    specialties: validationTypes.g1(validationTypes.Yj().max(200), validationTypes.Yj().max(1e3)).refine(a => Object.keys(a).length <= 10)
  });
function isAllowedOrigin(a) {
  let b = a.headers.get("origin"),
    c = new URL(a.url),
    d = process.env.PRATSIA_ORIGIN || c.protocol + "//" + (a.headers.get("host") || c.host);
  return b === d;
}
export { profileSchema };
export { isAllowedOrigin };
export { jobSchema };
