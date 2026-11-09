import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSearchFilters } from '../domains/vacancy/search-filters.js';
import { createVacancy, selectVacancies } from '../domains/vacancy/model.js';
import { catalogValue } from '../i18n/index.js';
const make = (id, fields={}) => createVacancy({id,title:'Developer',company:'Example',category:'it',partTime:true,salaryMin:20000,salaryMax:40000,arrangement:catalogValue('catalog.remote'),experience:catalogValue('catalog.noExperience'),...fields});
test('results filters combine employment, category, pay and flags with AND', () => {
 const jobs=[make('match'),make('office',{arrangement:'office'}),make('experienced',{experience:'experienced'}),make('full',{partTime:false}),make('other',{category:'sales'}),make('low',{salaryMax:25000}),make('currency',{currency:'USD'})];
 const filters=normalizeSearchFilters({employment:'partTime',category:'it',salary:'30000',remote:'1',noExperience:'1'});
 assert.deepEqual(selectVacancies(jobs,{searchFilters:filters}).map(j=>j.id),['match']);
 assert.equal(selectVacancies(jobs,{searchFilters:normalizeSearchFilters({})}).length,jobs.length);
 assert.equal(selectVacancies(jobs,{searchFilters:filters,query:'missing'}).length,0);
});
test('legacy home shortcuts normalize into editable results filters', () => {
 for (const flag of ['remote','noExperience','reservation','noResume','disability','veteran']) assert.equal(normalizeSearchFilters({filter:flag})[flag],true);
 assert.equal(normalizeSearchFilters({filter:'partTime'}).employment,'partTime');
 const invalid=normalizeSearchFilters({salary:'NaN',employment:'unknown',category:'unknown',remote:'false'});
 assert.equal(invalid.salary,0);assert.equal(invalid.employment,'');assert.equal(invalid.category,'');assert.equal(invalid.remote,false);
 assert.equal(normalizeSearchFilters(new URLSearchParams('salary=50000')).salary,50000);
});
