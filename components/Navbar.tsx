import Link from "next/link";
import { BrainCircuit, Menu } from "lucide-react";

const links = [
  ["About", "/about"], ["Activities", "/activities"], ["Events", "/events"],
  ["Projects", "/projects"], ["ELIXA", "/elixa"], ["Achievements", "/achievements"],
  ["Gallery", "/gallery"], ["Announcements", "/announcements"]
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <div className="container flex h-18 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 font-bold">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
            <BrainCircuit size={23}/>
          </span>
          <span className="text-lg tracking-tight">Synapt<span className="text-cyan-300">IQ</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-5 text-sm text-slate-300">
          {links.map(([label, href]) => <Link key={href} href={href} className="hover:text-cyan-300 transition">{label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="btn-secondary text-sm">Login</Link>
          <Link href="/join" className="btn-primary text-sm hidden sm:inline-flex">Join Club</Link>
          <span className="lg:hidden p-2 text-slate-300"><Menu size={21}/></span>
        </div>
      </div>
    </header>
  );
}
