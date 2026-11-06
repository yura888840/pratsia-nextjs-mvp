// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as nextHeaders from "next/headers";
import * as auth from "./auth.js";
async function getCurrentUser() {
  let a = await (0, nextHeaders.cookies)();
  return (0, auth.getSession)(a.get("pratsia_session")?.value);
}
export { getCurrentUser };
