// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as d from "./module-6872.js";
class e {
  constructor(a, b) {
    this.table = a;
    this.config = b;
    this.name = b.name;
    this.keyAsName = b.keyAsName;
    this.notNull = b.notNull;
    this.default = b.default;
    this.defaultFn = b.defaultFn;
    this.onUpdateFn = b.onUpdateFn;
    this.hasDefault = b.hasDefault;
    this.primary = b.primaryKey;
    this.isUnique = b.isUnique;
    this.uniqueName = b.uniqueName;
    this.uniqueType = b.uniqueType;
    this.dataType = b.dataType;
    this.columnType = b.columnType;
    this.generated = b.generated;
    this.generatedIdentity = b.generatedIdentity;
  }
  static [d.i] = "Column";
  name;
  keyAsName;
  primary;
  notNull;
  default;
  defaultFn;
  onUpdateFn;
  hasDefault;
  isUnique;
  uniqueName;
  uniqueType;
  dataType;
  columnType;
  enumValues = void 0;
  generated = void 0;
  generatedIdentity = void 0;
  config;
  mapFromDriverValue(a) {
    return a;
  }
  mapToDriverValue(a) {
    return a;
  }
  shouldDisableInsert() {
    return void 0 !== this.config.generated && "byDefault" !== this.config.generated.type;
  }
}
export { e as V };
