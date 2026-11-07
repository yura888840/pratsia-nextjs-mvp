"use client";

import { applicationStatusLabels } from "./statuses.js";
import { ResumeHistory } from "../candidate/resume-history.jsx";
import { translate } from "../../../i18n/index.js";
function IncomingApplicationCard({
  application,
  candidateProfile,
  isSaving,
  job,
  savePlatformAction,
}) {
  return (
    <div className={"incoming-card"} key={application.id}>
      <div className={"incoming-top"}>
        <div>
          <small>{job.title}</small>
          <h3>{candidateProfile.name}</h3>
          <p>
            {candidateProfile.occupation}
            {" \xb7 "}
            {candidateProfile.city}
            {" \xb7 "}
            {candidateProfile.experience}
          </p>
        </div>
        <span className={"status status-" + application.status}>
          {applicationStatusLabels[application.status]}
        </span>
      </div>
      <p className={"preline"}>{candidateProfile.skills}</p>
      {candidateProfile.about && (
        <p className={"preline"}>{candidateProfile.about}</p>
      )}
      <ResumeHistory
        workHistory={candidateProfile.workHistory}
        education={candidateProfile.education}
      />
      {Object.entries(JSON.parse(candidateProfile.specialties || "{}"))
        .filter(([, specialtyValue]) => specialtyValue)
        .map(([specialtyName, historyLabel]) => (
          <div className={"candidate-specialty"} key={specialtyName}>
            <b>{specialtyName}</b>
            <p>{historyLabel}</p>
          </div>
        ))}
      {application.message && <blockquote>{application.message}</blockquote>}
      <div className={"candidate-contacts"}>
        <a href={"tel:" + candidateProfile.phone.replace(/[^+\d]/g, "")}>
          {candidateProfile.phone}
        </a>
        <a href={"mailto:" + candidateProfile.email}>
          {candidateProfile.email}
        </a>
      </div>
      <div className={"button-row"}>
        {[
          ["viewed", translate("app.platform.perehlyanuto")],
          ["invited", translate("app.platform.zaprosyty")],
          ["rejected", translate("app.platform.vidmovyty")],
        ].map(([historyLabel, historyValue]) => (
          <button
            disabled={isSaving || application.status === historyLabel}
            className={
              "invited" === historyLabel ? "primary small" : "outline small"
            }
            onClick={() =>
              savePlatformAction({
                action: "applicationStatus",
                id: application.id,
                status: historyLabel,
              })
            }
            key={historyLabel}
          >
            {historyValue}
          </button>
        ))}
      </div>
      <small className={"muted"}>
        {translate(
          "app.platform.status_vydno_kandydatu_v_kabineti_chas_spivbesidy_uzhodte_za_kontaktamy",
        )}
      </small>
    </div>
  );
}
export { IncomingApplicationCard };
