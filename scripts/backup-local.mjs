import {DatabaseSync,backup} from 'node:sqlite';
import {mkdir,chmod,open,rename} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

// SQLite online backup includes committed WAL content without stopping the app.
export async function backupDatabase(source,directory){
  await mkdir(directory,{recursive:true,mode:0o700});
  const name=`pratsia-${new Date().toISOString().replaceAll(':','-')}-${crypto.randomUUID()}.sqlite`;
  const final=path.join(directory,name),partial=final+'.partial';
  const reserved=await open(partial,'wx',0o600);await reserved.close();
  const db=new DatabaseSync(source,{readOnly:true});
  try{await backup(db,partial)}finally{db.close()}
  await chmod(partial,0o600);
  const copy=new DatabaseSync(partial,{readOnly:true});
  try{const result=copy.prepare('PRAGMA integrity_check').get();if(result.integrity_check!=='ok')throw new Error('Backup integrity check failed');if(copy.prepare('PRAGMA foreign_key_check').all().length)throw new Error('Backup foreign keys failed')}finally{copy.close()}
  await rename(partial,final);return final;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const data=process.env.PRATSIA_DATA_DIR||path.resolve('data');
  console.log(await backupDatabase(path.join(data,'pratsia.sqlite'),process.env.PRATSIA_BACKUP_DIR||path.join(data,'backups')));
}
