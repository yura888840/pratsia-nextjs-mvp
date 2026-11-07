"use client";

import { SlidersHorizontalIcon, LayoutGridIcon } from "../shared/icons.jsx";
import { translate, catalogLabel } from "../../../i18n/index.js";
import { jobCategories, schedules } from "../catalog/job-options.js";
import { categoryIcons } from "../catalog/category-icons.js";
import * as jsxRuntime from "react/jsx-runtime";
function SearchFilters({
  activeFilterCount,
  areFiltersOpen,
  filters,
  resetFilters,
  updateFilter,
}) {
  return (
    <aside className={"filters " + (areFiltersOpen ? "filters-open" : "")}>
      <div className={"filter-heading"}>
        <h3>
          <SlidersHorizontalIcon size={16} />
          {translate("app.platform.filtry_2")}
          {activeFilterCount > 0 && <small>{activeFilterCount}</small>}
        </h3>
        <button onClick={resetFilters}>
          {translate("app.platform.skynuty")}
        </button>
      </div>
      <div className={"filter-block"}>
        <h4>{translate("app.platform.sfera_roboty")}</h4>
        {jobCategories.map((category) => {
          const CategoryIcon = categoryIcons[category.id] || LayoutGridIcon;
          return (
            <button
              className={
                "category " +
                (filters.category === category.id ? "selected" : "")
              }
              onClick={() => updateFilter("category", category.id)}
              key={category.id}
            >
              {(0, jsxRuntime.jsx)(CategoryIcon, {
                size: 16,
              })}
              <span>{category.name}</span>
              {filters.category === category.id && (
                <span className={"radio-dot"} />
              )}
            </button>
          );
        })}
      </div>
      <div className={"filter-block"}>
        <h4>{translate("app.platform.tvoyi_pobazhannya")}</h4>
        <label className={"check-label"}>
          <input
            type={"checkbox"}
            checked={filters.remote}
            onChange={(event) => updateFilter("remote", event.target.checked)}
          />
          {translate("app.platform.dystantsiyna_robota")}
        </label>
        <label className={"check-label"}>
          <input
            type={"checkbox"}
            checked={filters.noExperience}
            onChange={(event) =>
              updateFilter("noExperience", event.target.checked)
            }
          />
          {translate("catalog.noExperience")}
        </label>
      </div>
      <div className={"filter-block"}>
        <h4>{translate("app.platform.zarplata_vid_misyats")}</h4>
        <input
          className={"salary-input"}
          aria-label={translate("app.platform.minimalna_zarplata")}
          type={"number"}
          min={"0"}
          max={"10000000"}
          step={"1000"}
          placeholder={translate("app.platform.napryklad_25_000")}
          value={filters.minSalary || ""}
          onChange={(event) =>
            updateFilter("minSalary", Number(event.target.value))
          }
        />
        <small className={"muted"}>
          {translate("app.platform.za_nyzhnoyu_mezheyu_propozytsiyi")}
        </small>
      </div>
      <div className={"filter-block"}>
        <h4>{translate("app.platform.zaynyatist")}</h4>
        <select
          className={"full-select"}
          value={filters.schedule}
          onChange={(event) => updateFilter("schedule", event.target.value)}
          aria-label={translate("app.platform.hrafik")}
        >
          <option value={""}>{translate("app.platform.bud_yaka")}</option>
          {schedules.map((schedule) => (
            <option key={schedule} value={schedule}>
              {catalogLabel(schedule)}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
export { SearchFilters };
