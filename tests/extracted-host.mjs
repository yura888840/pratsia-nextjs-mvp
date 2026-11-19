import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

export async function checkExtractedHost(workflow, origin, host) {
  async function request(url, expected, body, cookie = '') {
    const response = await fetch(origin + url, {
      method: body ? 'POST' : 'GET',
      headers: { origin, cookie, 'content-type': 'application/json' },
      body: body && JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });
    const data = await response.json();
    assert.equal(response.status, expected, workflow + ' ' + url + ': ' + JSON.stringify(data));
    return { data, cookie: response.headers.get('set-cookie')?.split(';')[0] };
  }

  async function signIn(accountType, moderator = false) {
    const email = accountType + '@example.invalid';
    const password = 'Extracted-host-test-password';
    await request('/api/auth', 200, { action: 'register', accountType, name: 'Host tester', email, password });
    if (moderator) {
      execFileSync(process.execPath, ['scripts/moderator.mjs', 'grant', email, '--mailbox-verified-by-operator'], {
        cwd: host, env: { ...process.env, PRATSIA_DATA_DIR: path.join(host, 'data') },
      });
    }
    const { cookie } = await request('/api/auth', 200, { action: 'login', email, password });
    assert.ok(cookie?.startsWith('pratsia_session='));
    return cookie;
  }

  const endpoint = workflow === 'admin' ? '/api/moderation' : '/api/' + workflow;
  const role = workflow === 'employer' ? 'employer' : 'candidate';
  const other = await signIn(role === 'candidate' ? 'employer' : 'candidate');
  const cookie = await signIn(role, workflow === 'admin');
  await request(endpoint, workflow === 'admin' ? 403 : 401);
  await request(endpoint, 403, undefined, other);

  if (workflow === 'applicant') {
    const profile = { name: 'Host tester', phone: '+380501234567', city: 'Kyiv', occupation: 'Engineer',
      salary: 40000, experience: 'Без досвіду', skills: 'JavaScript', about: '', schedule: 'Повна зайнятість',
      workHistory: [], education: [], specialties: {} };
    const command = { action: 'profile', data: profile };
    await request(endpoint, 403, command, other);
    await request(endpoint, 200, command, cookie);
    assert.equal((await request(endpoint, 200, undefined, cookie)).data.profile.skills, profile.skills);
  } else if (workflow === 'employer') {
    const data = { title: 'Product engineer', company: 'Host Co', occupation: 'Engineer', category: 'it', city: 'Kyiv',
      arrangement: 'Дистанційно', schedule: 'Повна зайнятість', salaryMin: 30000, salaryMax: 50000,
      experience: 'Без досвіду', description: 'Build and maintain the employer vacancy workspace.', requirements: 'Experience with React', benefits: '' };
    const command = { action: 'publish', data };
    await request(endpoint, 403, command, other);
    const published = await request(endpoint, 200, command, cookie);
    const { myJobs } = (await request(endpoint, 200, undefined, cookie)).data;
    assert.deepEqual(myJobs.map(job => [job.id, job.title, job.moderationStatus]), [[published.data.id, data.title, 'pending']]);
  } else {
    // This host has no employer route. Seed an existing pending job for moderation.
    const db = new DatabaseSync(path.join(host, 'data/pratsia.sqlite'));
    try {
      db.prepare(`INSERT INTO jobs(id,owner_id,title,company,occupation,category,city,arrangement,schedule,
        salary_min,salary_max,experience,description,requirements,created_at,expires_at,moderation_status)
        SELECT 'pending-job',id,'Engineer','Host Co','Engineer','it','Kyiv','Remote','Full time',
        30000,50000,'Entry','Description','Requirements',?,?, 'pending' FROM accounts WHERE email=?`)
        .run(new Date().toISOString(), new Date(Date.now() + 86400000).toISOString(), 'employer@example.invalid');
    } finally { db.close(); }
    const pending = await request(endpoint + '?scope=pending', 200, undefined, cookie);
    assert.equal(pending.data.jobs[0].id, 'pending-job');
    const command = { action: 'restore', jobId: 'pending-job', reason: 'Reviewed in extracted host' };
    await request(endpoint, 403, command, other);
    await request(endpoint, 200, command, cookie);
    const recent = await request(endpoint + '?scope=recent', 200, undefined, cookie);
    assert.equal(recent.data.jobs[0].moderationStatus, 'approved');
    assert.equal(recent.data.jobs[0].events[0].action, 'restore');
  }
}
