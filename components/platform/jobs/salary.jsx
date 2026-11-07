"use client";

import { formatNumber, translate } from "../../../i18n/index.js";
import * as jsxRuntime from "react/jsx-runtime";
function formatSalary(amount) {
  return formatNumber(amount);
}
function Salary({ job }) {
  return (
    <jsxRuntime.Fragment>
      {job.salaryMin
        ? translate("app.platform.value1_value2", {
            value1: formatSalary(job.salaryMin),
            value2:
              job.salaryMax > job.salaryMin
                ? " – " + formatSalary(job.salaryMax)
                : "",
          })
        : translate("salary.negotiable")}
    </jsxRuntime.Fragment>
  );
}
export { formatSalary, Salary };
