import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createInterface } from 'node:readline';
import { once } from 'node:events';
import { checkExtractedHost } from '../tests/extracted-host.mjs';
import { execFileSync, spawn } from 'node:child_process';

for (const workflow of ['applicant', 'employer', 'admin']) {
  const host = await mkdtemp(path.join(tmpdir(), 'pratsia-' + workflow + '-'));
  try {
    await mkdir(path.join(host, 'app'));
    for (const asset of [workflow, 'common', 'core', 'public', 'package.json', 'app/layout.jsx', 'app/globals.css', 'app/(shared)/api/auth/route.js', 'drizzle', 'scripts/migrate-local.mjs', 'scripts/moderator.mjs', `app/(${workflow})`]) {
      await mkdir(path.dirname(path.join(host, asset)), { recursive: true });
      await cp(asset, path.join(host, asset), { recursive: true });
    }
    await symlink(path.resolve('node_modules'), path.join(host, 'node_modules'), 'dir');
    const env = { ...process.env, PRATSIA_DATA_DIR: path.join(host, 'data'), NEXT_TELEMETRY_DISABLED: '1' };
    delete env.PRATSIA_ORIGIN;
    const options = { cwd: host, env, stdio: 'inherit' };
    const next = path.resolve('node_modules/next/dist/bin/next');
    execFileSync(process.execPath, ['scripts/migrate-local.mjs'], options);
    execFileSync(process.execPath, [next, 'build', '--webpack'], options);
    const server = spawn(process.execPath, [next, 'start', '-H', '127.0.0.1', '-p', '0'], {
      ...options, stdio: ['ignore', 'pipe', 'inherit'],
    });
    const closed = once(server, 'close');
    try {
      const output = createInterface({ input: server.stdout, signal: AbortSignal.timeout(30_000) });
      let origin;
      for await (const line of output) {
        origin ||= line.match(/http:\/\/127\.0\.0\.1:\d+/)?.[0];
        if (line.includes('Ready') && origin) break;
      }
      assert.ok(origin, 'Could not discover the isolated Next.js listener');
      await checkExtractedHost(workflow, origin, host);
      console.log(`PASS: isolated ${workflow} build, sign-in, permissions and business operation`);
    } finally {
      server.kill();
      await closed;
    }
  } finally {
    await rm(host, { recursive: true, force: true });
  }
}
