import {getSqlite} from '../db/connection.js';
import {siteOrigin} from '../lib/seo.js';
export const dynamic='force-dynamic';
export default function sitemap(){
 const origin=siteOrigin();
 const jobs=getSqlite().prepare("SELECT id FROM jobs WHERE status='active' AND moderation_status='approved' AND expires_at>? ORDER BY created_at DESC LIMIT 10000").all(new Date().toISOString());
 return [{url:origin},...jobs.map(job=>({url:origin+'/jobs/'+job.id}))];
}
