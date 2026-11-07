import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_FILTERS, filterJobs } from '../components/platform/jobs/search.js';
import { parseArray } from '../components/platform/candidate/profile.js';
import { catalogValue } from '../i18n/index.js';

const now = Date.parse('2026-11-07T12:00:00Z');
const vacancy = {
  id: 'job-1', title: 'Frontend developer', company: 'Example', occupation: 'Developer',
  status: 'active', moderationStatus: 'approved', category: 'it', city: 'Kyiv',
  arrangement: catalogValue('catalog.remote'), experience: catalogValue('catalog.noExperience'),
  salaryMin: 30000, schedule: catalogValue('catalog.fullTime'),
  createdAt: '2026-11-01T12:00:00Z', expiresAt: '2026-12-01T12:00:00Z',
};

test('job search excludes unavailable jobs and combines candidate filters without mutating results', () => {
  const jobs = [
    {...vacancy, id: 'lower-salary'},
    {...vacancy, id: 'higher-salary', salaryMin: 50000},
    {...vacancy, id: 'closed', status: 'closed'},
    {...vacancy, id: 'pending', moderationStatus: 'pending'},
    {...vacancy, id: 'expired', expiresAt: new Date(now).toISOString()},
    {...vacancy, id: 'onsite', arrangement: catalogValue('catalog.onsite')},
  ];
  const before = structuredClone(jobs);
  const filters = {...DEFAULT_FILTERS, query: ' FRONTEND ', city: 'KYIV', category: 'it', remote: true, noExperience: true, minSalary: 30000, schedule: vacancy.schedule, sort: 'salary'};
  assert.deepEqual(filterJobs(jobs, filters, now).map(job => job.id), ['higher-salary', 'lower-salary']);
  assert.deepEqual(jobs, before);
  assert.deepEqual(filterJobs(jobs, {...filters, minSalary: 60000}, now), []);
});

test('resume history supports stored JSON and in-memory arrays, tolerating malformed legacy data', () => {
  const history = [{company: 'Example', role: 'Developer'}];
  assert.deepEqual(parseArray(JSON.stringify(history)), history);
  assert.deepEqual(parseArray(history), history);
  for (const malformed of [null, undefined, '', '{invalid', '{}', 'null']) {
    assert.deepEqual(parseArray(malformed), []);
  }
});
