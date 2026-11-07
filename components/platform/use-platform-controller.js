"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { DEFAULT_FILTERS, filterJobs } from "./jobs/search.js";
import { EMPTY_PROFILE, parseArray } from "./candidate/profile.js";
import { EMPTY_JOB } from "./employer/job.js";
import { demoJobs } from "./jobs/demo-jobs.js";
import { translate } from "../../i18n/index.js";
const EMPTY_PLATFORM_STATE = {
  jobs: [],
  user: null,
  profile: null,
  favorites: [],
  searches: [],
  applications: [],
  myJobs: [],
  incoming: [],
};
function usePlatformController({ initialJobs = [], initialView = "search" }) {
  const [platformState, setPlatformState] = useState({
    ...EMPTY_PLATFORM_STATE,
    jobs: initialJobs,
  });
  const [isPlatformLoading, setPlatformLoading] = useState(true);
  const [platformError, setPlatformError] = useState("");
  const [searchResults, setSearchResults] = useState(initialJobs);
  const [totalJobs, setTotalJobs] = useState(initialJobs.length);
  const [nextCursor, setNextCursor] = useState(null);
  const [isSearchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const searchRequestIdRef = useRef(0);
  const searchAbortControllerRef = useRef(null);
  const jobCacheRef = useRef(new Map());
  const [activeView, setActiveView] = useState(initialView);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [queryInput, setQueryInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [showDemoJobs, setShowDemoJobs] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [comparisonJobIds, setComparisonJobIds] = useState([]);
  const [isComparisonOpen, setComparisonOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [profileForm, setProfileForm] = useState(EMPTY_PROFILE);
  const [jobForm, setJobForm] = useState(EMPTY_JOB);
  const [formStep, setFormStep] = useState(0);
  const [passwordResetToken, setPasswordResetToken] = useState("");
  const [occupationPickerTarget, setOccupationPickerTarget] = useState(null);
  const [pendingApplicationJob, setPendingApplicationJob] = useState(null);
  const [editingJobId, setEditingJobId] = useState(null);
  useRef(false);
  const [isSaving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [applicationMessage, setApplicationMessage] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [isFormConfirmed, setFormConfirmed] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [areFiltersOpen, setFiltersOpen] = useState(false);
  const availableJobs = useMemo(
    () => [...searchResults, ...(showDemoJobs ? demoJobs : [])],
    [searchResults, showDemoJobs],
  );
  const visibleJobs = useMemo(
    () =>
      filterJobs(
        "saved" === activeView
          ? availableJobs.filter((job) =>
              platformState.favorites.includes(job.id),
            )
          : availableJobs,
        filters,
      ),
    [availableJobs, filters, activeView, platformState.favorites],
  );
  const matchingDemoCount = showDemoJobs
    ? filterJobs(
        "saved" === activeView
          ? demoJobs.filter((job) => platformState.favorites.includes(job.id))
          : demoJobs,
        filters,
      ).length
    : 0;
  const isEmployer = platformState.user?.accountType === "employer";
  useEffect(() => {
    loadPlatformState();
  }, []);
  async function loadPlatformState() {
    setPlatformError("");
    try {
      const response = await fetch("/api/platform");
      const responseData = await response.json();
      if (!response.ok) throw Error(responseData.error);
      setPlatformState(responseData);
      {
        if (responseData.profile) {
          setProfileForm({
            ...responseData.profile,
            specialties: JSON.parse(responseData.profile.specialties || "{}"),
            workHistory: parseArray(responseData.profile.workHistory),
            education: parseArray(responseData.profile.education),
          });
        }
      }
    } catch (error) {
      setPlatformError(
        error instanceof Error
          ? error.message
          : translate("app.platform.pomylka_zavantazhennya"),
      );
    } finally {
      setPlatformLoading(false);
    }
  }
  async function loadSearchResults(appendResults = false) {
    let searchParams;
    const requestId = ++searchRequestIdRef.current;
    searchAbortControllerRef.current?.abort();
    const abortController = new AbortController();
    searchAbortControllerRef.current = abortController;
    setSearchLoading(true);
    setSearchError("");
    {
      if (!appendResults) {
        setSearchResults([]);
        setTotalJobs(0);
        setNextCursor(null);
      }
    }
    const queryParams =
      ((searchParams = new URLSearchParams()),
      filters.query && searchParams.set("q", filters.query),
      filters.city && searchParams.set("city", filters.city),
      filters.category !== DEFAULT_FILTERS.category &&
        searchParams.set("category", filters.category),
      filters.remote && searchParams.set("remote", "1"),
      filters.noExperience && searchParams.set("noExperience", "1"),
      filters.minSalary &&
        searchParams.set("minSalary", String(filters.minSalary)),
      filters.schedule && searchParams.set("schedule", filters.schedule),
      "newest" !== filters.sort && searchParams.set("sort", filters.sort),
      searchParams);
    {
      if ("saved" === activeView) {
        queryParams.set("scope", "saved");
      }
    }
    {
      if (appendResults && nextCursor) {
        queryParams.set("cursor", nextCursor);
      }
    }
    try {
      const response = await fetch("/api/jobs?" + queryParams, {
        signal: abortController.signal,
      });
      const responseData = await response.json();
      if (!response.ok)
        throw Error(
          responseData.error || translate("app.platform.pomylka_poshuku"),
        );
      if (requestId !== searchRequestIdRef.current) return;
      setSearchResults((previousResults) =>
        appendResults
          ? Array.from(
              new Map(
                [...previousResults, ...responseData.jobs].map((job) => [
                  job.id,
                  job,
                ]),
              ).values(),
            )
          : responseData.jobs,
      );
      setTotalJobs(responseData.total);
      setNextCursor(responseData.nextCursor);
    } catch (error) {
      if (
        abortController.signal.aborted ||
        requestId !== searchRequestIdRef.current
      )
        return;
      setSearchError(
        error instanceof Error
          ? error.message
          : translate("app.platform.pomylka_poshuku"),
      );
    } finally {
      {
        if (requestId === searchRequestIdRef.current) {
          setSearchLoading(false);
        }
      }
    }
  }
  function navigateToView(view) {
    if (view === "employer") {
      window.location.assign(isEmployer ? "/employer" : "/employers");
      return;
    }
    setActiveView(view);
    setSidebarOpen(false);
    setSelectedJob(null);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  function requireAuthentication() {
    return (
      !!platformState.user || (setActiveModal("auth"), setFormError(""), false)
    );
  }
  function openModal(modal) {
    if (modal === "publish" && !isEmployer) {
      if (!platformState.user) window.location.assign("/employers");
      return;
    }
    {
      if ("about" === modal || "auth" === modal || requireAuthentication()) {
        if ("publish" === modal) {
          setEditingJobId(null);
          setJobForm(EMPTY_JOB);
        }
        if ("profile" === modal) {
          setPendingApplicationJob(null);
        }
        if ("apply" === modal) {
          setApplicationMessage("");
          setFormConfirmed(false);
        }
        setActiveModal(modal);
        setFormError("");
        setFormStep(0);
        setFormConfirmed(false);
      }
    }
  }
  async function savePlatformAction(actionPayload) {
    setSaving(true);
    setFormError("");
    try {
      const response = await fetch("/api/platform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(actionPayload),
      });
      const responseData = await response.json();
      if (!response.ok) {
        {
          if (responseData.needsAuth) {
            setPlatformState((previousState) => ({
              ...EMPTY_PLATFORM_STATE,
              jobs: previousState.jobs,
            }));
            setActiveModal("auth");
          }
        }
        throw Error(
          responseData.error || translate("app.platform.ne_vdalosya_zberehty"),
        );
      }
      await loadPlatformState();
      return responseData;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : translate("app.platform.pomylka");
      setFormError(errorMessage);
      setToastMessage(errorMessage);
      return null;
    } finally {
      setSaving(false);
    }
  }
  async function toggleFavorite(job) {
    {
      if (requireAuthentication()) {
        await savePlatformAction({
          action: "favorite",
          jobId: job.id,
          remove: platformState.favorites.includes(job.id),
        });
      }
    }
  }
  function resetFilters() {
    setQueryInput("");
    setCityInput("");
    setFilters({
      ...DEFAULT_FILTERS,
    });
    history.replaceState(null, "", "/");
  }
  const updateFilter = (filterName, filterValue) =>
    setFilters((previousFilters) => ({
      ...previousFilters,
      [filterName]: filterValue,
    }));
  async function submitProfile(event) {
    {
      if ((event.preventDefault(), formStep < 2)) {
        setFormStep(formStep + 1);
      } else {
        if (isFormConfirmed) {
          if (
            await savePlatformAction({
              action: "profile",
              data: profileForm,
            })
          ) {
            if (pendingApplicationJob) {
              setSelectedJob(pendingApplicationJob);
              setPendingApplicationJob(null);
              setApplicationMessage("");
              setFormConfirmed(false);
              setFormError("");
              setActiveModal("apply");
              setToastMessage(
                translate(
                  "app.platform.rezyume_zberezheno_teper_pidtverd_vidhuk",
                ),
              );
            } else {
              setActiveModal(null);
              navigateToView("profile");
              setToastMessage(translate("app.platform.rezyume_zberezheno"));
            }
          }
        } else {
          setFormError(
            translate("app.platform.pidtverdte_zberezhennya_ankety"),
          );
        }
      }
    }
  }
  async function submitJob(event) {
    {
      if ((event.preventDefault(), formStep < 3)) {
        setFormStep(formStep + 1);
      } else {
        if (isFormConfirmed) {
          if (
            await savePlatformAction({
              action: editingJobId ? "editJob" : "publish",
              jobId: editingJobId,
              data: jobForm,
            })
          ) {
            setActiveModal(null);
            setJobForm(EMPTY_JOB);
            navigateToView("employer");
            setToastMessage(
              translate(
                "app.platform.vakansiyu_nadislano_na_perevirku_moderatoru",
              ),
            );
          }
        } else {
          setFormError(
            translate("app.platform.pidtverdte_aktualnist_vakansiyi"),
          );
        }
      }
    }
  }
  const activeFilterCount =
    Number(filters.remote) +
    Number(filters.noExperience) +
    Number(!!filters.minSalary) +
    Number(!!filters.schedule) +
    Number("all" !== filters.category);
  return {
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
  };
}
export { EMPTY_PLATFORM_STATE, usePlatformController };
