import { getCurrentUser } from "../../core/auth/session.js";
import { CandidateProvider } from "../components/context.jsx";
import { CandidateShell } from "../components/shell.jsx";
import "../../common/styles/role-layout.css";
import "../styles/candidate.css";
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
