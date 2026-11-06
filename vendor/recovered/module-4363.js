// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as d from "./module-6872.js";
class e {
  static [d.i] = "ColumnBuilder";
  config;
  constructor(a, b, c) {
    this.config = {
      name: a,
      keyAsName: "" === a,
      notNull: false,
      default: void 0,
      hasDefault: false,
      primaryKey: false,
      isUnique: false,
      uniqueName: void 0,
      uniqueType: void 0,
      dataType: b,
      columnType: c,
      generated: void 0
    };
  }
  $type() {
    return this;
  }
  notNull() {
    return this.config.notNull = true, this;
  }
  default(a) {
    return this.config.default = a, this.config.hasDefault = true, this;
  }
  $defaultFn(a) {
    return this.config.defaultFn = a, this.config.hasDefault = true, this;
  }
  $default = this.$defaultFn;
  $onUpdateFn(a) {
    return this.config.onUpdateFn = a, this.config.hasDefault = true, this;
  }
  $onUpdate = this.$onUpdateFn;
  primaryKey() {
    return this.config.primaryKey = true, this.config.notNull = true, this;
  }
  setName(a) {
    "" === this.config.name && (this.config.name = a);
  }
}
export { e as Q };
