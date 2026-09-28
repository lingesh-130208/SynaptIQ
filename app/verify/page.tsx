export default function Verify() {
  return <section className="section min-h-[75vh]"><div className="container max-w-2xl"><div className="glass rounded-3xl p-8 md:p-12">
    <div className="text-xs font-bold uppercase tracking-[.25em] text-cyan-300">Certificate Verification</div>
    <h1 className="mt-3 text-4xl font-black">Verify a SynaptIQ certificate</h1>
    <p className="mt-4 text-slate-400">Enter the certificate number to verify an issued certificate.</p>
    <div className="mt-8 flex flex-col gap-3 sm:flex-row"><input className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="SYN-ELIXA-2026-000124"/><button className="btn-primary">Verify</button></div>
    <div className="mt-8 rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-5"><div className="font-semibold text-emerald-300">Demo verification area</div><p className="mt-1 text-sm text-slate-400">Real certificate lookup will connect to the database in the backend phase.</p></div>
  </div></div></section>
}
