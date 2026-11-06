import {getSqlite} from '../db/local.mjs';
// Operator-only command: never expose via an API. Does not create accounts.
const [operation,email,confirmation]=process.argv.slice(2);
if(!['grant','revoke'].includes(operation)||!email||email!==email.toLowerCase()||!email.includes('@'))throw Error('Usage: npm run moderator -- grant|revoke email [--mailbox-verified-by-operator]');
const db=getSqlite();
try{
 const account=db.prepare('SELECT id,email_verified_at FROM accounts WHERE email=?').get(email);
 if(!account)throw Error('Register the account first');
 if(operation==='grant'&&account.email_verified_at===null&&confirmation!=='--mailbox-verified-by-operator')throw Error('Verify the mailbox via recovery first, or confirm manual verification with --mailbox-verified-by-operator');
 db.exec('BEGIN IMMEDIATE');
 try{
  if(operation==='grant'&&account.email_verified_at===null)db.prepare('UPDATE accounts SET email_verified_at=? WHERE id=?').run(Date.now(),account.id);
  db.prepare('UPDATE accounts SET role=? WHERE id=?').run(operation==='grant'?'admin':'user',account.id);
  db.prepare('DELETE FROM sessions WHERE user_id=?').run(account.id);
  db.exec('COMMIT');
 }catch(error){db.exec('ROLLBACK');throw error;}
 console.log('Moderator role updated; sign in again');
}finally{db.close();}
