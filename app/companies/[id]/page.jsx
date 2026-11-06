import {notFound} from 'next/navigation';
import {getSqlite} from '../../../db/connection.js';
export const dynamic='force-dynamic';
export async function generateMetadata({params}) {
 const {id}=await params;
 const company=getSqlite().prepare('SELECT name FROM companies WHERE id=?').get(id);
 return {title:company?`${company.name} — вакансії | Праця`:'Компанію не знайдено',robots:{index:false,follow:true}};
}
export default async function CompanyPage({params}) {
 const {id}=await params,db=getSqlite();
 const company=db.prepare('SELECT * FROM companies WHERE id=?').get(id);
 if(!company)notFound();
 const jobs=db.prepare("SELECT id,title,city,arrangement FROM jobs WHERE owner_id=? AND status='active' AND moderation_status='approved' AND expires_at>? ORDER BY created_at DESC LIMIT 100").all(company.owner_id,new Date().toISOString());
 return <main className="standalone-job"><a className="brand" href="/">праця.</a><a className="back-link" href="/">← До пошуку вакансій</a><article className="profile-card"><small className="eyebrow">РОБОТОДАВЕЦЬ · {company.city}</small><h1>{company.name}</h1><p className="preline">{company.description||'Компанія ще не додала опис.'}</p>{company.website&&<a href={company.website} rel="nofollow noopener noreferrer" target="_blank">Сайт компанії ↗</a>}<p className="muted">Інформацію надав роботодавець. Наявність профілю не означає перевірку компанії.</p></article><h2>Відкриті вакансії</h2>{jobs.length?jobs.map(job=><article className="profile-card" key={job.id}><h3><a href={'/jobs/'+job.id}>{job.title}</a></h3><p>{job.city} · {job.arrangement}</p></article>):<p>Наразі немає відкритих вакансій.</p>}</main>;
}
