// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as d from "./module-6872.js";
import * as e from "./module-5090.js";
import * as f from "./module-2194.js";
class g extends f.o {
  static [d.i] = "SQLiteTextBuilder";
  constructor(a, b) {
    super(a, "string", "SQLiteText");
    this.config.enumValues = b.enum;
    this.config.length = b.length;
  }
  build(a) {
    return new h(a, this.config);
  }
}
class h extends f.v {
  static [d.i] = "SQLiteText";
  enumValues = this.config.enumValues;
  length = this.config.length;
  constructor(a, b) {
    super(a, b);
  }
  getSQLType() {
    return `text${this.config.length ? `(${this.config.length})` : ""}`;
  }
}
class i extends f.o {
  static [d.i] = "SQLiteTextJsonBuilder";
  constructor(a) {
    super(a, "json", "SQLiteTextJson");
  }
  build(a) {
    return new j(a, this.config);
  }
}
class j extends f.v {
  static [d.i] = "SQLiteTextJson";
  getSQLType() {
    return "text";
  }
  mapFromDriverValue(a) {
    return JSON.parse(a);
  }
  mapToDriverValue(a) {
    return JSON.stringify(a);
  }
}
function k(a, b = {}) {
  let {
    name: c,
    config: d
  } = (0, e.Ll)(a, b);
  return "json" === d.mode ? new i(c) : new g(c, d);
}
export { k as Qq };
