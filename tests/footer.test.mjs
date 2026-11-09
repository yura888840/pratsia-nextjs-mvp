import test from 'node:test';
import assert from 'node:assert/strict';
import { footerConfig, footerOverrides } from '../components/site-footer/config.js';
test('footer excludes auth and applies exact per-page overrides', () => {
  for (const path of ['/login', '/register', '/login/callback', '/register/step']) assert.equal(footerConfig(path).hidden, true);
  for (const path of ['/', '/search', '/employers', '/about', '/account']) assert.equal(footerConfig(path).hidden, undefined);
  footerOverrides['/about'] = { showMobile: false, note: 'Project note' };
  footerOverrides['/register'] = { hidden: false };
  try {
    assert.equal(footerConfig('/about').showMobile, false);
    assert.equal(footerConfig('/about').note, 'Project note');
    assert.equal(footerConfig('/search').showMobile, true);
    assert.equal(footerConfig('/register').hidden, true);
  } finally { delete footerOverrides['/about']; delete footerOverrides['/register']; }
});
