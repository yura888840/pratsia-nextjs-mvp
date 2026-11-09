"use client";
import { translate, catalogValue } from "../../i18n/index.js";
import { SearchIcon, MapPinIcon } from "../platform/shared/icons.jsx";
import { mockVacancies } from "../../domains/vacancy/mocks.js";
import { quickFilters } from "../../domains/vacancy/filters.js";
const filters = [
  ["", translate("guestSearch.all")],
  ["remote", translate("guestSearch.remote")],
  ["reservation", translate("guestSearch.reservation")],
  ["noExperience", translate("guestSearch.noExperience")],
  ["partTime", translate("guestSearch.partTime")],
  ["noResume", translate("guestSearch.noResume")],
  ["disability", translate("guestSearch.disability")],
  ["veteran", translate("guestSearch.veteran")],
];
const cities = [
  ...new Set(
    mockVacancies
      .filter(
        (job) =>
          job.country === "UA" && job.city !== catalogValue("catalog.remote"),
      )
      .map((job) => job.city),
  ),
].sort();
export function GuestSearch({ query, city, filter }) {
  const active = quickFilters.includes(filter) ? filter : "";
  return (
    <form
      action="/search"
      method="get"
      className="guest-search-form"
      key={`${query}:${city}:${active}`}
    >
      <div className="guest-search-row">
        <div className="guest-search-fields">
          <label className="guest-search-query">
            <SearchIcon size={22} aria-hidden="true" />
            <input
              name="q"
              aria-label={translate("candidate.searchLabel")}
              defaultValue={query}
              placeholder={translate("guestSearch.placeholder")}
            />
          </label>
          <label className="guest-search-location">
            <MapPinIcon size={21} aria-hidden="true" />
            <select
              name="city"
              aria-label={translate("guestSearch.location")}
              defaultValue={city}
            >
              <option value="">{translate("guestSearch.ukraine")}</option>
              <option value="__abroad">
                {translate("guestSearch.abroad")}
              </option>
              {cities.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
              {city && city !== "__abroad" && !cities.includes(city) && (
                <option value={city}>{city}</option>
              )}
            </select>
          </label>
        </div>
        <button
          className="guest-search-submit"
          type="submit"
          name="filter"
          value={active}
        >
          <SearchIcon size={22} aria-hidden="true" />
          {translate("candidate.search")}
        </button>
      </div>
      <div
        className="guest-search-filters"
        role="group"
        aria-label={translate("guestSearch.quickFilters")}
      >
        {filters.map(([key, label]) => (
          <button
            type="submit"
            name="filter"
            value={key}
            key={key}
            aria-pressed={active === key}
          >
            {label}
          </button>
        ))}
      </div>
    </form>
  );
}
