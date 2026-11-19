
import { translate } from "../../common/i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import { z } from "zod";
import * as catalog from "../../common/catalog/values.js";
const f = (min, max) => z.string().trim().min(min).max(max);
const h = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  i = z.object({
    company: f(2, 100),
    position: f(2, 120),
    start: h,
    end: z.union([h, z.literal("")]),
    current: z.boolean(),
    description: z.string().trim().max(2e3)
  }).refine(a => a.current || !!a.end, {
    message: translate("lib.validation.vkazhy_misyats_zavershennya_abo_poznach_potochnu_robotu"),
    path: ["end"]
  }).refine(a => a.current || !a.end || a.end >= a.start, {
    message: translate("lib.validation.zavershennya_ne_mozhe_buty_ranishe_pochatku"),
    path: ["end"]
  }),
  j = z.object({
    institution: f(2, 150),
    qualification: f(2, 150),
    year: z.number().int().min(1940).max(2100)
  }),
  profileSchema = z.object({
    name: f(2, 100),
    phone: f(7, 30).regex(/^[+\d\s()\-]+$/),
    city: f(2, 100),
    occupation: f(2, 100),
    salary: z.number().int().min(0).max(1e7),
    experience: z.string().refine(a => catalog.experienceLevels.includes(a)),
    skills: f(2, 2e3),
    about: z.string().trim().max(5e3),
    schedule: z.string().refine(a => catalog.schedules.includes(a)),
    workHistory: z.array(i).max(10).default([]),
    education: z.array(j).max(10).default([]),
    specialties: z.record(z.string().max(200), z.string().max(1e3)).refine(a => Object.keys(a).length <= 10)
  });
export { profileSchema };
