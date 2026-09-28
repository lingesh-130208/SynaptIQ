import { SectionHeading } from "@/components/SectionHeading";
import { ArrowRight, BrainCircuit, CalendarDays, Image as ImageIcon, Lightbulb, Trophy, Users } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return <section className="section min-h-[75vh]">
    <div className="container">
      <div className="glass grid-bg rounded-3xl p-8 md:p-14">
        <div className="max-w-3xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-[.25em] text-cyan-300">SynaptIQ</div>
          <h1 className="text-4xl font-black md:text-6xl">Gallery</h1>
          <p className="mt-5 text-xl leading-8 text-slate-300">Moments from the SynaptIQ community.</p>
          <p className="mt-3 max-w-2xl leading-7 text-slate-400">Workshops, expert talks, hackathons, showcases and club activities.</p>
        </div>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <div className="card p-7"><BrainCircuit className="text-cyan-300"/><h3 className="mt-5 text-lg font-bold">AI & ML</h3><p className="mt-2 text-sm leading-6 text-slate-400">Practical learning around modern intelligent technologies.</p></div>
        <div className="card p-7"><Lightbulb className="text-cyan-300"/><h3 className="mt-5 text-lg font-bold">Innovation</h3><p className="mt-2 text-sm leading-6 text-slate-400">Turn ideas into prototypes, projects and research directions.</p></div>
        <div className="card p-7"><Users className="text-cyan-300"/><h3 className="mt-5 text-lg font-bold">Community</h3><p className="mt-2 text-sm leading-6 text-slate-400">Collaborate with students, mentors and technical peers.</p></div>
      </div>
      <div className="mt-10"><Link href="/join" className="btn-primary">Join SynaptIQ <ArrowRight size={16}/></Link></div>
    </div>
  </section>;
}
