import { cp, mkdir, mkdtemp, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

for (const workflow of ['applicant', 'employer', 'admin']) {
  const host = await mkdtemp(path.join(tmpdir(), 'pratsia-' + workflow + '-'));
  try {
    await mkdir(path.join(host, 'app'));
    for (const asset of [workflow, 'common', 'core', 'public', 'package.json', 'app/layout.jsx', 'app/globals.css', `app/(${workflow})`]) {
      await cp(asset, path.join(host, asset), { recursive: true });
    }
    await symlink(path.resolve('node_modules'), path.join(host, 'node_modules'), 'dir');
    execFileSync(process.execPath, [path.resolve('node_modules/next/dist/bin/next'), 'build', '--webpack'], {
      cwd: host, stdio: 'inherit', env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
    });
    console.log(`PASS: isolated ${workflow} build`);
  } finally {
    await rm(host, { recursive: true, force: true });
  }
}
