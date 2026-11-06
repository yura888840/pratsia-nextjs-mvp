// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as d from "./module-6872.js";
class e {
  static [d.i] = "Subquery";
  constructor(a, b, c, d = false, e = []) {
    this._ = {
      brand: "Subquery",
      sql: a,
      selectedFields: b,
      alias: c,
      isWith: d,
      usedTables: e
    };
  }
}
class f extends e {
  static [d.i] = "WithSubquery";
}
export { f as J };
export { e as n };
