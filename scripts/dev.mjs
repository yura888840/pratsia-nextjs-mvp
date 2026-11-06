import {spawn} from 'node:child_process';
import {migrate} from './migrate-local.mjs';
migrate();
// Accept the standard preview launcher flags as well as native Next.js flags.
const args=process.argv.slice(2).filter(arg=>arg!=='--strictPort').map(arg=>arg==='--host'?'--hostname':arg);
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--webpack',...args],{stdio:'inherit',env:process.env});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??1));
