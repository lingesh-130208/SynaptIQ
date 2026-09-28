import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const member = await prisma.member.findUnique({ where: { userId: session.user.id } });
  if (!member) return NextResponse.json({ error: "Member profile required" }, { status: 400 });
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
  const registration = await prisma.eventRegistration.upsert({
    where: { eventId_memberId: { eventId: id, memberId: member.id } },
    update: { status: "REGISTERED" },
    create: { eventId: id, memberId: member.id }
  });
  return NextResponse.json(registration, { status: 201 });
}
