// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as g from "./module-6872.js";
import * as h from "./module-4363.js";
import * as i from "./module-6122.js";
import * as j from "./module-6584.js";
import * as w from "./module-1505.js";
import * as y from "./module-3402.js";
import * as z from "./module-4655.js";
let d, e;
var f;
class k {
  static [g.i] = "PgForeignKeyBuilder";
  reference;
  _onUpdate = "no action";
  _onDelete = "no action";
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
    return this._onUpdate = void 0 === a ? "no action" : a, this;
  }
  onDelete(a) {
    return this._onDelete = void 0 === a ? "no action" : a, this;
  }
  build(a) {
    return new l(a, this);
  }
}
class l {
  constructor(a, b) {
    this.table = a;
    this.reference = b.reference;
    this.onUpdate = b._onUpdate;
    this.onDelete = b._onDelete;
  }
  static [g.i] = "PgForeignKey";
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
      f = [this.table[j.E], ...d, c[0].table[j.E], ...e];
    return a ?? `${f.join("_")}_fk`;
  }
}
function m(a, ...b) {
  return a(...b);
}
function n(a, b) {
  return `${a[j.E]}_${b.join("_")}_unique`;
}
g.i;
g.i;
class o {
  constructor(a, b, c, d) {
    this.table = a;
    this.columns = b;
    this.name = d ?? n(this.table, this.columns.map(a => a.name));
    this.nullsNotDistinct = c;
  }
  static [g.i] = null;
  columns;
  name;
  nullsNotDistinct = false;
  getName() {
    return this.name;
  }
}
function p(a, b, c) {
  for (let d = b; d < a.length; d++) {
    let e = a[d];
    if ("\\" === e) {
      d++;
      continue;
    }
    if ('"' === e) return [a.slice(b, d).replace(/\\/g, ""), d + 1];
    if (!c && ("," === e || "}" === e)) return [a.slice(b, d).replace(/\\/g, ""), d];
  }
  return [a.slice(b).replace(/\\/g, ""), a.length];
}
class q extends h.Q {
  foreignKeyConfigs = [];
  static [g.i] = "PgColumnBuilder";
  array(a) {
    return new t(this.config.name, this, a);
  }
  references(a, b = {}) {
    return this.foreignKeyConfigs.push({
      ref: a,
      actions: b
    }), this;
  }
  unique(a, b) {
    return this.config.isUnique = true, this.config.uniqueName = a, this.config.uniqueType = b?.nulls, this;
  }
  generatedAlwaysAs(a) {
    return this.config.generated = {
      as: a,
      type: "always",
      mode: "stored"
    }, this;
  }
  buildForeignKeys(a, b) {
    return this.foreignKeyConfigs.map(({
      ref: c,
      actions: d
    }) => m((c, d) => {
      let e = new k(() => ({
        columns: [a],
        foreignColumns: [c()]
      }));
      return d.onUpdate && e.onUpdate(d.onUpdate), d.onDelete && e.onDelete(d.onDelete), e.build(b);
    }, c, d));
  }
  buildExtraConfigColumn(a) {
    return new s(a, this.config);
  }
}
class r extends i.V {
  constructor(a, b) {
    b.uniqueName || (b.uniqueName = n(a, [b.name]));
    super(a, b);
    this.table = a;
  }
  static [g.i] = "PgColumn";
}
class s extends r {
  static [g.i] = "ExtraConfigColumn";
  getSQLType() {
    return this.getSQLType();
  }
  indexConfig = {
    order: this.config.order ?? "asc",
    nulls: this.config.nulls ?? "last",
    opClass: this.config.opClass
  };
  defaultConfig = {
    order: "asc",
    nulls: "last",
    opClass: void 0
  };
  asc() {
    return this.indexConfig.order = "asc", this;
  }
  desc() {
    return this.indexConfig.order = "desc", this;
  }
  nullsFirst() {
    return this.indexConfig.nulls = "first", this;
  }
  nullsLast() {
    return this.indexConfig.nulls = "last", this;
  }
  op(a) {
    return this.indexConfig.opClass = a, this;
  }
}
g.i;
class t extends q {
  static [g.i] = "PgArrayBuilder";
  constructor(a, b, c) {
    super(a, "array", "PgArray");
    this.config.baseBuilder = b;
    this.config.size = c;
  }
  build(a) {
    let b = this.config.baseBuilder.build(a);
    return new u(a, this.config, b);
  }
}
class u extends r {
  constructor(a, b, c, d) {
    super(a, b);
    this.baseColumn = c;
    this.range = d;
    this.size = b.size;
  }
  size;
  static [g.i] = "PgArray";
  getSQLType() {
    return `${this.baseColumn.getSQLType()}[${"number" == typeof this.size ? this.size : ""}]`;
  }
  mapFromDriverValue(a) {
    return "string" == typeof a && (a = function (a) {
      let [b] = function a(b, c = 0) {
        let d = [],
          e = c,
          f = false;
        for (; e < b.length;) {
          let g = b[e];
          if ("," === g) {
            (f || e === c) && d.push("");
            f = true;
            e++;
            continue;
          }
          if (f = false, "\\" === g) {
            e += 2;
            continue;
          }
          if ('"' === g) {
            let [a, c] = p(b, e + 1, true);
            d.push(a);
            e = c;
            continue;
          }
          if ("}" === g) return [d, e + 1];
          if ("{" === g) {
            let [c, f] = a(b, e + 1);
            d.push(c);
            e = f;
            continue;
          }
          let [h, i] = p(b, e, false);
          d.push(h);
          e = i;
        }
        return [d, e];
      }(a, 1);
      return b;
    }(a)), a.map(a => this.baseColumn.mapFromDriverValue(a));
  }
  mapToDriverValue(a, b = false) {
    let c = a.map(a => null === a ? null : (0, g.is)(this.baseColumn, u) ? this.baseColumn.mapToDriverValue(a, true) : this.baseColumn.mapToDriverValue(a));
    return b ? c : function a(b) {
      return `{${b.map(b => Array.isArray(b) ? a(b) : "string" == typeof b ? `"${b.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"` : `${b}`).join(",")}}`;
    }(c);
  }
}
g.i;
g.i;
let v = Symbol.for("drizzle:isPgEnum");
g.i;
g.i;
let x = (a, b) => d ? (e || (e = d.trace.getTracer("drizzle-orm", "0.45.2")), m((c, d) => d.startActiveSpan(a, a => {
  try {
    return b(a);
  } catch (b) {
    throw a.setStatus({
      code: c.SpanStatusCode.ERROR,
      message: b instanceof Error ? b.message : "Unknown error"
    }), b;
  } finally {
    a.end();
  }
}), d, e)) : b();
function A(a) {
  return null != a && "function" == typeof a.getSQL;
}
g.i;
class B {
  static [g.i] = "StringChunk";
  value;
  constructor(a) {
    this.value = Array.isArray(a) ? a : [a];
  }
  getSQL() {
    return new C([this]);
  }
}
class C {
  constructor(a) {
    for (const b of (this.queryChunks = a, a)) if ((0, g.is)(b, z.XI)) {
      const a = b[z.XI.Symbol.Schema];
      this.usedTables.push(void 0 === a ? b[z.XI.Symbol.Name] : a + "." + b[z.XI.Symbol.Name]);
    }
  }
  static [g.i] = "SQL";
  decoder = F;
  shouldInlineParams = false;
  usedTables = [];
  append(a) {
    return this.queryChunks.push(...a.queryChunks), this;
  }
  toQuery(a) {
    return x("drizzle.buildSQL", b => {
      let c = this.buildQueryFromSourceParams(this.queryChunks, a);
      return b?.setAttributes({
        "drizzle.query.text": c.sql,
        "drizzle.query.params": JSON.stringify(c.params)
      }), c;
    });
  }
  buildQueryFromSourceParams(a, b) {
    let c = Object.assign({}, b, {
        inlineParams: b.inlineParams || this.shouldInlineParams,
        paramStartIndex: b.paramStartIndex || {
          value: 0
        }
      }),
      {
        casing: d,
        escapeName: e,
        escapeParam: f,
        prepareTyping: h,
        inlineParams: j,
        paramStartIndex: k
      } = c;
    var l = a.map(a => {
      if ((0, g.is)(a, B)) return {
        sql: a.value.join(""),
        params: []
      };
      if ((0, g.is)(a, D)) return {
        sql: e(a.value),
        params: []
      };
      if (void 0 === a) return {
        sql: "",
        params: []
      };
      if (Array.isArray(a)) {
        let b = [new B("(")];
        for (let [c, d] of a.entries()) {
          b.push(d);
          c < a.length - 1 && b.push(new B(", "));
        }
        return b.push(new B(")")), this.buildQueryFromSourceParams(b, c);
      }
      if ((0, g.is)(a, C)) return this.buildQueryFromSourceParams(a.queryChunks, {
        ...c,
        inlineParams: j || a.shouldInlineParams
      });
      if ((0, g.is)(a, z.XI)) {
        let b = a[z.XI.Symbol.Schema],
          c = a[z.XI.Symbol.Name];
        return {
          sql: void 0 === b || a[z.HE] ? e(c) : e(b) + "." + e(c),
          params: []
        };
      }
      if ((0, g.is)(a, i.V)) {
        let c = d.getColumnCasing(a);
        if ("indexes" === b.invokeSource) return {
          sql: e(c),
          params: []
        };
        let f = a.table[z.XI.Symbol.Schema];
        return {
          sql: a.table[z.HE] || void 0 === f ? e(a.table[z.XI.Symbol.Name]) + "." + e(c) : e(f) + "." + e(a.table[z.XI.Symbol.Name]) + "." + e(c),
          params: []
        };
      }
      if ((0, g.is)(a, O)) {
        let b = a[y.n].schema,
          c = a[y.n].name;
        return {
          sql: void 0 === b || a[y.n].isAlias ? e(c) : e(b) + "." + e(c),
          params: []
        };
      }
      if ((0, g.is)(a, H)) {
        if ((0, g.is)(a.value, L)) return {
          sql: f(k.value++, a),
          params: [a],
          typings: ["none"]
        };
        let b = null === a.value ? null : a.encoder.mapToDriverValue(a.value);
        if ((0, g.is)(b, C)) return this.buildQueryFromSourceParams([b], c);
        if (j) return {
          sql: this.mapInlineParam(b, c),
          params: []
        };
        let d = ["none"];
        return h && (d = [h(a.encoder)]), {
          sql: f(k.value++, b),
          params: [b],
          typings: d
        };
      }
      return (0, g.is)(a, L) ? {
        sql: f(k.value++, a),
        params: [a],
        typings: ["none"]
      } : (0, g.is)(a, C.Aliased) && void 0 !== a.fieldAlias ? {
        sql: e(a.fieldAlias),
        params: []
      } : (0, g.is)(a, w.n) ? a._.isWith ? {
        sql: e(a._.alias),
        params: []
      } : this.buildQueryFromSourceParams([new B("("), a._.sql, new B(") "), new D(a._.alias)], c) : a && "function" == typeof a && v in a && true === a[v] ? a.schema ? {
        sql: e(a.schema) + "." + e(a.enumName),
        params: []
      } : {
        sql: e(a.enumName),
        params: []
      } : A(a) ? a.shouldOmitSQLParens?.() ? this.buildQueryFromSourceParams([a.getSQL()], c) : this.buildQueryFromSourceParams([new B("("), a.getSQL(), new B(")")], c) : j ? {
        sql: this.mapInlineParam(a, c),
        params: []
      } : {
        sql: f(k.value++, a),
        params: [a],
        typings: ["none"]
      };
    });
    let m = {
      sql: "",
      params: []
    };
    for (let a of l) {
      m.sql += a.sql;
      m.params.push(...a.params);
      a.typings?.length && (m.typings || (m.typings = []), m.typings.push(...a.typings));
    }
    return m;
  }
  mapInlineParam(a, {
    escapeString: b
  }) {
    if (null === a) return "null";
    if ("number" == typeof a || "boolean" == typeof a) return a.toString();
    if ("string" == typeof a) return b(a);
    if ("object" == typeof a) {
      let c = a.toString();
      return "[object Object]" === c ? b(JSON.stringify(a)) : b(c);
    }
    throw Error("Unexpected param value: " + a);
  }
  getSQL() {
    return this;
  }
  as(a) {
    return void 0 === a ? this : new C.Aliased(this, a);
  }
  mapWith(a) {
    return this.decoder = "function" == typeof a ? {
      mapFromDriverValue: a
    } : a, this;
  }
  inlineParams() {
    return this.shouldInlineParams = true, this;
  }
  if(a) {
    return a ? this : void 0;
  }
}
class D {
  constructor(a) {
    this.value = a;
  }
  static [g.i] = "Name";
  brand;
  getSQL() {
    return new C([this]);
  }
}
function E(a) {
  return "object" == typeof a && null !== a && "mapToDriverValue" in a && "function" == typeof a.mapToDriverValue;
}
let F = {
    mapFromDriverValue: a => a
  },
  G = {
    mapToDriverValue: a => a
  };
({
  ...F,
  ...G
});
class H {
  constructor(a, b = G) {
    this.value = a;
    this.encoder = b;
  }
  static [g.i] = "Param";
  brand;
  getSQL() {
    return new C([this]);
  }
}
function I(a, ...b) {
  let c = [];
  for (let [d, e] of ((b.length > 0 || a.length > 0 && "" !== a[0]) && c.push(new B(a[0])), b.entries())) c.push(e, new B(a[d + 1]));
  return new C(c);
}
(f = I || (I = {})).empty = function () {
  return new C([]);
};
f.fromList = function (a) {
  return new C(a);
};
f.raw = function (a) {
  return new C([new B(a)]);
};
f.join = function (a, b) {
  let c = [];
  for (let [d, e] of a.entries()) {
    d > 0 && void 0 !== b && c.push(b);
    c.push(e);
  }
  return new C(c);
};
f.identifier = function (a) {
  return new D(a);
};
f.placeholder = function (a) {
  return new L(a);
};
f.param = function (a, b) {
  return new H(a, b);
};
var J = C || (C = {});
class K {
  constructor(a, b) {
    this.sql = a;
    this.fieldAlias = b;
  }
  static [g.i] = "SQL.Aliased";
  isSelectionField = false;
  getSQL() {
    return this.sql;
  }
  clone() {
    return new K(this.sql, this.fieldAlias);
  }
}
J.Aliased = K;
class L {
  constructor(a) {
    this.name = a;
  }
  static [g.i] = "Placeholder";
  getSQL() {
    return new C([this]);
  }
}
function M(a, b) {
  return a.map(a => {
    if ((0, g.is)(a, L)) {
      if (!(a.name in b)) throw Error(`No value for placeholder "${a.name}" was provided`);
      return b[a.name];
    }
    if ((0, g.is)(a, H) && (0, g.is)(a.value, L)) {
      if (!(a.value.name in b)) throw Error(`No value for placeholder "${a.value.name}" was provided`);
      return a.encoder.mapToDriverValue(b[a.value.name]);
    }
    return a;
  });
}
let N = Symbol.for("drizzle:IsDrizzleView");
class O {
  static [g.i] = "View";
  [y.n];
  [N] = true;
  constructor({
    name: a,
    schema: b,
    selectedFields: c,
    query: d
  }) {
    this[y.n] = {
      name: a,
      originalName: a,
      schema: b,
      selectedFields: c,
      query: d,
      isExisting: !d,
      isAlias: false
    };
  }
  getSQL() {
    return new C([this]);
  }
}
i.V.prototype.getSQL = function () {
  return new C([this]);
};
z.XI.prototype.getSQL = function () {
  return new C([this]);
};
w.n.prototype.getSQL = function () {
  return new C([this]);
};
export { H as Iw };
export { L as Or };
export { C as Xs };
export { B as DJ };
export { O as Ss };
export { M as Ct };
export { E as eG };
export { A as qt };
export { I as ll };
