import { catalogValue } from '../i18n/index.js';
import { experienceLevels, schedules } from '../components/platform/catalog/job-options.js';

export const workFormats = [
  { id: 'onsite', label: catalogValue('catalog.onsite') },
  { id: 'hybrid', label: catalogValue('catalog.hybrid') },
  { id: 'remote', label: catalogValue('catalog.remote') },
];
const employmentIds = ['full_time', 'part_time', 'shift', 'flexible', 'project'];
const experienceIds = ['none', 'under_1', '1_3', '3_5', 'over_5'];
export const normalizeTerm = value => String(value || '').normalize('NFKC').trim().toLocaleLowerCase('uk').replace(/\s+/g, ' ');
export function normalizeSkills(value) {
  return [...new Set((Array.isArray(value) ? value : String(value || '').split(/[,;\n]/)).map(normalizeTerm).filter(Boolean))];
}
function salaryAmount(value) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null;
}
function attributes(record, kind) {
  const candidate = kind === 'resume';
  return {
    profession: normalizeTerm(record.occupation) || null,
    skills: normalizeSkills(record.skills),
    experience: experienceIds[experienceLevels.indexOf(record.experience)] || null,
    salary: { min: salaryAmount(candidate ? record.salary : record.salaryMin), max: candidate ? null : salaryAmount(record.salaryMax), currency: record.currency || 'UAH', period: 'month' },
    city: normalizeTerm(record.city) || null,
    workFormat: workFormats.find(item => item.label === record.arrangement)?.id || null,
    employmentType: employmentIds[schedules.indexOf(record.schedule)] || null,
  };
}
export const vacancyMatchingAttributes = record => attributes(record, 'vacancy');
export const resumeMatchingAttributes = record => attributes(record, 'resume');
