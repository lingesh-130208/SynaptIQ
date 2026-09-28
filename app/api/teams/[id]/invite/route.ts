import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
export async function POST(req:Request,{params}:{params:Promise<{id:string}>}) {
  const s=await auth(); if(!s?.user?.id) return NextResponse.json({error:"Unauthorized"},{status:401});
  const {id}=await params; const b=await req.json();
  const sender=await prisma.member.findUnique({where:{userId:s.user.id}});
  if(!sender) return NextResponse.json({error:"Member profile required"},{status:400});
  const team=await prisma.team.findFirst({where:{id,members:{some:{memberId:sender.id,status:"ACTIVE"}}}});
  if(!team) return NextResponse.json({error:"Team access denied"},{status:403});
  return NextResponse.json(await prisma.teamInvitation.create({data:{teamId:id,invitedMemberId:b.memberId,invitedByMemberId:sender.id,message:b.message}}),{status:201});
}
