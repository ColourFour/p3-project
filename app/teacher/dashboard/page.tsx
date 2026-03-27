import Link from "next/link";

import { requireAuth } from "@/lib/auth";
import { listTeacherClasses } from "@/lib/data";

export default async function TeacherDashboardPage() {
  const auth = await requireAuth(["teacher", "admin"]);
  const classes = await listTeacherClasses(auth.userId);

  return (
    <div className="space-y-8">
      <section className="rounded-[2.5rem] border border-slate-800 bg-slate-950 p-8 text-white shadow-card">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Teacher overview</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          See where the class is moving, pausing, and ready for a nudge.
        </h1>
        <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-200">
          These classroom views keep the lesson practical: who is progressing, where patterns are
          repeating, and which assignment deserves your attention first.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {classes.map((classroom) => (
          <Link
            key={classroom.id}
            href={`/teacher/class/${classroom.id}`}
            className="rounded-[1.9rem] border border-slate-200/80 bg-white/90 p-6 shadow-card transition hover:-translate-y-0.5 hover:border-cyan-300"
          >
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-700">
              {classroom.subject}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{classroom.name}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Academic year {classroom.academic_year}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Open class view to check the roster, review live assignments, and spot where the
              lesson path starts to narrow.
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
