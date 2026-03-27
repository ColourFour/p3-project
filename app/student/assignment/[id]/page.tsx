import { notFound } from "next/navigation";

import { LessonNodeRenderer } from "@/components/LessonNodeRenderer";
import { requireAuth } from "@/lib/auth";
import { getLessonNodePayload, getStudentProgress } from "@/lib/data";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatRelativeTime } from "@/lib/utils";

export default async function StudentAssignmentPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const auth = await requireAuth(["student"]);
  const progress = await getStudentProgress(id, auth.userId);

  if (!progress?.current_node_id) {
    notFound();
  }

  const nodePayload = await getLessonNodePayload(progress.current_node_id, auth.userId, id);
  const admin = createAdminClient();
  const { data: assignment } = await admin
    .from("assignments")
    .select("id, due_at, unit_versions(units(title))")
    .eq("id", id)
    .single();
  const unitVersion = Array.isArray(assignment?.unit_versions)
    ? assignment.unit_versions[0]
    : assignment?.unit_versions;
  const unit = Array.isArray(unitVersion?.units) ? unitVersion.units[0] : unitVersion?.units;

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/90 p-6 shadow-card backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-700">Current lesson journey</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              {unit?.title ?? "Lesson"}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Stay focused on the idea in front of you. Each answer moves you forward, reveals a
              support route, or unlocks the final challenge.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Status: {progress.status.replaceAll("_", " ")}. Last active {formatRelativeTime(progress.last_active_at)}.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-950">
            Mastery score: <span className="font-semibold">{progress.mastery_score}%</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[1.5rem] bg-slate-950 px-4 py-4 text-white">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Focus</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              One mathematically meaningful step at a time.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-cyan-50 px-4 py-4 text-cyan-950">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-700">Progress</p>
            <p className="mt-2 text-sm leading-6">
              Support and checkpoints appear as part of the same route, not as interruptions.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-rose-50 px-4 py-4 text-rose-950">
            <p className="text-xs uppercase tracking-[0.25em] text-rose-700">Boss</p>
            <p className="mt-2 text-sm leading-6">
              The last challenge asks you to connect ideas, not just repeat a procedure.
            </p>
          </div>
        </div>
      </section>

      <LessonNodeRenderer assignmentId={id} nodePayload={nodePayload} />
    </div>
  );
}
