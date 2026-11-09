
import { catalogValue } from "../i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import { sql, and, eq, lt, or, desc } from "drizzle-orm";

import * as schema from "../db/schema.js";
import * as catalog from "./catalog.js";
// Search normalization is a technical alphabet, not a translated label.
const SEARCH_UPPERCASE_ALPHABET = "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯЫЭЪЁ";
function lowercaseSql(a) {
  let b = sql`lower(${a})`;
  for (let a of SEARCH_UPPERCASE_ALPHABET) b = sql`replace(${b},${sql.raw("'" + a + "'")},${sql.raw("'" + a.toLocaleLowerCase("uk") + "'")})`;
  for (let a = 0; a < 9; a++) b = sql`replace(${b},'  ',' ')`;
  return sql`trim(replace(replace(replace(${b},'’',''),'''',''),'\u0060',''))`;
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
  let n = [eq(schema.jobs.status, "active"), eq(schema.jobs.moderationStatus, "approved"), sql`${schema.jobs.expiresAt}>${new Date().toISOString()}`],
    o = (0, catalog.filterJobs)(b.query);
  if (o) {
    let a = Object.entries(catalog.cities).filter(([a, b]) => (0, catalog.filterJobs)(a).includes(o) || b.some(a => (0, catalog.filterJobs)(a).includes(o))).map(([a]) => a);
    n.push(or(sql`instr(${lowercaseSql(sql`${schema.jobs.title} || ' ' || ${schema.jobs.company} || ' ' || ${schema.jobs.occupation}`)},${o})>0`, ...a.map(a => sql`${lowercaseSql(sql`${schema.jobs.occupation}`)}=${(0, catalog.filterJobs)(a)}`)));
  }
  b.city && n.push(sql`instr(${lowercaseSql(sql`${schema.jobs.city}`)},${(0, catalog.filterJobs)(b.city)})>0`);
  "all" !== b.category && n.push(eq(schema.jobs.category, b.category));
  b.remote && n.push(eq(schema.jobs.arrangement, catalogValue("catalog.remote")));
  b.noExperience && n.push(eq(schema.jobs.experience, catalogValue("catalog.noExperience")));
  b.minSalary && n.push(sql`${schema.jobs.salaryMin}>=${b.minSalary}`);
  b.schedule && n.push(eq(schema.jobs.schedule, b.schedule));
  l && n.push(sql`exists (select 1 from ${schema.favorites} where ${schema.favorites.userId}=${l} and ${schema.favorites.jobId}=${schema.jobs.id})`);
  m && n.push(eq(schema.jobs.id, m));
  let p = and(...n),
    [{
      total: q
    }] = await a.select({
      total: sql`count(*)`
    }).from(schema.jobs).where(p),
    r = c ? or(lt(schema.jobs.createdAt, c.createdAt), and(eq(schema.jobs.createdAt, c.createdAt), lt(schema.jobs.id, c.id))) : void 0,
    s = c ? "salary" === b.sort ? or(lt(schema.jobs.salaryMin, c.salary), and(eq(schema.jobs.salaryMin, c.salary), r)) : r : void 0,
    t = "salary" === b.sort ? [desc(schema.jobs.salaryMin), desc(schema.jobs.createdAt), desc(schema.jobs.id)] : [desc(schema.jobs.createdAt), desc(schema.jobs.id)],
    u = await a.select().from(schema.jobs).where(and(p, s)).orderBy(...t).limit(j + 1),
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
