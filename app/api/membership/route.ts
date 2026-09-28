import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { membershipSchema } from "@/lib/validation";
export async function POST(req: Request) {
  const parsed = membershipSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid application data" }, { status: 400 });
  const data = parsed.data;
  const existing = await prisma.membershipApplication.findFirst({
    where: { OR: [{ email: data.email }, { registerNumber: data.registerNumber }] }
  });
  if (existing?.status === "PENDING") return NextResponse.json({ error: "Application already pending" }, { status: 409 });
  const application = await prisma.membershipApplication.create({ data });
  return NextResponse.json({ id: application.id, status: application.status }, { status: 201 });
}
