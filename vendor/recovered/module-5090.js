// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as d from "./module-6122.js";
import * as e from "./module-6872.js";
import * as f from "./module-1029.js";
import * as g from "./module-1505.js";
import * as h from "./module-4655.js";
import * as i from "./module-3402.js";
function j(a, b, c) {
  let i = {},
    j = a.reduce((a, {
      path: j,
      field: k
    }, l) => {
      let m;
      m = (0, e.is)(k, d.V) ? k : (0, e.is)(k, f.Xs) ? k.decoder : (0, e.is)(k, g.n) ? k._.sql.decoder : k.sql.decoder;
      let n = a;
      for (let [a, f] of j.entries()) if (a < j.length - 1) {
        f in n || (n[f] = {});
        n = n[f];
      } else {
        let a = b[l],
          g = n[f] = null === a ? null : m.mapFromDriverValue(a);
        if (c && (0, e.is)(k, d.V) && 2 === j.length) {
          let a = j[0];
          a in i ? "string" == typeof i[a] && i[a] !== (0, h.Io)(k.table) && (i[a] = false) : i[a] = null === g && (0, h.Io)(k.table);
        }
      }
      return a;
    }, {});
  if (c && Object.keys(i).length > 0) for (let [a, b] of Object.entries(i)) "string" != typeof b || c[b] || (j[a] = null);
  return j;
}
function k(a, b) {
  let c = Object.keys(a),
    d = Object.keys(b);
  if (c.length !== d.length) return false;
  for (let [a, b] of c.entries()) if (b !== d[a]) return false;
  return true;
}
function l(a, b) {
  let c = Object.entries(b).filter(([, a]) => void 0 !== a).map(([b, c]) => (0, e.is)(c, f.Xs) || (0, e.is)(c, d.V) ? [b, c] : [b, new f.Iw(c, a[h.XI.Symbol.Columns][b])]);
  if (0 === c.length) throw Error("No values to set");
  return Object.fromEntries(c);
}
function m(a, b) {
  for (let c of b) for (let b of Object.getOwnPropertyNames(c.prototype)) "constructor" !== b && Object.defineProperty(a.prototype, b, Object.getOwnPropertyDescriptor(c.prototype, b) || Object.create(null));
}
function n(a) {
  return a[h.XI.Symbol.Columns];
}
function o(a) {
  return (0, e.is)(a, g.n) ? a._.alias : (0, e.is)(a, f.Ss) ? a[i.n].name : (0, e.is)(a, f.Xs) ? void 0 : a[h.XI.Symbol.IsAlias] ? a[h.XI.Symbol.Name] : a[h.XI.Symbol.BaseName];
}
function p(a, b) {
  return {
    name: "string" == typeof a && a.length > 0 ? a : "",
    config: "object" == typeof a ? a : b
  };
}
let q = "u" < typeof TextDecoder ? null : new TextDecoder();
export { k as DV };
export const He = function a(b, c) {
  return Object.entries(b).reduce((b, [i, j]) => {
    if ("string" != typeof i) return b;
    let k = c ? [...c, i] : [i];
    return (0, e.is)(j, d.V) || (0, e.is)(j, f.Xs) || (0, e.is)(j, f.Xs.Aliased) || (0, e.is)(j, g.n) ? b.push({
      path: k,
      field: j
    }) : (0, e.is)(j, h.XI) ? b.push(...a(j[h.XI.Symbol.Columns], k)) : b.push(...a(j, k)), b;
  }, []);
};
export { p as Ll };
export { m as XJ };
export { n as YD };
export { j as a6 };
export { l as q };
export { q as su };
export { o as zN };
