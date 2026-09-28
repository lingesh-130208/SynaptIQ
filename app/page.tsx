import Link from "next/link";
import { ArrowRight, BrainCircuit, Database, Eye, FlaskConical, Network, Sparkles, Trophy, Users, Zap } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeading } from "@/components/SectionHeading";

const areas = [
  ["Artificial Intelligence","Build intelligent systems that reason, learn and assist."],
  ["Machine Learning","Turn data into models, predictions and useful decisions."],
  ["Generative AI","Explore LLMs, multimodal systems and agentic workflows."],
  ["Data Science","Discover patterns, communicate insights and engineer data products."],
  ["Deep Learning","Work with neural networks for real-world intelligent applications."],
  ["NLP & Vision","Build systems that understand language and visual information."]
];

export default function Home() {
  return <>
    <section className="grid-bg relative overflow-hidden">
      <div className="container grid min-h-[680px] items-center gap-12 py-24 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-xs font-semibold text-cyan-200"><Sparkles size={14}/> AI & ML COMMUNITY</div>
          <h1 className="glow text-5xl font-black leading-[1.02] tracking-[-.04em] md:text-7xl">Connect Ideas.<br/><span className="gradient-text">Engineer Intelligence.</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">SynaptIQ is a student-driven Artificial Intelligence & Machine Learning community transforming ideas and knowledge into practical intelligent solutions.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/join" className="btn-primary">Join SynaptIQ <ArrowRight size={17}/></Link><Link href="/about" className="btn-secondary">Explore the Club</Link></div>
          <div className="mt-10 flex flex-wrap gap-7 text-sm text-slate-400"><span>AI</span><span>ML</span><span>GenAI</span><span>Data Science</span><span>Intelligent Systems</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-[480px]">
          <div className="absolute inset-10 rounded-full bg-cyan-400/10 blur-3xl"/>
          <div className="glass relative aspect-square rounded-[36px] p-8">
            <div className="grid h-full place-items-center rounded-[28px] border border-cyan-300/10 bg-[#071027]">
              <div className="relative grid h-52 w-52 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/5 shadow-[0_0_100px_rgba(55,215,255,.12)]">
                <BrainCircuit size={92} strokeWidth={1.1} className="text-cyan-300"/>
                {[0,1,2,3,4,5].map(i=><span key={i} className="absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(55,215,255,.8)]" style={{transform:`rotate(${i*60}deg) translateY(-130px)`}}/>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section"><div className="container"><SectionHeading eyebrow="Our Journey" title="From curiosity to intelligent solutions." text="Learn the foundations, explore emerging ideas, build practical systems and showcase what you create."/>
      <div className="mt-12 grid gap-4 md:grid-cols-5">{["Learn","Explore","Build","Innovate","Showcase"].map((x,i)=><div key={x} className="card p-6"><div className="text-xs text-cyan-300">0{i+1}</div><div className="mt-8 text-xl font-bold">{x}</div><div className="mt-2 text-sm text-slate-500">{i===0?"Foundations":i===1?"Ideas & research":i===2?"Projects":i===3?"Innovation":"Demo & impact"}</div></div>)}</div>
    </div></section>

    <section className="section border-y border-white/5 bg-white/[.015]"><div className="container"><SectionHeading eyebrow="Technical Focus" title="Build across the AI ecosystem."/><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{areas.map(([t,d],i)=><FeatureCard key={t} icon={[BrainCircuit,Network,Sparkles,Database,FlaskConical,Eye][i]} title={t} text={d}/>)}</div></div></section>

    <section className="section"><div className="container grid gap-8 lg:grid-cols-2"><div className="card p-8"><div className="flex items-center gap-3 text-cyan-300"><Zap size={20}/><span className="text-sm font-bold uppercase tracking-widest">Latest Announcement</span></div><h3 className="mt-6 text-2xl font-bold">SynaptIQ is building a new generation of AI learners.</h3><p className="mt-3 leading-7 text-slate-400">Workshops, projects, research discussions, hackathons and expert interactions designed around practical intelligent systems.</p><Link href="/announcements" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">View announcements <ArrowRight size={16}/></Link></div>
      <div className="card p-8"><div className="flex items-center gap-3 text-cyan-300"><Trophy size={20}/><span className="text-sm font-bold uppercase tracking-widest">Flagship</span></div><h3 className="mt-6 text-2xl font-bold">ELIXA</h3><p className="mt-3 leading-7 text-slate-400">The annual journey from <b>Ideate → Build → Solve → Showcase</b>, bringing students together around AI/ML innovation.</p><Link href="/elixa" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">Explore ELIXA <ArrowRight size={16}/></Link></div>
    </div></section>

    <section className="section"><div className="container"><div className="glass overflow-hidden rounded-3xl p-8 md:p-12"><div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><div className="text-xs font-bold uppercase tracking-[.25em] text-cyan-300">Become a member</div><h2 className="mt-3 text-3xl font-bold md:text-5xl">Bring your ideas. Build your intelligence.</h2><p className="mt-4 max-w-2xl text-slate-400">Join a student community focused on practical AI/ML learning, projects, research and innovation.</p></div><Link href="/join" className="btn-primary">Join SynaptIQ <Users size={17}/></Link></div></div></div></section>
  </>;
}
