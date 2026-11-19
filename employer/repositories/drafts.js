import { employerStorageKey } from '../access.js';
import { readDrafts } from '../vacancies/model.js';

/** @param {string} userId
 * @returns {import("../contracts/vacancy.js").VacancyDraft[]}
 */
export function listDrafts(userId) {
  return readDrafts(localStorage.getItem(employerStorageKey(userId)));
}

/** @param {string} userId
 * @param {import("../contracts/vacancy.js").EditableVacancy} vacancy
 */
export function saveDraft(userId, vacancy) {
  const id = vacancy.status === 'draft' ? vacancy.id : crypto.randomUUID();
  /** @type {import("../contracts/vacancy.js").VacancyDraft} */
  const saved = { ...vacancy, id, status: 'draft' };
  const drafts = [saved, ...listDrafts(userId).filter(draft => draft.id !== id)];
  localStorage.setItem(employerStorageKey(userId), JSON.stringify(drafts));
  return { saved, drafts };
}
