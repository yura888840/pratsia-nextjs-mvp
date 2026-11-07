"use client";

import { translate } from "../../../i18n/index.js";
import {
  SlidersHorizontalIcon,
  XIcon,
  LoaderCircleIcon,
  SearchIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  FileTextIcon,
  CheckIcon,
  ArrowUpRightIcon,
  Building2Icon,
  ShieldCheckIcon,
  BellIcon,
  PlusIcon,
} from "../shared/icons.jsx";
import { SearchFilters } from "./search-filters.jsx";
import * as jsxRuntime from "react/jsx-runtime";
import { JobCard } from "./job-card.jsx";
function SearchResults({
  activeFilterCount,
  activeView,
  areFiltersOpen,
  comparisonJobIds,
  filters,
  isEmployer,
  isPlatformLoading,
  isSaving,
  isSearchLoading,
  jobCacheRef,
  loadPlatformState,
  loadSearchResults,
  matchingDemoCount,
  nextCursor,
  openModal,
  platformError,
  platformState,
  requireAuthentication,
  resetFilters,
  savePlatformAction,
  searchError,
  searchResults,
  setCityInput,
  setComparisonJobIds,
  setFiltersOpen,
  setQueryInput,
  setSelectedJob,
  setShowDemoJobs,
  setToastMessage,
  showDemoJobs,
  toggleFavorite,
  totalJobs,
  updateFilter,
  visibleJobs,
}) {
  return (
    <section className={"results-section"}>
      <div className={"results-header"}>
        <div>
          <h2>
            {"saved" === activeView
              ? translate("app.platform.tviy_korotkyy_spysok")
              : translate("app.platform.shcho_shukayemo_sohodni")}{" "}
            <span className={"count"}>{totalJobs + matchingDemoCount}</span>
          </h2>
          <p>
            {showDemoJobs
              ? translate(
                  "app.platform.perehlyad_prykladiv_ta_opublikovanykh_vakansiy",
                )
              : translate(
                  "app.platform.aktualni_propozytsiyi_po_vsiy_ukrayini",
                )}
          </p>
        </div>
        <div className={"result-controls"}>
          <button
            className={"outline small filter-toggle"}
            aria-expanded={areFiltersOpen}
            onClick={() => setFiltersOpen(!areFiltersOpen)}
          >
            <SlidersHorizontalIcon size={15} />
            {translate("app.platform.filtry")}
          </button>
          <label className={"sort-label"}>
            {translate("app.platform.sortuvaty")}
            <select
              aria-label={translate("app.platform.sortuvannya")}
              value={filters.sort}
              onChange={(event) => updateFilter("sort", event.target.value)}
            >
              <option value={"newest"}>
                {translate("app.platform.spochatku_novi")}
              </option>
              <option value={"salary"}>
                {translate("app.platform.za_zarplatoyu")}
              </option>
            </select>
          </label>
        </div>
      </div>
      <div className={"demo-notice"}>
        <div>
          <span className={"notice-dot"} />
          <p>
            <b>{translate("app.platform.pochatkova_versiya_platformy")}</b>
            <span>
              {showDemoJobs
                ? translate(
                    "app.platform.pryklady_vyhadani_ta_poznacheni_vidhuk_na_nykh_nedostupnyy",
                  )
                : translate(
                    "app.platform.doday_pershu_vakansiyu_abo_podyvys_yak_pratsyuye_poshuk_na_prykladakh",
                  )}
            </span>
          </p>
        </div>
        <button
          className={"demo-switch " + (showDemoJobs ? "on" : "")}
          role={"switch"}
          aria-checked={showDemoJobs}
          onClick={() => setShowDemoJobs(!showDemoJobs)}
        >
          <span className={"switch-track"}>
            <i />
          </span>
          {translate("app.platform.pokazaty_pryklady")}
        </button>
      </div>
      <div className={"results-grid"}>
        <SearchFilters
          activeFilterCount={activeFilterCount}
          areFiltersOpen={areFiltersOpen}
          filters={filters}
          resetFilters={resetFilters}
          updateFilter={updateFilter}
        />
        <div className={"job-list"}>
          {(filters.query || filters.city || activeFilterCount > 0) && (
            <div className={"active-filters"}>
              {filters.query && (
                <button
                  onClick={() => {
                    setQueryInput("");
                    updateFilter("query", "");
                  }}
                >
                  {filters.query}
                  <XIcon size={13} />
                </button>
              )}
              {filters.city && (
                <button
                  onClick={() => {
                    setCityInput("");
                    updateFilter("city", "");
                  }}
                >
                  {filters.city}
                  <XIcon size={13} />
                </button>
              )}
              {filters.remote && (
                <button onClick={() => updateFilter("remote", false)}>
                  {translate("catalog.remote")}
                  <XIcon size={13} />
                </button>
              )}
              {filters.noExperience && (
                <button onClick={() => updateFilter("noExperience", false)}>
                  {translate("catalog.noExperience")}
                  <XIcon size={13} />
                </button>
              )}
            </div>
          )}
          {(isPlatformLoading || isSearchLoading) && (
            <div className={"loading"}>
              <LoaderCircleIcon className={"spin"} />
              {translate("app.platform.zavantazhuyemo_vakansiyi")}
            </div>
          )}
          {platformError && (
            <div className={"error-panel"}>
              {platformError}
              <button className={"outline small"} onClick={loadPlatformState}>
                {translate("app.platform.sprobuvaty_shche_raz")}
              </button>
            </div>
          )}
          {!isPlatformLoading &&
            !isSearchLoading &&
            !searchError &&
            0 === visibleJobs.length && (
              <div className={"empty-state"}>
                <div className={"empty-icon"}>
                  {(0, jsxRuntime.jsx)(SearchIcon, {
                    size: 28,
                  })}
                </div>
                <h3>
                  {"saved" === activeView
                    ? translate("app.platform.zberezhy_te_shcho_spodobalos")
                    : filters.query || filters.city || activeFilterCount
                      ? translate(
                          "app.platform.za_tsymy_umovamy_vakansiy_nemaye",
                        )
                      : translate(
                          "app.platform.tut_pochynayutsya_novi_mozhlyvosti",
                        )}
                </h3>
                <p>
                  {"saved" === activeView
                    ? translate(
                        "app.platform.natysny_na_zakladku_bilya_vakansiyi_i_vona_z_yavytsya_tut",
                      )
                    : filters.query || filters.city || activeFilterCount
                      ? translate(
                          "app.platform.sprobuy_inshu_profesiyu_misto_abo_menshe_filtriv",
                        )
                      : translate(
                          "app.platform.my_hotuyemo_platformu_do_zapusku_uzhe_mozhna_opublikuvaty_vlasnu_vakansiyu_ta_stvoryt",
                        )}
                </p>
                <div className={"button-row"}>
                  {filters.query || filters.city || activeFilterCount ? (
                    <button className={"primary"} onClick={resetFilters}>
                      {translate("app.platform.skynuty_filtry")}
                    </button>
                  ) : (
                    <jsxRuntime.Fragment>
                      <button
                        className={"primary"}
                        onClick={() => {
                          setShowDemoJobs(true);
                          resetFilters();
                        }}
                      >
                        {translate("app.platform.perehlyanuty_pryklady")}
                        <ArrowRightIcon size={16} />
                      </button>
                      {!isPlatformLoading &&
                        (!platformState.user || isEmployer) && (
                          <button
                            className={"outline"}
                            onClick={() => openModal("publish")}
                          >
                            {translate("jobs.add")}
                          </button>
                        )}
                    </jsxRuntime.Fragment>
                  )}
                </div>
              </div>
            )}
          {visibleJobs.map((job, index) => (
            <JobCard
              key={job.id}
              comparisonJobIds={comparisonJobIds}
              index={index}
              job={job}
              jobCacheRef={jobCacheRef}
              platformState={platformState}
              setComparisonJobIds={setComparisonJobIds}
              setSelectedJob={setSelectedJob}
              setToastMessage={setToastMessage}
              toggleFavorite={toggleFavorite}
            />
          ))}
          {searchError && (
            <div className={"error-panel"} role={"alert"}>
              {searchError}
              <button
                className={"outline small"}
                onClick={() => loadSearchResults(!!searchResults.length)}
              >
                {translate("app.platform.sprobuvaty_shche_raz")}
              </button>
            </div>
          )}
          {nextCursor && (
            <button
              className={"load-more outline"}
              disabled={isSearchLoading}
              onClick={() => loadSearchResults(true)}
            >
              {isSearchLoading
                ? translate("app.platform.zavantazhuyemo")
                : translate("app.platform.pokazaty_shche_vakansiyi")}
              <ChevronDownIcon size={16} />
            </button>
          )}
        </div>
        <aside className={"right-rail"}>
          <div className={"resume-promo"}>
            <div className={"resume-illustration"}>
              {(0, jsxRuntime.jsx)(FileTextIcon, {
                size: 44,
                strokeWidth: 1.3,
              })}
              <span>
                <CheckIcon size={14} />
              </span>
            </div>
            <span className={"eyebrow"}>
              {translate("app.platform.tviy_nastupnyy_krok")}
            </span>
            <h3>
              {translate("app.platform.ty_bilshe")}
              <br />
              {translate("app.platform.nizh_pdf")}
            </h3>
            <p>
              {translate("app.platform.pokazhy_shcho_vmiyesh")}
              <br />
              {translate("app.platform.anketa_dopomozhe_z_reshtoyu")}
            </p>
            <button className={"primary"} onClick={() => openModal("profile")}>
              {translate("app.platform.zapovnyty_anketu")}
              <ArrowUpRightIcon size={16} />
            </button>
            <small>
              {translate("app.platform.bezkoshtovno_zberihayetsya_v_kabineti")}
            </small>
          </div>
          {!isPlatformLoading && (!platformState.user || isEmployer) && (
            <div className={"employer-promo"}>
              <span className={"small-icon"}>
                <Building2Icon size={20} />
              </span>
              <h3>{translate("app.platform.shukayesh_lyudey")}</h3>
              <p>
                {translate(
                  "app.platform.rozmishchuy_vakansiyi_po_vsiy_ukrayini_na_starti_bez_oplaty",
                )}
              </p>
              <button onClick={() => openModal("publish")}>
                {translate("jobs.add")}
                <ArrowUpRightIcon size={16} />
              </button>
            </div>
          )}
          <div className={"trust-note"}>
            <ShieldCheckIcon size={18} />
            <p>
              {translate(
                "app.platform.pomityv_pidozrilu_propozytsiyu_povidom_nam_u_karttsi_vakansiyi",
              )}
            </p>
          </div>
        </aside>
      </div>
      <div className={"save-search-strip"}>
        <div className={"small-icon"}>
          <BellIcon size={21} />
        </div>
        <div>
          <h3>{translate("app.platform.zberezhy_sviy_poshuk")}</h3>
          <p>
            {translate(
              "app.platform.povertaysya_do_potribnykh_profesiy_mist_i_umov_odnym_natyskannyam",
            )}
          </p>
        </div>
        <button
          className={"outline"}
          disabled={isSaving}
          onClick={async () => {
            {
              if (
                requireAuthentication() &&
                (await savePlatformAction({
                  action: "saveSearch",
                  name: [
                    filters.query || translate("app.platform.usi_profesiyi_2"),
                    filters.city || translate("app.platform.usya_ukrayina"),
                  ].join(" \xb7 "),
                  filters,
                }))
              ) {
                setToastMessage(
                  translate("app.platform.poshuk_zberezheno_v_kabineti"),
                );
              }
            }
          }}
        >
          {translate("app.platform.zberehty_poshuk")}
          <PlusIcon size={16} />
        </button>
      </div>
    </section>
  );
}
export { SearchResults };
