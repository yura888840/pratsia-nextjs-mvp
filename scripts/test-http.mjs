import {spawn} from 'node:child_process';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
const dir=await mkdtemp(path.join(tmpdir(),'pratsia-http-'));
const port=3197,base=`http://127.0.0.1:${port}`;
const env={...process.env,PRATSIA_DATA_DIR:dir,PRATSIA_ORIGIN:base,PRATSIA_MAIL_DISABLED:'1',TEST_BASE_URL:base,TEST_DATA_DIR:dir};
function run(args){return new Promise((resolve,reject)=>{const child=spawn(process.execPath,args,{env,stdio:'inherit'});child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(Error('Command exited '+code)));});}
let server;
try{
 await run(['scripts/migrate-local.mjs']);
 server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{env,stdio:'inherit'});
 let ready=false;
 for(let i=0;i<60;i++){if(server.exitCode!==null)throw Error('Server exited');try{const r=await fetch(base+'/api/jobs');if(r.ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,250));}
 if(!ready)throw Error('Server did not start');
 await run(['tests/http-smoke.mjs']);
}finally{
 if(server&&server.exitCode===null){const stopped=new Promise(resolve=>server.once('exit',resolve));server.kill('SIGTERM');await stopped;}
 await rm(dir,{recursive:true,force:true});
}
