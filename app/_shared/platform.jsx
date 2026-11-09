"use client";

import { usePlatformController } from "../../components/platform/use-platform-controller.js";
import { PlatformSidebar } from "../../components/platform/shell/sidebar.jsx";
import { translate, catalogLabel } from "../../i18n/index.js";
import { PlatformHeader } from "../../components/platform/shell/header.jsx";
import { JobSearchView } from "../../components/platform/jobs/search-view.jsx";
import { CandidateProfileView } from "../../components/platform/candidate/profile-view.jsx";
import { ApplicationsView } from "../../components/platform/applications/applications-view.jsx";
import { SavedSearchesView } from "../../components/platform/jobs/saved-searches-view.jsx";
import { EmployerLanding } from "../../components/platform/employer/landing.jsx";
import { EmployerAccess } from "../../components/platform/employer/access.jsx";
import { EmployerDashboard } from "../../components/platform/employer/dashboard.jsx";
import { ModerationPanel } from "../../components/platform/moderation/moderation-panel.jsx";
import { occupations } from "../../components/platform/catalog/occupations.js";
import { cities } from "../../components/platform/catalog/job-options.js";
import {
  GitCompareArrowsIcon,
  ArrowRightIcon,
  XIcon,
  CircleCheckIcon,
} from "../../components/platform/shared/icons.jsx";
import { JobDetails } from "../../components/platform/jobs/job-details.jsx";
import { JobComparison } from "../../components/platform/jobs/job-comparison.jsx";
import { PlatformModal } from "../../components/platform/shell/platform-modal.jsx";
import { OccupationPicker } from "../../components/platform/catalog/occupation-picker.jsx";
function Platform({ initialJobs = [], initialView = "search" }) {
  const {
    activeFilterCount,
    activeModal,
    activeView,
    applicationMessage,
    areFiltersOpen,
    cityInput,
    comparisonJobIds,
    editingJobId,
    filters,
    formError,
    formStep,
    isComparisonOpen,
    isEmployer,
    isFormConfirmed,
    isPlatformLoading,
    isSaving,
    isSearchLoading,
    isSidebarOpen,
    jobCacheRef,
    jobForm,
    loadPlatformState,
    loadSearchResults,
    matchingDemoCount,
    navigateToView,
    nextCursor,
    occupationPickerTarget,
    openModal,
    passwordResetToken,
    pendingApplicationJob,
    platformError,
    platformState,
    profileForm,
    queryInput,
    reportReason,
    requireAuthentication,
    resetFilters,
    savePlatformAction,
    searchError,
    searchResults,
    selectedJob,
    setActiveModal,
    setApplicationMessage,
    setCityInput,
    setComparisonJobIds,
    setComparisonOpen,
    setEditingJobId,
    setFilters,
    setFiltersOpen,
    setFormConfirmed,
    setFormError,
    setFormStep,
    setJobForm,
    setOccupationPickerTarget,
    setPasswordResetToken,
    setPendingApplicationJob,
    setProfileForm,
    setQueryInput,
    setReportReason,
    setSelectedJob,
    setShowDemoJobs,
    setSidebarOpen,
    setToastMessage,
    showDemoJobs,
    submitJob,
    submitProfile,
    toastMessage,
    toggleFavorite,
    totalJobs,
    updateFilter,
    visibleJobs,
  } = usePlatformController({
    initialJobs,
    initialView,
  });
  return (
    <div className={"app-shell"}>
      <PlatformSidebar
        activeView={activeView}
        isEmployer={isEmployer}
        isPlatformLoading={isPlatformLoading}
        isSidebarOpen={isSidebarOpen}
        navigateToView={navigateToView}
        openModal={openModal}
        platformState={platformState}
      />
      {isSidebarOpen && (
        <button
          className={"sidebar-scrim"}
          aria-label={translate("app.platform.zakryty_menyu")}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className={"main-shell"}>
        <PlatformHeader
          activeView={activeView}
          isEmployer={isEmployer}
          isPlatformLoading={isPlatformLoading}
          isSidebarOpen={isSidebarOpen}
          navigateToView={navigateToView}
          openModal={openModal}
          platformState={platformState}
          requireAuthentication={requireAuthentication}
          setSidebarOpen={setSidebarOpen}
        />
        <main>
          {("search" === activeView || "saved" === activeView) && (
            <JobSearchView
              activeFilterCount={activeFilterCount}
              activeView={activeView}
              areFiltersOpen={areFiltersOpen}
              cityInput={cityInput}
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
              navigateToView={navigateToView}
              nextCursor={nextCursor}
              openModal={openModal}
              platformError={platformError}
              platformState={platformState}
              queryInput={queryInput}
              requireAuthentication={requireAuthentication}
              resetFilters={resetFilters}
              savePlatformAction={savePlatformAction}
              searchError={searchError}
              searchResults={searchResults}
              setCityInput={setCityInput}
              setComparisonJobIds={setComparisonJobIds}
              setFilters={setFilters}
              setFiltersOpen={setFiltersOpen}
              setOccupationPickerTarget={setOccupationPickerTarget}
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
          )}
          {"profile" === activeView && (
            <CandidateProfileView
              navigateToView={navigateToView}
              openModal={openModal}
              platformState={platformState}
              profileForm={profileForm}
            />
          )}
          {"applications" === activeView && (
            <ApplicationsView
              navigateToView={navigateToView}
              platformState={platformState}
              setSelectedJob={setSelectedJob}
            />
          )}
          {"alerts" === activeView && (
            <SavedSearchesView
              navigateToView={navigateToView}
              platformState={platformState}
              savePlatformAction={savePlatformAction}
              setCityInput={setCityInput}
              setFilters={setFilters}
              setQueryInput={setQueryInput}
            />
          )}
          {activeView === "employers" && <EmployerLanding />}
          {activeView === "employer" && !isEmployer && (
            <EmployerAccess
              isPlatformLoading={isPlatformLoading}
              loadPlatformState={loadPlatformState}
              platformError={platformError}
              platformState={platformState}
            />
          )}
          {"employer" === activeView && isEmployer && (
            <EmployerDashboard
              isSaving={isSaving}
              loadPlatformState={loadPlatformState}
              openModal={openModal}
              platformState={platformState}
              requireAuthentication={requireAuthentication}
              savePlatformAction={savePlatformAction}
              setActiveModal={setActiveModal}
              setEditingJobId={setEditingJobId}
              setFormConfirmed={setFormConfirmed}
              setFormError={setFormError}
              setFormStep={setFormStep}
              setJobForm={setJobForm}
              setSelectedJob={setSelectedJob}
            />
          )}
        </main>
      </div>
      {"moderation" === activeView && platformState.user?.isAdmin && (
        <ModerationPanel />
      )}
      <datalist id={"occupation-search"}>
        {occupations.map((occupation) => (
          <option value={occupation.name} key={occupation.name} />
        ))}
      </datalist>
      <datalist id={"cities"}>
        {cities.map((city) => (
          <option key={city} value={city}>
            {catalogLabel(city)}
          </option>
        ))}
      </datalist>
      {comparisonJobIds.length > 0 && (
        <div className={"compare-tray"}>
          <GitCompareArrowsIcon size={18} />
          <span>
            {translate("app.platform.dlya_porivnyannya")}
            <b>
              {comparisonJobIds.length}
              {"/3"}
            </b>
          </span>
          <button
            className={"primary small"}
            onClick={() => setComparisonOpen(true)}
          >
            {translate("app.platform.porivnyaty")}
            <ArrowRightIcon size={14} />
          </button>
          <button
            className={"icon-btn"}
            aria-label={translate("app.platform.ochystyty_porivnyannya")}
            onClick={() => setComparisonJobIds([])}
          >
            <XIcon size={17} />
          </button>
        </div>
      )}
      {toastMessage && (
        <div className={"toast"} role={"status"}>
          <CircleCheckIcon size={18} />
          {toastMessage}
          <button
            aria-label={translate("app.platform.zakryty_povidomlennya")}
            onClick={() => setToastMessage("")}
          >
            <XIcon size={15} />
          </button>
        </div>
      )}
      {selectedJob && (
        <JobDetails
          isSaving={isSaving}
          openModal={openModal}
          platformState={platformState}
          requireAuthentication={requireAuthentication}
          selectedJob={selectedJob}
          setPendingApplicationJob={setPendingApplicationJob}
          setSelectedJob={setSelectedJob}
          setToastMessage={setToastMessage}
          toggleFavorite={toggleFavorite}
        />
      )}
      {isComparisonOpen && (
        <JobComparison
          comparisonJobIds={comparisonJobIds}
          jobCacheRef={jobCacheRef}
          setComparisonOpen={setComparisonOpen}
        />
      )}
      {activeModal && (
        <PlatformModal
          activeModal={activeModal}
          applicationMessage={applicationMessage}
          editingJobId={editingJobId}
          formError={formError}
          formStep={formStep}
          isFormConfirmed={isFormConfirmed}
          isSaving={isSaving}
          jobForm={jobForm}
          loadPlatformState={loadPlatformState}
          passwordResetToken={passwordResetToken}
          pendingApplicationJob={pendingApplicationJob}
          platformState={platformState}
          profileForm={profileForm}
          reportReason={reportReason}
          savePlatformAction={savePlatformAction}
          selectedJob={selectedJob}
          setActiveModal={setActiveModal}
          setApplicationMessage={setApplicationMessage}
          setFormConfirmed={setFormConfirmed}
          setFormError={setFormError}
          setFormStep={setFormStep}
          setJobForm={setJobForm}
          setOccupationPickerTarget={setOccupationPickerTarget}
          setPasswordResetToken={setPasswordResetToken}
          setProfileForm={setProfileForm}
          setReportReason={setReportReason}
          setToastMessage={setToastMessage}
          submitJob={submitJob}
          submitProfile={submitProfile}
        />
      )}
      {occupationPickerTarget && (
        <OccupationPicker
          onClose={() => setOccupationPickerTarget(null)}
          onChoose={(chosenOccupation) => {
            {
              if ("search" === occupationPickerTarget) {
                setQueryInput(chosenOccupation.name);
                setFilters((previousFilters) => ({
                  ...previousFilters,
                  query: chosenOccupation.name,
                }));
                navigateToView("search");
              } else {
                if ("profile" === occupationPickerTarget) {
                  setProfileForm((previousProfile) => ({
                    ...previousProfile,
                    occupation: chosenOccupation.name,
                    specialties: {},
                  }));
                } else {
                  setJobForm((previousJob) => ({
                    ...previousJob,
                    occupation: chosenOccupation.name,
                    category: chosenOccupation.category,
                    title:
                      previousJob.title &&
                      previousJob.title !== previousJob.occupation
                        ? previousJob.title
                        : chosenOccupation.name,
                  }));
                }
              }
            }
            setOccupationPickerTarget(null);
          }}
        />
      )}
    </div>
  );
}
export default Platform;
