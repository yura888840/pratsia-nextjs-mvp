import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
const dir=mkdtempSync(path.join(tmpdir(),'pratsia-mvp-test-'));
process.env.PRATSIA_DATA_DIR=dir;
const {migrate}=await import('../scripts/migrate-local.mjs');
const {getSqlite}=await import('../db/connection.js');
const {submitApplication}=await import('../lib/applications.js');
const {jobPosting,isPublicJob}=await import('../lib/seo.js');
test('applications are private snapshots; retries cannot duplicate or replace them; unavailable jobs reject writes',()=>{
 try{
 migrate();const db=getSqlite();
 db.prepare("INSERT INTO accounts(id,email,name,password_hash,created_at) VALUES ('owner','owner@example.invalid','Owner','unused',0),('candidate','candidate@example.invalid','Candidate','unused',0)").run();
 db.prepare("INSERT INTO profiles(user_id,name,phone,city,occupation,salary,experience,skills,about,schedule,updated_at) VALUES ('candidate','Original name','+380501234567','Київ','Програміст',1000,'Без досвіду','JS','','Повна зайнятість',?)").run(new Date().toISOString());
 db.prepare("INSERT INTO jobs(id,owner_id,title,company,occupation,category,city,arrangement,schedule,salary_min,salary_max,experience,description,requirements,created_at,expires_at,moderation_status) VALUES ('job','owner','Розробник','Company','Програміст','it','Київ','Дистанційно','Повна зайнятість',1000,2000,'Без досвіду','Description','Requirements',?,?,'pending')").run(new Date().toISOString(),new Date(Date.now()+86400000).toISOString());
 const candidate={userId:'candidate',email:'candidate@example.invalid'};
 assert.equal(submitApplication(candidate,'job','Hello').status,409);
 db.prepare("UPDATE jobs SET moderation_status='approved' WHERE id='job'").run();
 assert.equal(submitApplication({userId:'owner'},'job','').status,400);
 const result=submitApplication(candidate,'job','Hello');assert.equal(result.ok,true);
 db.prepare("UPDATE profiles SET name='Changed' WHERE user_id='candidate'").run();
 assert.equal(submitApplication(candidate,'job','Changed message').id,result.id);
 const rows=db.prepare('SELECT * FROM applications').all();assert.equal(rows.length,1);
 assert.equal(JSON.parse(rows[0].profile_snapshot).name,'Original name');assert.equal(rows[0].message,'Hello');
 db.prepare("UPDATE jobs SET status='closed' WHERE id='job'").run();assert.equal(submitApplication(candidate,'job','').status,409);
 db.prepare("UPDATE jobs SET status='active',expires_at='2020-01-01T00:00:00.000Z' WHERE id='job'").run();assert.equal(submitApplication(candidate,'job','').status,409);
 }finally{getSqlite().close();rmSync(dir,{recursive:true,force:true});}
});
test('SEO excludes closed jobs and remote jobs describe applicant location',()=>{
 const job={id:'job',status:'active',moderationStatus:'approved',expiresAt:new Date(Date.now()+86400000).toISOString(),arrangement:'Дистанційно',title:'Developer',company:'Company',description:'Description',requirements:'JS',salaryMin:1000,salaryMax:2000,currency:'UAH'};
 assert.equal(isPublicJob(job),true);assert.equal(isPublicJob({...job,status:'closed'}),false);assert.equal(isPublicJob({...job,moderationStatus:'pending'}),false);
 const seo=jobPosting(job);assert.equal(seo.jobLocationType,'TELECOMMUTE');assert.equal(seo.applicantLocationRequirements.name,'Ukraine');assert.equal(seo.baseSalary.value.unitText,'MONTH');
});
