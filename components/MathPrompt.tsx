import type { LessonNodeContent } from "@/lib/engine/types";

export function MathPrompt({ content }: { content: LessonNodeContent }) {
  return (
    <div className="space-y-4">
      {content.prompt ? <p className="text-lg font-medium leading-8 text-slate-900">{content.prompt}</p> : null}
      {content.questionLatex ? (
        <div className="rounded-[1.5rem] bg-slate-950 px-5 py-4 text-xl font-semibold text-white shadow-lg shadow-slate-950/10">
          {content.questionLatex}
        </div>
      ) : null}
      {content.body ? <p className="leading-7 text-slate-700">{content.body}</p> : null}
      {content.workedSteps?.length ? (
        <ol className="space-y-2 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
          {content.workedSteps.map((step, index) => (
            <li key={`${step}-${index}`}>{`${index + 1}. ${step}`}</li>
          ))}
        </ol>
      ) : null}
      {content.explanation ? (
        <div className="rounded-[1.5rem] border border-cyan-200 bg-cyan-50 p-4 text-sm leading-6 text-cyan-950">
          {content.explanation}
        </div>
      ) : null}
    </div>
  );
}
