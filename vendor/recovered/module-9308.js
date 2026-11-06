// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as d from "./module-6872.js";
import * as h from "./module-4655.js";
import * as i from "./module-6122.js";
import * as o from "./module-2811.js";
import * as p from "./module-2486.js";
import * as q from "./module-1029.js";
import * as w from "./module-3402.js";
import * as D from "./module-1505.js";
import * as M from "./module-2194.js";
import * as N from "./module-5574.js";
import * as O from "./module-5090.js";
class e {
  static [d.i] = "ConsoleLogWriter";
  write(a) {
    console.log(a);
  }
}
class f {
  static [d.i] = "DefaultLogger";
  writer;
  constructor(a) {
    this.writer = a?.writer ?? new e();
  }
  logQuery(a, b) {
    let c = b.map(a => {
        try {
          return JSON.stringify(a);
        } catch {
          return String(a);
        }
      }),
      d = c.length ? ` -- params: [${c.join(", ")}]` : "";
    this.writer.write(`Query: ${a}${d}`);
  }
}
class g {
  static [d.i] = "NoopLogger";
  logQuery() {}
}
let j = Symbol.for("drizzle:PgInlineForeignKeys"),
  k = Symbol.for("drizzle:EnableRLS");
class l extends h.XI {
  static [d.i] = "PgTable";
  static Symbol = Object.assign({}, h.XI.Symbol, {
    InlineForeignKeys: j,
    EnableRLS: k
  });
  [j] = [];
  [k] = false;
  [h.XI.Symbol.ExtraConfigBuilder] = void 0;
  [h.XI.Symbol.ExtraConfigColumns] = {};
}
class m {
  static [d.i] = "PgPrimaryKeyBuilder";
  columns;
  name;
  constructor(a, b) {
    this.columns = a;
    this.name = b;
  }
  build(a) {
    return new n(a, this.columns, this.name);
  }
}
class n {
  constructor(a, b, c) {
    this.table = a;
    this.columns = b;
    this.name = c;
  }
  static [d.i] = "PgPrimaryKey";
  columns;
  name;
  getName() {
    return this.name ?? `${this.table[l.Symbol.Name]}_${this.columns.map(a => a.name).join("_")}_pk`;
  }
}
class r {
  constructor(a, b, c) {
    this.sourceTable = a;
    this.referencedTable = b;
    this.relationName = c;
    this.referencedTableName = b[h.XI.Symbol.Name];
  }
  static [d.i] = "Relation";
  referencedTableName;
  fieldName;
}
class s {
  constructor(a, b) {
    this.table = a;
    this.config = b;
  }
  static [d.i] = "Relations";
}
class t extends r {
  constructor(a, b, c, d) {
    super(a, b, c?.relationName);
    this.config = c;
    this.isNullable = d;
  }
  static [d.i] = "One";
  withFieldName(a) {
    let b = new t(this.sourceTable, this.referencedTable, this.config, this.isNullable);
    return b.fieldName = a, b;
  }
}
class u extends r {
  constructor(a, b, c) {
    super(a, b, c?.relationName);
    this.config = c;
  }
  static [d.i] = "Many";
  withFieldName(a) {
    let b = new u(this.sourceTable, this.referencedTable, this.config);
    return b.fieldName = a, b;
  }
}
function v(a) {
  return {
    one: function (b, c) {
      return new t(a, b, c, c?.fields.reduce((a, b) => a && b.notNull, true) ?? false);
    },
    many: function (b, c) {
      return new u(a, b, c);
    }
  };
}
class x {
  constructor(a) {
    this.table = a;
  }
  static [d.i] = "ColumnAliasProxyHandler";
  get(a, b) {
    return "table" === b ? this.table : a[b];
  }
}
class y {
  constructor(a, b) {
    this.alias = a;
    this.replaceOriginalName = b;
  }
  static [d.i] = "TableAliasProxyHandler";
  get(a, b) {
    if (b === h.XI.Symbol.IsAlias) return true;
    if (b === h.XI.Symbol.Name || this.replaceOriginalName && b === h.XI.Symbol.OriginalName) return this.alias;
    if (b === w.n) return {
      ...a[w.n],
      name: this.alias,
      isAlias: true
    };
    if (b === h.XI.Symbol.Columns) {
      let b = a[h.XI.Symbol.Columns];
      if (!b) return b;
      let c = {};
      return Object.keys(b).map(d => {
        c[d] = new Proxy(b[d], new x(new Proxy(a, this)));
      }), c;
    }
    let c = a[b];
    return (0, d.is)(c, i.V) ? new Proxy(c, new x(new Proxy(a, this))) : c;
  }
}
function z(a, b) {
  return new Proxy(a, new y(b, false));
}
function A(a, b) {
  return new Proxy(a, new x(new Proxy(a.table, new y(b, false))));
}
function B(a, b) {
  return new q.Xs.Aliased(C(a.sql, b), a.fieldAlias);
}
function C(a, b) {
  return q.ll.join(a.queryChunks.map(a => (0, d.is)(a, i.V) ? A(a, b) : (0, d.is)(a, q.Xs) ? C(a, b) : (0, d.is)(a, q.Xs.Aliased) ? B(a, b) : a));
}
d.i;
class E {
  static [d.i] = "SelectionProxyHandler";
  config;
  constructor(a) {
    this.config = {
      ...a
    };
  }
  get(a, b) {
    if ("_" === b) return {
      ...a._,
      selectedFields: new Proxy(a._.selectedFields, this)
    };
    if (b === w.n) return {
      ...a[w.n],
      selectedFields: new Proxy(a[w.n].selectedFields, this)
    };
    if ("symbol" == typeof b) return a[b];
    let c = ((0, d.is)(a, D.n) ? a._.selectedFields : (0, d.is)(a, q.Ss) ? a[w.n].selectedFields : a)[b];
    if ((0, d.is)(c, q.Xs.Aliased)) {
      if ("sql" === this.config.sqlAliasedBehavior && !c.isSelectionField) return c.sql;
      let a = c.clone();
      return a.isSelectionField = true, a;
    }
    if ((0, d.is)(c, q.Xs)) {
      if ("sql" === this.config.sqlBehavior) return c;
      throw Error(`You tried to reference "${b}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`);
    }
    return (0, d.is)(c, i.V) ? this.config.alias ? new Proxy(c, new x(new Proxy(c.table, new y(this.config.alias, this.config.replaceOriginalName ?? false)))) : c : "object" != typeof c || null === c ? c : new Proxy(c, new E(this.config));
  }
}
function F(a) {
  return (a.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []).map(a => a.toLowerCase()).join("_");
}
function G(a) {
  return (a.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []).reduce((a, b, c) => a + (0 === c ? b.toLowerCase() : `${b[0].toUpperCase()}${b.slice(1)}`), "");
}
function H(a) {
  return a;
}
class I {
  static [d.i] = "CasingCache";
  cache = {};
  cachedTables = {};
  convert;
  constructor(a) {
    this.convert = "snake_case" === a ? F : "camelCase" === a ? G : H;
  }
  getColumnCasing(a) {
    if (!a.keyAsName) return a.name;
    let b = a.table[h.XI.Symbol.Schema] ?? "public",
      c = a.table[h.XI.Symbol.OriginalName],
      d = `${b}.${c}.${a.name}`;
    return this.cache[d] || this.cacheTable(a.table), this.cache[d];
  }
  cacheTable(a) {
    let b = a[h.XI.Symbol.Schema] ?? "public",
      c = a[h.XI.Symbol.OriginalName],
      d = `${b}.${c}`;
    if (!this.cachedTables[d]) {
      for (let b of Object.values(a[h.XI.Symbol.Columns])) {
        let a = `${d}.${b.name}`;
        this.cache[a] = this.convert(b.name);
      }
      this.cachedTables[d] = true;
    }
  }
  clearCache() {
    this.cache = {};
    this.cachedTables = {};
  }
}
class J extends Error {
  static [d.i] = "DrizzleError";
  constructor({
    message: a,
    cause: b
  }) {
    super(a);
    this.name = "DrizzleError";
    this.cause = b;
  }
}
class K extends Error {
  constructor(a, b, c) {
    super(`Failed query: ${a}
params: ${b}`);
    this.query = a;
    this.params = b;
    this.cause = c;
    Error.captureStackTrace(this, K);
    c && (this.cause = c);
  }
}
class L extends J {
  static [d.i] = "TransactionRollbackError";
  constructor() {
    super({
      message: "Rollback"
    });
  }
}
class P extends q.Ss {
  static [d.i] = "SQLiteViewBase";
}
class Q {
  static [d.i] = "SQLiteDialect";
  casing;
  constructor(a) {
    this.casing = new I(a?.casing);
  }
  escapeName(a) {
    return `"${a.replace(/"/g, '""')}"`;
  }
  escapeParam(a) {
    return "?";
  }
  escapeString(a) {
    return `'${a.replace(/'/g, "''")}'`;
  }
  buildWithCTE(a) {
    if (!a?.length) return;
    let b = [(0, q.ll)`with `];
    for (let [c, d] of a.entries()) {
      b.push((0, q.ll)`${q.ll.identifier(d._.alias)} as (${d._.sql})`);
      c < a.length - 1 && b.push((0, q.ll)`, `);
    }
    return b.push((0, q.ll)` `), q.ll.join(b);
  }
  buildDeleteQuery({
    table: a,
    where: b,
    returning: c,
    withList: d,
    limit: e,
    orderBy: f
  }) {
    let g = this.buildWithCTE(d),
      h = c ? (0, q.ll)` returning ${this.buildSelection(c, {
        isSingleTable: true
      })}` : void 0,
      i = b ? (0, q.ll)` where ${b}` : void 0,
      j = this.buildOrderBy(f),
      k = this.buildLimit(e);
    return (0, q.ll)`${g}delete from ${a}${i}${h}${j}${k}`;
  }
  buildUpdateSet(a, b) {
    let c = a[h.XI.Symbol.Columns],
      e = Object.keys(c).filter(a => void 0 !== b[a] || c[a]?.onUpdateFn !== void 0),
      f = e.length;
    return q.ll.join(e.flatMap((a, e) => {
      let g = c[a],
        h = g.onUpdateFn?.(),
        i = b[a] ?? ((0, d.is)(h, q.Xs) ? h : q.ll.param(h, g)),
        j = (0, q.ll)`${q.ll.identifier(this.casing.getColumnCasing(g))} = ${i}`;
      return e < f - 1 ? [j, q.ll.raw(", ")] : [j];
    }));
  }
  buildUpdateQuery({
    table: a,
    set: b,
    where: c,
    returning: d,
    withList: e,
    joins: f,
    from: g,
    limit: h,
    orderBy: i
  }) {
    let j = this.buildWithCTE(e),
      k = this.buildUpdateSet(a, b),
      l = g && q.ll.join([q.ll.raw(" from "), this.buildFromTable(g)]),
      m = this.buildJoins(f),
      n = d ? (0, q.ll)` returning ${this.buildSelection(d, {
        isSingleTable: true
      })}` : void 0,
      o = c ? (0, q.ll)` where ${c}` : void 0,
      p = this.buildOrderBy(i),
      r = this.buildLimit(h);
    return (0, q.ll)`${j}update ${a} set ${k}${l}${m}${o}${n}${p}${r}`;
  }
  buildSelection(a, {
    isSingleTable: b = false
  } = {}) {
    let c = a.length,
      e = a.flatMap(({
        field: a
      }, e) => {
        let f = [];
        if ((0, d.is)(a, q.Xs.Aliased) && a.isSelectionField) f.push(q.ll.identifier(a.fieldAlias));else if ((0, d.is)(a, q.Xs.Aliased) || (0, d.is)(a, q.Xs)) {
          let c = (0, d.is)(a, q.Xs.Aliased) ? a.sql : a;
          b ? f.push(new q.Xs(c.queryChunks.map(a => (0, d.is)(a, i.V) ? q.ll.identifier(this.casing.getColumnCasing(a)) : a))) : f.push(c);
          (0, d.is)(a, q.Xs.Aliased) && f.push((0, q.ll)` as ${q.ll.identifier(a.fieldAlias)}`);
        } else if ((0, d.is)(a, i.V)) {
          let c = a.table[h.XI.Symbol.Name];
          "SQLiteNumericBigInt" === a.columnType ? b ? f.push((0, q.ll)`cast(${q.ll.identifier(this.casing.getColumnCasing(a))} as text)`) : f.push((0, q.ll)`cast(${q.ll.identifier(c)}.${q.ll.identifier(this.casing.getColumnCasing(a))} as text)`) : b ? f.push(q.ll.identifier(this.casing.getColumnCasing(a))) : f.push((0, q.ll)`${q.ll.identifier(c)}.${q.ll.identifier(this.casing.getColumnCasing(a))}`);
        } else if ((0, d.is)(a, D.n)) {
          let b = Object.entries(a._.selectedFields);
          if (1 === b.length) {
            let c = b[0][1],
              e = (0, d.is)(c, q.Xs) ? c.decoder : (0, d.is)(c, i.V) ? {
                mapFromDriverValue: a => c.mapFromDriverValue(a)
              } : c.sql.decoder;
            e && (a._.sql.decoder = e);
          }
          f.push(a);
        }
        return e < c - 1 && f.push((0, q.ll)`, `), f;
      });
    return q.ll.join(e);
  }
  buildJoins(a) {
    if (!a || 0 === a.length) return;
    let b = [];
    if (a) for (let [c, e] of a.entries()) {
      0 === c && b.push((0, q.ll)` `);
      let f = e.table,
        g = e.on ? (0, q.ll)` on ${e.on}` : void 0;
      if ((0, d.is)(f, N.jo)) {
        let a = f[N.jo.Symbol.Name],
          c = f[N.jo.Symbol.Schema],
          d = f[N.jo.Symbol.OriginalName],
          h = a === d ? void 0 : e.alias;
        b.push((0, q.ll)`${q.ll.raw(e.joinType)} join ${c ? (0, q.ll)`${q.ll.identifier(c)}.` : void 0}${q.ll.identifier(d)}${h && (0, q.ll)` ${q.ll.identifier(h)}`}${g}`);
      } else b.push((0, q.ll)`${q.ll.raw(e.joinType)} join ${f}${g}`);
      c < a.length - 1 && b.push((0, q.ll)` `);
    }
    return q.ll.join(b);
  }
  buildLimit(a) {
    return "object" == typeof a || "number" == typeof a && a >= 0 ? (0, q.ll)` limit ${a}` : void 0;
  }
  buildOrderBy(a) {
    let b = [];
    if (a) for (let [c, d] of a.entries()) {
      b.push(d);
      c < a.length - 1 && b.push((0, q.ll)`, `);
    }
    return b.length > 0 ? (0, q.ll)` order by ${q.ll.join(b)}` : void 0;
  }
  buildFromTable(a) {
    return (0, d.is)(a, h.XI) && a[h.XI.Symbol.IsAlias] ? (0, q.ll)`${(0, q.ll)`${q.ll.identifier(a[h.XI.Symbol.Schema] ?? "")}.`.if(a[h.XI.Symbol.Schema])}${q.ll.identifier(a[h.XI.Symbol.OriginalName])} ${q.ll.identifier(a[h.XI.Symbol.Name])}` : a;
  }
  buildSelectQuery({
    withList: a,
    fields: b,
    fieldsFlat: c,
    where: e,
    having: f,
    table: g,
    joins: j,
    orderBy: k,
    groupBy: l,
    limit: m,
    offset: n,
    distinct: o,
    setOperators: p
  }) {
    let r = c ?? (0, O.He)(b);
    for (let a of r) {
      let b;
      if ((0, d.is)(a.field, i.V) && (0, h.Io)(a.field.table) !== ((0, d.is)(g, D.n) ? g._.alias : (0, d.is)(g, P) ? g[w.n].name : (0, d.is)(g, q.Xs) ? void 0 : (0, h.Io)(g)) && (b = a.field.table, !j?.some(({
        alias: a
      }) => a === (b[h.XI.Symbol.IsAlias] ? (0, h.Io)(b) : b[h.XI.Symbol.BaseName])))) {
        let b = (0, h.Io)(a.field.table);
        throw Error(`Your "${a.path.join("->")}" field references a column "${b}"."${a.field.name}", but the table "${b}" is not part of the query! Did you forget to join it?`);
      }
    }
    let s = !j || 0 === j.length,
      t = this.buildWithCTE(a),
      u = o ? (0, q.ll)` distinct` : void 0,
      v = this.buildSelection(r, {
        isSingleTable: s
      }),
      x = this.buildFromTable(g),
      y = this.buildJoins(j),
      z = e ? (0, q.ll)` where ${e}` : void 0,
      A = f ? (0, q.ll)` having ${f}` : void 0,
      B = [];
    if (l) for (let [a, b] of l.entries()) {
      B.push(b);
      a < l.length - 1 && B.push((0, q.ll)`, `);
    }
    let C = B.length > 0 ? (0, q.ll)` group by ${q.ll.join(B)}` : void 0,
      E = this.buildOrderBy(k),
      F = this.buildLimit(m),
      G = n ? (0, q.ll)` offset ${n}` : void 0,
      H = (0, q.ll)`${t}select${u} ${v} from ${x}${y}${z}${C}${A}${E}${F}${G}`;
    return p.length > 0 ? this.buildSetOperations(H, p) : H;
  }
  buildSetOperations(a, b) {
    let [c, ...d] = b;
    if (!c) throw Error("Cannot pass undefined values to any set operator");
    return 0 === d.length ? this.buildSetOperationQuery({
      leftSelect: a,
      setOperator: c
    }) : this.buildSetOperations(this.buildSetOperationQuery({
      leftSelect: a,
      setOperator: c
    }), d);
  }
  buildSetOperationQuery({
    leftSelect: a,
    setOperator: {
      type: b,
      isAll: c,
      rightSelect: e,
      limit: f,
      orderBy: g,
      offset: h
    }
  }) {
    let i,
      j = (0, q.ll)`${a.getSQL()} `,
      k = (0, q.ll)`${e.getSQL()}`;
    if (g && g.length > 0) {
      let a = [];
      for (let b of g) if ((0, d.is)(b, M.v)) a.push(q.ll.identifier(b.name));else if ((0, d.is)(b, q.Xs)) {
        for (let a = 0; a < b.queryChunks.length; a++) {
          let c = b.queryChunks[a];
          (0, d.is)(c, M.v) && (b.queryChunks[a] = q.ll.identifier(this.casing.getColumnCasing(c)));
        }
        a.push((0, q.ll)`${b}`);
      } else a.push((0, q.ll)`${b}`);
      i = (0, q.ll)` order by ${q.ll.join(a, (0, q.ll)`, `)}`;
    }
    let l = "object" == typeof f || "number" == typeof f && f >= 0 ? (0, q.ll)` limit ${f}` : void 0,
      m = q.ll.raw(`${b} ${c ? "all " : ""}`),
      n = h ? (0, q.ll)` offset ${h}` : void 0;
    return (0, q.ll)`${j}${m}${k}${i}${l}${n}`;
  }
  buildInsertQuery({
    table: a,
    values: b,
    onConflict: c,
    returning: e,
    withList: f,
    select: g
  }) {
    let i = [],
      j = Object.entries(a[h.XI.Symbol.Columns]).filter(([a, b]) => !b.shouldDisableInsert()),
      k = j.map(([, a]) => q.ll.identifier(this.casing.getColumnCasing(a)));
    if (g) (0, d.is)(b, q.Xs) ? i.push(b) : i.push(b.getSQL());else for (let [a, c] of (i.push(q.ll.raw("values ")), b.entries())) {
      let e = [];
      for (let [a, b] of j) {
        let f = c[a];
        if (void 0 === f || (0, d.is)(f, q.Iw) && void 0 === f.value) {
          let a;
          if (null !== b.default && void 0 !== b.default) a = (0, d.is)(b.default, q.Xs) ? b.default : q.ll.param(b.default, b);else if (void 0 !== b.defaultFn) {
            let c = b.defaultFn();
            a = (0, d.is)(c, q.Xs) ? c : q.ll.param(c, b);
          } else if (b.default || void 0 === b.onUpdateFn) a = (0, q.ll)`null`;else {
            let c = b.onUpdateFn();
            a = (0, d.is)(c, q.Xs) ? c : q.ll.param(c, b);
          }
          e.push(a);
        } else e.push(f);
      }
      i.push(e);
      a < b.length - 1 && i.push((0, q.ll)`, `);
    }
    let l = this.buildWithCTE(f),
      m = q.ll.join(i),
      n = e ? (0, q.ll)` returning ${this.buildSelection(e, {
        isSingleTable: true
      })}` : void 0,
      o = c?.length ? q.ll.join(c) : void 0;
    return (0, q.ll)`${l}insert into ${a} ${k} ${m}${o}${n}`;
  }
  sqlToQuery(a, b) {
    return a.toQuery({
      casing: this.casing,
      escapeName: this.escapeName,
      escapeParam: this.escapeParam,
      escapeString: this.escapeString,
      invokeSource: b
    });
  }
  buildRelationalQuery({
    fullSchema: a,
    schema: b,
    tableNamesMap: c,
    table: e,
    tableConfig: f,
    queryConfig: g,
    tableAlias: j,
    nestedQueryRelation: k,
    joinOn: l
  }) {
    let m,
      n = [],
      r,
      s,
      v = [],
      w,
      x = [];
    if (true === g) n = Object.entries(f.columns).map(([a, b]) => ({
      dbKey: b.name,
      tsKey: a,
      field: A(b, j),
      relationTableTsKey: void 0,
      isJson: false,
      selection: []
    }));else {
      let e = Object.fromEntries(Object.entries(f.columns).map(([a, b]) => [a, A(b, j)]));
      if (g.where) {
        let a = "function" == typeof g.where ? g.where(e, {
          and: o.Uo,
          between: o.Tq,
          eq: o.eq,
          exists: o.t2,
          gt: o.gt,
          gte: o.RO,
          ilike: o.B3,
          inArray: o.RV,
          isNull: o.kZ,
          isNotNull: o.Pe,
          like: o.mj,
          lt: o.lt,
          lte: o.wJ,
          ne: o.ne,
          not: o.AU,
          notBetween: o.o8,
          notExists: o.KJ,
          notLike: o.RK,
          notIlike: o.q1,
          notInArray: o.KL,
          or: o.or,
          sql: q.ll
        }) : g.where;
        w = a && C(a, j);
      }
      let k = [],
        l = [];
      if (g.columns) {
        let a = false;
        for (let [b, c] of Object.entries(g.columns)) void 0 !== c && b in f.columns && (a || true !== c || (a = true), l.push(b));
        l.length > 0 && (l = a ? l.filter(a => g.columns?.[a] === true) : Object.keys(f.columns).filter(a => !l.includes(a)));
      } else l = Object.keys(f.columns);
      for (let a of l) {
        let b = f.columns[a];
        k.push({
          tsKey: a,
          value: b
        });
      }
      let m = [];
      if (g.with && (m = Object.entries(g.with).filter(a => !!a[1]).map(([a, b]) => ({
        tsKey: a,
        queryConfig: b,
        relation: f.relations[a]
      }))), g.extras) for (let [a, b] of Object.entries("function" == typeof g.extras ? g.extras(e, {
        sql: q.ll
      }) : g.extras)) k.push({
        tsKey: a,
        value: B(b, j)
      });
      for (let {
        tsKey: a,
        value: b
      } of k) n.push({
        dbKey: (0, d.is)(b, q.Xs.Aliased) ? b.fieldAlias : f.columns[a].name,
        tsKey: a,
        field: (0, d.is)(b, i.V) ? A(b, j) : b,
        relationTableTsKey: void 0,
        isJson: false,
        selection: []
      });
      let u = "function" == typeof g.orderBy ? g.orderBy(e, {
        sql: q.ll,
        asc: p.Y,
        desc: p.i
      }) : g.orderBy ?? [];
      for (let {
        tsKey: e,
        queryConfig: f,
        relation: k
      } of (Array.isArray(u) || (u = [u]), v = u.map(a => (0, d.is)(a, i.V) ? A(a, j) : C(a, j)), r = g.limit, s = g.offset, m)) {
        let g = function (a, b, c) {
            if ((0, d.is)(c, t) && c.config) return {
              fields: c.config.fields,
              references: c.config.references
            };
            let e = b[(0, h.Lf)(c.referencedTable)];
            if (!e) throw Error(`Table "${c.referencedTable[h.XI.Symbol.Name]}" not found in schema`);
            let f = a[e];
            if (!f) throw Error(`Table "${e}" not found in schema`);
            let g = c.sourceTable,
              i = b[(0, h.Lf)(g)];
            if (!i) throw Error(`Table "${g[h.XI.Symbol.Name]}" not found in schema`);
            let j = [];
            for (let a of Object.values(f.relations)) (c.relationName && c !== a && a.relationName === c.relationName || !c.relationName && a.referencedTable === c.sourceTable) && j.push(a);
            if (j.length > 1) throw c.relationName ? Error(`There are multiple relations with name "${c.relationName}" in table "${e}"`) : Error(`There are multiple relations between "${e}" and "${c.sourceTable[h.XI.Symbol.Name]}". Please specify relation name`);
            if (j[0] && (0, d.is)(j[0], t) && j[0].config) return {
              fields: j[0].config.references,
              references: j[0].config.fields
            };
            throw Error(`There is not enough information to infer relation "${i}.${c.fieldName}"`);
          }(b, c, k),
          i = c[(0, h.Lf)(k.referencedTable)],
          l = `${j}_${e}`,
          m = (0, o.Uo)(...g.fields.map((a, b) => (0, o.eq)(A(g.references[b], l), A(a, j)))),
          p = this.buildRelationalQuery({
            fullSchema: a,
            schema: b,
            tableNamesMap: c,
            table: a[i],
            tableConfig: b[i],
            queryConfig: (0, d.is)(k, t) ? true === f ? {
              limit: 1
            } : {
              ...f,
              limit: 1
            } : f,
            tableAlias: l,
            joinOn: m,
            nestedQueryRelation: k
          }),
          r = (0, q.ll)`(${p.sql})`.as(e);
        n.push({
          dbKey: e,
          tsKey: e,
          field: r,
          relationTableTsKey: i,
          isJson: true,
          selection: p.selection
        });
      }
    }
    if (0 === n.length) throw new J({
      message: `No fields selected for table "${f.tsName}" ("${j}"). You need to have at least one item in "columns", "with" or "extras". If you need to select all columns, omit the "columns" key or set it to undefined.`
    });
    if (w = (0, o.Uo)(l, w), k) {
      let a = (0, q.ll)`json_array(${q.ll.join(n.map(({
        field: a
      }) => (0, d.is)(a, M.v) ? q.ll.identifier(this.casing.getColumnCasing(a)) : (0, d.is)(a, q.Xs.Aliased) ? a.sql : a), (0, q.ll)`, `)})`;
      (0, d.is)(k, u) && (a = (0, q.ll)`coalesce(json_group_array(${a}), json_array())`);
      let b = [{
        dbKey: "data",
        tsKey: "data",
        field: a.as("data"),
        isJson: true,
        relationTableTsKey: f.tsName,
        selection: n
      }];
      void 0 !== r || void 0 !== s || v.length > 0 ? (m = this.buildSelectQuery({
        table: z(e, j),
        fields: {},
        fieldsFlat: [{
          path: [],
          field: q.ll.raw("*")
        }],
        where: w,
        limit: r,
        offset: s,
        orderBy: v,
        setOperators: []
      }), w = void 0, r = void 0, s = void 0, v = void 0) : m = z(e, j);
      m = this.buildSelectQuery({
        table: (0, d.is)(m, N.jo) ? m : new D.n(m, {}, j),
        fields: {},
        fieldsFlat: b.map(({
          field: a
        }) => ({
          path: [],
          field: (0, d.is)(a, i.V) ? A(a, j) : a
        })),
        joins: x,
        where: w,
        limit: r,
        offset: s,
        orderBy: v,
        setOperators: []
      });
    } else m = this.buildSelectQuery({
      table: z(e, j),
      fields: {},
      fieldsFlat: n.map(({
        field: a
      }) => ({
        path: [],
        field: (0, d.is)(a, i.V) ? A(a, j) : a
      })),
      joins: x,
      where: w,
      limit: r,
      offset: s,
      orderBy: v,
      setOperators: []
    });
    return {
      tableTsKey: f.tsName,
      sql: m,
      selection: n
    };
  }
}
class R extends Q {
  static [d.i] = "SQLiteSyncDialect";
  migrate(a, b, c) {
    let d = void 0 === c || "string" == typeof c ? "__drizzle_migrations" : c.migrationsTable ?? "__drizzle_migrations",
      e = (0, q.ll)`
			CREATE TABLE IF NOT EXISTS ${q.ll.identifier(d)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
    b.run(e);
    let f = b.values((0, q.ll)`SELECT id, hash, created_at FROM ${q.ll.identifier(d)} ORDER BY created_at DESC LIMIT 1`)[0] ?? void 0;
    b.run((0, q.ll)`BEGIN`);
    try {
      for (let c of a) if (!f || Number(f[2]) < c.folderMillis) {
        for (let a of c.sql) b.run(q.ll.raw(a));
        b.run((0, q.ll)`INSERT INTO ${q.ll.identifier(d)} ("hash", "created_at") VALUES(${c.hash}, ${c.folderMillis})`);
      }
      b.run((0, q.ll)`COMMIT`);
    } catch (a) {
      throw b.run((0, q.ll)`ROLLBACK`), a;
    }
  }
}
class S extends Q {
  static [d.i] = "SQLiteAsyncDialect";
  async migrate(a, b, c) {
    let d = void 0 === c || "string" == typeof c ? "__drizzle_migrations" : c.migrationsTable ?? "__drizzle_migrations",
      e = (0, q.ll)`
			CREATE TABLE IF NOT EXISTS ${q.ll.identifier(d)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
    await b.run(e);
    let f = (await b.values((0, q.ll)`SELECT id, hash, created_at FROM ${q.ll.identifier(d)} ORDER BY created_at DESC LIMIT 1`))[0] ?? void 0;
    await b.transaction(async b => {
      for (let c of a) if (!f || Number(f[2]) < c.folderMillis) {
        for (let a of c.sql) await b.run(q.ll.raw(a));
        await b.run((0, q.ll)`INSERT INTO ${q.ll.identifier(d)} ("hash", "created_at") VALUES(${c.hash}, ${c.folderMillis})`);
      }
    });
  }
}
class T {
  static [d.i] = "TypedQueryBuilder";
  getSelectedFields() {
    return this._.selectedFields;
  }
}
class U {
  static [d.i] = "QueryPromise";
  [Symbol.toStringTag] = "QueryPromise";
  catch(a) {
    return this.then(void 0, a);
  }
  finally(a) {
    return this.then(b => (a?.(), b), b => {
      throw a?.(), b;
    });
  }
  then(a, b) {
    return this.execute().then(a, b);
  }
}
function V(a) {
  return (0, d.is)(a, N.jo) ? [`${a[h.XI.Symbol.BaseName]}`] : (0, d.is)(a, D.n) ? a._.usedTables ?? [] : (0, d.is)(a, q.Xs) ? a.usedTables ?? [] : [];
}
class W {
  static [d.i] = "SQLiteSelectBuilder";
  fields;
  session;
  dialect;
  withList;
  distinct;
  constructor(a) {
    this.fields = a.fields;
    this.session = a.session;
    this.dialect = a.dialect;
    this.withList = a.withList;
    this.distinct = a.distinct;
  }
  from(a) {
    let b,
      c = !!this.fields;
    return b = this.fields ? this.fields : (0, d.is)(a, D.n) ? Object.fromEntries(Object.keys(a._.selectedFields).map(b => [b, a[b]])) : (0, d.is)(a, P) ? a[w.n].selectedFields : (0, d.is)(a, q.Xs) ? {} : (0, O.YD)(a), new Y({
      table: a,
      fields: b,
      isPartialSelect: c,
      session: this.session,
      dialect: this.dialect,
      withList: this.withList,
      distinct: this.distinct
    });
  }
}
class X extends T {
  static [d.i] = "SQLiteSelectQueryBuilder";
  _;
  config;
  joinsNotNullableMap;
  tableName;
  isPartialSelect;
  session;
  dialect;
  cacheConfig = void 0;
  usedTables = new Set();
  constructor({
    table: a,
    fields: b,
    isPartialSelect: c,
    session: d,
    dialect: e,
    withList: f,
    distinct: g
  }) {
    for (const h of (super(), this.config = {
      withList: f,
      table: a,
      fields: {
        ...b
      },
      distinct: g,
      setOperators: []
    }, this.isPartialSelect = c, this.session = d, this.dialect = e, this._ = {
      selectedFields: b,
      config: this.config
    }, this.tableName = (0, O.zN)(a), this.joinsNotNullableMap = "string" == typeof this.tableName ? {
      [this.tableName]: true
    } : {}, V(a))) this.usedTables.add(h);
  }
  getUsedTables() {
    return [...this.usedTables];
  }
  createJoin(a) {
    return (b, c) => {
      let e = this.tableName,
        f = (0, O.zN)(b);
      for (let a of V(b)) this.usedTables.add(a);
      if ("string" == typeof f && this.config.joins?.some(a => a.alias === f)) throw Error(`Alias "${f}" is already used in this query`);
      if (!this.isPartialSelect && (1 === Object.keys(this.joinsNotNullableMap).length && "string" == typeof e && (this.config.fields = {
        [e]: this.config.fields
      }), "string" == typeof f && !(0, d.is)(b, q.Xs))) {
        let a = (0, d.is)(b, D.n) ? b._.selectedFields : (0, d.is)(b, q.Ss) ? b[w.n].selectedFields : b[h.XI.Symbol.Columns];
        this.config.fields[f] = a;
      }
      if ("function" == typeof c && (c = c(new Proxy(this.config.fields, new E({
        sqlAliasedBehavior: "sql",
        sqlBehavior: "sql"
      })))), this.config.joins || (this.config.joins = []), this.config.joins.push({
        on: c,
        table: b,
        joinType: a,
        alias: f
      }), "string" == typeof f) switch (a) {
        case "left":
          this.joinsNotNullableMap[f] = false;
          break;
        case "right":
          this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([a]) => [a, false]));
          this.joinsNotNullableMap[f] = true;
          break;
        case "cross":
        case "inner":
          this.joinsNotNullableMap[f] = true;
          break;
        case "full":
          this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([a]) => [a, false]));
          this.joinsNotNullableMap[f] = false;
      }
      return this;
    };
  }
  leftJoin = this.createJoin("left");
  rightJoin = this.createJoin("right");
  innerJoin = this.createJoin("inner");
  fullJoin = this.createJoin("full");
  crossJoin = this.createJoin("cross");
  createSetOperator(a, b) {
    return c => {
      let d = "function" == typeof c ? c($()) : c;
      if (!(0, O.DV)(this.getSelectedFields(), d.getSelectedFields())) throw Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
      return this.config.setOperators.push({
        type: a,
        isAll: b,
        rightSelect: d
      }), this;
    };
  }
  union = this.createSetOperator("union", false);
  unionAll = this.createSetOperator("union", true);
  intersect = this.createSetOperator("intersect", false);
  except = this.createSetOperator("except", false);
  addSetOperators(a) {
    return this.config.setOperators.push(...a), this;
  }
  where(a) {
    return "function" == typeof a && (a = a(new Proxy(this.config.fields, new E({
      sqlAliasedBehavior: "sql",
      sqlBehavior: "sql"
    })))), this.config.where = a, this;
  }
  having(a) {
    return "function" == typeof a && (a = a(new Proxy(this.config.fields, new E({
      sqlAliasedBehavior: "sql",
      sqlBehavior: "sql"
    })))), this.config.having = a, this;
  }
  groupBy(...a) {
    if ("function" == typeof a[0]) {
      let b = a[0](new Proxy(this.config.fields, new E({
        sqlAliasedBehavior: "alias",
        sqlBehavior: "sql"
      })));
      this.config.groupBy = Array.isArray(b) ? b : [b];
    } else this.config.groupBy = a;
    return this;
  }
  orderBy(...a) {
    if ("function" == typeof a[0]) {
      let b = a[0](new Proxy(this.config.fields, new E({
          sqlAliasedBehavior: "alias",
          sqlBehavior: "sql"
        }))),
        c = Array.isArray(b) ? b : [b];
      this.config.setOperators.length > 0 ? this.config.setOperators.at(-1).orderBy = c : this.config.orderBy = c;
    } else this.config.setOperators.length > 0 ? this.config.setOperators.at(-1).orderBy = a : this.config.orderBy = a;
    return this;
  }
  limit(a) {
    return this.config.setOperators.length > 0 ? this.config.setOperators.at(-1).limit = a : this.config.limit = a, this;
  }
  offset(a) {
    return this.config.setOperators.length > 0 ? this.config.setOperators.at(-1).offset = a : this.config.offset = a, this;
  }
  getSQL() {
    return this.dialect.buildSelectQuery(this.config);
  }
  toSQL() {
    let {
      typings: a,
      ...b
    } = this.dialect.sqlToQuery(this.getSQL());
    return b;
  }
  as(a) {
    let b = [];
    if (b.push(...V(this.config.table)), this.config.joins) for (let a of this.config.joins) b.push(...V(a.table));
    return new Proxy(new D.n(this.getSQL(), this.config.fields, a, false, [...new Set(b)]), new E({
      alias: a,
      sqlAliasedBehavior: "alias",
      sqlBehavior: "error"
    }));
  }
  getSelectedFields() {
    return new Proxy(this.config.fields, new E({
      alias: this.tableName,
      sqlAliasedBehavior: "alias",
      sqlBehavior: "error"
    }));
  }
  $dynamic() {
    return this;
  }
}
class Y extends X {
  static [d.i] = "SQLiteSelect";
  _prepare(a = true) {
    if (!this.session) throw Error("Cannot execute a query on a query builder. Please use a database instance instead.");
    let b = (0, O.He)(this.config.fields),
      c = this.session[a ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), b, "all", true, void 0, {
        type: "select",
        tables: [...this.usedTables]
      }, this.cacheConfig);
    return c.joinsNotNullableMap = this.joinsNotNullableMap, c;
  }
  $withCache(a) {
    return this.cacheConfig = void 0 === a ? {
      config: {},
      enable: true,
      autoInvalidate: true
    } : false === a ? {
      enable: false
    } : {
      enable: true,
      autoInvalidate: true,
      ...a
    }, this;
  }
  prepare() {
    return this._prepare(false);
  }
  run = a => this._prepare().run(a);
  all = a => this._prepare().all(a);
  get = a => this._prepare().get(a);
  values = a => this._prepare().values(a);
  async execute() {
    return this.all();
  }
}
function Z(a, b) {
  return (c, d, ...e) => {
    let f = [d, ...e].map(c => ({
      type: a,
      isAll: b,
      rightSelect: c
    }));
    for (let a of f) if (!(0, O.DV)(c.getSelectedFields(), a.rightSelect.getSelectedFields())) throw Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
    return c.addSetOperators(f);
  };
}
(0, O.XJ)(Y, [U]);
let $ = () => ({
    union: _,
    unionAll: aa,
    intersect: ab,
    except: ac
  }),
  _ = Z("union", false),
  aa = Z("union", true),
  ab = Z("intersect", false),
  ac = Z("except", false);
class ad {
  static [d.i] = "SQLiteQueryBuilder";
  dialect;
  dialectConfig;
  constructor(a) {
    this.dialect = (0, d.is)(a, Q) ? a : void 0;
    this.dialectConfig = (0, d.is)(a, Q) ? void 0 : a;
  }
  $with = (a, b) => {
    let c = this;
    return {
      as: d => ("function" == typeof d && (d = d(c)), new Proxy(new D.J(d.getSQL(), b ?? ("getSelectedFields" in d ? d.getSelectedFields() ?? {} : {}), a, true), new E({
        alias: a,
        sqlAliasedBehavior: "alias",
        sqlBehavior: "error"
      })))
    };
  };
  with(...a) {
    let b = this;
    return {
      select: function (c) {
        return new W({
          fields: c ?? void 0,
          session: void 0,
          dialect: b.getDialect(),
          withList: a
        });
      },
      selectDistinct: function (c) {
        return new W({
          fields: c ?? void 0,
          session: void 0,
          dialect: b.getDialect(),
          withList: a,
          distinct: true
        });
      }
    };
  }
  select(a) {
    return new W({
      fields: a ?? void 0,
      session: void 0,
      dialect: this.getDialect()
    });
  }
  selectDistinct(a) {
    return new W({
      fields: a ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
      distinct: true
    });
  }
  getDialect() {
    return this.dialect || (this.dialect = new R(this.dialectConfig)), this.dialect;
  }
}
class ae {
  constructor(a, b, c, d) {
    this.table = a;
    this.session = b;
    this.dialect = c;
    this.withList = d;
  }
  static [d.i] = "SQLiteUpdateBuilder";
  set(a) {
    return new af(this.table, (0, O.q)(this.table, a), this.session, this.dialect, this.withList);
  }
}
class af extends U {
  constructor(a, b, c, d, e) {
    super();
    this.session = c;
    this.dialect = d;
    this.config = {
      set: b,
      table: a,
      withList: e,
      joins: []
    };
  }
  static [d.i] = "SQLiteUpdate";
  config;
  from(a) {
    return this.config.from = a, this;
  }
  createJoin(a) {
    return (b, c) => {
      let e = (0, O.zN)(b);
      if ("string" == typeof e && this.config.joins.some(a => a.alias === e)) throw Error(`Alias "${e}" is already used in this query`);
      if ("function" == typeof c) {
        let a = this.config.from ? (0, d.is)(b, N.jo) ? b[h.XI.Symbol.Columns] : (0, d.is)(b, D.n) ? b._.selectedFields : (0, d.is)(b, P) ? b[w.n].selectedFields : void 0 : void 0;
        c = c(new Proxy(this.config.table[h.XI.Symbol.Columns], new E({
          sqlAliasedBehavior: "sql",
          sqlBehavior: "sql"
        })), a && new Proxy(a, new E({
          sqlAliasedBehavior: "sql",
          sqlBehavior: "sql"
        })));
      }
      return this.config.joins.push({
        on: c,
        table: b,
        joinType: a,
        alias: e
      }), this;
    };
  }
  leftJoin = this.createJoin("left");
  rightJoin = this.createJoin("right");
  innerJoin = this.createJoin("inner");
  fullJoin = this.createJoin("full");
  where(a) {
    return this.config.where = a, this;
  }
  orderBy(...a) {
    if ("function" == typeof a[0]) {
      let b = a[0](new Proxy(this.config.table[h.XI.Symbol.Columns], new E({
          sqlAliasedBehavior: "alias",
          sqlBehavior: "sql"
        }))),
        c = Array.isArray(b) ? b : [b];
      this.config.orderBy = c;
    } else this.config.orderBy = a;
    return this;
  }
  limit(a) {
    return this.config.limit = a, this;
  }
  returning(a = this.config.table[N.jo.Symbol.Columns]) {
    return this.config.returning = (0, O.He)(a), this;
  }
  getSQL() {
    return this.dialect.buildUpdateQuery(this.config);
  }
  toSQL() {
    let {
      typings: a,
      ...b
    } = this.dialect.sqlToQuery(this.getSQL());
    return b;
  }
  _prepare(a = true) {
    return this.session[a ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true, void 0, {
      type: "insert",
      tables: V(this.config.table)
    });
  }
  prepare() {
    return this._prepare(false);
  }
  run = a => this._prepare().run(a);
  all = a => this._prepare().all(a);
  get = a => this._prepare().get(a);
  values = a => this._prepare().values(a);
  async execute() {
    return this.config.returning ? this.all() : this.run();
  }
  $dynamic() {
    return this;
  }
}
class ag {
  constructor(a, b, c, d) {
    this.table = a;
    this.session = b;
    this.dialect = c;
    this.withList = d;
  }
  static [d.i] = "SQLiteInsertBuilder";
  values(a) {
    if (0 === (a = Array.isArray(a) ? a : [a]).length) throw Error("values() must be called with at least one value");
    let b = a.map(a => {
      let b = {},
        c = this.table[h.XI.Symbol.Columns];
      for (let e of Object.keys(a)) {
        let f = a[e];
        b[e] = (0, d.is)(f, q.Xs) ? f : new q.Iw(f, c[e]);
      }
      return b;
    });
    return new ah(this.table, b, this.session, this.dialect, this.withList);
  }
  select(a) {
    let b = "function" == typeof a ? a(new ad()) : a;
    if (!(0, d.is)(b, q.Xs) && !(0, O.DV)(this.table[h.e], b._.selectedFields)) throw Error("Insert select error: selected fields are not the same or are in a different order compared to the table definition");
    return new ah(this.table, b, this.session, this.dialect, this.withList, true);
  }
}
class ah extends U {
  constructor(a, b, c, d, e, f) {
    super();
    this.session = c;
    this.dialect = d;
    this.config = {
      table: a,
      values: b,
      withList: e,
      select: f
    };
  }
  static [d.i] = "SQLiteInsert";
  config;
  returning(a = this.config.table[N.jo.Symbol.Columns]) {
    return this.config.returning = (0, O.He)(a), this;
  }
  onConflictDoNothing(a = {}) {
    if (this.config.onConflict || (this.config.onConflict = []), void 0 === a.target) this.config.onConflict.push((0, q.ll)` on conflict do nothing`);else {
      let b = Array.isArray(a.target) ? (0, q.ll)`${a.target}` : (0, q.ll)`${[a.target]}`,
        c = a.where ? (0, q.ll)` where ${a.where}` : (0, q.ll)``;
      this.config.onConflict.push((0, q.ll)` on conflict ${b} do nothing${c}`);
    }
    return this;
  }
  onConflictDoUpdate(a) {
    if (a.where && (a.targetWhere || a.setWhere)) throw Error('You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.');
    this.config.onConflict || (this.config.onConflict = []);
    let b = a.where ? (0, q.ll)` where ${a.where}` : void 0,
      c = a.targetWhere ? (0, q.ll)` where ${a.targetWhere}` : void 0,
      d = a.setWhere ? (0, q.ll)` where ${a.setWhere}` : void 0,
      e = Array.isArray(a.target) ? (0, q.ll)`${a.target}` : (0, q.ll)`${[a.target]}`,
      f = this.dialect.buildUpdateSet(this.config.table, (0, O.q)(this.config.table, a.set));
    return this.config.onConflict.push((0, q.ll)` on conflict ${e}${c} do update set ${f}${b}${d}`), this;
  }
  getSQL() {
    return this.dialect.buildInsertQuery(this.config);
  }
  toSQL() {
    let {
      typings: a,
      ...b
    } = this.dialect.sqlToQuery(this.getSQL());
    return b;
  }
  _prepare(a = true) {
    return this.session[a ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true, void 0, {
      type: "insert",
      tables: V(this.config.table)
    });
  }
  prepare() {
    return this._prepare(false);
  }
  run = a => this._prepare().run(a);
  all = a => this._prepare().all(a);
  get = a => this._prepare().get(a);
  values = a => this._prepare().values(a);
  async execute() {
    return this.config.returning ? this.all() : this.run();
  }
  $dynamic() {
    return this;
  }
}
class ai extends U {
  constructor(a, b, c, d) {
    super();
    this.table = a;
    this.session = b;
    this.dialect = c;
    this.config = {
      table: a,
      withList: d
    };
  }
  static [d.i] = "SQLiteDelete";
  config;
  where(a) {
    return this.config.where = a, this;
  }
  orderBy(...a) {
    if ("function" == typeof a[0]) {
      let b = a[0](new Proxy(this.config.table[h.XI.Symbol.Columns], new E({
          sqlAliasedBehavior: "alias",
          sqlBehavior: "sql"
        }))),
        c = Array.isArray(b) ? b : [b];
      this.config.orderBy = c;
    } else this.config.orderBy = a;
    return this;
  }
  limit(a) {
    return this.config.limit = a, this;
  }
  returning(a = this.table[N.jo.Symbol.Columns]) {
    return this.config.returning = (0, O.He)(a), this;
  }
  getSQL() {
    return this.dialect.buildDeleteQuery(this.config);
  }
  toSQL() {
    let {
      typings: a,
      ...b
    } = this.dialect.sqlToQuery(this.getSQL());
    return b;
  }
  _prepare(a = true) {
    return this.session[a ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true, void 0, {
      type: "delete",
      tables: V(this.config.table)
    });
  }
  prepare() {
    return this._prepare(false);
  }
  run = a => this._prepare().run(a);
  all = a => this._prepare().all(a);
  get = a => this._prepare().get(a);
  values = a => this._prepare().values(a);
  async execute(a) {
    return this._prepare().execute(a);
  }
  $dynamic() {
    return this;
  }
}
class aj extends q.Xs {
  constructor(a) {
    super(aj.buildEmbeddedCount(a.source, a.filters).queryChunks);
    this.params = a;
    this.session = a.session;
    this.sql = aj.buildCount(a.source, a.filters);
  }
  sql;
  static [d.i] = "SQLiteCountBuilderAsync";
  [Symbol.toStringTag] = "SQLiteCountBuilderAsync";
  session;
  static buildEmbeddedCount(a, b) {
    return (0, q.ll)`(select count(*) from ${a}${q.ll.raw(" where ").if(b)}${b})`;
  }
  static buildCount(a, b) {
    return (0, q.ll)`select count(*) from ${a}${q.ll.raw(" where ").if(b)}${b}`;
  }
  then(a, b) {
    return Promise.resolve(this.session.count(this.sql)).then(a, b);
  }
  catch(a) {
    return this.then(void 0, a);
  }
  finally(a) {
    return this.then(b => (a?.(), b), b => {
      throw a?.(), b;
    });
  }
}
class ak {
  constructor(a, b, c, d, e, f, g, h) {
    this.mode = a;
    this.fullSchema = b;
    this.schema = c;
    this.tableNamesMap = d;
    this.table = e;
    this.tableConfig = f;
    this.dialect = g;
    this.session = h;
  }
  static [d.i] = "SQLiteAsyncRelationalQueryBuilder";
  findMany(a) {
    return "sync" === this.mode ? new am(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, a || {}, "many") : new al(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, a || {}, "many");
  }
  findFirst(a) {
    return "sync" === this.mode ? new am(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, a ? {
      ...a,
      limit: 1
    } : {
      limit: 1
    }, "first") : new al(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, a ? {
      ...a,
      limit: 1
    } : {
      limit: 1
    }, "first");
  }
}
class al extends U {
  constructor(a, b, c, d, e, f, g, h, i) {
    super();
    this.fullSchema = a;
    this.schema = b;
    this.tableNamesMap = c;
    this.table = d;
    this.tableConfig = e;
    this.dialect = f;
    this.session = g;
    this.config = h;
    this.mode = i;
  }
  static [d.i] = "SQLiteAsyncRelationalQuery";
  mode;
  getSQL() {
    return this.dialect.buildRelationalQuery({
      fullSchema: this.fullSchema,
      schema: this.schema,
      tableNamesMap: this.tableNamesMap,
      table: this.table,
      tableConfig: this.tableConfig,
      queryConfig: this.config,
      tableAlias: this.tableConfig.tsName
    }).sql;
  }
  _prepare(a = false) {
    let {
      query: b,
      builtQuery: c
    } = this._toSQL();
    return this.session[a ? "prepareOneTimeQuery" : "prepareQuery"](c, void 0, "first" === this.mode ? "get" : "all", true, (a, c) => {
      let e = a.map(a => function a(b, c, e, f, g = a => a) {
        let h = {};
        for (let [j, k] of f.entries()) if (k.isJson) {
          let f = c.relations[k.tsKey],
            i = e[j],
            l = "string" == typeof i ? JSON.parse(i) : i;
          h[k.tsKey] = (0, d.is)(f, t) ? l && a(b, b[k.relationTableTsKey], l, k.selection, g) : l.map(c => a(b, b[k.relationTableTsKey], c, k.selection, g));
        } else {
          let a,
            b = g(e[j]),
            c = k.field;
          a = (0, d.is)(c, i.V) ? c : (0, d.is)(c, q.Xs) ? c.decoder : c.sql.decoder;
          h[k.tsKey] = null === b ? null : a.mapFromDriverValue(b);
        }
        return h;
      }(this.schema, this.tableConfig, a, b.selection, c));
      return "first" === this.mode ? e[0] : e;
    });
  }
  prepare() {
    return this._prepare(false);
  }
  _toSQL() {
    let a = this.dialect.buildRelationalQuery({
        fullSchema: this.fullSchema,
        schema: this.schema,
        tableNamesMap: this.tableNamesMap,
        table: this.table,
        tableConfig: this.tableConfig,
        queryConfig: this.config,
        tableAlias: this.tableConfig.tsName
      }),
      b = this.dialect.sqlToQuery(a.sql);
    return {
      query: a,
      builtQuery: b
    };
  }
  toSQL() {
    return this._toSQL().builtQuery;
  }
  executeRaw() {
    return "first" === this.mode ? this._prepare(false).get() : this._prepare(false).all();
  }
  async execute() {
    return this.executeRaw();
  }
}
class am extends al {
  static [d.i] = "SQLiteSyncRelationalQuery";
  sync() {
    return this.executeRaw();
  }
}
class an extends U {
  constructor(a, b, c, d, e) {
    super();
    this.execute = a;
    this.getSQL = b;
    this.dialect = d;
    this.mapBatchResult = e;
    this.config = {
      action: c
    };
  }
  static [d.i] = "SQLiteRaw";
  config;
  getQuery() {
    return {
      ...this.dialect.sqlToQuery(this.getSQL()),
      method: this.config.action
    };
  }
  mapResult(a, b) {
    return b ? this.mapBatchResult(a) : a;
  }
  _prepare() {
    return this;
  }
  isResponseInArrayMode() {
    return false;
  }
}
class ao {
  constructor(a, b, c, d) {
    this.resultKind = a;
    this.dialect = b;
    this.session = c;
    this._ = d ? {
      schema: d.schema,
      fullSchema: d.fullSchema,
      tableNamesMap: d.tableNamesMap
    } : {
      schema: void 0,
      fullSchema: {},
      tableNamesMap: {}
    };
    this.query = {};
    const e = this.query;
    if (this._.schema) for (const [f, g] of Object.entries(this._.schema)) e[f] = new ak(a, d.fullSchema, this._.schema, this._.tableNamesMap, d.fullSchema[f], g, b, c);
    this.$cache = {
      invalidate: async a => {}
    };
  }
  static [d.i] = "BaseSQLiteDatabase";
  query;
  $with = (a, b) => {
    let c = this;
    return {
      as: d => ("function" == typeof d && (d = d(new ad(c.dialect))), new Proxy(new D.J(d.getSQL(), b ?? ("getSelectedFields" in d ? d.getSelectedFields() ?? {} : {}), a, true), new E({
        alias: a,
        sqlAliasedBehavior: "alias",
        sqlBehavior: "error"
      })))
    };
  };
  $count(a, b) {
    return new aj({
      source: a,
      filters: b,
      session: this.session
    });
  }
  with(...a) {
    let b = this;
    return {
      select: function (c) {
        return new W({
          fields: c ?? void 0,
          session: b.session,
          dialect: b.dialect,
          withList: a
        });
      },
      selectDistinct: function (c) {
        return new W({
          fields: c ?? void 0,
          session: b.session,
          dialect: b.dialect,
          withList: a,
          distinct: true
        });
      },
      update: function (c) {
        return new ae(c, b.session, b.dialect, a);
      },
      insert: function (c) {
        return new ag(c, b.session, b.dialect, a);
      },
      delete: function (c) {
        return new ai(c, b.session, b.dialect, a);
      }
    };
  }
  select(a) {
    return new W({
      fields: a ?? void 0,
      session: this.session,
      dialect: this.dialect
    });
  }
  selectDistinct(a) {
    return new W({
      fields: a ?? void 0,
      session: this.session,
      dialect: this.dialect,
      distinct: true
    });
  }
  update(a) {
    return new ae(a, this.session, this.dialect);
  }
  $cache;
  insert(a) {
    return new ag(a, this.session, this.dialect);
  }
  delete(a) {
    return new ai(a, this.session, this.dialect);
  }
  run(a) {
    let b = "string" == typeof a ? q.ll.raw(a) : a.getSQL();
    return "async" === this.resultKind ? new an(async () => this.session.run(b), () => b, "run", this.dialect, this.session.extractRawRunValueFromBatchResult.bind(this.session)) : this.session.run(b);
  }
  all(a) {
    let b = "string" == typeof a ? q.ll.raw(a) : a.getSQL();
    return "async" === this.resultKind ? new an(async () => this.session.all(b), () => b, "all", this.dialect, this.session.extractRawAllValueFromBatchResult.bind(this.session)) : this.session.all(b);
  }
  get(a) {
    let b = "string" == typeof a ? q.ll.raw(a) : a.getSQL();
    return "async" === this.resultKind ? new an(async () => this.session.get(b), () => b, "get", this.dialect, this.session.extractRawGetValueFromBatchResult.bind(this.session)) : this.session.get(b);
  }
  values(a) {
    let b = "string" == typeof a ? q.ll.raw(a) : a.getSQL();
    return "async" === this.resultKind ? new an(async () => this.session.values(b), () => b, "values", this.dialect, this.session.extractRawValuesValueFromBatchResult.bind(this.session)) : this.session.values(b);
  }
  transaction(a, b) {
    return this.session.transaction(a, b);
  }
}
class ap {
  static [d.i] = "Cache";
}
class aq extends ap {
  strategy() {
    return "all";
  }
  static [d.i] = "NoopCache";
  async get(a) {}
  async put(a, b, c, d) {}
  async onMutate(a) {}
}
async function ar(a, b) {
  let c = `${a}-${JSON.stringify(b)}`,
    d = new TextEncoder().encode(c);
  return [...new Uint8Array(await crypto.subtle.digest("SHA-256", d))].map(a => a.toString(16).padStart(2, "0")).join("");
}
class as extends U {
  constructor(a) {
    super();
    this.resultCb = a;
  }
  static [d.i] = "ExecuteResultSync";
  async execute() {
    return this.resultCb();
  }
  sync() {
    return this.resultCb();
  }
}
class at {
  constructor(a, b, c, d, e, f) {
    this.mode = a;
    this.executeMethod = b;
    this.query = c;
    this.cache = d;
    this.queryMetadata = e;
    this.cacheConfig = f;
    d && "all" === d.strategy() && void 0 === f && (this.cacheConfig = {
      enable: true,
      autoInvalidate: true
    });
    this.cacheConfig?.enable || (this.cacheConfig = void 0);
  }
  static [d.i] = "PreparedQuery";
  joinsNotNullableMap;
  async queryWithCache(a, b, c) {
    if (void 0 === this.cache || (0, d.is)(this.cache, aq) || void 0 === this.queryMetadata || this.cacheConfig && !this.cacheConfig.enable) try {
      return await c();
    } catch (c) {
      throw new K(a, b, c);
    }
    if (("insert" === this.queryMetadata.type || "update" === this.queryMetadata.type || "delete" === this.queryMetadata.type) && this.queryMetadata.tables.length > 0) try {
      let [a] = await Promise.all([c(), this.cache.onMutate({
        tables: this.queryMetadata.tables
      })]);
      return a;
    } catch (c) {
      throw new K(a, b, c);
    }
    if (!this.cacheConfig) try {
      return await c();
    } catch (c) {
      throw new K(a, b, c);
    }
    if ("select" === this.queryMetadata.type) {
      let d = await this.cache.get(this.cacheConfig.tag ?? (await ar(a, b)), this.queryMetadata.tables, void 0 !== this.cacheConfig.tag, this.cacheConfig.autoInvalidate);
      if (void 0 === d) {
        let d;
        try {
          d = await c();
        } catch (c) {
          throw new K(a, b, c);
        }
        return await this.cache.put(this.cacheConfig.tag ?? (await ar(a, b)), d, this.cacheConfig.autoInvalidate ? this.queryMetadata.tables : [], void 0 !== this.cacheConfig.tag, this.cacheConfig.config), d;
      }
      return d;
    }
    try {
      return await c();
    } catch (c) {
      throw new K(a, b, c);
    }
  }
  getQuery() {
    return this.query;
  }
  mapRunResult(a, b) {
    return a;
  }
  mapAllResult(a, b) {
    throw Error("Not implemented");
  }
  mapGetResult(a, b) {
    throw Error("Not implemented");
  }
  execute(a) {
    return "async" === this.mode ? this[this.executeMethod](a) : new as(() => this[this.executeMethod](a));
  }
  mapResult(a, b) {
    switch (this.executeMethod) {
      case "run":
        return this.mapRunResult(a, b);
      case "all":
        return this.mapAllResult(a, b);
      case "get":
        return this.mapGetResult(a, b);
    }
  }
}
class au {
  constructor(a) {
    this.dialect = a;
  }
  static [d.i] = "SQLiteSession";
  prepareOneTimeQuery(a, b, c, d, e, f, g) {
    return this.prepareQuery(a, b, c, d, e, f, g);
  }
  run(a) {
    let b = this.dialect.sqlToQuery(a);
    try {
      return this.prepareOneTimeQuery(b, void 0, "run", false).run();
    } catch (a) {
      throw new J({
        cause: a,
        message: `Failed to run the query '${b.sql}'`
      });
    }
  }
  extractRawRunValueFromBatchResult(a) {
    return a;
  }
  all(a) {
    return this.prepareOneTimeQuery(this.dialect.sqlToQuery(a), void 0, "run", false).all();
  }
  extractRawAllValueFromBatchResult(a) {
    throw Error("Not implemented");
  }
  get(a) {
    return this.prepareOneTimeQuery(this.dialect.sqlToQuery(a), void 0, "run", false).get();
  }
  extractRawGetValueFromBatchResult(a) {
    throw Error("Not implemented");
  }
  values(a) {
    return this.prepareOneTimeQuery(this.dialect.sqlToQuery(a), void 0, "run", false).values();
  }
  async count(a) {
    return (await this.values(a))[0][0];
  }
  extractRawValuesValueFromBatchResult(a) {
    throw Error("Not implemented");
  }
}
class av extends ao {
  constructor(a, b, c, d, e = 0) {
    super(a, b, c, d);
    this.schema = d;
    this.nestedIndex = e;
  }
  static [d.i] = "SQLiteTransaction";
  rollback() {
    throw new L();
  }
}
class aw extends au {
  constructor(a, b, c, d, e = {}) {
    super(b);
    this.client = a;
    this.schema = c;
    this.batchCLient = d;
    this.logger = e.logger ?? new g();
    this.cache = e.cache ?? new aq();
  }
  static [d.i] = "SQLiteRemoteSession";
  logger;
  cache;
  prepareQuery(a, b, c, d, e, f, g) {
    return new ay(this.client, a, this.logger, this.cache, f, g, b, c, d, e);
  }
  async batch(a) {
    let b = [],
      c = [];
    for (let d of a) {
      let a = d._prepare(),
        e = a.getQuery();
      b.push(a);
      c.push({
        sql: e.sql,
        params: e.params,
        method: e.method
      });
    }
    return (await this.batchCLient(c)).map((a, c) => b[c].mapResult(a, true));
  }
  async transaction(a, b) {
    let c = new ax("async", this.dialect, this, this.schema);
    await this.run(q.ll.raw(`begin${b?.behavior ? " " + b.behavior : ""}`));
    try {
      let b = await a(c);
      return await this.run((0, q.ll)`commit`), b;
    } catch (a) {
      throw await this.run((0, q.ll)`rollback`), a;
    }
  }
  extractRawAllValueFromBatchResult(a) {
    return a.rows;
  }
  extractRawGetValueFromBatchResult(a) {
    return a.rows[0];
  }
  extractRawValuesValueFromBatchResult(a) {
    return a.rows;
  }
}
class ax extends av {
  static [d.i] = "SQLiteProxyTransaction";
  async transaction(a) {
    let b = `sp${this.nestedIndex}`,
      c = new ax("async", this.dialect, this.session, this.schema, this.nestedIndex + 1);
    await this.session.run(q.ll.raw(`savepoint ${b}`));
    try {
      let d = await a(c);
      return await this.session.run(q.ll.raw(`release savepoint ${b}`)), d;
    } catch (a) {
      throw await this.session.run(q.ll.raw(`rollback to savepoint ${b}`)), a;
    }
  }
}
class ay extends at {
  constructor(a, b, c, d, e, f, g, h, i, j) {
    super("async", h, b, d, e, f);
    this.client = a;
    this.logger = c;
    this.fields = g;
    this._isResponseInArrayMode = i;
    this.customResultMapper = j;
    this.customResultMapper = j;
    this.method = h;
  }
  static [d.i] = "SQLiteProxyPreparedQuery";
  method;
  getQuery() {
    return {
      ...this.query,
      method: this.method
    };
  }
  async run(a) {
    let b = (0, q.Ct)(this.query.params, a ?? {});
    return this.logger.logQuery(this.query.sql, b), await this.queryWithCache(this.query.sql, b, async () => await this.client(this.query.sql, b, "run"));
  }
  mapAllResult(a, b) {
    return (b && (a = a.rows), this.fields || this.customResultMapper) ? this.customResultMapper ? this.customResultMapper(a) : a.map(a => (0, O.a6)(this.fields, a, this.joinsNotNullableMap)) : a;
  }
  async all(a) {
    let {
        query: b,
        logger: c,
        client: d
      } = this,
      e = (0, q.Ct)(b.params, a ?? {});
    c.logQuery(b.sql, e);
    let {
      rows: f
    } = await this.queryWithCache(b.sql, e, async () => await d(b.sql, e, "all"));
    return this.mapAllResult(f);
  }
  async get(a) {
    let {
        query: b,
        logger: c,
        client: d
      } = this,
      e = (0, q.Ct)(b.params, a ?? {});
    c.logQuery(b.sql, e);
    let f = await this.queryWithCache(b.sql, e, async () => await d(b.sql, e, "get"));
    return this.mapGetResult(f.rows);
  }
  mapGetResult(a, b) {
    b && (a = a.rows);
    let c = a;
    return this.fields || this.customResultMapper ? c ? this.customResultMapper ? this.customResultMapper([a]) : (0, O.a6)(this.fields, c, this.joinsNotNullableMap) : void 0 : c;
  }
  async values(a) {
    let b = (0, q.Ct)(this.query.params, a ?? {});
    return this.logger.logQuery(this.query.sql, b), (await this.queryWithCache(this.query.sql, b, async () => await this.client(this.query.sql, b, "values"))).rows;
  }
  isResponseInArrayMode() {
    return this._isResponseInArrayMode;
  }
}
class az extends ao {
  static [d.i] = "SqliteRemoteDatabase";
  async batch(a) {
    return this.session.batch(a);
  }
}
function aA(a, b, c) {
  let e,
    g,
    i,
    j,
    k = new S({
      casing: c?.casing
    }),
    l = {};
  if (b && ("function" == typeof b ? (i = b, l = c ?? {}) : (i = void 0, l = b), true === l.logger ? e = new f() : false !== l.logger && (e = l.logger, g = l.cache)), l.schema) {
    let a = function (a, b) {
      1 === Object.keys(a).length && "default" in a && !(0, d.is)(a.default, h.XI) && (a = a.default);
      let c = {},
        e = {},
        f = {};
      for (let [g, i] of Object.entries(a)) if ((0, d.is)(i, h.XI)) {
        let a = (0, h.Lf)(i),
          b = e[a];
        for (let d of (c[a] = g, f[g] = {
          tsName: g,
          dbName: i[h.XI.Symbol.Name],
          schema: i[h.XI.Symbol.Schema],
          columns: i[h.XI.Symbol.Columns],
          relations: b?.relations ?? {},
          primaryKey: b?.primaryKey ?? []
        }, Object.values(i[h.XI.Symbol.Columns]))) d.primary && f[g].primaryKey.push(d);
        let j = i[h.XI.Symbol.ExtraConfigBuilder]?.(i[h.XI.Symbol.ExtraConfigColumns]);
        if (j) for (let a of Object.values(j)) (0, d.is)(a, m) && f[g].primaryKey.push(...a.columns);
      } else if ((0, d.is)(i, s)) {
        let a,
          d = (0, h.Lf)(i.table),
          g = c[d];
        for (let [c, h] of Object.entries(i.config(b(i.table)))) if (g) {
          let b = f[g];
          b.relations[c] = h;
          a && b.primaryKey.push(...a);
        } else {
          d in e || (e[d] = {
            relations: {},
            primaryKey: a
          });
          e[d].relations[c] = h;
        }
      }
      return {
        tables: f,
        tableNamesMap: c
      };
    }(l.schema, v);
    j = {
      fullSchema: l.schema,
      schema: a.tables,
      tableNamesMap: a.tableNamesMap
    };
  }
  let n = new aw(a, k, j, i, {
      logger: e,
      cache: g
    }),
    o = new az("async", k, n, j);
  return o.$cache = g, o.$cache && (o.$cache.invalidate = g?.onMutate), o;
}
export { aA as f };
