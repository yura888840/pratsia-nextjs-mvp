import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../lib/session.js';
import Platform from '../platform.jsx';
export const dynamic = 'force-dynamic';
export default async function Page() {
  const user = await getCurrentUser();
  if (user && user.accountType !== 'employer') redirect('/');
  return <Platform initialView="employer" />;
}
