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
              High school students work harder when the lesson feels worth beating.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Branching Classroom treats algebra like a real challenge path: students build momentum,
              unlock support when they need it, and push toward a final boss that feels like something
              to conquer rather than another worksheet to survive.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
              >
                Start the challenge
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View student and teacher modes
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-cyan-400/20 bg-white/10 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
                Motivation first
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Students can feel themselves moving from first clue to final boss.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-200">
                The goal is not to hide the mathematics inside a game. The goal is to make the
                mathematics feel like a challenge worth staying with.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-white p-5 text-slate-900">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
                  Student energy
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Clear goals, visible progress, and support that keeps the run alive instead of
                  breaking it.
                </p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-cyan-50/90 p-5 text-slate-900">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-800">
                  Teacher control
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Quick insight into who is gaining momentum, where it drops, and where the next
                  intervention can matter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {[
          {
            title: "Challenge drives attention",
            body: "Students are more likely to stay with difficult algebra when the work feels like a sequence of attainable wins instead of a flat page of prompts."
          },
          {
            title: "Support keeps momentum alive",
            body: "Hints, worked examples, and review nodes are framed as part of the run, so getting help still feels like progress."
          },
          {
            title: "Mathematics still stays serious",
            body: "The tone is more energizing, but the core promise is still real understanding: recognise patterns, connect ideas, and finish with confidence."
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
