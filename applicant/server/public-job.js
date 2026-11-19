import { publicJobV1Fields } from "../../common/contracts/public-job-v1.js";
import { jobs } from "../../core/db/schema.js";

export const publicJobColumns = Object.fromEntries(publicJobV1Fields.map(key => [key, jobs[key]]));
