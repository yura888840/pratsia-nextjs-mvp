import Link from 'next/link';
import { translate } from '../../i18n/index.js';
import { getCurrentUser } from '../../lib/session.js';
import { canUseEmployerFeatures, employerLoginUrl, employerRegisterUrl } from '../../domains/employer/access.js';
import { EmployerLogout } from '../../components/employer/logout.jsx';
import '../_shared/role-layout.css';
import './employer.css';
export default async function EmployerLayout({ children }) {
  const user = await getCurrentUser();
  const employer = canUseEmployerFeatures(user);
  return <div className="employer-site">
    <header className="employer-site-header">
      <Link className="employer-site-brand" href="/employers">{translate('brand.logo')}</Link>
      <Link className="employer-site-outline" href={employer ? '/employers/vacancies/new' : employerRegisterUrl}>{translate('employer.create')}</Link>
      <nav aria-label={translate('entry.guestMenu')}>
        {employer ? <><Link href="/employers/vacancies">{translate('employer.vacancies')}</Link><EmployerLogout /></> : <><Link href={employerLoginUrl}>{translate('registration.login')}</Link><Link href={employerRegisterUrl}>{translate('registration.submit')}</Link></>}
        <Link href="/">{translate('entry.candidateSite')}</Link>
      </nav>
    </header>
    <main className="employer-site-main">{children}</main>
  </div>;
}
