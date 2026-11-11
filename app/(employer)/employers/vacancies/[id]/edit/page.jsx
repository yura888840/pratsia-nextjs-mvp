import { EmployerWorkspace } from "../../../../../../components/employer/workspace.jsx";
export default async function Page({ params }) { const { id } = await params; return <EmployerWorkspace mode="edit" id={id} />; }
