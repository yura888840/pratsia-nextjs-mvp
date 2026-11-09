import { getCurrentUser } from "../../lib/session.js";
import { CandidateProvider } from "../../components/candidate/context.jsx";
import { CandidateShell } from "../../components/candidate/shell.jsx";
import "./candidate.css";
export default async function CandidateLayout({ children }) {
  const user = await getCurrentUser();
  return (
    <CandidateProvider
      key={user?.userId || "guest"}
      user={
        user ? { userId: user.userId, accountType: user.accountType } : null
      }
    >
      <CandidateShell userName={user?.displayName}>{children}</CandidateShell>
    </CandidateProvider>
  );
}
