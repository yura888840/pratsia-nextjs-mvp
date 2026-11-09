// Exact pathname overrides. Auth routes are always excluded by SiteFooter.
// Example: "/about": { showMobile: false, note: "Custom footer note" }.
// Supported: hidden, showMobile, note, columns (array of { title, links: [{href,label}] }).
export const footerOverrides = {};
export function footerConfig(pathname) {
  if (["/login", "/register"].some((route) => pathname === route || pathname.startsWith(`${route}/`))) return { hidden: true };
  return { showMobile: true, ...footerOverrides[pathname] };
}
