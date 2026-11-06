// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
let d = Symbol.for("drizzle:entityKind");
function e(a, b) {
  if (!a || "object" != typeof a) return false;
  if (a instanceof b) return true;
  if (!Object.prototype.hasOwnProperty.call(b, d)) throw Error(`Class "${b.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`);
  let c = Object.getPrototypeOf(a).constructor;
  if (c) for (; c;) {
    if (d in c && c[d] === b[d]) return true;
    c = Object.getPrototypeOf(c);
  }
  return false;
}
Symbol.for("drizzle:hasOwnEntityKind");
export { d as i };
export { e as is };
