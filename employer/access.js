import { workflowRole } from "../core/auth/permissions.js";
export function canUseEmployerFeatures(user) {
  return workflowRole(user) === "employer";
}
export function employerStorageKey(userId) {
  return `pratsia:employer-demo:v2:${userId}`;
}
export const employerLoginUrl = '/register?mode=login&accountType=employer&returnTo=%2Femployers';
export const employerRegisterUrl = '/register?accountType=employer&returnTo=%2Femployers';
