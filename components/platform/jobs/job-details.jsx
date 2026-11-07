"use client";

import { translate, formatDate } from "../../../i18n/index.js";
import {
  XIcon,
  MapPinIcon,
  GlobeIcon,
  ClockIcon,
  BriefcaseBusinessIcon,
  FlagIcon,
  ExternalLinkIcon,
  ArrowRightIcon,
  BookmarkIcon,
} from "../shared/icons.jsx";
import { Salary } from "./salary.jsx";
import * as jsxRuntime from "react/jsx-runtime";
function JobDetails({
  isSaving,
  openModal,
  platformState,
  requireAuthentication,
  selectedJob,
  setPendingApplicationJob,
  setSelectedJob,
  setToastMessage,
  toggleFavorite,
}) {
  return (
    <div className={"overlay"} onClick={() => setSelectedJob(null)}>
      <section
        className={"detail-panel"}
        role={"dialog"}
        aria-modal={"true"}
        aria-labelledby={"job-detail-title"}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={"detail-toolbar"}>
          <span>{translate("app.platform.detali_vakansiyi")}</span>
          <button
            className={"icon-btn"}
            onClick={() => setSelectedJob(null)}
            aria-label={translate("app.platform.zakryty_vakansiyu")}
          >
            <XIcon />
          </button>
        </div>
        <div className={"detail-content"}>
          <div className={"company-line"}>
            <span className={"company-logo"}>{selectedJob.company[0]}</span>
            <div>
              <b>{selectedJob.company}</b>
              <small>
                {selectedJob.demo
                  ? translate("app.platform.vyhadanyy_pryklad")
                  : translate("app.platform.pryama_publikatsiya_robotodavtsya")}
              </small>
            </div>
          </div>
          <h2 id={"job-detail-title"}>{selectedJob.title}</h2>
          <div className={"detail-salary"}>
            <Salary job={selectedJob} />
            <small>{translate("app.platform.misyats_2")}</small>
          </div>
          <div className={"detail-facts"}>
            <span>
              <MapPinIcon size={17} />
              {selectedJob.city}
            </span>
            <span>
              <GlobeIcon size={17} />
              {selectedJob.arrangement}
            </span>
            <span>
              <ClockIcon size={17} />
              {selectedJob.schedule}
            </span>
            <span>
              {(0, jsxRuntime.jsx)(BriefcaseBusinessIcon, {
                size: 17,
              })}
              {selectedJob.experience}
            </span>
          </div>
          {selectedJob.demo && (
            <div className={"inline-note"}>
              {translate(
                "app.platform.tse_demonstratsiyna_vakansiya_kompaniya_ta_umovy_vyhadani_vidhuk_nedostupnyy",
              )}
            </div>
          )}
          <h3>{translate("jobs.about")}</h3>
          <p className={"preline"}>{selectedJob.description}</p>
          <h3>{translate("app.platform.shcho_ochikuyemo")}</h3>
          <p className={"preline"}>{selectedJob.requirements}</p>
          {selectedJob.benefits && (
            <jsxRuntime.Fragment>
              <h3>{translate("jobs.benefits")}</h3>
              <p className={"preline"}>{selectedJob.benefits}</p>
            </jsxRuntime.Fragment>
          )}
          <p className={"muted"}>
            {selectedJob.demo
              ? translate("app.platform.pryklad_dlya_testuvannya_interfeysu")
              : translate("app.jobs.id.page.opublikovano") +
                formatDate(selectedJob.createdAt) +
                translate("app.platform.diye_do") +
                formatDate(selectedJob.expiresAt)}
          </p>
          <button className={"report-link"} onClick={() => openModal("report")}>
            <FlagIcon size={14} />
            {translate("app.platform.povidomyty_pro_problemu")}
          </button>
        </div>
        <div className={"detail-actions"}>
          {!selectedJob.demo && (
            <a
              className={"outline"}
              href={"/jobs/" + selectedJob.id}
              aria-label={translate("app.platform.okrema_storinka_vakansiyi")}
            >
              <ExternalLinkIcon size={17} />
            </a>
          )}
          <button
            className={"primary"}
            disabled={
              selectedJob.demo ||
              isSaving ||
              selectedJob.moderationStatus !== "approved" ||
              "active" !== selectedJob.status ||
              Date.parse(selectedJob.expiresAt) <= Date.now() ||
              platformState.myJobs.some(
                (myJob) => myJob.id === selectedJob.id,
              ) ||
              platformState.applications.some(
                (application) => application.job.id === selectedJob.id,
              )
            }
            onClick={() => {
              {
                if (platformState.profile) {
                  openModal("apply");
                } else {
                  if (requireAuthentication()) {
                    openModal("profile");
                    setPendingApplicationJob(selectedJob);
                    setToastMessage(
                      translate(
                        "app.platform.zapovny_rezyume_potim_povernemosya_do_tsoho_vidhuku",
                      ),
                    );
                  }
                }
              }
            }}
          >
            {selectedJob.demo
              ? translate("app.platform.demonstratsiyna_vakansiya")
              : platformState.myJobs.some(
                    (myJob) => myJob.id === selectedJob.id,
                  )
                ? translate("app.platform.tvoya_vakansiya")
                : platformState.applications.some(
                      (application) => application.job.id === selectedJob.id,
                    )
                  ? translate("app.platform.vidhuk_nadislano")
                  : "active" !== selectedJob.status ||
                      Date.parse(selectedJob.expiresAt) <= Date.now()
                    ? translate("app.platform.vakansiya_zakryta")
                    : translate("jobs.apply")}
            <ArrowRightIcon size={17} />
          </button>
          <button
            className={"outline"}
            onClick={() => toggleFavorite(selectedJob)}
          >
            {(0, jsxRuntime.jsx)(BookmarkIcon, {
              size: 18,
            })}
            {platformState.favorites.includes(selectedJob.id)
              ? translate("app.platform.zberezheno")
              : translate("common.save")}
          </button>
        </div>
      </section>
    </div>
  );
}
export { JobDetails };
