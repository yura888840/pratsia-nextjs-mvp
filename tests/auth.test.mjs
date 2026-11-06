import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
const dir=mkdtempSync(path.join(tmpdir(),'pratsia-recovery-test-'));
process.env.PRATSIA_DATA_DIR=dir;
const {migrate}=await import('../scripts/migrate-local.mjs');
const auth=await import('../lib/auth.js');
const {getSqlite}=await import('../db/connection.js');
test('migrations are repeatable; password reset is single-use and revokes sessions',async()=>{
 try {
  migrate();migrate();
  assert.equal(getSqlite().prepare('SELECT count(*) AS count FROM pratsia_migrations').get().count,8);
  const user=await auth.registerAccount('test@example.invalid','Test user','original-password-2026');
  assert.equal(await auth.authenticate('test@example.invalid','wrong-password-2026'),null);
  assert.equal(await auth.authenticate('test@example.invalid','original-password-2026'),user);
  const employer=await auth.registerAccount("employer@example.invalid","Employer","original-password-2026","employer");
  assert.equal(auth.getSession(auth.createSession(employer).token).accountType,"employer");
  await assert.rejects(auth.registerAccount("bad@example.invalid","Bad","original-password-2026","admin"));
  const session=auth.createSession(user);assert.equal(auth.getSession(session.token).accountType,"candidate");assert.equal(auth.getSession(session.token).userId,user);
  const reset=auth.createPasswordReset('test@example.invalid');assert.ok(reset);
  assert.equal(await auth.completePasswordReset(reset,'updated-password-2026'),true);
  assert.equal(auth.getSession(session.token),null);
  assert.equal(await auth.completePasswordReset(reset,'third-password-2026'),false);
  assert.equal(await auth.authenticate('test@example.invalid','original-password-2026'),null);
  assert.equal(await auth.authenticate('test@example.invalid','updated-password-2026'),user);
 } finally {getSqlite().close();rmSync(dir,{recursive:true,force:true});}
});
