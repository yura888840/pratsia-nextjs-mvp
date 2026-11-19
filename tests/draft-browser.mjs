import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
import { translate } from '../common/i18n/index.js';
import { employerStorageKey } from '../employer/access.js';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

const baseURL = process.env.TEST_BASE_URL;
assert.equal(new URL(baseURL).hostname, '127.0.0.1');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
try {
  const context = await browser.newContext({ baseURL });
  const email = `draft-${Date.now()}@example.invalid`;
  const registration = await context.request.post('/api/auth', {
    headers: { origin: baseURL },
    data: { action: 'register', accountType: 'employer', name: 'Draft test', email, password: 'Draft-browser-test-2026' },
  });
  assert.equal(registration.status(), 200);
  const db = new DatabaseSync(path.join(process.env.TEST_DATA_DIR, 'pratsia.sqlite'), {readOnly: true});
  const {id} = db.prepare('SELECT id FROM accounts WHERE email=?').get(email);
  db.close();
  const page = await context.newPage();
  await page.goto('/employers/vacancies/new');
  await page.locator('#ev-title').fill('Browser draft');
  await page.getByRole('button', { name: translate('employer.save'), exact: true }).click();
  await page.getByText(translate('employer.saved'), { exact: true }).waitFor();
  const [draft] = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), employerStorageKey(id));
  assert.equal(draft.title, 'Browser draft');
  await page.goto('/employers/vacancies/' + draft.id + '/edit');
  await page.reload();
  await page.waitForFunction(() => document.querySelector('#ev-title')?.value === 'Browser draft');
  console.log('PASS: employer draft survives reload under its account storage key');
} finally {
  await browser.close();
}
