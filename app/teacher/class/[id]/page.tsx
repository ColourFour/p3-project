import Link from "next/link";

import { requireAuth } from "@/lib/auth";
import { getTeacherClassDetails } from "@/lib/data";

export default async function TeacherClassPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth(["teacher", "admin"]);
  const { id } = await params;
  const classroom = await getTeacherClassDetails(id);

  return (
    <div className="space-y-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/90 p-8 shadow-card backdrop-blur">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-700">Classroom view</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">{classroom.name}</h1>
        <p className="mt-3 text-lg leading-8 text-slate-600">
          {classroom.subject} for {classroom.academic_year}
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
          Keep the roster close, keep the active lesson visible, and make it easy to spot who may
          need a quick conversation before momentum slips.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">Roster</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Students in this room</h2>
          <div className="mt-6 space-y-4">
            {classroom.class_enrollments.map((enrollment) => {
              const student = Array.isArray(enrollment.student)
                ? enrollment.student[0]
                : enrollment.student;

              return (
                <div key={enrollment.id} className="rounded-[1.5rem] bg-slate-50 p-4">
                  <div className="font-medium text-slate-900">{student?.display_name}</div>
                  <div className="text-sm text-slate-600">{student?.email}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700">Assignments</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Active lesson paths</h2>
          <div className="mt-6 space-y-4">
            {classroom.assignments.map((assignment) => {
              const unitVersion = Array.isArray(assignment.unit_versions)
                ? assignment.unit_versions[0]
                : assignment.unit_versions;
              const unit = Array.isArray(unitVersion?.units) ? unitVersion.units[0] : unitVersion?.units;

              return (
                <Link
                  key={assignment.id}
                  href={`/teacher/assignment/${assignment.id}`}
                  className="block rounded-[1.5rem] border border-slate-200 p-4 transition hover:border-cyan-300 hover:bg-cyan-50/40"
                >
                  <div className="font-medium text-slate-900">{unit?.title ?? "Untitled unit"}</div>
                  <div className="mt-1 text-sm text-slate-600">
                    {assignment.is_live ? "Live now for students" : "Prepared but not live yet"}
                  </div>
                  <div className="mt-3 text-sm text-slate-500">
                    Open this view to see who is stuck, who is advancing, and which node is shaping
                    the lesson most strongly.
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
