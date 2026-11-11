import Link from 'next/link';
import { translate as t } from '../../i18n/index.js';
import { employerLoginUrl, employerRegisterUrl } from '../../domains/employer/access.js';
import { WelcomeIllustration } from '../welcome-illustration.jsx';

export function EmployerPublicLanding({ signedIn = false }) {
  return <div className="ev-public">
    {signedIn && <p className="ev-public-account-note">{t('employer.public.roleNotice')}</p>}
    <section className="cv-welcome">
      <div className="cv-welcome-copy">
        <p className="employer-site-eyebrow">{t('employer.public.eyebrow')}</p>
        <h1>{t('employer.public.title')}<span>{t('employer.public.titleAccent')}</span></h1>
        <p>{t('employer.public.intro')}</p>
        <Link className="cv-welcome-create" href={employerRegisterUrl}>{t('employer.public.start')}</Link>
        <p className="ev-public-login"><Link href={employerLoginUrl}>{t('employer.public.login')}</Link></p>
      </div>
      <WelcomeIllustration />
    </section>
    <section className="ev-public-benefits" aria-label={t('employer.public.benefits')}>
      {['describe', 'organize', 'prepare'].map((key, index) => <article key={key}><span aria-hidden="true">{`0${index + 1}`}</span><h2>{t(`employer.public.${key}.title`)}</h2><p>{t(`employer.public.${key}.text`)}</p></article>)}
    </section>
    <section className="ev-public-banner"><div><h2>{t('employer.public.bannerTitle')}</h2><p>{t('employer.public.bannerText')}</p></div><Link href={employerRegisterUrl}>{t('employer.public.start')}{' →'}</Link></section>
  </div>;
}
