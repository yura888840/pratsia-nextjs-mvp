// Run only against a disposable LOCAL database/server: creates test accounts and a job.
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3101';
assert.ok(['127.0.0.1','localhost'].includes(new URL(base).hostname),'Local test server required');
assert.ok(process.env.TEST_DATA_DIR,'Set TEST_DATA_DIR to the disposable server data directory');
const {DatabaseSync}=await import('node:sqlite');
const path=await import('node:path');
const db=new DatabaseSync(path.join(process.env.TEST_DATA_DIR,'pratsia.sqlite'));
db.exec('PRAGMA busy_timeout=5000');
const stamp=Date.now(),password='Recovery-test-password-2026';let checks=0;
async function request(path,body,cookie='',expected=200,origin=base){const response=await fetch(base+path,{method:body?'POST':'GET',headers:{origin,'content-type':'application/json',cookie},...(body?{body:JSON.stringify(body)}:{})});const text=await response.text();assert.equal(response.status,expected,`${path}: ${text.slice(0,300)}`);checks++;return {data:JSON.parse(text),cookie:response.headers.get('set-cookie')?.split(';')[0]};}
await request('/api/platform');await request('/api/jobs');
await request('/api/platform',{action:'publish'},'',401);
await request('/api/auth',{action:'register',email:`owner-${stamp}@example.invalid`,name:'Test owner',password,accountType:'employer'},'',403,'https://invalid.example');
// Google starts locally without contacting Google; callback cancellation consumes state.
for (const accountType of ['candidate', 'employer']) {
 const registration=await fetch(base+'/register?accountType='+accountType);
 assert.equal(registration.status,200);const registrationHtml=await registration.text();const selectedRadio=(registrationHtml.match(/<input[^>]*>/g)||[]).find(tag=>tag.includes('type="radio"')&&tag.includes('value="'+accountType+'"'));assert.ok(selectedRadio&&/\schecked(?:=|\s|>)/.test(selectedRadio));checks++;
 const start=await fetch(base+'/api/auth/google',{method:'POST',headers:{origin:base,'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({accountType,returnTo:'/recommended'}),redirect:'manual'});
 assert.equal(start.status,303);
 const url=new URL(start.headers.get('location'));assert.equal(url.origin,'https://accounts.google.com');assert.equal(url.searchParams.get('code_challenge_method'),'S256');assert.equal(url.searchParams.get('redirect_uri'),base+'/api/auth/google/callback');
 const state=url.searchParams.get('state'),cookie=start.headers.get('set-cookie').split(';')[0];
 const canceled=await fetch(base+'/api/auth/google/callback?error=access_denied&state='+state,{headers:{cookie},redirect:'manual'});
 assert.equal(canceled.status,303);assert.ok(canceled.headers.get('location').includes('accountType='+accountType));assert.ok(canceled.headers.get('location').includes('returnTo=%2Frecommended'));
 const replay=await fetch(base+'/api/auth/google/callback?code=invalid&state='+state,{headers:{cookie},redirect:'manual'});
 assert.ok(replay.headers.get('location').includes('google-failed'));checks+=3;
}
const invalidOAuth=await fetch(base+'/api/auth/google',{method:'POST',headers:{origin:base},body:'accountType=admin',redirect:'manual'});assert.equal(invalidOAuth.status,400);checks++;
const csrfOAuth=await fetch(base+'/api/auth/google',{method:'POST',headers:{origin:'https://invalid.example'},body:'accountType=candidate',redirect:'manual'});assert.equal(csrfOAuth.status,403);checks++;
const owner=await request('/api/auth',{action:'register',email:`owner-${stamp}@example.invalid`,name:'Test owner',password,accountType:'employer'});assert.ok(owner.cookie);
const logged=await request('/api/platform',null,owner.cookie);assert.equal(logged.data.user.email,`owner-${stamp}@example.invalid`);
await request('/api/moderation',null,owner.cookie,403);
await request('/api/platform',{action:'publish',data:{}},owner.cookie,400);
const job={title:'Відновлення тест вакансії',company:'Test company',occupation:'Програміст',category:'it',city:'Київ',arrangement:'Дистанційно',schedule:'Повна зайнятість',salaryMin:30000,salaryMax:50000,experience:'Без досвіду',description:'Тестова вакансія для перевірки відновленого проєкту та бази даних.',requirements:'Знання JavaScript та бажання працювати.',benefits:''};
const published=await request('/api/platform',{action:'publish',data:job},owner.cookie);assert.ok(published.data.id);
const pending=await request('/api/jobs');assert.ok(!pending.data.jobs.some(j=>j.id===published.data.id));
assert.equal((await fetch(base+'/jobs/'+published.data.id)).status,404);checks++;
const adminEmail=`admin-${stamp}@example.invalid`;
const admin=await request('/api/auth',{action:'register',email:adminEmail,name:'Test admin',password});
// Test fixture only. Never run this test against a working database.
db.prepare("UPDATE accounts SET role='admin',email_verified_at=? WHERE email=?").run(Date.now(),adminEmail);
const queue=await request('/api/moderation?scope=pending',null,admin.cookie);assert.ok(queue.data.jobs.some(j=>j.id===published.data.id));
await request('/api/moderation',{action:'restore',jobId:published.data.id,reason:'Перевірено тестом'},owner.cookie,403);
await request('/api/moderation',{action:'restore',jobId:published.data.id,reason:'Перевірено тестом'},admin.cookie);
const results=await request('/api/jobs?q='+encodeURIComponent('Відновлення'));assert.ok(results.data.jobs.some(j=>j.id===published.data.id));
const page=await fetch(base+'/jobs/'+published.data.id);assert.equal(page.status,200);const html=await page.text();assert.ok(html.includes(job.title));assert.ok(html.includes('application/ld+json'));checks++;
await request('/api/platform',{action:'apply',jobId:published.data.id,message:''},owner.cookie,400);
const candidate=await request('/api/auth',{action:'register',email:`candidate-${stamp}@example.invalid`,name:'Test candidate',password});
await request('/api/platform',{action:'editJob',jobId:published.data.id,data:job},candidate.cookie,403);
await request('/api/platform',{action:'profile',data:{name:'Test candidate',phone:'+380501234567',city:'Київ',occupation:'Програміст',salary:40000,experience:'Без досвіду',skills:'JavaScript',about:'',schedule:'Повна зайнятість',workHistory:[],education:[],specialties:{}}},candidate.cookie);
await request('/api/platform',{action:'apply',jobId:published.data.id,message:'Тестовий відгук'},candidate.cookie);
const retry=await request('/api/platform',{action:'apply',jobId:published.data.id,message:'Повторний запит'},candidate.cookie);
const ownerState=await request('/api/platform',null,owner.cookie);assert.equal(ownerState.data.incoming.length,1);
const applicationId=ownerState.data.incoming[0].application.id;assert.equal(retry.data.id,applicationId);
await request('/api/platform',{action:'applicationStatus',id:applicationId,status:'invited'},candidate.cookie,403);
await request('/api/platform',{action:'applicationStatus',id:applicationId,status:'invited'},owner.cookie);
await request('/api/platform',{action:'favorite',jobId:published.data.id},candidate.cookie);
const state=await request('/api/platform',null,candidate.cookie);assert.ok(state.data.favorites.includes(published.data.id));assert.equal(state.data.applications.length,1);
await request('/api/platform',{action:'jobStatus',jobId:published.data.id,status:'closed'},owner.cookie);
await request('/api/platform',{action:'apply',jobId:published.data.id,message:''},candidate.cookie,409);
const closedPage=await fetch(base+'/jobs/'+published.data.id);const closedHtml=await closedPage.text();assert.ok(!closedHtml.includes('application/ld+json'));checks++;
const company=await request('/api/company',{name:'Test company profile',city:'Київ',description:'Компанія для перевірки',website:'https://example.com'},owner.cookie);
assert.ok(company.data.company.id);const companyPage=await fetch(base+'/companies/'+company.data.company.id);assert.equal(companyPage.status,200);checks++;
await request('/api/company',{name:'Bad URL company',city:'',description:'',website:'javascript:alert(1)'},owner.cookie,400);
await request('/api/company',null,candidate.cookie,403);
await request('/api/company',{name:'Forbidden company'},candidate.cookie,403);
await request('/api/platform',{action:'publish',data:job},candidate.cookie,403);
await request('/api/auth',{action:'register',email:`invalid-${stamp}@example.invalid`,name:'Bad role',password,accountType:'admin'},'',400);
assert.equal((await request('/api/platform',null,candidate.cookie)).data.user.accountType,'candidate');
assert.equal(logged.data.user.accountType,'employer');
for (const cookie of ['', candidate.cookie, owner.cookie]) {
 const legacy=await fetch(base+'/employer',{headers:{cookie},redirect:'manual'});assert.equal(legacy.status,307);assert.equal(legacy.headers.get('location'),'/employers');checks++;
 const employerPage=await fetch(base+'/employers',{headers:{cookie},redirect:'manual'});assert.equal(employerPage.status,200);const employerHtml=await employerPage.text();
 assert.ok(employerHtml.includes('employer-site-header'));assert.ok(employerHtml.includes('Знайдіть людей для своєї команди'));assert.ok(employerHtml.includes('/register?accountType=employer'));assert.ok(!employerHtml.includes('candidate-search'));checks++;
}
const guestHome=await (await fetch(base+'/')).text();const guestMenu=guestHome.match(/<nav[^>]*class="candidate-guest-menu"[^>]*>([\s\S]*?)<\/nav>/)?.[1];assert.ok(guestMenu);
assert.equal((guestMenu.match(/<a /g)||[]).length,2);assert.ok(guestMenu.includes('Рекомендовані'));assert.ok(guestMenu.includes('href="/login?returnTo=%2Frecommended"'));assert.ok(guestMenu.includes('href="/cv-welcome"'));checks++;
const guestHeader=guestHome.match(/<header[^>]*>([\s\S]*?)<\/header>/)?.[1];assert.ok(guestHeader&&!guestHeader.includes('Для шукачів роботи'));
assert.ok(guestHome.includes('guest-search-form'));assert.ok(guestHome.includes('Ким або в якій компанії хочете працювати?'));
assert.ok(guestHome.includes('name="city"'));assert.ok(guestHome.includes('Інші країни'));
for(const label of ['Всі вакансії','Віддалено','З бронюванням','Без досвіду','Часткова зайнятість','Без резюме','Для людей з інвалідністю','Відкриті до військового досвіду'])assert.ok(guestHome.includes(label));checks++;
const candidateHome=await (await fetch(base+'/',{headers:{cookie:candidate.cookie}})).text();assert.ok(candidateHome.includes('guest-search-form'));assert.ok(candidateHome.includes('name="city"'));checks++;
const filteredHome=await (await fetch(base+'/?filter=remote&q=React&city=__abroad')).text();assert.ok(filteredHome.includes('value="React"'));assert.ok(filteredHome.includes('value="__abroad"'));assert.ok(filteredHome.includes('value="remote"'));checks++;
const loginPage=await (await fetch(base+'/register?mode=login&accountType=candidate')).text();assert.ok(loginPage.includes('<h1>Увійти</h1>'));assert.ok(!loginPage.includes('name="name"'));checks++;
for (const route of ['/', '/?view=saved', '/jobs/demo-1']) {
 const response=await fetch(base+route);assert.equal(response.status,200);
 const html=await response.text();assert.ok(html.includes('Пошук за професією, компанією, навичками'));checks++;
}
for (const view of ['profile', 'applications']) {
 for (const [cookie, location] of [['','/register?accountType=candidate'],[owner.cookie,'/']]) {
  const response=await fetch(base+'/search?view='+view,{headers:{cookie},redirect:'manual'});
  assert.equal(response.status,307);assert.equal(response.headers.get('location'),location);checks++;
 }
 const allowed=await fetch(base+'/search?view='+view,{headers:{cookie:candidate.cookie},redirect:'manual'});
 assert.equal(allowed.status,307);assert.equal(allowed.headers.get('location'),'/account?section='+view);checks++;
}
for (const [cookie, isCandidate] of [['',false],[owner.cookie,false],[candidate.cookie,true]]) {
 const response=await fetch(base+'/search',{headers:{cookie}});const html=await response.text();
 const nav=html.match(/<nav[^>]*class="candidate-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1];assert.ok(nav);
 assert.equal(nav.includes('/account'),isCandidate);assert.equal(nav.includes('/?view=profile'),false);assert.equal(nav.includes('/?view=applications'),false);
 if(!cookie) assert.ok(nav.includes('Створити резюме') && nav.includes('/cv-welcome'));
 checks++;
}
for (const section of ['profile','saved','applications']) {
 for (const [cookie,location] of [['','/register?accountType=candidate'],[owner.cookie,'/']]) {
  const response=await fetch(base+'/account?section='+section,{headers:{cookie},redirect:'manual'});
  assert.equal(response.status,307);assert.equal(response.headers.get('location'),location);checks++;
 }
 const response=await fetch(base+'/account?section='+section,{headers:{cookie:candidate.cookie},redirect:'manual'});
 assert.equal(response.status,200);const html=await response.text();
 assert.ok(html.includes('candidate-user-menu'));assert.ok(/class="candidate-user-name" href="\/account"/.test(html));
 assert.ok(html.indexOf('candidate-search')<html.indexOf('candidate-account-sidebar'));
 const sidebar=html.match(/<aside[^>]*class="candidate-account-sidebar"[^>]*>([\s\S]*?)<\/aside>/)?.[1];assert.ok(sidebar);
 for (const key of ['profile','saved','applications']) assert.ok(sidebar.includes('/account?section='+key));
 assert.ok(sidebar.includes('Мої резюме'));assert.ok(sidebar.includes('Обране'));assert.ok(sidebar.includes('Куди надіслано резюме'));checks++;
}
const recommendationGuest=await fetch(base+'/recommended',{redirect:'manual'});assert.equal(recommendationGuest.status,307);assert.equal(recommendationGuest.headers.get('location'),'/login?returnTo=%2Frecommended');checks++;
const loginRedirect=await fetch(base+'/login?returnTo=%2Frecommended',{redirect:'manual'});assert.equal(loginRedirect.status,307);assert.ok(loginRedirect.headers.get('location').includes('mode=login'));assert.ok(loginRedirect.headers.get('location').includes('returnTo=%2Frecommended'));checks++;
const loginWithReturn=await (await fetch(base+'/register?mode=login&returnTo=%2Frecommended')).text();assert.ok(loginWithReturn.includes('name="returnTo" value="/recommended"'));checks++;
const returnedLogin=await request('/api/auth',{action:'login',email:`candidate-${stamp}@example.invalid`,password,returnTo:'/recommended'});assert.equal(returnedLogin.data.redirectTo,'/recommended');
const unsafeLogin=await request('/api/auth',{action:'login',email:`candidate-${stamp}@example.invalid`,password,returnTo:'https://invalid.example/'});assert.equal(unsafeLogin.data.redirectTo,'/');
const recommendations=await fetch(base+'/recommended',{headers:{cookie:unsafeLogin.cookie}});assert.equal(recommendations.status,200);assert.ok((await recommendations.text()).includes('Рекомендовані вакансії'));checks++;
for(const [cookie,expected] of [['','/register?accountType=candidate&amp;returnTo=%2Faccount%3Fsection%3Dprofile'],[unsafeLogin.cookie,'/account?section=profile']]){
 const welcome=await fetch(base+'/cv-welcome',{headers:{cookie}});assert.equal(welcome.status,200);const html=await welcome.text();assert.ok(html.includes('cv-welcome-art'));assert.ok(html.includes(expected));assert.ok(!html.includes('class="candidate-search"'));checks++;
}
await request('/api/platform',{action:'profile',data:{}},owner.cookie,403);
await request('/api/platform',{action:'profile',data:{}},'',401);
await request('/api/platform',{action:'jobStatus',jobId:published.data.id,status:'active'},owner.cookie);
assert.ok(!(await request('/api/jobs')).data.jobs.some(j=>j.id===published.data.id));
await request('/api/moderation',{action:'hide',jobId:published.data.id,reason:'Заблоковано тестом'},admin.cookie);
await request('/api/platform',{action:'editJob',jobId:published.data.id,data:job},owner.cookie,409);
await request('/api/platform',{action:'jobStatus',jobId:published.data.id,status:'active'},owner.cookie,409);
const sitemap=await fetch(base+'/sitemap.xml');assert.equal(sitemap.status,200);assert.ok(!(await sitemap.text()).includes(published.data.id));checks++;
await request('/api/auth',{action:'login',email:`owner-${stamp}@example.invalid`,password});
await request('/api/auth/recovery',{action:'complete',token:'a'.repeat(64),password},'',400);
db.close();
console.log(`PASS: ${checks} HTTP checks (auth, sessions, jobs, ownership, profile, applications, favorites, recovery validation).`);

assert.ok(guestHome.includes('action="/search"'));
assert.ok(guestHome.includes('candidate-home-banners'));
assert.ok(!guestHome.includes('candidate-count'));
const legacySearch=await fetch(base+'/?q=React&filter=remote',{redirect:'manual'});
assert.equal(legacySearch.status,307);
assert.equal(legacySearch.headers.get('location'),'/search?q=React&filter=remote');
for (const filter of ['', 'remote','reservation','noExperience','partTime','noResume','disability','veteran']) {
 const response=await fetch(base+'/search?filter='+filter);
 assert.equal(response.status,200);
 const html=await response.text();
 assert.ok(html.includes('action="/search"'));
 assert.ok(!html.includes('candidate-home-banners'));
}
