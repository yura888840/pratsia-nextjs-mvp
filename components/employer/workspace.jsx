"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { translate as t, formatNumber } from '../../i18n/index.js';
import { cities, experienceLevels, schedules } from '../platform/catalog/job-options.js';
import { occupations } from '../platform/catalog/occupations.js';
import { workFormats } from '../../lib/matching-attributes.js';
import { STORAGE_KEY, emptyVacancy, exampleVacancies, validateVacancy, completeness, readDrafts } from './vacancy-model.js';

const base = '/employers/vacancies';
function Salary({ vacancy }) {
  const { salaryMin: min, salaryMax: max } = vacancy;
  return <strong className="ev-salary">{min === '' && max === '' ? t('employer.negotiable') : `${min === '' ? '…' : formatNumber(Number(min))} – ${max === '' ? '…' : formatNumber(Number(max))} ${vacancy.currency} / ${t('employer.month')}`}</strong>;
}
function VacancyCard({ vacancy, full = false }) {
  return <article className="ev-card ev-vacancy">
    <div className="ev-card-top"><span className="ev-badge">{t(`employer.${vacancy.status || 'draft'}`)}</span><span>{vacancy.company || t('employer.company')}</span></div>
    <h2>{full ? (vacancy.title || t('employer.untitled')) : <Link href={`${base}/${vacancy.id}`}>{vacancy.title || t('employer.untitled')}</Link>}</h2>
    <Salary vacancy={vacancy}/>
    <p className="ev-meta">{[vacancy.city, vacancy.arrangement, vacancy.schedule, vacancy.experience].filter(Boolean).join(' · ')}</p>
    <div className="ev-tags">{vacancy.skills.split(/[,;\n]/).filter(Boolean).map((skill, index) => <span key={index}>{skill.trim()}</span>)}</div>
    {full ? <>
      {['description', 'requirements', 'benefits'].map(key => <section className="ev-description" key={key}><h3>{t(`employer.${key}`)}</h3><p>{vacancy[key] || t('employer.notSpecified')}</p></section>)}
      <section className="ev-description"><h3>{t('employer.contacts')}</h3><p>{[vacancy.contactName, vacancy.contactPhone, vacancy.contactEmail].filter(Boolean).join(' · ') || t('employer.notSpecified')}</p><p>{vacancy.address}</p><p>{t(vacancy.resumeRequired ? 'employer.withResume' : 'employer.withoutResume')}</p></section>
    </> : <div className="ev-card-actions"><Link href={`${base}/${vacancy.id}/edit`}>{t(vacancy.status === 'example' ? 'employer.useExample' : 'employer.edit')}</Link><Link href={`${base}/${vacancy.id}`}>{t('employer.view')} <span aria-hidden="true">↗</span></Link></div>}
  </article>;
}
export function EmployerWorkspace({ mode = 'home', id }) {
  const [drafts, setDrafts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [storageError, setStorageError] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [vacancy, setVacancy] = useState(emptyVacancy);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    try { setDrafts(readDrafts(localStorage.getItem(STORAGE_KEY))); }
    catch { setStorageError(t('employer.storageError')); }
    setLoaded(true);
  }, []);
  const all = [...drafts, ...exampleVacancies()];
  const selected = all.find(item => item.id === id);
  useEffect(() => {
    if (!loaded || mode !== 'edit' || !id) return;
    const source = [...drafts, ...exampleVacancies()].find(item => item.id === id);
    if (source) setVacancy({ ...source });
  }, [loaded, mode, id]); // Editing state must not be reset after saving.
  useEffect(() => {
    if (!message || message === t('employer.saved')) return;
    document.getElementById('ev-message')?.focus();
  }, [message]);
  function update(key, value) { setVacancy(current => ({ ...current, [key]: value })); setMessage(''); }
  function save() {
    const saved = { ...vacancy, id: vacancy.status === 'draft' ? vacancy.id : crypto.randomUUID(), status: 'draft' };
    const next = [saved, ...drafts.filter(item => item.id !== saved.id)];
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setDrafts(next); setVacancy(saved); setMessage(t('employer.saved')); }
    catch { setMessage(t('employer.saveError')); }
  }
  function showPreview() {
    const nextErrors = validateVacancy(vacancy);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { setMessage(t('employer.fixErrors')); requestAnimationFrame(() => document.getElementById(`ev-${Object.keys(nextErrors)[0]}`)?.focus()); return; }
    setMessage(''); setPreview(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function field(key, options = {}) {
    const props = { id: `ev-${key}`, value: vacancy[key], onChange: event => update(key, event.target.value), 'aria-required': !!options.required, 'aria-invalid': !!errors[key], 'aria-describedby': errors[key] ? `ev-error-${key}` : undefined };
    return <label className={options.wide ? 'ev-field ev-wide' : 'ev-field'} key={key}><span>{t(`employer.${key}`)}{options.required && <span aria-hidden="true">{' *'}</span>}</span>
      {options.choices ? <select {...props}>{options.choices.map(value => <option key={value} value={value}>{value}</option>)}</select> : options.area ? <textarea {...props} rows={options.rows || 5} maxLength={key === 'description' ? 10000 : 3000}/> : <input {...props} type={options.type || 'text'} maxLength={options.type === 'number' ? undefined : 120} min={options.type === 'number' ? 0 : undefined} max={options.type === 'number' ? 10000000 : undefined} step={options.type === 'number' ? 1 : undefined} list={options.list} />}
      {errors[key] && <small id={`ev-error-${key}`} className="ev-error">{errors[key]}</small>}
    </label>;
  }
  const isEditor = mode === 'edit' || mode === 'new';
  return <div className="ev-workspace">
    <nav className="ev-nav" aria-label={t('employer.navigation')}><Link aria-current={mode === 'home' ? 'page' : undefined} href="/employers">{t('employer.overview')}</Link><Link aria-current={mode === 'list' ? 'page' : undefined} href={base}>{t('employer.vacancies')}</Link><span>{t('employer.workspace')}</span></nav>
    <div className="ev-notice">{t('employer.prototype')}</div>
    {storageError && <p role="alert" className="ev-error">{storageError}</p>}
    {!loaded ? <p role="status">{t('employer.loading')}</p> : (mode === 'detail' || mode === 'edit') && !selected ? <div className="ev-empty"><h1>{t('employer.notFound')}</h1><Link href={base}>{t('employer.back')}</Link></div> : isEditor ? <>
      <Link className="ev-back" href={base}>{'← '}{t('employer.back')}</Link>
      <div className="ev-heading"><div><p className="ev-eyebrow">{t('employer.hiring')}</p><h1>{t(preview ? 'employer.preview' : mode === 'new' ? 'employer.create' : 'employer.editTitle')}</h1><p>{t('employer.editorIntro')}</p></div><span className="ev-badge">{t('employer.draft')}</span></div>
      <p id="ev-message" tabIndex={-1} role="status" className="ev-message">{message}</p>
      {preview ? <><VacancyCard vacancy={vacancy} full/><div className="ev-actions"><button className="ev-primary" onClick={() => setPreview(false)}>{t('employer.backToEdit')}</button><button onClick={save}>{t('employer.save')}</button></div></> : <div className="ev-editor-layout"><form onSubmit={event => { event.preventDefault(); showPreview(); }} noValidate>
        <section className="ev-card"><h2>{t('employer.basics')}</h2><p>{t('employer.basicsHint')}</p><div className="ev-fields">{field('title', { required: true, wide: true })}{field('company', { required: true })}{field('occupation', { required: true, list: 'ev-occupations' })}{field('skills', { required: true, area: true, rows: 2, wide: true })}</div><datalist id="ev-occupations">{occupations.map(item => <option key={item.name} value={item.name}/>)}</datalist></section>
        <section className="ev-card"><h2>{t('employer.conditions')}</h2><div className="ev-fields">{field('city', { required: true, list: 'ev-cities' })}{field('address')}{field('arrangement', { choices: workFormats.map(item => item.label) })}{field('schedule', { choices: schedules })}{field('experience', { choices: experienceLevels })}{field('currency', { choices: ['UAH', 'EUR', 'USD'] })}{field('salaryMin', { type: 'number' })}{field('salaryMax', { type: 'number' })}</div><p>{t('employer.salaryHint')}</p><datalist id="ev-cities">{cities.map(city => <option key={city} value={city}/>)}</datalist></section>
        <section className="ev-card"><h2>{t('employer.aboutJob')}</h2><div className="ev-fields">{field('description', { required: true, area: true, wide: true })}{field('requirements', { required: true, area: true, wide: true })}{field('benefits', { area: true, wide: true, rows: 3 })}</div></section>
        <section className="ev-card"><h2>{t('employer.contacts')}</h2><div className="ev-fields">{field('contactName')}{field('contactPhone', { type: 'tel' })}{field('contactEmail', { type: 'email', wide: true })}</div><label className="ev-check"><input type="checkbox" checked={vacancy.resumeRequired} onChange={event => update('resumeRequired', event.target.checked)}/>{t('employer.withResume')}</label></section>
        <div className="ev-actions"><button className="ev-primary" type="button" onClick={save}>{t('employer.save')}</button><button type="submit">{t('employer.preview')}</button></div>
      </form><aside className="ev-aside"><div className="ev-card"><span className="ev-eyebrow">{t('employer.completeness')}</span><strong className="ev-progress-value">{`${completeness(vacancy)}%`}</strong><progress value={completeness(vacancy)} max="100" aria-label={t('employer.completeness')}/><p>{t('employer.matchingHint')}</p><ul>{['occupation', 'skills', 'experience', 'salaryMin', 'city', 'arrangement', 'schedule'].map(key => <li key={key}>{t(`employer.${key}`)}</li>)}</ul></div><div className="ev-tip"><h3>{t('employer.tipTitle')}</h3><p>{t('employer.tip')}</p></div></aside></div>}
    </> : mode === 'detail' ? <><Link className="ev-back" href={base}>{'← '}{t('employer.back')}</Link><div className="ev-heading"><h1>{t('employer.preview')}</h1><Link className="ev-primary" href={`${base}/${id}/edit`}>{t(selected.status === 'example' ? 'employer.useExample' : 'employer.edit')}</Link></div><VacancyCard vacancy={selected} full/></> : <>
      <div className="ev-heading"><div><p className="ev-eyebrow">{t('employer.hiring')}</p><h1>{t(mode === 'home' ? 'employer.homeTitle' : 'employer.vacancies')}</h1><p>{t('employer.homeIntro')}</p></div><Link className="ev-primary" href={`${base}/new`}>{'+ '}{t('employer.create')}</Link></div>
      {mode === 'home' && <><div className="ev-stats"><div className="ev-card"><strong>{drafts.length}</strong><span>{t('employer.drafts')}</span></div><div className="ev-card"><strong>{'01'}</strong><span>{t('employer.exampleCount')}</span></div><div className="ev-card ev-stat-note"><span>{t('employer.nextStep')}</span><Link href={`${base}/new`}>{t('employer.firstVacancy')}{' →'}</Link></div></div><div className="ev-section-title"><h2>{t('employer.vacancies')}</h2><Link href={base}>{t('employer.seeAll')}{' →'}</Link></div></>}
      <div className="ev-toolbar"><div className="ev-tabs" aria-label={t('employer.statusFilter')}>{['all', 'draft', 'example'].map(status => <button aria-pressed={filter === status} key={status} onClick={() => setFilter(status)}>{t(`employer.${status}`)} <span>{status === 'all' ? all.length : all.filter(item => item.status === status).length}</span></button>)}</div><input aria-label={t('employer.search')} placeholder={t('employer.search')} value={query} onChange={event => setQuery(event.target.value)}/></div>
      <div className="ev-list">{all.filter(item => (filter === 'all' || item.status === filter) && `${item.title} ${item.company} ${item.city}`.toLocaleLowerCase('uk').includes(query.toLocaleLowerCase('uk'))).map(item => <VacancyCard key={item.id} vacancy={item}/> )}</div>
      {!all.some(item => (filter === 'all' || item.status === filter) && `${item.title} ${item.company} ${item.city}`.toLocaleLowerCase('uk').includes(query.toLocaleLowerCase('uk'))) && <div className="ev-empty"><h2>{t('employer.empty')}</h2><p>{t('employer.emptyHint')}</p><Link className="ev-primary" href={`${base}/new`}>{t('employer.create')}</Link></div>}
    </>}
  </div>;
}
