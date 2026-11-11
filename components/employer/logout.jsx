'use client';
import { useState } from 'react';
import { translate as t } from '../../i18n/index.js';
export function EmployerLogout() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  async function logout() {
    setBusy(true); setError(false);
    try {
      const response = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'logout' }) });
      if (!response.ok) throw new Error('Logout failed');
      window.location.assign('/employers');
    } catch { setError(true); setBusy(false); }
  }
  return <span><button className="employer-site-logout" onClick={logout} disabled={busy}>{t('employer.public.logout')}</button>{error && <span role="alert">{t('employer.public.logoutError')}</span>}</span>;
}
