import { DEMO_USERS } from "@/lib/constants";

const demoAccounts = [
  {
    id: DEMO_USERS.teacher,
    label: "Teacher preview",
    description: "See the class view, spot pressure points, and review the lesson path from the teacher side."
  },
  {
    id: DEMO_USERS.studentA,
    label: "Student preview A",
    description: "Begin the algebra journey from the opening steps and experience the full lesson flow."
  },
  {
    id: DEMO_USERS.studentB,
    label: "Student preview B",
    description: "Jump into a learner path that has already branched into support and recovery."
  }
];

export default function LoginPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-950 p-10 text-white shadow-card">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Welcome to the lesson path</p>
        <h1 className="mt-4 max-w-2xl text-5xl font-semibold tracking-[-0.04em]">
          Algebra, but framed like a journey students can actually feel.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          Step into a prototype where each choice opens the next part of the lesson, support arrives
          when it is useful, and the final challenge feels earned.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Discover</p>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              Start with a clear prompt and a sense of where the lesson is taking you.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Adjust</p>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              When thinking goes sideways, the route bends toward examples and recovery.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-200">Conquer</p>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              Finish with a boss moment that asks students to connect the ideas they built.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-slate-200/80 bg-white/90 p-8 shadow-card backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">Choose an entry point</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Open the prototype</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Each role opens a working view of the same lesson world. Pick the perspective you want to
          share, test, or walk through.
        </p>

        <div className="mt-8 space-y-4">
          {demoAccounts.map((account) => (
            <form
              key={account.id}
              action="/api/demo-login"
              method="post"
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-4 transition hover:border-cyan-300 hover:bg-cyan-50/60"
            >
              <input type="hidden" name="userId" value={account.id} />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{account.label}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{account.description}</p>
                </div>
                <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                  Enter view
                </button>
              </div>
            </form>
          ))}
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
          A good lesson prototype should invite exploration quickly. These demo entrances are here
          so you can move straight into the student and teacher experience without setup friction.
        </div>
      </section>
    </div>
  );
}
