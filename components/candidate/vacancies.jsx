"use client";
import Link from "next/link";
import { detailLabels } from "./labels.js";
import { translate, formatNumber } from "../../i18n/index.js";
import { isResumeReady } from "../../domains/resume/model.js";
import { useCandidate } from "./context.jsx";
export function VacancyActions({ job }) {
  const {
    ready,
    resume,
    favorites,
    applications,
    toggleFavorite,
    apply,
    isCandidate,
  } = useCandidate();
  const applied = applications.some((item) => item.vacancyId === job.id);
  return (
    <div className="candidate-actions">
      <button
        disabled={!ready}
        aria-pressed={favorites.includes(job.id)}
        onClick={() => toggleFavorite(job.id)}
      >
        {favorites.includes(job.id)
          ? translate("candidate.unsave")
          : translate("candidate.save")}
      </button>
      {!isCandidate ? (
        <Link href="/register?accountType=candidate">
          {translate("candidate.signInToApply")}
        </Link>
      ) : !isResumeReady(resume) && !applied ? (
        <Link href="/account?section=profile">
          {translate("candidate.resumeToApply")}
        </Link>
      ) : (
        <button
          className="candidate-primary"
          disabled={!ready || applied}
          onClick={() => apply(job.id)}
        >
          {applied
            ? translate("candidate.applied")
            : translate("candidate.apply")}
        </button>
      )}
    </div>
  );
}
function VacancySummary({ job }) {
  return (
    <>
      <p className="candidate-company">{job.company}</p>
      <p className="candidate-salary">
        {formatNumber(job.salaryMin)}
        {" – "}
        {formatNumber(job.salaryMax)} {job.currency}
      </p>
      <p className="candidate-meta">
        {[job.city, job.arrangement, job.schedule, job.experience]
          .filter(Boolean)
          .join(" · ")}
      </p>
      <p>{job.skills}</p>
    </>
  );
}
export function VacancyList({ vacancies }) {
  if (!vacancies.length)
    return <p className="candidate-empty">{translate("candidate.empty")}</p>;
  return (
    <div className="candidate-jobs">
      {vacancies.map((job) => (
        <article className="candidate-card" key={job.id}>
          <h3>
            <Link href={`/jobs/${job.id}`}>{job.title}</Link>
          </h3>
          <VacancySummary job={job} />
          <VacancyActions job={job} />
        </article>
      ))}
    </div>
  );
}
export function VacancyDetails({ job }) {
  return (
    <article className="candidate-card candidate-detail">
      <Link href="/search">{translate("candidate.back")}</Link>
      <h2>{job.title}</h2>
      <VacancySummary job={job} />
      {["description", "requirements", "benefits"].map((field) => (
        <section key={field}>
          <h3>{detailLabels[field]}</h3>
          <p>{job[field]}</p>
        </section>
      ))}
      <VacancyActions job={job} />
    </article>
  );
}
