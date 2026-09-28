import { auth } from "@/auth";
import { redirect } from "next/navigation";
const adminRoles = ["SUPER_ADMIN","ADMIN","EVENT_MANAGER","PROJECT_MANAGER","CONTENT_MANAGER"];
export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return session.user;
}
export async function requireAdmin() {
  const user = await requireUser();
  if (!adminRoles.includes(user.role)) redirect("/dashboard");
  return user;
}
