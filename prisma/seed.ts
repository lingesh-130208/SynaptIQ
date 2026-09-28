import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const prisma=new PrismaClient({adapter:new PrismaPg({connectionString:process.env.DATABASE_URL!})});
async function main(){
 const passwordHash=await bcrypt.hash("ChangeMe123!",12);
 const admin=await prisma.user.upsert({where:{email:"admin@synaptiq.club"},update:{},create:{name:"SynaptIQ Super Admin",email:"admin@synaptiq.club",passwordHash,role:"SUPER_ADMIN"}});
 const memberUser=await prisma.user.upsert({where:{email:"member@synaptiq.club"},update:{},create:{name:"Demo Member",email:"member@synaptiq.club",passwordHash,role:"MEMBER"}});
 await prisma.member.upsert({where:{userId:memberUser.id},update:{},create:{userId:memberUser.id,fullName:"Demo Member",registerNumber:"SYN-DEMO-001",year:"2nd Year",section:"A",department:"CSE (AI&ML)",college:"SRM TRP Engineering College"}});
 for(const name of ["Python","Machine Learning","Generative AI","Data Science","NLP","Computer Vision","Deep Learning","LLMs","FastAPI"])await prisma.skill.upsert({where:{name},update:{},create:{name}});
 await prisma.elixaEdition.upsert({where:{id:"elixa-2026"},update:{},create:{id:"elixa-2026",title:"ELIXA 2026",edition:"2026",description:"Ideate → Build → Solve → Showcase.",year:2026,status:"PUBLISHED"}});
 console.log("Seeded admin@synaptiq.club / ChangeMe123! and member@synaptiq.club / ChangeMe123!");
 await prisma.$disconnect();
}
main().catch(async e=>{console.error(e);await prisma.$disconnect();process.exit(1)});
