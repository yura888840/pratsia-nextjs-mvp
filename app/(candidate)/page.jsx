import { CandidateWorkspace } from "../../components/candidate/workspace.jsx";
export const dynamic = "force-dynamic";
export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const view = ["search", "saved", "applications", "profile"].includes(
    params.view,
  )
    ? params.view
    : "search";
  return (
    <CandidateWorkspace
      view={view}
      query={typeof params.q === "string" ? params.q : ""}
      city={typeof params.city === "string" ? params.city : ""}
    />
  );
}
