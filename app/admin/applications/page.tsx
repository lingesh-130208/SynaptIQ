import { requireAdmin } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
export default async function Applications(){
 await requireAdmin();
 const rows=await prisma.membershipApplication.findMany({orderBy:{createdAt:"desc"},take:100});
 return <section className="section"><div className="container"><div className="text-xs font-bold uppercase tracking-[.25em] text-cyan-300">Admin</div><h1 className="mt-2 text-4xl font-black">Membership Applications</h1><div className="mt-8 overflow-auto rounded-2xl border border-white/10"><table className="w-full text-left text-sm"><thead className="bg-white/5"><tr><th className="p-4">Name</th><th className="p-4">Register No.</th><th className="p-4">Email</th><th className="p-4">Status</th></tr></thead><tbody>{rows.map(x=><tr className="border-t border-white/10" key={x.id}><td className="p-4">{x.fullName}</td><td className="p-4">{x.registerNumber}</td><td className="p-4">{x.email}</td><td className="p-4">{x.status}</td></tr>)}</tbody></table></div></div></section>
}
