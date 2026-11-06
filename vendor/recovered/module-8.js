// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as d from "./module-6872.js";
class e {
  constructor(a, b) {
    this.name = a;
    this.unique = b;
  }
  static [d.i] = "SQLiteIndexBuilderOn";
  on(...a) {
    return new f(this.name, a, this.unique);
  }
}
class f {
  static [d.i] = "SQLiteIndexBuilder";
  config;
  constructor(a, b, c) {
    this.config = {
      name: a,
      columns: b,
      unique: c,
      where: void 0
    };
  }
  where(a) {
    return this.config.where = a, this;
  }
  build(a) {
    return new g(this.config, a);
  }
}
class g {
  static [d.i] = "SQLiteIndex";
  config;
  constructor(a, b) {
    this.config = {
      ...a,
      table: b
    };
  }
}
function h(a) {
  return new e(a, false);
}
function i(a) {
  return new e(a, true);
}
export { i as GL };
export { h as Pe };
