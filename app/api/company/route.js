
import { translate } from "../../../i18n/index.js";
import { getSqlite } from '../../../db/connection.js';
import { getCurrentUser } from '../../../lib/session.js';
import { isAllowedOrigin } from '../../../lib/validation.js';
const json = (body, status = 200) => Response.json(body, {status, headers: {'Cache-Control':'no-store'}});
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return json({error:translate("app.api.company.route.uviydit_do_akaunta")},401);
  if (user.accountType !== 'employer') return json({error:translate("app.api.company.route.tsey_rozdil_dostupnyy_lyshe_robotodavtsyam")},403);
  return json({company:getSqlite().prepare('SELECT id,name,description,city,website FROM companies WHERE owner_id=?').get(user.userId) ?? null});
}
export async function POST(request) {
  if (!isAllowedOrigin(request)) return json({error:translate("app.api.auth.recovery.route.nedozvolenyy_zapyt")},403);
  const user = await getCurrentUser();
  if (!user) return json({error:translate("app.api.company.route.uviydit_do_akaunta")},401);
  if (user.accountType !== 'employer') return json({error:translate("app.api.company.route.tsey_rozdil_dostupnyy_lyshe_robotodavtsyam")},403);
  try {
    const text = await request.text();
    if (text.length > 12000) return json({error:translate("app.api.auth.recovery.route.zavelykyy_zapyt")},413);
    const input = JSON.parse(text);
    const limits = {name:[2,100],description:[0,5000],city:[0,100],website:[0,300]};
    const data = {};
    for (const [field,[min,max]] of Object.entries(limits)) {
      if (typeof input[field] !== 'string') return json({error:translate("app.api.company.route.perevirte_polya_kompaniyi")},400);
      data[field] = input[field].trim();
      if (data[field].length < min || data[field].length > max) return json({error:translate("app.api.company.route.perevirte_polya_kompaniyi")},400);
    }
    if (data.website) {
      const url = new URL(data.website);
      if (!['https:','http:'].includes(url.protocol) || url.username || url.password) return json({error:translate("app.api.company.route.vkazhit_adresu_saytu_z_https")},400);
    }
    const db = getSqlite();
    db.exec('BEGIN IMMEDIATE');
    try {
      const existing = db.prepare('SELECT id,name FROM companies WHERE owner_id=?').get(user.userId);
      const id = existing?.id ?? crypto.randomUUID();
      db.prepare(`INSERT INTO companies(id,owner_id,name,description,city,website,updated_at) VALUES (?,?,?,?,?,?,?)
        ON CONFLICT(owner_id) DO UPDATE SET name=excluded.name,description=excluded.description,city=excluded.city,website=excluded.website,updated_at=excluded.updated_at`)
        .run(id,user.userId,data.name,data.description,data.city,data.website,new Date().toISOString());
      // Changing the advertised employer name requires a fresh review of its listings.
      if (!existing || existing.name !== data.name) db.prepare("UPDATE jobs SET company=?,moderation_status=CASE WHEN moderation_status='blocked' THEN 'blocked' ELSE 'pending' END WHERE owner_id=?").run(data.name,user.userId);
      db.exec('COMMIT');
      return json({ok:true,company:{id,...data}});
    } catch(error) { db.exec('ROLLBACK'); throw error; }
  } catch { return json({error:translate("app.api.company.route.ne_vdalosya_zberehty_kompaniyu_perevirte_polya")},400); }
}
