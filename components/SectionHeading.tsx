export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-cyan-300">{eyebrow}</div>
      <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {text && <p className="mt-4 leading-7 text-slate-400">{text}</p>}
    </div>
  );
}
