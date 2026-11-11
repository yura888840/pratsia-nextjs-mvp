import { EMPTY_JOB } from '../platform/employer/job.js';
import { translate as t } from '../../i18n/index.js';
export const STORAGE_KEY = 'pratsia.employer.prototype.v1';
export const emptyVacancy = () => ({ ...EMPTY_JOB, salaryMin: '', salaryMax: '', skills: '', address: '', contactName: '', contactPhone: '', contactEmail: '', resumeRequired: true, currency: 'UAH' });
export function exampleVacancies() {
  return [{ ...emptyVacancy(), id: 'example-lawyer', title: t('employer.demoTitle'), company: t('employer.demoCompany'), occupation: t('app.platform.yuryst'), city: t('app.platform.kyyiv'), arrangement: t('catalog.remote'), salaryMin: 10000, salaryMax: 20000, skills: t('employer.demoSkills'), description: t('employer.demoDescription'), requirements: t('employer.demoRequirements'), benefits: t('employer.demoBenefits'), status: 'example' }];
}
export function validateVacancy(value) {
  const errors = {};
  for (const field of ['title', 'company', 'occupation', 'city', 'description', 'requirements', 'skills']) {
    if (!String(value[field] || '').trim()) errors[field] = t('employer.required');
  }
  for (const field of ['salaryMin', 'salaryMax']) {
    if (value[field] !== '' && (!Number.isInteger(Number(value[field])) || Number(value[field]) < 0 || Number(value[field]) > 10000000)) errors[field] = t('employer.invalidSalary');
  }
  if (value.salaryMin !== '' && value.salaryMax !== '' && Number(value.salaryMax) < Number(value.salaryMin)) errors.salaryMax = t('employer.salaryOrder');
  if (value.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.contactEmail)) errors.contactEmail = t('employer.invalidEmail');
  return errors;
}
export function completeness(value) {
  const fields = ['title', 'company', 'occupation', 'city', 'skills', 'description', 'requirements', 'benefits', 'contactName', 'contactEmail'];
  return fields.filter(key => String(value[key] || '').trim()).length * 10;
}
export function readDrafts(raw) {
  const data = JSON.parse(raw || '[]');
  if (!Array.isArray(data)) throw new Error('Invalid draft storage');
  return data.filter(item => item && typeof item.id === 'string' && item.status === 'draft').map(item => {
    const clean = emptyVacancy();
    for (const key of Object.keys(clean)) {
      if (typeof item[key] === typeof clean[key] || (['salaryMin', 'salaryMax'].includes(key) && typeof item[key] === 'number')) clean[key] = item[key];
    }
    return { ...clean, id: item.id, status: 'draft' };
  });
}
