import { workflowRole } from "../core/auth/permissions.js";
export function canUseCandidateFeatures(user) {
  return workflowRole(user) === "candidate";
}
export function candidateStorageKey(user) {
  return `pratsia:candidate-demo:v2:${user?.userId || "guest"}`;
}
export const protectedCandidateViews = ["profile", "applications"];
