import { redirect } from "next/navigation";
import { CandidateHome } from "../../components/candidate/home.jsx";
export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const search = new URLSearchParams();
  for (const key of ["q", "city", "filter", "view"]) {
    if (typeof params[key] === "string") search.set(key, params[key]);
  }
  if (search.size) redirect(`/search?${search}`);
  return <CandidateHome />;
}
