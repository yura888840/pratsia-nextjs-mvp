// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as e from "node:sqlite";
import * as f from "node:fs";
import * as g from "node:path";
let d;
function getSqlite() {
  if (!d) {
    let a = g.join(process.env.PRATSIA_DATA_DIR || g.resolve("data"), "pratsia.sqlite");
    (0, f.mkdirSync)(g.dirname(a), {
      recursive: true,
      mode: 448
    });
    (d = new e.DatabaseSync(a)).exec("PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;");
  }
  return d;
}
export { getSqlite };
