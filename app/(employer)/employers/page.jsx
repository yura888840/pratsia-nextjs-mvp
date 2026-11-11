import { getCurrentUser } from '../../../lib/session.js';
import { canUseEmployerFeatures } from '../../../domains/employer/access.js';
import { EmployerWorkspace } from '../../../components/employer/workspace.jsx';
import { EmployerPublicLanding } from '../../../components/employer/public-landing.jsx';
export const dynamic = 'force-dynamic';
export default async function Page() {
  const user = await getCurrentUser();
  return canUseEmployerFeatures(user)
    ? <EmployerWorkspace mode="home" key={user.userId} userId={user.userId} />
    : <EmployerPublicLanding signedIn={Boolean(user)} />;
}
