const allowed = new Set(["/", "/recommended", "/employers", "/account?section=profile"]);
export function safeAuthReturnTo(value) {
  return typeof value === "string" && allowed.has(value) ? value : "/";
}
