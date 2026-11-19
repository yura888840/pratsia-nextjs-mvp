import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const babel = createRequire(import.meta.url)('next/dist/compiled/babel/core');
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
      if (!/\.(m?js|jsx)$/.test(name)) continue;
      const file = path.join(owner, name);
      const ast = babel.parseSync(readFileSync(file, 'utf8'), {
        configFile: false, babelrc: false, parserOpts: { plugins: ['jsx'] },
      });
      function check(source) {
        if (!source?.startsWith('.')) return;
        const target = path.join(path.dirname(file), source).split(path.sep)[0];
        assert.ok([owner, ...shared].includes(target), `${file} imports ${source}`);
      }
      babel.traverse(ast, {
        ImportDeclaration(p) { check(p.node.source.value); },
        ExportNamedDeclaration(p) { check(p.node.source?.value); },
        ExportAllDeclaration(p) { check(p.node.source.value); },
        CallExpression(p) {
          if (p.node.callee.type === 'Import' || p.node.callee.name === 'require')
            check(p.node.arguments[0]?.value);
        },
      });
    }
  }
});
