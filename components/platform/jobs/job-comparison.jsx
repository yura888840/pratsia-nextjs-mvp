"use client";

import { translate } from "../../../i18n/index.js";
import { XIcon } from "../shared/icons.jsx";
import { Salary } from "./salary.jsx";
function JobComparison({ comparisonJobIds, jobCacheRef, setComparisonOpen }) {
  return (
    <div className={"overlay center"} onClick={() => setComparisonOpen(false)}>
      <section
        className={"modal compare-modal"}
        role={"dialog"}
        aria-modal={"true"}
        aria-labelledby={"compare-title"}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={"modal-header"}>
          <h2 id={"compare-title"}>
            {translate("app.platform.porivnyay_umovy")}
          </h2>
          <button
            className={"icon-btn"}
            aria-label={translate("app.platform.zakryty_porivnyannya")}
            onClick={() => setComparisonOpen(false)}
          >
            <XIcon />
          </button>
        </div>
        <div className={"comparison-scroll"}>
          <table>
            <thead>
              <tr>
                <th>{translate("app.platform.umovy")}</th>
                {Array.from(jobCacheRef.current.values())
                  .filter((cachedJob) =>
                    comparisonJobIds.includes(cachedJob.id),
                  )
                  .map((comparedJob) => (
                    <th key={comparedJob.id}>
                      {comparedJob.title}
                      <small>{comparedJob.company}</small>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {[
                translate("app.platform.zarplata"),
                translate("fields.city"),
                translate("app.platform.format"),
                translate("app.platform.zaynyatist"),
                translate("app.platform.dosvid"),
              ].map((comparisonLabel, index) => (
                <tr key={comparisonLabel}>
                  <td>{comparisonLabel}</td>
                  {Array.from(jobCacheRef.current.values())
                    .filter((cachedJob) =>
                      comparisonJobIds.includes(cachedJob.id),
                    )
                    .map((comparedJob) => (
                      <td key={comparedJob.id}>
                        {0 === index ? (
                          <Salary job={comparedJob} />
                        ) : 1 === index ? (
                          comparedJob.city
                        ) : 2 === index ? (
                          comparedJob.arrangement
                        ) : 3 === index ? (
                          comparedJob.schedule
                        ) : (
                          comparedJob.experience
                        )}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
export { JobComparison };
