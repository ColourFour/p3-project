import type { LessonNodePayload } from "@/lib/engine/types";

import { AnswerInput } from "@/components/AnswerInput";
import { MathPrompt } from "@/components/MathPrompt";

export function LessonNodeRenderer({
  assignmentId,
  nodePayload
}: {
  assignmentId: string;
  nodePayload: LessonNodePayload;
}) {
  const isBossNode =
    nodePayload.node.node_key === "boss" ||
    nodePayload.node.layout_type === "boss" ||
    nodePayload.node.title.toLowerCase().includes("boss");

  const nodeTypeStyles: Record<string, string> = {
    question: "border-slate-200 bg-white",
    hint: "border-amber-200 bg-amber-50",
    worked_example: "border-orange-200 bg-orange-50",
    instruction: "border-slate-200 bg-white",
    checkpoint: "border-cyan-200 bg-cyan-50",
    review: "border-slate-200 bg-white",
    extension: "border-emerald-200 bg-emerald-50"
  };

  const nodeLabel = isBossNode
    ? "Boss challenge"
    : nodePayload.node.node_type.replaceAll("_", " ");

  return (
    <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      <article
        className={`rounded-[2.25rem] border p-8 shadow-card ${
          isBossNode
            ? "border-rose-300 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(76,29,149,0.94),rgba(190,24,93,0.9))] text-white"
            : (nodeTypeStyles[nodePayload.node.node_type] ?? "border-slate-200 bg-white")
        }`}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div
              className={`mb-2 text-sm font-medium uppercase tracking-[0.24em] ${
                isBossNode ? "text-rose-100" : "text-cyan-700"
              }`}
            >
              {nodeLabel}
            </div>
            <h1 className={`text-3xl font-semibold tracking-tight ${isBossNode ? "text-white" : "text-slate-950"}`}>
              {nodePayload.node.title}
            </h1>
            <p className={`mt-3 max-w-2xl text-sm leading-6 ${isBossNode ? "text-rose-50" : "text-slate-500"}`}>
              {isBossNode
                ? "This is the culmination of the run. Slow down, connect the ideas, and make the move that proves you understand what you built."
                : "Read carefully, look for the key idea, and treat this step as one more win on the route to mastery."}
            </p>
          </div>
          {nodePayload.node.mastery_tags?.length ? (
            <div className="flex flex-wrap justify-end gap-2">
              {nodePayload.node.mastery_tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    isBossNode ? "bg-white/15 text-white" : "bg-white/80 text-slate-600"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <MathPrompt content={nodePayload.node.content_json} />
      </article>

      <aside className="space-y-4">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-6 text-white shadow-card">
          <div className="text-sm uppercase tracking-[0.24em] text-cyan-300">
            {isBossNode ? "Final stretch" : "Focus mode"}
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-200">
            {isBossNode
              ? "You have reached the lesson boss. Pull together the patterns you noticed earlier and use them deliberately."
              : "Stay with the current idea. Momentum comes from solving one meaningful piece cleanly before the route continues."}
          </p>
        </div>
        <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950 shadow-card">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-800">
            Progress cue
          </div>
          <p className="mt-2">
            {isBossNode
              ? "Boss nodes are meant to feel different. This is where separate steps become one connected challenge."
              : "Hints, examples, and checkpoints are part of the route. Using them keeps your momentum alive."}
          </p>
        </div>
        <AnswerInput assignmentId={assignmentId} nodePayload={nodePayload} />
      </aside>
    </section>
  );
}
