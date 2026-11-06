// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import {isPublicJob,jobPosting,siteOrigin} from "../../../lib/seo.js";
import {getSqlite} from "../../../db/connection.js";
import * as jsxRuntime from "react/jsx-runtime";
import * as e from "next/navigation";
import * as database from "../../../db/index.js";
import * as schema from "../../../db/schema.js";
import * as h from "../../../vendor/recovered/module-2811.js";
import * as catalog from "../../../lib/catalog.js";
async function getJob(a) {
  return a.startsWith("demo-") ? null : (await (0, database.getDatabase)().select().from(schema.jobs).where((0, h.Uo)((0, h.eq)(schema.jobs.id, a), (0, h.eq)(schema.jobs.moderationStatus, "approved"))).limit(1))[0] ?? null;
}
async function generateMetadata({
  params: a
}) {
  let b = await getJob((await a).id);
  return {
    title: b ? `${b.title} — ${b.company} | Праця` : "Вакансію не знайдено | Праця",
    description: b ? b.description.slice(0, 160) : "Вакансію не знайдено",
    alternates: {canonical: siteOrigin() + "/jobs/" + (await a).id},
    robots: {
      index: !!b && isPublicJob(b),
      follow: true
    }
  };
}
async function JobPage({
  params: a
}) {
  let b = await getJob((await a).id);
  b || (0, e.notFound)();
  let c = isPublicJob(b);
  const company = getSqlite().prepare("SELECT id FROM companies WHERE owner_id=?").get(b.ownerId);
  return <div className={"standalone-job"}>{c && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jobPosting(b)).replace(/</g,"\\u003c")}} />}<a className={"brand"} href={"/"}>{"праця."}</a><a className={"back-link"} href={"/"}>{"← До пошуку вакансій"}</a><article className={"profile-card"}><small className={"eyebrow"}>{b.company}{" \xb7 "}{b.city}</small>{company && <p><a href={"/companies/"+company.id}>Про компанію →</a></p>}<h1>{b.title}</h1><h2>{b.salaryMin ? `${(0, catalog.formatSalary)(b.salaryMin)} – ${(0, catalog.formatSalary)(b.salaryMax)} ₴ / місяць` : "Зарплата за домовленістю"}</h2><div className={"profile-facts"}><span>{b.arrangement}</span><span>{b.schedule}</span><span>{b.experience}</span></div>{!c && <div className={"inline-note"}>{"Вакансія закрита або строк публікації минув."}</div>}<h3>{"Про роботу"}</h3><p className={"preline"}>{b.description}</p><h3>{"Вимоги"}</h3><p className={"preline"}>{b.requirements}</p>{b.benefits && <jsxRuntime.Fragment><h3>{"Що пропонуємо"}</h3><p className={"preline"}>{b.benefits}</p></jsxRuntime.Fragment>}<div className={"button-row"}>{c && <a className={"primary"} href={"/?job=" + b.id}>Відгукнутися на вакансію</a>}<a className={"outline"} href={"/"}>{"Інші вакансії"}</a></div><p className={"muted"}>{"Опубліковано "}{new Date(b.createdAt).toLocaleDateString("uk-UA")}{" \xb7 До "}{new Date(b.expiresAt).toLocaleDateString("uk-UA")}</p></article></div>;
}
export { JobPage as default };
export const dynamic = "force-dynamic";
export { generateMetadata };
