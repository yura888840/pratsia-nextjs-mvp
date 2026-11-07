"use client";

import { translate } from "../../../i18n/index.js";
import { PlusIcon, Building2Icon } from "../shared/icons.jsx";
import CompanyEditor from "../../company-editor.jsx";
import { EmployerJobCard } from "./job-card.jsx";
import { IncomingApplicationCard } from "../applications/incoming-application-card.jsx";
function EmployerDashboard({
  isSaving,
  loadPlatformState,
  openModal,
  platformState,
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
    <section className={"dashboard"}>
      <div className={"employer-heading"}>
        <div className={"page-heading"}>
          <span className={"eyebrow"}>
            {translate("app.platform.lyudy_z_yakymy_zrostaye_biznes")}
          </span>
          <h1>{translate("employer.dashboard.title")}</h1>
          <p>
            {translate(
              "app.platform.vakansiyi_ta_vidhuky_v_odnomu_mistsi_publikatsiya_na_starti_bezkoshtovna",
            )}
          </p>
        </div>
        <button className={"primary"} onClick={() => openModal("publish")}>
          <PlusIcon size={17} />
          {translate("jobs.add")}
        </button>
      </div>
      <CompanyEditor onSaved={loadPlatformState} />
      <div className={"stat-grid"}>
        <div>
          <span>{translate("app.platform.moyi_vakansiyi")}</span>
          <strong>
            {
              platformState.myJobs.filter(
                (job) =>
                  "active" === job.status &&
                  "approved" === job.moderationStatus &&
                  Date.parse(job.expiresAt) > Date.now(),
              ).length
            }
          </strong>
          <small>{translate("app.platform.aktyvnykh_publikatsiy")}</small>
        </div>
        <div>
          <span>{translate("app.platform.vidhuky")}</span>
          <strong>{platformState.incoming.length}</strong>
          <small>{translate("app.platform.otrymano_vid_kandydativ")}</small>
        </div>
        <div>
          <span>{translate("app.platform.novi_kandydaty")}</span>
          <strong>
            {
              platformState.incoming.filter(
                (incoming) => "new" === incoming.application.status,
              ).length
            }
          </strong>
          <small>{translate("app.platform.ochikuyut_tvoho_perehlyadu")}</small>
        </div>
      </div>
      <h2 className={"section-title"}>
        {translate("app.platform.moyi_vakansiyi")}
      </h2>
      {platformState.myJobs.length ? (
        platformState.myJobs.map((job) => (
          <EmployerJobCard
            key={job.id}
            isSaving={isSaving}
            job={job}
            requireAuthentication={requireAuthentication}
            savePlatformAction={savePlatformAction}
            setActiveModal={setActiveModal}
            setEditingJobId={setEditingJobId}
            setFormConfirmed={setFormConfirmed}
            setFormError={setFormError}
            setFormStep={setFormStep}
            setJobForm={setJobForm}
            setSelectedJob={setSelectedJob}
          />
        ))
      ) : (
        <div className={"empty-state compact"}>
          <Building2Icon size={30} />
          <h3>{translate("app.platform.persha_vakansiya_pochatok_komandy")}</h3>
          <p>
            {translate(
              "app.platform.vkazhy_profesiyu_umovy_ta_zavdannya_publikatsiya_diyatyme_30_dniv",
            )}
          </p>
          <button className={"primary"} onClick={() => openModal("publish")}>
            {translate("app.platform.stvoryty_vakansiyu")}
          </button>
        </div>
      )}
      <h2 className={"section-title"}>
        {translate("app.platform.vidhuky_kandydativ")}
      </h2>
      {platformState.incoming.length ? (
        platformState.incoming.map(({ application, job }) => {
          const candidateProfile = JSON.parse(application.profileSnapshot);
          return (
            <IncomingApplicationCard
              key={application.id}
              application={application}
              candidateProfile={candidateProfile}
              isSaving={isSaving}
              job={job}
              savePlatformAction={savePlatformAction}
            />
          );
        })
      ) : (
        <p className={"muted"}>
          {translate(
            "app.platform.vidhuky_na_tvoyi_vakansiyi_z_yavlyatsya_tut",
          )}
        </p>
      )}
    </section>
  );
}
export { EmployerDashboard };
