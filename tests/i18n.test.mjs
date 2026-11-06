import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { createTranslator, translate, catalogValue, dictionaries, resolveLocale, formatNumber } from '../i18n/index.js';
const require = createRequire(import.meta.url);
const babel = require('next/dist/compiled/babel/core');

test('translations interpolate values literally, fall back, and do not share locale state', () => {
 const catalogs = { uk: { hello: 'Привіт, {name}', fallback: 'Default' }, en: { hello: 'Hello, {name}' } };
 const uk = createTranslator('uk', catalogs), en = createTranslator('en', catalogs);
 assert.equal(en('hello', {name: '$& <script>'}), 'Hello, $& <script>');
 assert.equal(uk('hello', {name: 'Anna'}), 'Привіт, Anna');
 assert.equal(en('fallback'), 'Default');
 assert.throws(() => en('missing'), /Unknown translation token/);
 assert.throws(() => en('hello'), /Missing translation parameter/);
 assert.equal(resolveLocale('uk-UA'), 'uk');
 assert.equal(resolveLocale('unknown'), 'uk');
 assert.equal(catalogValue('catalog.remote'), 'Дистанційно');
 assert.equal(translate('navigation.employers'), 'Роботодавцям');
 assert.equal(formatNumber(12345), new Intl.NumberFormat('uk-UA').format(12345));
});

function files(dir) { return readdirSync(dir, {withFileTypes:true}).flatMap(f => f.isDirectory() ? files(`${dir}/${f.name}`) : /\.(js|jsx)$/.test(f.name) ? [`${dir}/${f.name}`] : []); }
test('application tokens exist and user-facing Cyrillic literals stay in dictionaries', () => {
 for (const file of ['app', 'components', 'lib'].flatMap(files)) {
  const ast = babel.parseSync(readFileSync(file, 'utf8'), {configFile:false,babelrc:false,parserOpts:{plugins:['jsx']}});
  babel.traverse(ast, {
   StringLiteral(p) { if (p.parent.type === "VariableDeclarator" && p.parent.id.name === "SEARCH_UPPERCASE_ALPHABET") return; assert.ok(!/[\p{Script=Cyrillic}₴]/u.test(p.node.value), `${file}: untranslated literal ${p.node.value}`); },
   JSXText(p) { assert.ok(!/[\p{L}\p{N}]/u.test(p.node.value), `${file}: untranslated JSX text`); },
   TemplateElement(p) { assert.ok(!/[\p{Script=Cyrillic}₴]/u.test(p.node.value.cooked), `${file}: untranslated template`); },
   CallExpression(p) {
    if (!['translate','catalogValue'].includes(p.node.callee.name)) return;
    const key = p.node.arguments[0]?.value;
    assert.equal(typeof dictionaries.uk[key], 'string', `${file}: missing token ${key}`);
    if (p.node.callee.name === 'translate') {
     const values = Object.fromEntries((p.node.arguments[1]?.properties || []).map(prop => [prop.key.name || prop.key.value, 'test']));
     assert.doesNotThrow(() => translate(key, values), `${file}: interpolation ${key}`);
    }
   }
  });
 }
 assert.ok(!/content:\s*["'][^"']*[\p{Script=Cyrillic}]/u.test(readFileSync('app/globals.css','utf8')));
});
