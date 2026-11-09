
import { translate } from "../../../../i18n/index.js";
import { getSqlite } from '../../../../db/connection.js';
import { getCurrentUser } from '../../../../lib/session.js';
import { isAllowedOrigin } from '../../../../lib/validation.js';

const MAX_REQUEST_BODY_LENGTH = 12_000;
const COMPANY_FIELDS = {
  name: [2, 100],
  description: [0, 5000],
  city: [0, 100],
  website: [0, 300]
};

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store'
};

function json(body, status = 200) {
  return Response.json(body, { status, headers: NO_STORE_HEADERS });
}

function validateCompanyInput(input) {
  const company = {};

  for (const [field, [minLength, maxLength]] of Object.entries(COMPANY_FIELDS)) {
    if (typeof input?.[field] !== 'string') {
      return { ok: false, reason: 'invalid_fields' };
    }

    const value = input[field].trim();
    if (value.length < minLength || value.length > maxLength) {
      return { ok: false, reason: 'invalid_fields' };
    }

    company[field] = value;
  }

  if (company.website) {
    const websiteUrl = new URL(company.website);
    const hasValidProtocol = ['https:', 'http:'].includes(websiteUrl.protocol);
    const hasCredentials = websiteUrl.username || websiteUrl.password;

    if (!hasValidProtocol || hasCredentials) {
      return { ok: false, reason: 'invalid_website' };
    }
  }

  return { ok: true, company };
}

function saveCompany(ownerId, company) {
  const db = getSqlite();
  db.exec('BEGIN IMMEDIATE');

  try {
    const existing = db.prepare('SELECT id,name FROM companies WHERE owner_id=?').get(ownerId);
    const companyId = existing?.id ?? crypto.randomUUID();

    db.prepare(`INSERT INTO companies(id,owner_id,name,description,city,website,updated_at) VALUES (?,?,?,?,?,?,?)
      ON CONFLICT(owner_id) DO UPDATE SET name=excluded.name,description=excluded.description,city=excluded.city,website=excluded.website,updated_at=excluded.updated_at`)
      .run(companyId, ownerId, company.name, company.description, company.city, company.website, new Date().toISOString());

    if (!existing || existing.name !== company.name) {
      db.prepare("UPDATE jobs SET company=?,moderation_status=CASE WHEN moderation_status='blocked' THEN 'blocked' ELSE 'pending' END WHERE owner_id=?")
        .run(company.name, ownerId);
    }

    db.exec('COMMIT');
    return { id: companyId };
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

function employerOnlyError() {
  return json({ error: translate("app.api.company.route.tsey_rozdil_dostupnyy_lyshe_robotodavtsyam") }, 403);
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return json({ error: translate("app.api.company.route.uviydit_do_akaunta") }, 401);
  }

  if (user.accountType !== 'employer') {
    return employerOnlyError();
  }

  const company = getSqlite()
    .prepare('SELECT id,name,description,city,website FROM companies WHERE owner_id=?')
    .get(user.userId) ?? null;

  return json({ company });
}

export async function POST(request) {
  if (!isAllowedOrigin(request)) {
    return json({ error: translate("app.api.auth.recovery.route.nedozvolenyy_zapyt") }, 403);
  }

  const user = await getCurrentUser();

  if (!user) {
    return json({ error: translate("app.api.company.route.uviydit_do_akaunta") }, 401);
  }

  if (user.accountType !== 'employer') {
    return employerOnlyError();
  }

  try {
    const text = await request.text();

    if (text.length > MAX_REQUEST_BODY_LENGTH) {
      return json({ error: translate("app.api.auth.recovery.route.zavelykyy_zapyt") }, 413);
    }

    const input = JSON.parse(text);

    const companyValidation = validateCompanyInput(input);
    if (!companyValidation.ok) {
      if (companyValidation.reason === 'invalid_website') {
        return json({ error: translate("app.api.company.route.vkazhit_adresu_saytu_z_https") }, 400);
      }

      return json({ error: translate("app.api.company.route.perevirte_polya_kompaniyi") }, 400);
    }

    const result = saveCompany(user.userId, companyValidation.company);

    return json({
      ok: true,
      company: {
        id: result.id,
        ...companyValidation.company
      }
    });
  } catch {
    return json({ error: translate("app.api.company.route.ne_vdalosya_zberehty_kompaniyu_perevirte_polya") }, 400);
  }
}
