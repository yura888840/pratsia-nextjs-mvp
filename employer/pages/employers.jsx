import { getCurrentUser } from '../../core/auth/session.js';
import { canUseEmployerFeatures } from '../access.js';
import { EmployerWorkspace } from '../components/workspace.jsx';
import { EmployerPublicLanding } from '../components/public-landing.jsx';
export default async function Page() {
  const user = await getCurrentUser();
  return canUseEmployerFeatures(user)
    ? <EmployerWorkspace mode="home" key={user.userId} userId={user.userId} />
    : <EmployerPublicLanding signedIn={Boolean(user)} />;
}
