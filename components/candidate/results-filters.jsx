"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { translate, formatNumber } from "../../i18n/index.js";
import { normalizeSearchFilters } from "../../domains/vacancy/search-filters.js";
const categories = [
  ["it", translate("resultsFilters.it")], ["sales", translate("resultsFilters.sales")],
  ["legal", translate("resultsFilters.legal")], ["hospitality", translate("resultsFilters.hospitality")],
  ["logistics", translate("resultsFilters.logistics")], ["education", translate("resultsFilters.education")],
];
const extra = [
  ["reservation", translate("guestSearch.reservation")], ["noResume", translate("guestSearch.noResume")],
  ["disability", translate("guestSearch.disability")], ["veteran", translate("guestSearch.veteran")],
];
export function ResultsFilters() {
  const params = useSearchParams();
  const values = normalizeSearchFilters(params);
  const extraCount = extra.filter(([key]) => values[key]).length;
  const clear = new URLSearchParams();
  for (const key of ["q", "city", "view"]) if (params.get(key)) clear.set(key, params.get(key));
  const salaries = [...new Set([10000, 20000, 30000, 50000, 75000, 100000, ...(values.salary ? [values.salary] : [])])].sort((a,b) => a-b);
  const check = (key, label) => <label className="results-filter-check" key={key}><input type="checkbox" name={key} value="1" defaultChecked={values[key]} /><span>{label}</span></label>;
  return (
    <div className="results-filters" key={params.toString()} onChange={(event) => event.target.form?.requestSubmit()}>
      {params.get("view") === "saved" && <input type="hidden" name="view" value="saved" />}
      <div className="results-filters-row">
        <select name="employment" aria-label={translate("resultsFilters.employment")} defaultValue={values.employment}>
          <option value="">{translate("resultsFilters.employment")}</option>
          <option value="fullTime">{translate("resultsFilters.fullTime")}</option>
          <option value="partTime">{translate("guestSearch.partTime")}</option>
        </select>
        <select name="category" aria-label={translate("resultsFilters.category")} defaultValue={values.category}>
          <option value="">{translate("resultsFilters.category")}</option>
          {categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <select name="salary" aria-label={translate("resultsFilters.salary")} defaultValue={values.salary || ""}>
          <option value="">{translate("resultsFilters.salary")}</option>
          {salaries.map((salary) => <option key={salary} value={salary}>{formatNumber(salary)} {translate("resultsFilters.currency")}</option>)}
        </select>
        {check("remote", translate("resultsFilters.remote"))}
        {check("noExperience", translate("guestSearch.noExperience"))}
        <Link className="results-filter-clear" href={`/search${clear.size ? `?${clear}` : ""}`}>{translate("resultsFilters.clear")}</Link>
        <details className="results-filter-extra">
          <summary><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 3v18M12 3v18M20 3v18M1 8h6M9 16h6M17 9h6" /></svg>{translate("resultsFilters.more")}{extraCount > 0 && <span>({extraCount})</span>}</summary>
          <div className="results-filter-panel">{extra.map(([key, label]) => check(key, label))}</div>
        </details>
      </div>
    </div>
  );
}
