import test from 'node:test';
import assert from 'node:assert/strict';
import { vacancyMatchingAttributes, resumeMatchingAttributes, normalizeSkills } from '../lib/matching-attributes.js';
import { emptyVacancy, readDrafts, validateVacancy } from '../components/employer/vacancy-model.js';
import { catalogValue } from '../i18n/index.js';

test('separate vacancy and resume records share comparable attributes without inventing missing resume preferences', () => {
  const common = { occupation: '  Юрист ', skills: 'Право, право; Аналіз', city: ' Київ ', experience: catalogValue('catalog.noExperience'), schedule: catalogValue('catalog.fullTime') };
  const vacancy = vacancyMatchingAttributes({ ...common, salaryMin: 10000, salaryMax: 20000, arrangement: catalogValue('catalog.remote') });
  const resume = resumeMatchingAttributes({ ...common, salary: 15000 });
  for (const key of ['profession', 'skills', 'experience', 'city', 'employmentType']) assert.deepEqual(vacancy[key], resume[key]);
  assert.equal(vacancy.workFormat, 'remote');
  assert.equal(resume.workFormat, null);
  assert.deepEqual(resume.salary, { min: 15000, max: null, currency: 'UAH', period: 'month' });
  assert.deepEqual(normalizeSkills(['React', ' react ', '']), ['react']);
});

test('drafts round-trip independently and malformed fields cannot enter the editor', () => {
  const draft = { ...emptyVacancy(), id: 'one', title: 'My draft', status: 'draft', salaryMin: 10000 };
  assert.deepEqual(readDrafts(JSON.stringify([draft])), [draft]);
  assert.deepEqual(readDrafts(JSON.stringify([{ ...draft, title: {}, skills: [] }]))[0].title, '');
  assert.deepEqual(readDrafts(JSON.stringify([{ ...draft, status: 'active' }])), []);
  assert.throws(() => readDrafts('{}'));
  assert.throws(() => readDrafts('{bad'));
});

test('preview validates range, required matching fields and optional email while drafts may be incomplete', () => {
  assert.ok(validateVacancy(emptyVacancy()).occupation);
  assert.ok(validateVacancy({ ...emptyVacancy(), salaryMin: 200, salaryMax: 100 }).salaryMax);
  assert.ok(validateVacancy({ ...emptyVacancy(), salaryMin: -1 }).salaryMin);
  assert.ok(validateVacancy({ ...emptyVacancy(), contactEmail: 'invalid' }).contactEmail);
  assert.equal(validateVacancy(emptyVacancy()).salaryMin, undefined);
});
