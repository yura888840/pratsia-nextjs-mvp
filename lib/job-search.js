
import { catalogValue } from "../i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as d from "../vendor/recovered/module-1029.js";
import * as e from "../vendor/recovered/module-2811.js";
import * as f from "../vendor/recovered/module-2486.js";
import * as schema from "../db/schema.js";
import * as catalog from "./catalog.js";
// Search normalization is a technical alphabet, not a translated label.
const SEARCH_UPPERCASE_ALPHABET = "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯЫЭЪЁ";
function lowercaseSql(a) {
  let b = (0, d.ll)`lower(${a})`;
  for (let a of SEARCH_UPPERCASE_ALPHABET) b = (0, d.ll)`replace(${b},${d.ll.raw("'" + a + "'")},${d.ll.raw("'" + a.toLocaleLowerCase("uk") + "'")})`;
  for (let a = 0; a < 9; a++) b = (0, d.ll)`replace(${b},'  ',' ')`;
  return (0, d.ll)`trim(replace(replace(replace(${b},'’',''),'''',''),'\u0060',''))`;
}
function buildJobFilters(a, b) {
  if (!a) return null;
  if (a.length > 500) throw Error("invalid_cursor");
  try {
    let c = JSON.parse(a);
    if ("string" != typeof c.id || !c.id || c.id.length > 100 || "string" != typeof c.createdAt || !Number.isFinite(Date.parse(c.createdAt)) || "number" != typeof c.salary || !Number.isSafeInteger(c.salary) || c.salary < 0 || c.sort !== b) throw Error();
    return {
      id: c.id,
      createdAt: c.createdAt,
      salary: c.salary,
      sort: b
    };
  } catch {
    throw Error("invalid_cursor");
  }
}
async function searchJobs(a, b, {
  cursor: c = null,
  limit: j = 16,
  savedUserId: l,
  jobId: m
} = {}) {
  let n = [(0, e.eq)(schema.jobs.status, "active"), (0, e.eq)(schema.jobs.moderationStatus, "approved"), (0, d.ll)`${schema.jobs.expiresAt}>${new Date().toISOString()}`],
    o = (0, catalog.filterJobs)(b.query);
  if (o) {
    let a = Object.entries(catalog.cities).filter(([a, b]) => (0, catalog.filterJobs)(a).includes(o) || b.some(a => (0, catalog.filterJobs)(a).includes(o))).map(([a]) => a);
    n.push((0, e.or)((0, d.ll)`instr(${lowercaseSql((0, d.ll)`${schema.jobs.title} || ' ' || ${schema.jobs.company} || ' ' || ${schema.jobs.occupation}`)},${o})>0`, ...a.map(a => (0, d.ll)`${lowercaseSql((0, d.ll)`${schema.jobs.occupation}`)}=${(0, catalog.filterJobs)(a)}`)));
  }
  b.city && n.push((0, d.ll)`instr(${lowercaseSql((0, d.ll)`${schema.jobs.city}`)},${(0, catalog.filterJobs)(b.city)})>0`);
  "all" !== b.category && n.push((0, e.eq)(schema.jobs.category, b.category));
  b.remote && n.push((0, e.eq)(schema.jobs.arrangement, catalogValue("catalog.remote")));
  b.noExperience && n.push((0, e.eq)(schema.jobs.experience, catalogValue("catalog.noExperience")));
  b.minSalary && n.push((0, d.ll)`${schema.jobs.salaryMin}>=${b.minSalary}`);
  b.schedule && n.push((0, e.eq)(schema.jobs.schedule, b.schedule));
  l && n.push((0, d.ll)`exists (select 1 from ${schema.favorites} where ${schema.favorites.userId}=${l} and ${schema.favorites.jobId}=${schema.jobs.id})`);
  m && n.push((0, e.eq)(schema.jobs.id, m));
  let p = (0, e.Uo)(...n),
    [{
      total: q
    }] = await a.select({
      total: (0, d.ll)`count(*)`
    }).from(schema.jobs).where(p),
    r = c ? (0, e.or)((0, e.lt)(schema.jobs.createdAt, c.createdAt), (0, e.Uo)((0, e.eq)(schema.jobs.createdAt, c.createdAt), (0, e.lt)(schema.jobs.id, c.id))) : void 0,
    s = c ? "salary" === b.sort ? (0, e.or)((0, e.lt)(schema.jobs.salaryMin, c.salary), (0, e.Uo)((0, e.eq)(schema.jobs.salaryMin, c.salary), r)) : r : void 0,
    t = "salary" === b.sort ? [(0, f.i)(schema.jobs.salaryMin), (0, f.i)(schema.jobs.createdAt), (0, f.i)(schema.jobs.id)] : [(0, f.i)(schema.jobs.createdAt), (0, f.i)(schema.jobs.id)],
    u = await a.select().from(schema.jobs).where((0, e.Uo)(p, s)).orderBy(...t).limit(j + 1),
    v = u.length > j,
    w = u.slice(0, j),
    x = w.at(-1);
  return {
    jobs: w.map(({
      ownerId: a,
      moderationReason: b,
      ...c
    }) => c),
    total: Number(q),
    nextCursor: v && x ? JSON.stringify({
      id: x.id,
      createdAt: x.createdAt,
      salary: x.salaryMin,
      sort: b.sort
    }) : null
  };
}
export { buildJobFilters };
export { searchJobs };
