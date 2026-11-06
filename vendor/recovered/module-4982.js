// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as d from "./module-6872.js";
import * as e from "./module-1029.js";
import * as f from "./module-5090.js";
import * as g from "./module-2194.js";
class h extends g.o {
  static [d.i] = "SQLiteBaseIntegerBuilder";
  constructor(a, b, c) {
    super(a, b, c);
    this.config.autoIncrement = false;
  }
  primaryKey(a) {
    return a?.autoIncrement && (this.config.autoIncrement = true), this.config.hasDefault = true, super.primaryKey();
  }
}
class i extends g.v {
  static [d.i] = "SQLiteBaseInteger";
  autoIncrement = this.config.autoIncrement;
  getSQLType() {
    return "integer";
  }
}
class j extends h {
  static [d.i] = "SQLiteIntegerBuilder";
  constructor(a) {
    super(a, "number", "SQLiteInteger");
  }
  build(a) {
    return new k(a, this.config);
  }
}
class k extends i {
  static [d.i] = "SQLiteInteger";
}
class l extends h {
  static [d.i] = "SQLiteTimestampBuilder";
  constructor(a, b) {
    super(a, "date", "SQLiteTimestamp");
    this.config.mode = b;
  }
  defaultNow() {
    return this.default((0, e.ll)`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
  }
  build(a) {
    return new m(a, this.config);
  }
}
class m extends i {
  static [d.i] = "SQLiteTimestamp";
  mode = this.config.mode;
  mapFromDriverValue(a) {
    return new Date("timestamp" === this.config.mode ? 1e3 * a : a);
  }
  mapToDriverValue(a) {
    let b = a.getTime();
    return "timestamp" === this.config.mode ? Math.floor(b / 1e3) : b;
  }
}
class n extends h {
  static [d.i] = "SQLiteBooleanBuilder";
  constructor(a, b) {
    super(a, "boolean", "SQLiteBoolean");
    this.config.mode = b;
  }
  build(a) {
    return new o(a, this.config);
  }
}
class o extends i {
  static [d.i] = "SQLiteBoolean";
  mode = this.config.mode;
  mapFromDriverValue(a) {
    return 1 === Number(a);
  }
  mapToDriverValue(a) {
    return +!!a;
  }
}
function p(a, b) {
  let {
    name: c,
    config: d
  } = (0, f.Ll)(a, b);
  return d?.mode === "timestamp" || d?.mode === "timestamp_ms" ? new l(c, d.mode) : d?.mode === "boolean" ? new n(c, d.mode) : new j(c);
}
export { p as nd };
