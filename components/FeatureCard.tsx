import { LucideIcon } from "lucide-react";
export function FeatureCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return <div className="card p-6 transition hover:-translate-y-1 hover:border-cyan-300/30">
    <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-cyan-300/10 text-cyan-300"><Icon size={22}/></div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
  </div>
}
