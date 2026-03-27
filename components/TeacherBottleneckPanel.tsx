import { formatRelativeTime } from "@/lib/utils";

interface TeacherBottleneckPanelProps {
  analytics: Array<{
    node_id: string;
    node_title: string;
    students_on_node: number;
    incorrect_attempts: number;
    misconception_code: string | null;
    active_recently_at: string | null;
  }>;
}

export function TeacherBottleneckPanel({ analytics }: TeacherBottleneckPanelProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-700">Teaching signals</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Where students are most likely to need support
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            These nodes are drawing the most friction. Scan here first when deciding where to reteach,
            pause, or check for a shared misconception.
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-500">
            <tr>
              <th className="pb-3 font-medium">Node</th>
              <th className="pb-3 font-medium">Students here</th>
              <th className="pb-3 font-medium">Incorrect attempts</th>
              <th className="pb-3 font-medium">Common error</th>
              <th className="pb-3 font-medium">Recent activity</th>
            </tr>
          </thead>
          <tbody>
            {analytics.map((item) => (
              <tr key={`${item.node_id}-${item.misconception_code ?? "none"}`} className="border-t border-slate-100">
                <td className="py-4 pr-4 font-medium text-slate-900">{item.node_title}</td>
                <td className="py-4 pr-4">{item.students_on_node}</td>
                <td className="py-4 pr-4">{item.incorrect_attempts}</td>
                <td className="py-4 pr-4">{item.misconception_code ?? "No clear pattern tagged yet"}</td>
                <td className="py-4">{formatRelativeTime(item.active_recently_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
