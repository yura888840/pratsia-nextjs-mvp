// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import { drizzle } from "drizzle-orm/sqlite-proxy";
import * as connection from "./connection.js";
import * as schema from "./schema.js";
let d;
function getDatabase() {
  return d ??= drizzle(async (a, b, c) => {
    let d = (0, connection.getSqlite)().prepare(a);
    return "run" === c ? (d.run(...b), {
      rows: []
    }) : (d.setReturnArrays(true), "get" === c) ? {
      rows: d.get(...b) || []
    } : {
      rows: d.all(...b)
    };
  }, {
    schema: schema
  });
}
export { getDatabase };
