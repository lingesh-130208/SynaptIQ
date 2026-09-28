import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
export async function GET(){await requireAdmin();return NextResponse.json(await prisma.membershipApplication.findMany({orderBy:{createdAt:"desc"},take:100}));}
