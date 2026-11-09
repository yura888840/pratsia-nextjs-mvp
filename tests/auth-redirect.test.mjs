import test from 'node:test';
import assert from 'node:assert/strict';
import { safeAuthReturnTo } from '../lib/auth-redirect.js';
test('authentication accepts only supported local destinations', () => {
 for (const target of ['/recommended', '/account?section=profile', '/']) assert.equal(safeAuthReturnTo(target), target);
 for (const target of ['https://invalid.example', '//invalid.example', '/\\invalid.example', 'javascript:alert(1)', '/recommended?next=https://invalid.example', null, ['/recommended']]) assert.equal(safeAuthReturnTo(target), '/');
});
