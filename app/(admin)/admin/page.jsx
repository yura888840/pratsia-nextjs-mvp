import { workflowRole } from "../../../core/auth/permissions.js";
import { notFound } from "next/navigation";
import { getCurrentUser } from "../../../core/auth/session.js";
import { ModerationPanel } from "../../../admin/moderation-panel.jsx";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (workflowRole(user) !== "admin") notFound();
  return <ModerationPanel />;
}
