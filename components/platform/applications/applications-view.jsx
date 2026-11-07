"use client";

import { translate, formatDate } from "../../../i18n/index.js";
import { applicationStatusLabels } from "./statuses.js";
import {
  ArrowUpRightIcon,
  BriefcaseBusinessIcon,
  ArrowRightIcon,
} from "../shared/icons.jsx";
import * as jsxRuntime from "react/jsx-runtime";
function ApplicationsView({ navigateToView, platformState, setSelectedJob }) {
  return (
    <section className={"dashboard"}>
      <div className={"page-heading"}>
        <span className={"eyebrow"}>
          {translate("app.platform.trymay_ruku_na_pulsi")}
        </span>
        <h1>{translate("app.platform.moyi_vidhuky")}</h1>
        <p>
          {translate(
            "app.platform.tut_vydno_na_yaki_vakansiyi_ty_vidhuknuvsya_ta_yakyy_status_vstanovyv_robotodavets",
          )}
        </p>
      </div>
      {platformState.applications.length ? (
        platformState.applications.map(({ application, job }) => (
          <div className={"dashboard-card"} key={application.id}>
            <div>
              <small>{job.company}</small>
              <h3>{job.title}</h3>
              <p>{formatDate(application.createdAt)}</p>
            </div>
            <span className={"status status-" + application.status}>
              {applicationStatusLabels[application.status]}
            </span>
            <button
              className={"outline small"}
              onClick={() => setSelectedJob(job)}
            >
              {translate("app.platform.vakansiya")}
              <ArrowUpRightIcon size={14} />
            </button>
          </div>
        ))
      ) : (
        <div className={"empty-state"}>
          {(0, jsxRuntime.jsx)(BriefcaseBusinessIcon, {
            size: 36,
          })}
          <h3>{translate("app.platform.nastupnyy_krok_pershyy_vidhuk")}</h3>
          <p>
            {translate(
              "app.platform.obery_vakansiyu_ta_nadishly_anketu_pryklady_ne_pryymayut_vidhukiv",
            )}
          </p>
          <button
            className={"primary"}
            onClick={() => navigateToView("search")}
          >
            {translate("app.platform.znayty_robotu")}
            <ArrowRightIcon size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
export { ApplicationsView };
