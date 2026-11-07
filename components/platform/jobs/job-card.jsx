"use client";

import * as jsxRuntime from "react/jsx-runtime";
import {
  translate,
  catalogLabel,
  catalogValue,
  formatDate,
} from "../../../i18n/index.js";
import {
  BookmarkIcon,
  ArrowUpRightIcon,
  MapPinIcon,
  BriefcaseBusinessIcon,
  ClockIcon,
  GitCompareArrowsIcon,
  ArrowRightIcon,
} from "../shared/icons.jsx";
import { Salary } from "./salary.jsx";
function JobCard({
  comparisonJobIds,
  index,
  job,
  jobCacheRef,
  platformState,
  setComparisonJobIds,
  setSelectedJob,
  setToastMessage,
  toggleFavorite,
}) {
  return (
    <article
      className={"job-card"}
      style={{
        animationDelay: `${35 * Math.min(index, 6)}ms`,
      }}
      key={job.id}
    >
      <div className={"job-card-head"}>
        <div
          className={
            "company-logo logo-" + (Number(job.id.replace(/\D/g, "")) % 5)
          }
        >
          {job.company.slice(0, 1).toUpperCase()}
        </div>
        <div className={"company-meta"}>
          <span>{job.company}</span>
          <small>
            {job.demo ? (
              <jsxRuntime.Fragment>
                <span className={"demo-badge"}>
                  {translate("app.platform.pryklad")}
                </span>
                {translate("app.platform.vyhadana_kompaniya")}
              </jsxRuntime.Fragment>
            ) : (
              <jsxRuntime.Fragment>
                <span className={"live-dot"} />
                {translate("app.platform.pryama_publikatsiya")}
              </jsxRuntime.Fragment>
            )}
          </small>
        </div>
        <button
          className={
            "icon-btn bookmark " +
            (platformState.favorites.includes(job.id) ? "bookmarked" : "")
          }
          onClick={() => toggleFavorite(job)}
          aria-label={
            platformState.favorites.includes(job.id)
              ? translate("app.platform.prybraty_zi_zberezhenykh")
              : translate("app.platform.zberehty_vakansiyu")
          }
        >
          {(0, jsxRuntime.jsx)(BookmarkIcon, {
            size: 21,
            fill: platformState.favorites.includes(job.id)
              ? "currentColor"
              : "none",
          })}
        </button>
      </div>
      <button className={"job-title"} onClick={() => setSelectedJob(job)}>
        {job.title}
        <ArrowUpRightIcon size={19} />
      </button>
      <div className={"job-salary"}>
        <Salary job={job} />
        <small>{translate("app.platform.misyats")}</small>
      </div>
      <div className={"job-tags"}>
        <span>
          <MapPinIcon size={13} />
          {job.city}
        </span>
        <span>
          {(0, jsxRuntime.jsx)(BriefcaseBusinessIcon, {
            size: 13,
          })}
          {catalogLabel(job.arrangement)}
        </span>
        <span>
          <ClockIcon size={13} />
          {catalogLabel(job.schedule)}
        </span>
        {catalogValue("catalog.noExperience") === job.experience && (
          <span className={"green-tag"}>
            {translate("catalog.noExperience")}
          </span>
        )}
      </div>
      <div className={"job-card-footer"}>
        <span>
          {job.demo
            ? translate("app.platform.pryklad_dlya_perevirky_interfeysu")
            : translate("app.jobs.id.page.opublikovano") +
              formatDate(job.createdAt)}
        </span>
        <div>
          <button
            className={
              "compare-button " +
              (comparisonJobIds.includes(job.id) ? "chosen" : "")
            }
            onClick={() => {
              var job15;
              job15 = job;
              return void (jobCacheRef.current.set(job15.id, job15),
              setComparisonJobIds((previousComparisonIds) =>
                previousComparisonIds.includes(job15.id)
                  ? previousComparisonIds.filter((a) => a !== job15.id)
                  : previousComparisonIds.length < 3
                    ? [...previousComparisonIds, job15.id]
                    : previousComparisonIds,
              ),
              3 !== comparisonJobIds.length ||
                comparisonJobIds.includes(job15.id) ||
                setToastMessage(
                  translate(
                    "app.platform.porivnyayte_do_trokh_vakansiy_odnochasno",
                  ),
                ));
            }}
            aria-label={translate("app.platform.porivnyaty_vakansiyu")}
          >
            <GitCompareArrowsIcon size={15} />
            <span>{translate("app.platform.porivnyaty")}</span>
          </button>
          <button
            className={"details-link"}
            onClick={() => setSelectedJob(job)}
          >
            {translate("app.platform.detalnishe")}
            <ArrowRightIcon size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
export { JobCard };
