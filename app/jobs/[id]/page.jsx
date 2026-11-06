
import { translate, formatDate, catalogLabel } from "../../../i18n/index.js";
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
    title: b ? translate("app.jobs.id.page.title_company_pratsya", { title: b.title, company: b.company }) : translate("app.jobs.id.page.vakansiyu_ne_znaydeno_pratsya"),
    description: b ? b.description.slice(0, 160) : translate("app.api.platform.route.vakansiyu_ne_znaydeno"),
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
  return <div className={"standalone-job"}>{c && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jobPosting(b)).replace(/</g,"\\u003c")}} />}<a className={"brand"} href={"/"}>{translate("brand.logo")}</a><a className={"back-link"} href={"/"}>{translate("app.companies.id.page.do_poshuku_vakansiy")}</a><article className={"profile-card"}><small className={"eyebrow"}>{b.company}{" \xb7 "}{b.city}</small>{company && <p><a href={"/companies/"+company.id}>{translate("app.jobs.id.page.pro_kompaniyu")}</a></p>}<h1>{b.title}</h1><h2>{b.salaryMin ? translate("app.jobs.id.page.value1_value2_misyats", { value1: (0, catalog.formatSalary)(b.salaryMin), value2: (0, catalog.formatSalary)(b.salaryMax) }) : translate("salary.byAgreement")}</h2><div className={"profile-facts"}><span>{catalogLabel(b.arrangement)}</span><span>{catalogLabel(b.schedule)}</span><span>{catalogLabel(b.experience)}</span></div>{!c && <div className={"inline-note"}>{translate("app.jobs.id.page.vakansiya_zakryta_abo_strok_publikatsiyi_mynuv")}</div>}<h3>{translate("jobs.about")}</h3><p className={"preline"}>{b.description}</p><h3>{translate("jobs.requirements")}</h3><p className={"preline"}>{b.requirements}</p>{b.benefits && <jsxRuntime.Fragment><h3>{translate("jobs.benefits")}</h3><p className={"preline"}>{b.benefits}</p></jsxRuntime.Fragment>}<div className={"button-row"}>{c && <a className={"primary"} href={"/?job=" + b.id}>{translate("app.jobs.id.page.vidhuknutysya_na_vakansiyu")}</a>}<a className={"outline"} href={"/"}>{translate("app.jobs.id.page.inshi_vakansiyi")}</a></div><p className={"muted"}>{translate("app.jobs.id.page.opublikovano")}{formatDate(b.createdAt)}{translate("app.jobs.id.page.do")}{formatDate(b.expiresAt)}</p></article></div>;
}
export { JobPage as default };
export const dynamic = "force-dynamic";
export { generateMetadata };
