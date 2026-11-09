import { translate, formatDate, catalogLabel } from "../../../../i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import { isPublicJob, jobPosting, siteOrigin } from "../../../../lib/seo.js";
import { getSqlite } from "../../../../db/connection.js";
import * as jsxRuntime from "react/jsx-runtime";
import { notFound } from "next/navigation";
import { getDatabase } from "../../../../db/index.js";
import { jobs } from "../../../../db/schema.js";
import { Uo as and, eq } from "../../../../vendor/recovered/module-2811.js";
import { formatSalary } from "../../../../lib/catalog.js";
async function getJob(jobId) {
  return jobId.startsWith("demo-")
    ? null
    : ((
        await getDatabase()
          .select()
          .from(jobs)
          .where(and(eq(jobs.id, jobId), eq(jobs.moderationStatus, "approved")))
          .limit(1)
      )[0] ?? null);
}
async function generateMetadata({ params }) {
  const job = await getJob((await params).id);
  return {
    title: job
      ? translate("app.jobs.id.page.title_company_pratsya", {
          title: job.title,
          company: job.company,
        })
      : translate("app.jobs.id.page.vakansiyu_ne_znaydeno_pratsya"),
    description: job
      ? job.description.slice(0, 160)
      : translate("app.api.platform.route.vakansiyu_ne_znaydeno"),
    alternates: {
      canonical: siteOrigin() + "/jobs/" + (await params).id,
    },
    robots: {
      index: !!job && isPublicJob(job),
      follow: true,
    },
  };
}
async function JobPage({ params }) {
  const job = await getJob((await params).id);
  {
    if (!job) {
      notFound();
    }
  }
  const isActivePublicJob = isPublicJob(job);
  const company = getSqlite()
    .prepare("SELECT id FROM companies WHERE owner_id=?")
    .get(job.ownerId);
  return (
    <div className={"standalone-job"}>
      {isActivePublicJob && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jobPosting(job)).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <a className={"brand"} href={"/"}>
        {translate("brand.logo")}
      </a>
      <a className={"back-link"} href={"/"}>
        {translate("app.companies.id.page.do_poshuku_vakansiy")}
      </a>
      <article className={"profile-card"}>
        <small className={"eyebrow"}>
          {job.company}
          {" \xb7 "}
          {job.city}
        </small>
        {company && (
          <p>
            <a href={"/companies/" + company.id}>
              {translate("app.jobs.id.page.pro_kompaniyu")}
            </a>
          </p>
        )}
        <h1>{job.title}</h1>
        <h2>
          {job.salaryMin
            ? translate("app.jobs.id.page.value1_value2_misyats", {
                value1: formatSalary(job.salaryMin),
                value2: formatSalary(job.salaryMax),
              })
            : translate("salary.byAgreement")}
        </h2>
        <div className={"profile-facts"}>
          <span>{catalogLabel(job.arrangement)}</span>
          <span>{catalogLabel(job.schedule)}</span>
          <span>{catalogLabel(job.experience)}</span>
        </div>
        {!isActivePublicJob && (
          <div className={"inline-note"}>
            {translate(
              "app.jobs.id.page.vakansiya_zakryta_abo_strok_publikatsiyi_mynuv",
            )}
          </div>
        )}
        <h3>{translate("jobs.about")}</h3>
        <p className={"preline"}>{job.description}</p>
        <h3>{translate("jobs.requirements")}</h3>
        <p className={"preline"}>{job.requirements}</p>
        {job.benefits && (
          <jsxRuntime.Fragment>
            <h3>{translate("jobs.benefits")}</h3>
            <p className={"preline"}>{job.benefits}</p>
          </jsxRuntime.Fragment>
        )}
        <div className={"button-row"}>
          {isActivePublicJob && (
            <a className={"primary"} href={"/?job=" + job.id}>
              {translate("app.jobs.id.page.vidhuknutysya_na_vakansiyu")}
            </a>
          )}
          <a className={"outline"} href={"/"}>
            {translate("app.jobs.id.page.inshi_vakansiyi")}
          </a>
        </div>
        <p className={"muted"}>
          {translate("app.jobs.id.page.opublikovano")}
          {formatDate(job.createdAt)}
          {translate("app.jobs.id.page.do")}
          {formatDate(job.expiresAt)}
        </p>
      </article>
    </div>
  );
}
export { JobPage as default };
export const dynamic = "force-dynamic";
export { generateMetadata };
