import { StudentProgressCard } from "@/components/StudentProgressCard";
import { requireAuth } from "@/lib/auth";
import { listStudentAssignments } from "@/lib/data";

export default async function StudentDashboardPage() {
  const auth = await requireAuth(["student"]);
  const assignments = await listStudentAssignments(auth.userId);

  return (
    <div className="space-y-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/90 p-8 shadow-card backdrop-blur">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-700">Your lesson map</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
          Welcome back, {auth.profile.display_name}
        </h1>
        <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
          Today&apos;s challenge is ready. Pick up where you left off, build your understanding one move
          at a time, and keep pushing toward the next checkpoint.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
          <span className="rounded-full bg-cyan-50 px-4 py-2 font-medium text-cyan-800">
            Follow the path
          </span>
          <span className="rounded-full bg-amber-50 px-4 py-2 font-medium text-amber-800">
            Recover when needed
          </span>
          <span className="rounded-full bg-rose-50 px-4 py-2 font-medium text-rose-800">
            Finish strong at the boss
          </span>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {assignments.map((assignment) => (
          <StudentProgressCard key={assignment.id} assignment={assignment} />
        ))}
      </section>
    </div>
  );
}
