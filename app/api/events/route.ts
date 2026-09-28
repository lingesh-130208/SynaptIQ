import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/permissions";
export async function GET() {
  return NextResponse.json(await prisma.event.findMany({ where: { status: { not: "DRAFT" } }, orderBy: { date: "asc" } }));
}
export async function POST(req: Request) {
  const user = await requireAdmin();
  const b = await req.json();
  if (!b.title || !b.description || !b.date) return NextResponse.json({ error: "title, description and date required" }, { status: 400 });
  const event = await prisma.event.create({
    data: { title: b.title, slug: `${b.title.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}`, description: b.description, date: new Date(b.date), venue: b.venue, externalUrl: b.externalUrl, registrationUrl: b.registrationUrl, status: "PUBLISHED", createdById: user.id }
  });
  return NextResponse.json(event, { status: 201 });
}
