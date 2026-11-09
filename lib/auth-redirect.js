const allowed = new Set(["/", "/recommended", "/account?section=profile"]);
export function safeAuthReturnTo(value) {
  return typeof value === "string" && allowed.has(value) ? value : "/";
}
