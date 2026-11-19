
import { catalogValue, translate } from "../../common/i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import { z } from "zod";
import * as catalog from "../../common/catalog/values.js";
const f = (min, max) => z.string().trim().min(min).max(max);
export const jobSchema = z.object({
    title: f(3, 120),
    company: f(2, 100),
    occupation: f(2, 100),
    category: z.string().refine(a => catalog.categories.some(b => b.id === a && "all" !== a)),
    city: f(2, 100),
    arrangement: z.enum([catalogValue("catalog.onsite"), catalogValue("catalog.hybrid"), catalogValue("catalog.remote")]),
    schedule: z.string().refine(a => catalog.schedules.includes(a)),
    salaryMin: z.number().int().min(0).max(1e7),
    salaryMax: z.number().int().min(0).max(1e7),
    experience: z.string().refine(a => catalog.experienceLevels.includes(a)),
    description: f(40, 1e4),
    requirements: f(10, 5e3),
    benefits: z.string().trim().max(3e3)
  }).refine(a => a.salaryMax >= a.salaryMin, {
    message: translate("lib.validation.verkhnya_mezha_zarplaty_maye_buty_ne_menshoyu_za_nyzhnyu"),
    path: ["salaryMax"]
  });
