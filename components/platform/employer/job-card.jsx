"use client";

import { translate, formatDate } from "../../../i18n/index.js";
import { Salary } from "../jobs/salary.jsx";
function EmployerJobCard({
  isSaving,
  job,
  requireAuthentication,
  savePlatformAction,
  setActiveModal,
  setEditingJobId,
  setFormConfirmed,
  setFormError,
  setFormStep,
  setJobForm,
  setSelectedJob,
}) {
  return (
    <div className={"dashboard-card"} key={job.id}>
      <div>
        <small>
          {job.company}
          {" \xb7 "}
          {job.city}
        </small>
        <h3>{job.title}</h3>
        {"pending" === job.moderationStatus && (
          <p className="inline-note">
            {translate(
              "app.platform.ochikuye_perevirky_moderatorom_u_poshuku_shche_ne_vidobrazhayetsya",
            )}
          </p>
        )}
        {"blocked" === job.moderationStatus && (
          <p className={"form-error"}>
            {translate("app.platform.prykhovano_moderatorom_2")}
            {job.moderationReason}
          </p>
        )}
        <p>
          <Salary job={job} />
          {" \xb7 "}
          {"active" === job.status && Date.parse(job.expiresAt) > Date.now()
            ? translate("app.platform.do") + formatDate(job.expiresAt)
            : translate("app.platform.zakryta_strok_mynuv")}
        </p>
      </div>
      <button className={"outline small"} onClick={() => setSelectedJob(job)}>
        {translate("app.platform.perehlyanuty")}
      </button>
      <button
        className={"outline small"}
        onClick={() => {
          {
            if (requireAuthentication()) {
              setEditingJobId(job.id);
              setJobForm({
                title: job.title,
                company: job.company,
                occupation: job.occupation,
                category: job.category,
                city: job.city,
                arrangement: job.arrangement,
                schedule: job.schedule,
                salaryMin: job.salaryMin,
                salaryMax: job.salaryMax,
                experience: job.experience,
                description: job.description,
                requirements: job.requirements,
                benefits: job.benefits,
              });
              setFormStep(0);
              setFormError("");
              setFormConfirmed(false);
              setActiveModal("publish");
            }
          }
        }}
      >
        {translate("app.platform.redahuvaty")}
      </button>
      <button
        className={"outline small"}
        disabled={isSaving || "blocked" === job.moderationStatus}
        onClick={() =>
          savePlatformAction({
            action: "jobStatus",
            jobId: job.id,
            status:
              "active" === job.status && Date.parse(job.expiresAt) > Date.now()
                ? "closed"
                : "active",
          })
        }
      >
        {"active" === job.status && Date.parse(job.expiresAt) > Date.now()
          ? translate("app.platform.zakryty")
          : translate("app.platform.opublikuvaty_znovu")}
      </button>
    </div>
  );
}
export { EmployerJobCard };
