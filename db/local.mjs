import {DatabaseSync} from 'node:sqlite';
import {mkdirSync} from 'node:fs';
import path from 'node:path';
let connection;
export function databasePath(){return path.join(process.env.PRATSIA_DATA_DIR||path.resolve('data'),'pratsia.sqlite')}
export function getSqlite(){if(!connection){const file=databasePath();mkdirSync(path.dirname(file),{recursive:true,mode:0o700});connection=new DatabaseSync(file);connection.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');}return connection}
