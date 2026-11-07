"use client";

import { parseArray } from "./profile.js";
import * as jsxRuntime from "react/jsx-runtime";
import { translate } from "../../../i18n/index.js";
function ResumeHistory({ workHistory, education }) {
  const workEntries = parseArray(workHistory);
  const educationEntries = parseArray(education);
  return (
    <jsxRuntime.Fragment>
      {workEntries.length > 0 && (
        <section className={"resume-section"}>
          <h3>{translate("app.platform.dosvid_roboty")}</h3>
          {workEntries.map((workEntry, index) => (
            <div className={"resume-entry"} key={index}>
              <h4>{workEntry.position}</h4>
              <b>{workEntry.company}</b>
              <small>
                {workEntry.start}
                {" — "}
                {workEntry.current
                  ? translate("app.platform.doteper")
                  : workEntry.end}
              </small>
              {workEntry.description && (
                <p className={"preline"}>{workEntry.description}</p>
              )}
            </div>
          ))}
        </section>
      )}
      {educationEntries.length > 0 && (
        <section className={"resume-section"}>
          <h3>{translate("app.platform.osvita_ta_navchannya")}</h3>
          {educationEntries.map((educationEntry, index) => (
            <div className={"resume-entry"} key={index}>
              <h4>{educationEntry.qualification}</h4>
              <p>
                {educationEntry.institution}
                {" \xb7 "}
                {educationEntry.year}
              </p>
            </div>
          ))}
        </section>
      )}
    </jsxRuntime.Fragment>
  );
}
export { ResumeHistory };
