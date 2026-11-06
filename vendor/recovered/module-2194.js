// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as d from "./module-4363.js";
import * as e from "./module-6122.js";
import * as f from "./module-6872.js";
import * as g from "./module-6584.js";
class h {
  static [f.i] = "SQLiteForeignKeyBuilder";
  reference;
  _onUpdate;
  _onDelete;
  constructor(a, b) {
    this.reference = () => {
      let {
        name: b,
        columns: c,
        foreignColumns: d
      } = a();
      return {
        name: b,
        columns: c,
        foreignTable: d[0].table,
        foreignColumns: d
      };
    };
    b && (this._onUpdate = b.onUpdate, this._onDelete = b.onDelete);
  }
  onUpdate(a) {
    return this._onUpdate = a, this;
  }
  onDelete(a) {
    return this._onDelete = a, this;
  }
  build(a) {
    return new i(a, this);
  }
}
class i {
  constructor(a, b) {
    this.table = a;
    this.reference = b.reference;
    this.onUpdate = b._onUpdate;
    this.onDelete = b._onDelete;
  }
  static [f.i] = "SQLiteForeignKey";
  reference;
  onUpdate;
  onDelete;
  getName() {
    let {
        name: a,
        columns: b,
        foreignColumns: c
      } = this.reference(),
      d = b.map(a => a.name),
      e = c.map(a => a.name),
      f = [this.table[g.E], ...d, c[0].table[g.E], ...e];
    return a ?? `${f.join("_")}_fk`;
  }
}
function j(a, b) {
  return `${a[g.E]}_${b.join("_")}_unique`;
}
f.i;
f.i;
class k {
  constructor(a, b, c) {
    this.table = a;
    this.columns = b;
    this.name = c ?? j(this.table, this.columns.map(a => a.name));
  }
  static [f.i] = null;
  columns;
  name;
  getName() {
    return this.name;
  }
}
class l extends d.Q {
  static [f.i] = "SQLiteColumnBuilder";
  foreignKeyConfigs = [];
  references(a, b = {}) {
    return this.foreignKeyConfigs.push({
      ref: a,
      actions: b
    }), this;
  }
  unique(a) {
    return this.config.isUnique = true, this.config.uniqueName = a, this;
  }
  generatedAlwaysAs(a, b) {
    return this.config.generated = {
      as: a,
      type: "always",
      mode: b?.mode ?? "virtual"
    }, this;
  }
  buildForeignKeys(a, b) {
    return this.foreignKeyConfigs.map(({
      ref: c,
      actions: d
    }) => {
      let e;
      return e = new h(() => ({
        columns: [a],
        foreignColumns: [c()]
      })), d.onUpdate && e.onUpdate(d.onUpdate), d.onDelete && e.onDelete(d.onDelete), e.build(b);
    });
  }
}
class m extends e.V {
  constructor(a, b) {
    b.uniqueName || (b.uniqueName = j(a, [b.name]));
    super(a, b);
    this.table = a;
  }
  static [f.i] = "SQLiteColumn";
}
export { m as v };
export { l as o };
