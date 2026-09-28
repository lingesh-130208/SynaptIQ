import { ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfNKCTkcY6on-cErwTwrJtz287WneCBT6DJsahzfZM8hPLMfw/viewform?usp=header";

export default function Join() {
  return (
    <section className="section min-h-[75vh]">
      <div className="container max-w-4xl">
        <div className="glass overflow-hidden rounded-3xl p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-bold uppercase tracking-[.25em] text-cyan-300">
              Membership
            </div>

            <h1 className="mt-4 text-4xl font-black md:text-6xl">
              Join SynaptIQ
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              Connect with students passionate about Artificial Intelligence,
              Machine Learning, Data Science, Generative AI, research,
              projects, and innovation.
            </p>

            <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
              {[
                "AI & ML learning opportunities",
                "Hands-on workshops and projects",
                "Hackathons and innovation challenges",
                "Research and expert interactions",
                "Team-based AI/ML development",
                "ELIXA flagship opportunities",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.03] p-4"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-cyan-300"
                  />
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-cyan-300/10 bg-cyan-300/[.03] p-6">
              <h2 className="text-xl font-bold">
                Ready to become a SynaptIQ member?
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Complete the official SynaptIQ registration form. Your
                application will be reviewed by the club team.
              </p>

              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-7 inline-flex items-center gap-2"
              >
                Open Registration Form
                <ArrowUpRight size={17} />
              </a>

              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                Official Google Form
                <ExternalLink size={12} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}