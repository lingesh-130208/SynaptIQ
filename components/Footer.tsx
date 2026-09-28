import Link from "next/link";
import { BrainCircuit, Github, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030611]">
      <div className="container grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 font-bold text-lg"><BrainCircuit className="text-cyan-300"/>SynaptIQ</div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Connect Ideas. Engineer Intelligence. A student-driven Artificial Intelligence & Machine Learning community.</p>
        </div>
        <div>
          <h3 className="font-semibold">Explore</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-400">
            <Link href="/about">About</Link><Link href="/events">Events</Link>
            <Link href="/projects">Projects</Link><Link href="/elixa">ELIXA</Link>
            <Link href="/gallery">Gallery</Link><Link href="/achievements">Achievements</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Connect</h3>
          <p className="mt-4 text-sm text-slate-400">CSE (AI & ML), SRM TRP Engineering College</p>
          <div className="mt-4 flex gap-3 text-slate-300"><Instagram size={19}/><Github size={19}/><Mail size={19}/></div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">© 2026 SynaptIQ. Built by students, for intelligent innovation.</div>
    </footer>
  );
}
