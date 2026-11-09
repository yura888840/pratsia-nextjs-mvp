import { CandidateProvider } from "../../components/candidate/context.jsx";
import { CandidateShell } from "../../components/candidate/shell.jsx";
import "./candidate.css";
export default function CandidateLayout({ children }) {
  return (
    <CandidateProvider>
      <CandidateShell>{children}</CandidateShell>
    </CandidateProvider>
  );
}
