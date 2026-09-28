import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json([]);
  return NextResponse.json(await prisma.member.findMany({
    where: { OR: [
      { fullName: { contains: q, mode: "insensitive" } },
      { registerNumber: { contains: q, mode: "insensitive" } },
      { skills: { some: { skill: { name: { contains: q, mode: "insensitive" } } } } }
    ]},
    select: { id:true, fullName:true, year:true, section:true, department:true, skills:{select:{skill:{select:{name:true}}}} },
    take: 20
  }));
}
