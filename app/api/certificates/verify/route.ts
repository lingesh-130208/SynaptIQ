import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(req:Request){
  const id=new URL(req.url).searchParams.get("id");
  if(!id)return NextResponse.json({error:"Certificate ID required"},{status:400});
  const c=await prisma.certificate.findFirst({where:{OR:[{certificateNumber:id},{verificationToken:id}],status:"ACTIVE"},select:{certificateNumber:true,title:true,certificateType:true,issueDate:true,member:{select:{fullName:true}},event:{select:{title:true}}}});
  return NextResponse.json(c?{valid:true,certificate:c}:{valid:false},{status:c?200:404});
}
