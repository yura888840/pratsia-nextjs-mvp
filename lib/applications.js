import {getSqlite} from '../db/connection.js';
// All checks and writes run synchronously inside one short transaction.
export function submitApplication(user,jobId,message) {
  if(typeof message!=='string'||message.length>2000) return {status:400,error:'Повідомлення має містити до 2000 символів'};
  const db=getSqlite();db.exec('BEGIN IMMEDIATE');
  try {
    const job=db.prepare('SELECT * FROM jobs WHERE id=?').get(jobId);
    if(!job||job.status!=='active'||job.moderation_status!=='approved'||Date.parse(job.expires_at)<=Date.now())return finish({status:409,error:'Вакансія вже недоступна'});
    if(job.owner_id===user.userId)return finish({status:400,error:'На власну вакансію відгукнутися не можна'});
    const existing=db.prepare('SELECT id FROM applications WHERE job_id=? AND candidate_id=?').get(jobId,user.userId);
    if(existing)return finish({ok:true,id:existing.id});
    const profile=db.prepare('SELECT * FROM profiles WHERE user_id=?').get(user.userId);
    if(!profile)return finish({status:400,error:'Спочатку заповніть анкету',needsProfile:true});
    const snapshot={name:profile.name,phone:profile.phone,city:profile.city,occupation:profile.occupation,salary:profile.salary,experience:profile.experience,skills:profile.skills,about:profile.about,schedule:profile.schedule,specialties:profile.specialties,workHistory:profile.work_history,education:profile.education,email:user.email};
    const id=crypto.randomUUID();
    db.prepare('INSERT INTO applications(id,job_id,candidate_id,profile_snapshot,message,status,created_at) VALUES (?,?,?,?,?,?,?)').run(id,jobId,user.userId,JSON.stringify(snapshot),message.trim(),'new',new Date().toISOString());
    return finish({ok:true,id});
  } catch(error){db.exec('ROLLBACK');throw error;}
  function finish(result){db.exec('COMMIT');return result;}
}
