import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
export async function POST(req:Request){
 const admin=await requireAdmin(); const b=await req.json();
 if(!b.memberId||!b.title)return NextResponse.json({error:"memberId and title required"},{status:400});
 return NextResponse.json(await prisma.certificate.create({data:{certificateNumber:`SYN-${new Date().getFullYear()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`,verificationToken:crypto.randomUUID(),memberId:b.memberId,eventId:b.eventId||null,title:b.title,certificateType:b.certificateType||"Participation",issuedById:admin.id}}),{status:201});
}
