import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire, isBuiltin } from 'node:module';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const babel = createRequire(import.meta.url)('next/dist/compiled/babel/core');
const packages = new Set(Object.keys(JSON.parse(readFileSync("package.json")).dependencies));
const dependencies = {
  applicant: ['common', 'core'],
  employer: ['common', 'core'],
  admin: ['common', 'core'],
  common: [],
  core: [],
};

test('workflow code can be extracted without importing another workflow or the Next host', () => {
  for (const [owner, shared] of Object.entries(dependencies)) {
    for (const name of readdirSync(owner, { recursive: true })) {
      const file = path.join(owner, name);
      // Project code uses relative paths. Bare specifiers must be declared packages.
      function check(source) {
        assert.equal(typeof source, 'string', file + ': use a statically resolvable import');
        if (isBuiltin(source)) return;
        const pkg = source.split('/').slice(0, source.startsWith('@') ? 2 : 1).join('/');
        if (packages.has(pkg)) return;
        assert.ok(source.startsWith('.'), file + ': unsupported alias ' + source);
        const target = path.normalize(path.join(path.dirname(file), source)).split(path.sep)[0];
        const allowed = [owner, ...shared];
        assert.ok(allowed.includes(target), file + ' imports ' + source);
      }
      if (name.endsWith('.css')) {
        const css = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
        for (const match of css.matchAll(/(?:@import\s+(?:url\(\s*)?|url\(\s*)["']?([^"'()\s;]+)/gi)) {
          if (/^(?:https?:|data:|#)/.test(match[1])) continue;
          check(match[1]);
        }
        continue;
      }
      if (!/\.(?:[cm]?[jt]s|[jt]sx)$/.test(name)) continue;
      const ast = babel.parseSync(readFileSync(file, 'utf8'), {
        configFile: false, babelrc: false, parserOpts: { plugins: ['jsx', 'typescript'] },
      });
      babel.traverse(ast, {
        ImportDeclaration(p) { check(p.node.source.value); },
        ExportNamedDeclaration(p) { if (p.node.source) check(p.node.source.value); },
        ExportAllDeclaration(p) { check(p.node.source.value); },
        NewExpression(p) {
          if (p.node.callee.name === 'URL' && p.node.arguments[1]?.object?.type === 'MetaProperty' && p.node.arguments[1]?.property?.name === 'url')
            check(p.node.arguments[0]?.value);
        },
        CallExpression(p) {
          if (p.node.callee.type === 'Import' || p.node.callee.name === 'require')
            check(p.node.arguments[0]?.value);
        },
      });
    }
  }
});
