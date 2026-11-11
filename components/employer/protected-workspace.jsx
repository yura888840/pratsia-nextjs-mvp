import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../lib/session.js';
import { canUseEmployerFeatures, employerLoginUrl } from '../../domains/employer/access.js';
import { EmployerWorkspace } from './workspace.jsx';

// Guard at the page boundary, including direct detail/edit requests and RSC navigation.
export async function ProtectedEmployerWorkspace(props) {
  const user = await getCurrentUser();
  if (!user) redirect(employerLoginUrl);
  if (!canUseEmployerFeatures(user)) redirect('/employers');
  return <EmployerWorkspace {...props} key={user.userId} userId={user.userId} />;
}
