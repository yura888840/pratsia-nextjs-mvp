'use client';
import { translate } from "../i18n/index.js";

import {useEffect,useState} from 'react';
export default function CompanyEditor({onSaved}) {
  const [form,setForm]=useState({name:'',description:'',city:'',website:''});
  const [id,setId]=useState(null),[busy,setBusy]=useState(true),[message,setMessage]=useState(''),[failed,setFailed]=useState(false);
  useEffect(()=>{let active=true; fetch('/api/company').then(async r=>{const data=await r.json();if(!r.ok)throw Error(data.error);if(active&&data.company){setForm(data.company);setId(data.company.id);}}).catch(e=>{if(active){setMessage(e.message);setFailed(true);}}).finally(()=>{if(active)setBusy(false);});return()=>{active=false;};},[]);
  async function save(event){event.preventDefault();setBusy(true);setMessage('');setFailed(false);try{const response=await fetch('/api/company',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});const data=await response.json();if(!response.ok)throw Error(data.error);setId(data.company.id);await onSaved?.();setMessage(translate("components.company.editor.profil_zberezheno_zmina_nazvy_nadsylaye_vakansiyi_na_povtornu_perevirku"));}catch(e){setMessage(e.message);setFailed(true);}finally{setBusy(false);}}
  return <details className="profile-card company-editor"><summary>{translate("company.profile")}</summary><p className="muted">{translate("components.company.editor.odyn_akaunt_odna_kompaniya_nazva_z_profilyu_vykorystovuyetsya_u_vakansiyakh")}</p><form onSubmit={save}>
    <label className="field">{translate("company.name")}<input required minLength={2} maxLength={100} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
    <label className="field">{translate("fields.city")}<input maxLength={100} value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/></label>
    <label className="field">{translate("components.company.editor.sayt")}<input type="url" placeholder={translate("company.websitePlaceholder")} maxLength={300} value={form.website} onChange={e=>setForm({...form,website:e.target.value})}/></label>
    <label className="field">{translate("company.about")}<textarea rows={4} maxLength={5000} value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label>
    {message&&<p role={failed?'alert':'status'} className={failed?'form-error':'inline-note'}>{message}</p>}
    <div className="button-row"><button className="primary" disabled={busy}>{busy?translate("common.wait"):translate("company.save")}</button>{id&&<a className="outline" href={'/companies/'+id}>{translate("company.publicPage")}</a>}</div>
  </form></details>;
}
