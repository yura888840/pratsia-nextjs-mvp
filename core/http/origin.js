export function isAllowedOrigin(a) {
  let b = a.headers.get("origin"),
    c = new URL(a.url),
    d = process.env.PRATSIA_ORIGIN || c.protocol + "//" + (a.headers.get("host") || c.host);
  return b === d;
}
