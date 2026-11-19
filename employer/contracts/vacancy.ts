import type { emptyVacancy } from '../vacancies/model.js';

type EditorFields = Omit<ReturnType<typeof emptyVacancy>, 'salaryMin' | 'salaryMax'> & {
  salaryMin: number | string;
  salaryMax: number | string;
};

export type VacancyDraft = EditorFields & { status: 'draft'; id: string };
export type EditableVacancy = EditorFields & (
  | { status?: undefined; id?: undefined }
  | { status: 'draft' | 'example'; id: string }
);
