import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){
 const admin=await requireAdmin(); const {id}=await params; const {status}=await req.json();
 if(!["APPROVED","REJECTED"].includes(status))return NextResponse.json({error:"Invalid status"},{status:400});
 const old=await prisma.membershipApplication.findUnique({where:{id}}); if(!old)return NextResponse.json({error:"Not found"},{status:404});
 const updated=await prisma.membershipApplication.update({where:{id},data:{status,reviewedById:admin.id,reviewedAt:new Date()}});
 return NextResponse.json(updated);
}
