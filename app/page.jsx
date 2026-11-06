// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as jsxRuntime from "react/jsx-runtime";
import * as e from "./platform.jsx";
import * as database from "../db/index.js";
import * as jobSearch from "../lib/job-search.js";
import * as catalog from "../lib/catalog.js";
async function HomePage() {
  let a = [];
  try {
    a = (await (0, jobSearch.searchJobs)((0, database.getDatabase)(), catalog.defaultFilters)).jobs;
  } catch {}
  return <e.default initialJobs={a} />;
}
export { HomePage as default };
export const dynamic = "force-dynamic";
