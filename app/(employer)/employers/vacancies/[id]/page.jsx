import { ProtectedEmployerWorkspace } from "../../../../../employer/components/protected-workspace.jsx";
export const dynamic = "force-dynamic";
export default async function Page({ params }) { const { id } = await params; return <ProtectedEmployerWorkspace mode="detail" id={id} />; }
