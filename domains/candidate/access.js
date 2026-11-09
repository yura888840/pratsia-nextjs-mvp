export function canUseCandidateFeatures(user) {
  return Boolean(user?.userId && user.accountType === "candidate");
}
export function candidateStorageKey(user) {
  return `pratsia:candidate-demo:v2:${user?.userId || "guest"}`;
}
export const protectedCandidateViews = ["profile", "applications"];
