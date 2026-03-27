import { TeacherBottleneckPanel } from "@/components/TeacherBottleneckPanel";
import { requireAuth } from "@/lib/auth";
import { getTeacherAssignmentAnalytics, getTeacherAssignmentRoster } from "@/lib/data";
import { formatRelativeTime } from "@/lib/utils";

export default async function TeacherAssignmentPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth(["teacher", "admin"]);
  const { id } = await params;
  const [analytics, roster] = await Promise.all([
    getTeacherAssignmentAnalytics(id),
    getTeacherAssignmentRoster(id)
  ]);

  return (
    <div className="space-y-8">
      <section className="rounded-[2.5rem] border border-white/70 bg-white/90 p-8 shadow-card backdrop-blur">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-700">Assignment insights</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
          Student progress across the current lesson path
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
          Use this page to notice where understanding is consolidating, where misconceptions are
          clustering, and where a timely teacher intervention could change the route.
        </p>
      </section>

      <TeacherBottleneckPanel analytics={analytics} />

      <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">Roster progress</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Where each student is now</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="pb-3 font-medium">Student</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Current node</th>
                <th className="pb-3 font-medium">Mastery</th>
                <th className="pb-3 font-medium">Last active</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((entry) => {
                const student = Array.isArray(entry.student) ? entry.student[0] : entry.student;
                const currentNode = Array.isArray(entry.current_node)
                  ? entry.current_node[0]
                  : entry.current_node;

                return (
                  <tr key={entry.id} className="border-t border-slate-100">
                    <td className="py-4 pr-4 font-medium text-slate-900">
                      {student?.display_name}
                      <div className="text-xs font-normal text-slate-500">{student?.email}</div>
                    </td>
                    <td className="py-4 pr-4 capitalize">{entry.status.replaceAll("_", " ")}</td>
                    <td className="py-4 pr-4">{currentNode?.title ?? "Not started yet"}</td>
                    <td className="py-4 pr-4">{entry.mastery_score}%</td>
                    <td className="py-4">{formatRelativeTime(entry.last_active_at)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
