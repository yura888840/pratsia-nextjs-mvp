"use client";

import { useState } from "react";
import { translate, formatDate } from "../../../i18n/index.js";
function ModerationPanel() {
  const [queueScope, setQueueScope] = useState("pending");
  const [queueOffset, setQueueOffset] = useState(0);
  const [moderationJobs, setModerationJobs] = useState([]);
  const [hasMoreJobs, setHasMoreJobs] = useState(false);
  const [isModerationBusy, setModerationBusy] = useState(false);
  const [moderationError, setModerationError] = useState("");
  const [reasonsByJobId, setReasonsByJobId] = useState({});
  async function loadModerationQueue() {
    setModerationBusy(true);
    setModerationError("");
    try {
      const response = await fetch(
        "/api/moderation?" +
          new URLSearchParams({
            scope: queueScope,
            offset: String(queueOffset),
          }),
      );
      const responseData = await response.json();
      if (!response.ok) throw Error(responseData.error);
      setModerationJobs(responseData.jobs);
      setHasMoreJobs(responseData.hasMore);
    } catch (error) {
      setModerationJobs([]);
      setModerationError(
        error instanceof Error
          ? error.message
          : translate("app.platform.pomylka"),
      );
    } finally {
      setModerationBusy(false);
    }
  }
  async function submitModerationAction(jobId, action) {
    setModerationBusy(true);
    setModerationError("");
    try {
      const response = await fetch("/api/moderation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          action,
          reason: reasonsByJobId[jobId] || "",
        }),
      });
      const responseData = await response.json();
      if (!response.ok) throw Error(responseData.error);
      setReasonsByJobId((previousReasons) => ({
        ...previousReasons,
        [jobId]: "",
      }));
      await loadModerationQueue();
    } catch (error) {
      setModerationError(
        error instanceof Error
          ? error.message
          : translate("app.platform.pomylka"),
      );
    } finally {
      setModerationBusy(false);
    }
  }
  return (
    <section className={"dashboard"}>
      <div className={"page-heading"}>
        <span className={"eyebrow"}>
          {translate("app.platform.yakist_platformy")}
        </span>
        <h1>{translate("app.platform.moderatsiya")}</h1>
        <p>
          {translate("app.platform.skarhy_perevirka_vakansiy_i_zhurnal_rishen")}
        </p>
      </div>
      <div className={"auth-tabs"}>
        {[
          ["pending", translate("app.platform.na_perevirtsi")],
          ["reports", translate("app.platform.skarhy")],
          ["recent", translate("app.platform.usi_vakansiyi")],
          ["blocked", translate("app.platform.prykhovani")],
        ].map(([scopeId, scopeLabel]) => (
          <button
            disabled={isModerationBusy}
            className={
              queueScope === scopeId ? "primary small" : "outline small"
            }
            onClick={() => {
              setQueueOffset(0);
              setQueueScope(scopeId);
            }}
            key={scopeId}
          >
            {scopeLabel}
          </button>
        ))}
      </div>
      {moderationError && (
        <p role={"alert"} className={"form-error"}>
          {moderationError}
        </p>
      )}
      {isModerationBusy && (
        <p role={"status"}>{translate("app.platform.zavantazhuyemo")}</p>
      )}
      {!isModerationBusy && !moderationError && !moderationJobs.length && (
        <div className={"inline-note"}>
          {translate("app.platform.u_tsomu_rozdili_poky_nemaye_vakansiy")}
        </div>
      )}
      {moderationJobs.map((job) => (
        <article className={"profile-card moderation-card"} key={job.id}>
          <h2>{job.title}</h2>
          <p>
            {job.company}
            {" \xb7 "}
            {job.city}
            {" \xb7 "}
            {job.occupation}
          </p>
          <p>
            <b>
              {"pending" === job.moderationStatus
                ? translate("app.platform.ochikuye_perevirky")
                : "blocked" === job.moderationStatus
                  ? translate("app.platform.prykhovano_moderatorom")
                  : translate("app.platform.skhvalena")}
            </b>
            {translate("app.platform.vidkrytykh_skarh")}
            {job.openReports}
          </p>
          {job.moderationReason && (
            <p className={"inline-note"}>
              {translate("app.platform.poperednye_rishennya")}
              {job.moderationReason}
            </p>
          )}
          <details>
            <summary>{translate("app.platform.opys_vakansiyi")}</summary>
            <p className={"preline"}>{job.description}</p>
          </details>
          {job.reports.map((report) => (
            <blockquote key={report.id}>
              {report.reason}
              <small>
                {" \xb7 "}
                {formatDate(report.createdAt, undefined, {
                  dateStyle: "short",
                  timeStyle: "medium",
                })}
              </small>
            </blockquote>
          ))}
          <label className={"field"}>
            {translate("app.platform.prychyna_rishennya")}
            <textarea
              minLength={5}
              maxLength={2e3}
              value={reasonsByJobId[job.id] || ""}
              onChange={(event) =>
                setReasonsByJobId((previousReasons) => ({
                  ...previousReasons,
                  [job.id]: event.target.value,
                }))
              }
              placeholder={translate(
                "app.platform.shcho_perevireno_ta_chomu_pryynyato_tse_rishennya",
              )}
            />
          </label>
          <div className={"moderation-actions"}>
            <button
              disabled={
                isModerationBusy ||
                (reasonsByJobId[job.id] || "").trim().length < 5
              }
              className={"outline"}
              onClick={() =>
                submitModerationAction(
                  job.id,
                  "approved" !== job.moderationStatus ? "restore" : "hide",
                )
              }
            >
              {"approved" !== job.moderationStatus
                ? translate("app.platform.skhvalyty_publikatsiyu")
                : translate("app.platform.prykhovaty_vakansiyu")}
            </button>
            {"pending" === job.moderationStatus && (
              <button
                disabled={
                  isModerationBusy ||
                  (reasonsByJobId[job.id] || "").trim().length < 5
                }
                className="outline"
                onClick={() => submitModerationAction(job.id, "hide")}
              >
                {translate("app.platform.vidkhylyty")}
              </button>
            )}
            {job.openReports > 0 && (
              <button
                disabled={
                  isModerationBusy ||
                  (reasonsByJobId[job.id] || "").trim().length < 5
                }
                className={"outline"}
                onClick={() => submitModerationAction(job.id, "dismiss")}
              >
                {translate("app.platform.zakryty_skarhy_bez_prykhovuvannya")}
              </button>
            )}
          </div>
          {job.events.length > 0 && (
            <details>
              <summary>{translate("app.platform.zhurnal_rishen")}</summary>
              {job.events.map((moderationEvent, index) => (
                <p key={index}>
                  {formatDate(moderationEvent.createdAt, undefined, {
                    dateStyle: "short",
                    timeStyle: "medium",
                  })}
                  {" \xb7 "}
                  {{
                    hide: translate("app.platform.prykhovano"),
                    restore: translate("app.platform.povernuto"),
                    dismiss: translate("app.platform.skarhy_zakryto"),
                  }[moderationEvent.action] || moderationEvent.action}
                  {": "}
                  {moderationEvent.reason}
                </p>
              ))}
            </details>
          )}
        </article>
      ))}
      <div className={"moderation-actions"}>
        <button
          className={"outline"}
          disabled={isModerationBusy || 0 === queueOffset}
          onClick={() => setQueueOffset(Math.max(0, queueOffset - 30))}
        >
          {translate("app.platform.nazad")}
        </button>
        <button
          className={"outline"}
          disabled={isModerationBusy || !hasMoreJobs}
          onClick={() => setQueueOffset(queueOffset + 30)}
        >
          {translate("app.platform.dali")}
        </button>
      </div>
    </section>
  );
}
export { ModerationPanel };
