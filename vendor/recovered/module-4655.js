// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as d from "./module-6872.js";
import * as e from "./module-6584.js";
let f = Symbol.for("drizzle:Schema"),
  g = Symbol.for("drizzle:Columns"),
  h = Symbol.for("drizzle:ExtraConfigColumns"),
  i = Symbol.for("drizzle:OriginalName"),
  j = Symbol.for("drizzle:BaseName"),
  k = Symbol.for("drizzle:IsAlias"),
  l = Symbol.for("drizzle:ExtraConfigBuilder"),
  m = Symbol.for("drizzle:IsDrizzleTable");
class n {
  static [d.i] = "Table";
  static Symbol = {
    Name: e.E,
    Schema: f,
    OriginalName: i,
    Columns: g,
    ExtraConfigColumns: h,
    BaseName: j,
    IsAlias: k,
    ExtraConfigBuilder: l
  };
  [e.E];
  [i];
  [f];
  [g];
  [h];
  [j];
  [k] = false;
  [m] = true;
  [l] = void 0;
  constructor(a, b, c) {
    this[e.E] = this[i] = a;
    this[f] = b;
    this[j] = c;
  }
}
function o(a) {
  return a[e.E];
}
function p(a) {
  return `${a[f] ?? "public"}.${a[e.E]}`;
}
export { k as HE };
export { o as Io };
export { p as Lf };
export { n as XI };
export { g as e };
