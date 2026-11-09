import { createResume, isResumeReady } from "../resume/model.js";
export const emptyCandidateState = () => ({
  resume: createResume(),
  favorites: [],
  applications: [],
});
export function restoreCandidateState(value, vacancies) {
  const validIds = new Set(vacancies.map((job) => job.id));
  return {
    resume: createResume(value?.resume),
    favorites: [
      ...new Set(
        (Array.isArray(value?.favorites) ? value.favorites : []).filter((id) =>
          validIds.has(id),
        ),
      ),
    ],
    applications: [
      ...new Map(
        (Array.isArray(value?.applications) ? value.applications : [])
          .filter((item) => item && validIds.has(item.vacancyId))
          .map((item) => [
            item.vacancyId,
            {
              vacancyId: item.vacancyId,
              resume: createResume(item.resume),
              appliedAt: String(item.appliedAt || ""),
            },
          ]),
      ).values(),
    ],
  };
}
export function applyToVacancy(
  state,
  vacancyId,
  appliedAt = new Date().toISOString(),
) {
  if (!isResumeReady(state.resume)) throw new Error("resume-required");
  if (state.applications.some((item) => item.vacancyId === vacancyId))
    return state;
  return {
    ...state,
    applications: [
      ...state.applications,
      { vacancyId, appliedAt, resume: createResume(state.resume) },
    ],
  };
}
