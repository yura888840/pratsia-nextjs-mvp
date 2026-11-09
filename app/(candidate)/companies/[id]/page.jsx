import { translate } from "../../../../i18n/index.js";
import { notFound } from "next/navigation";
import { getSqlite } from "../../../../db/connection.js";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }) {
  const { id } = await params;
  const company = getSqlite()
    .prepare("SELECT name FROM companies WHERE id=?")
    .get(id);
  return {
    title: company
      ? translate("app.companies.id.page.name_vakansiyi_pratsya", {
          name: company.name,
        })
      : translate("app.companies.id.page.kompaniyu_ne_znaydeno"),
    robots: { index: false, follow: true },
  };
}
export default async function CompanyPage({ params }) {
  const { id } = await params,
    db = getSqlite();
  const company = db.prepare("SELECT * FROM companies WHERE id=?").get(id);
  if (!company) notFound();
  const jobs = db
    .prepare(
      "SELECT id,title,city,arrangement FROM jobs WHERE owner_id=? AND status='active' AND moderation_status='approved' AND expires_at>? ORDER BY created_at DESC LIMIT 100",
    )
    .all(company.owner_id, new Date().toISOString());
  return (
    <main className="standalone-job">
      <a className="brand" href="/">
        {translate("brand.logo")}
      </a>
      <a className="back-link" href="/">
        {translate("app.companies.id.page.do_poshuku_vakansiy")}
      </a>
      <article className="profile-card">
        <small className="eyebrow">
          {translate("app.companies.id.page.robotodavets")}
          {company.city}
        </small>
        <h1>{company.name}</h1>
        <p className="preline">
          {company.description ||
            translate("app.companies.id.page.kompaniya_shche_ne_dodala_opys")}
        </p>
        {company.website && (
          <a
            href={company.website}
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            {translate("app.companies.id.page.sayt_kompaniyi")}
          </a>
        )}
        <p className="muted">
          {translate(
            "app.companies.id.page.informatsiyu_nadav_robotodavets_nayavnist_profilyu_ne_oznachaye_perevirku_kompaniyi",
          )}
        </p>
      </article>
      <h2>{translate("app.companies.id.page.vidkryti_vakansiyi")}</h2>
      {jobs.length ? (
        jobs.map((job) => (
          <article className="profile-card" key={job.id}>
            <h3>
              <a href={"/jobs/" + job.id}>{job.title}</a>
            </h3>
            <p>
              {job.city} · {job.arrangement}
            </p>
          </article>
        ))
      ) : (
        <p>
          {translate("app.companies.id.page.narazi_nemaye_vidkrytykh_vakansiy")}
        </p>
      )}
    </main>
  );
}
