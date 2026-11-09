// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as jsxRuntime from "react/jsx-runtime";
import * as platformModule from "../_shared/platform.jsx";
import { getDatabase } from "../../db/index.js";
import { searchJobs } from "../../lib/job-search.js";
import { defaultFilters } from "../../lib/catalog.js";
async function HomePage() {
  let initialJobs = [];
  try {
    initialJobs = (await searchJobs(getDatabase(), defaultFilters)).jobs;
  } catch {}
  return <platformModule.default initialJobs={initialJobs} />;
}
export { HomePage as default };
export const dynamic = "force-dynamic";
