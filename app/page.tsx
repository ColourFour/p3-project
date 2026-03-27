import { redirect } from "next/navigation";
import Link from "next/link";

import { getAuthContext } from "@/lib/auth";

export default async function HomePage() {
  const auth = await getAuthContext();

  if (auth) {
    redirect(auth.role === "student" ? "/student/dashboard" : "/teacher/dashboard");
  }

  return (
    <div className="space-y-8 pb-6">
      <section className="overflow-hidden rounded-[2.5rem] border border-white/70 bg-slate-950 px-8 py-12 text-white shadow-card md:px-12">
        <div className="absolute" />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Interactive lesson quest</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              A math lesson should feel like a path students can move through, not a form they fill in.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Branching Classroom turns algebra practice into a guided journey: each step responds
              to student thinking, support arrives when it matters, and big checkpoint moments feel
              worth reaching.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
              >
                Enter the prototype
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore demo roles
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-cyan-400/20 bg-white/10 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
                Lesson momentum
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Students move from warm-up to boss challenge with visible progress.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-200">
                Each screen keeps attention on the current idea, the next decision, and what has
                already been unlocked.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-white p-5 text-slate-900">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
                  Student view
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Clear prompts, meaningful support, and a lesson flow that feels alive.
                </p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-cyan-50/90 p-5 text-slate-900">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-800">
                  Teacher view
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Quick insight into who is moving, where they stalled, and what deserves a closer
                  look.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {[
          {
            title: "Challenge with structure",
            body: "The lesson keeps its mathematical seriousness while giving students a stronger sense of pace, sequence, and achievement."
          },
          {
            title: "Support at the right moment",
            body: "Hints, examples, review steps, and checkpoints feel like part of one journey instead of disconnected screens."
          },
          {
            title: "Shareable as a concept demo",
            body: "The prototype is ready to show colleagues as a thoughtful classroom experience rather than a backend-first MVP."
          }
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-card backdrop-blur"
          >
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
