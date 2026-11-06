'use client';
import {useEffect,useState} from 'react';
export default function CompanyEditor({onSaved}) {
  const [form,setForm]=useState({name:'',description:'',city:'',website:''});
  const [id,setId]=useState(null),[busy,setBusy]=useState(true),[message,setMessage]=useState(''),[failed,setFailed]=useState(false);
  useEffect(()=>{let active=true; fetch('/api/company').then(async r=>{const data=await r.json();if(!r.ok)throw Error(data.error);if(active&&data.company){setForm(data.company);setId(data.company.id);}}).catch(e=>{if(active){setMessage(e.message);setFailed(true);}}).finally(()=>{if(active)setBusy(false);});return()=>{active=false;};},[]);
  async function save(event){event.preventDefault();setBusy(true);setMessage('');setFailed(false);try{const response=await fetch('/api/company',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});const data=await response.json();if(!response.ok)throw Error(data.error);setId(data.company.id);await onSaved?.();setMessage('Профіль збережено. Зміна назви надсилає вакансії на повторну перевірку.');}catch(e){setMessage(e.message);setFailed(true);}finally{setBusy(false);}}
  return <details className="profile-card company-editor"><summary>Профіль компанії</summary><p className="muted">Один акаунт — одна компанія. Назва з профілю використовується у вакансіях.</p><form onSubmit={save}>
    <label className="field">Назва компанії<input required minLength={2} maxLength={100} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
    <label className="field">Місто<input maxLength={100} value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/></label>
    <label className="field">Сайт<input type="url" placeholder="https://example.com" maxLength={300} value={form.website} onChange={e=>setForm({...form,website:e.target.value})}/></label>
    <label className="field">Про компанію<textarea rows={4} maxLength={5000} value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label>
    {message&&<p role={failed?'alert':'status'} className={failed?'form-error':'inline-note'}>{message}</p>}
    <div className="button-row"><button className="primary" disabled={busy}>{busy?'Зачекайте…':'Зберегти компанію'}</button>{id&&<a className="outline" href={'/companies/'+id}>Публічна сторінка</a>}</div>
  </form></details>;
}
