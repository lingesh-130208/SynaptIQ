import { prisma } from "@/lib/prisma";
export async function audit(userId: string | undefined, action: string, entity: string, entityId?: string, oldData?: unknown, newData?: unknown) {
  return prisma.auditLog.create({
    data: { userId, action, entity, entityId, oldData: oldData as any, newData: newData as any }
  });
}
