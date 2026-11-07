"use client";

import * as jsxRuntime from "react/jsx-runtime";
import { SearchHero } from "./search-hero.jsx";
import { translate } from "../../../i18n/index.js";
import { SearchResults } from "./search-results.jsx";
function JobSearchView({
  activeFilterCount,
  activeView,
  areFiltersOpen,
  cityInput,
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
  navigateToView,
  nextCursor,
  openModal,
  platformError,
  platformState,
  queryInput,
  requireAuthentication,
  resetFilters,
  savePlatformAction,
  searchError,
  searchResults,
  setCityInput,
  setComparisonJobIds,
  setFilters,
  setFiltersOpen,
  setOccupationPickerTarget,
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
    <jsxRuntime.Fragment>
      {"search" === activeView ? (
        <SearchHero
          cityInput={cityInput}
          navigateToView={navigateToView}
          queryInput={queryInput}
          setCityInput={setCityInput}
          setFilters={setFilters}
          setOccupationPickerTarget={setOccupationPickerTarget}
          setQueryInput={setQueryInput}
          updateFilter={updateFilter}
        />
      ) : (
        <div className={"page-heading"}>
          <span className={"eyebrow"}>
            {translate("app.platform.tvoya_dobirka")}
          </span>
          <h1>{translate("app.platform.zberezheni_vakansiyi")}</h1>
          <p>
            {translate(
              "app.platform.povernysya_do_propozytsiy_yaki_tebe_zatsikavyly",
            )}
          </p>
        </div>
      )}
      <SearchResults
        activeFilterCount={activeFilterCount}
        activeView={activeView}
        areFiltersOpen={areFiltersOpen}
        comparisonJobIds={comparisonJobIds}
        filters={filters}
        isEmployer={isEmployer}
        isPlatformLoading={isPlatformLoading}
        isSaving={isSaving}
        isSearchLoading={isSearchLoading}
        jobCacheRef={jobCacheRef}
        loadPlatformState={loadPlatformState}
        loadSearchResults={loadSearchResults}
        matchingDemoCount={matchingDemoCount}
        nextCursor={nextCursor}
        openModal={openModal}
        platformError={platformError}
        platformState={platformState}
        requireAuthentication={requireAuthentication}
        resetFilters={resetFilters}
        savePlatformAction={savePlatformAction}
        searchError={searchError}
        searchResults={searchResults}
        setCityInput={setCityInput}
        setComparisonJobIds={setComparisonJobIds}
        setFiltersOpen={setFiltersOpen}
        setQueryInput={setQueryInput}
        setSelectedJob={setSelectedJob}
        setShowDemoJobs={setShowDemoJobs}
        setToastMessage={setToastMessage}
        showDemoJobs={showDemoJobs}
        toggleFavorite={toggleFavorite}
        totalJobs={totalJobs}
        updateFilter={updateFilter}
        visibleJobs={visibleJobs}
      />
    </jsxRuntime.Fragment>
  );
}
export { JobSearchView };
