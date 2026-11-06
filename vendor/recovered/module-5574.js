// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as d from "./module-6872.js";
import * as e from "./module-4655.js";
import * as f from "./module-5090.js";
import * as g from "./module-2194.js";
import * as r from "./module-4982.js";
import * as C from "./module-2917.js";
class h extends g.o {
  static [d.i] = "SQLiteBigIntBuilder";
  constructor(a) {
    super(a, "bigint", "SQLiteBigInt");
  }
  build(a) {
    return new i(a, this.config);
  }
}
class i extends g.v {
  static [d.i] = "SQLiteBigInt";
  getSQLType() {
    return "blob";
  }
  mapFromDriverValue(a) {
    return "u" > typeof Buffer && Buffer.from ? BigInt((Buffer.isBuffer(a) ? a : a instanceof ArrayBuffer ? Buffer.from(a) : a.buffer ? Buffer.from(a.buffer, a.byteOffset, a.byteLength) : Buffer.from(a)).toString("utf8")) : BigInt(f.su.decode(a));
  }
  mapToDriverValue(a) {
    return Buffer.from(a.toString());
  }
}
class j extends g.o {
  static [d.i] = "SQLiteBlobJsonBuilder";
  constructor(a) {
    super(a, "json", "SQLiteBlobJson");
  }
  build(a) {
    return new k(a, this.config);
  }
}
class k extends g.v {
  static [d.i] = "SQLiteBlobJson";
  getSQLType() {
    return "blob";
  }
  mapFromDriverValue(a) {
    return "u" > typeof Buffer && Buffer.from ? JSON.parse((Buffer.isBuffer(a) ? a : a instanceof ArrayBuffer ? Buffer.from(a) : a.buffer ? Buffer.from(a.buffer, a.byteOffset, a.byteLength) : Buffer.from(a)).toString("utf8")) : JSON.parse(f.su.decode(a));
  }
  mapToDriverValue(a) {
    return Buffer.from(JSON.stringify(a));
  }
}
class l extends g.o {
  static [d.i] = "SQLiteBlobBufferBuilder";
  constructor(a) {
    super(a, "buffer", "SQLiteBlobBuffer");
  }
  build(a) {
    return new m(a, this.config);
  }
}
class m extends g.v {
  static [d.i] = "SQLiteBlobBuffer";
  mapFromDriverValue(a) {
    return Buffer.isBuffer(a) ? a : Buffer.from(a);
  }
  getSQLType() {
    return "blob";
  }
}
function n(a, b) {
  let {
    name: c,
    config: d
  } = (0, f.Ll)(a, b);
  return d?.mode === "json" ? new j(c) : d?.mode === "bigint" ? new h(c) : new l(c);
}
class o extends g.o {
  static [d.i] = "SQLiteCustomColumnBuilder";
  constructor(a, b, c) {
    super(a, "custom", "SQLiteCustomColumn");
    this.config.fieldConfig = b;
    this.config.customTypeParams = c;
  }
  build(a) {
    return new p(a, this.config);
  }
}
class p extends g.v {
  static [d.i] = "SQLiteCustomColumn";
  sqlName;
  mapTo;
  mapFrom;
  constructor(a, b) {
    super(a, b);
    this.sqlName = b.customTypeParams.dataType(b.fieldConfig);
    this.mapTo = b.customTypeParams.toDriver;
    this.mapFrom = b.customTypeParams.fromDriver;
  }
  getSQLType() {
    return this.sqlName;
  }
  mapFromDriverValue(a) {
    return "function" == typeof this.mapFrom ? this.mapFrom(a) : a;
  }
  mapToDriverValue(a) {
    return "function" == typeof this.mapTo ? this.mapTo(a) : a;
  }
}
function q(a) {
  return (b, c) => {
    let {
      name: d,
      config: e
    } = (0, f.Ll)(b, c);
    return new o(d, e, a);
  };
}
class s extends g.o {
  static [d.i] = "SQLiteNumericBuilder";
  constructor(a) {
    super(a, "string", "SQLiteNumeric");
  }
  build(a) {
    return new t(a, this.config);
  }
}
class t extends g.v {
  static [d.i] = "SQLiteNumeric";
  mapFromDriverValue(a) {
    return "string" == typeof a ? a : String(a);
  }
  getSQLType() {
    return "numeric";
  }
}
class u extends g.o {
  static [d.i] = "SQLiteNumericNumberBuilder";
  constructor(a) {
    super(a, "number", "SQLiteNumericNumber");
  }
  build(a) {
    return new v(a, this.config);
  }
}
class v extends g.v {
  static [d.i] = "SQLiteNumericNumber";
  mapFromDriverValue(a) {
    return "number" == typeof a ? a : Number(a);
  }
  mapToDriverValue = String;
  getSQLType() {
    return "numeric";
  }
}
class w extends g.o {
  static [d.i] = "SQLiteNumericBigIntBuilder";
  constructor(a) {
    super(a, "bigint", "SQLiteNumericBigInt");
  }
  build(a) {
    return new x(a, this.config);
  }
}
class x extends g.v {
  static [d.i] = "SQLiteNumericBigInt";
  mapFromDriverValue = BigInt;
  mapToDriverValue = String;
  getSQLType() {
    return "numeric";
  }
}
function y(a, b) {
  let {
      name: c,
      config: d
    } = (0, f.Ll)(a, b),
    e = d?.mode;
  return "number" === e ? new u(c) : "bigint" === e ? new w(c) : new s(c);
}
class z extends g.o {
  static [d.i] = "SQLiteRealBuilder";
  constructor(a) {
    super(a, "number", "SQLiteReal");
  }
  build(a) {
    return new A(a, this.config);
  }
}
class A extends g.v {
  static [d.i] = "SQLiteReal";
  getSQLType() {
    return "real";
  }
}
function B(a) {
  return new z(a ?? "");
}
let D = Symbol.for("drizzle:SQLiteInlineForeignKeys");
class E extends e.XI {
  static [d.i] = "SQLiteTable";
  static Symbol = Object.assign({}, e.XI.Symbol, {
    InlineForeignKeys: D
  });
  [e.XI.Symbol.Columns];
  [D] = [];
  [e.XI.Symbol.ExtraConfigBuilder] = void 0;
}
let F = (a, b, c) => function (a, b, c, d = a) {
  let f = new E(a, void 0, d),
    g = Object.fromEntries(Object.entries("function" == typeof b ? b({
      blob: n,
      customType: q,
      integer: r.nd,
      numeric: y,
      real: B,
      text: C.Qq
    }) : b).map(([a, b]) => {
      b.setName(a);
      let c = b.build(f);
      return f[D].push(...b.buildForeignKeys(c, f)), [a, c];
    })),
    h = Object.assign(f, g);
  return h[e.XI.Symbol.Columns] = g, h[e.XI.Symbol.ExtraConfigColumns] = g, c && (h[E.Symbol.ExtraConfigBuilder] = c), h;
}(a, b, c);
export { E as jo };
export { F as D };
