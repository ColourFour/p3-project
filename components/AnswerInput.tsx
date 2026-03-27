"use client";

import { useState, useTransition } from "react";

import type { LessonNodePayload, SubmissionResponse } from "@/lib/engine/types";

interface AnswerInputProps {
  assignmentId: string;
  nodePayload: LessonNodePayload;
}

export function AnswerInput({ assignmentId, nodePayload }: AnswerInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const content = nodePayload.node.content_json;
  const nodeType = nodePayload.node.node_type;
  const hasChoices = Array.isArray(content.choices) && content.choices.length > 0;
  const isUngradedStep = !nodePayload.node.scoring_json;

  const submit = () => {
    startTransition(async () => {
      setError(null);
      setFeedback(null);

      const response = await fetch("/api/engine/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          assignmentId,
          answer: {
            value
          }
        })
      });

      const result = (await response.json()) as SubmissionResponse | { error: string };
      if (!response.ok) {
        setError("error" in result ? result.error : "Unable to submit your answer.");
        return;
      }

      const success = result as SubmissionResponse;
      setFeedback(success.evaluation.feedback);
      window.location.reload();
    });
  };

  const continueStep = () => {
    startTransition(async () => {
      const response = await fetch("/api/engine/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          assignmentId,
          answer: {}
        })
      });

      if (!response.ok) {
        const result = (await response.json()) as { error: string };
        setError(result.error);
        return;
      }

      window.location.reload();
    });
  };

  return (
    <div className="space-y-4 rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-card">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span className="font-medium capitalize">{nodeType.replaceAll("_", " ")}</span>
        <span>Attempt {nodePayload.attemptCount + 1}</span>
      </div>
      <p className="text-sm leading-6 text-slate-600">
        Make your next move. Think carefully, commit to an answer, and keep the challenge alive.
      </p>

      {hasChoices ? (
        <div className="grid gap-3">
          {content.choices?.map((choice) => (
            <label
              key={choice.value}
              className="flex cursor-pointer items-center gap-3 rounded-[1.5rem] border border-slate-200 p-4 transition hover:border-cyan-300 hover:bg-cyan-50/40"
            >
              <input
                type="radio"
                name="answer"
                value={choice.value}
                checked={value === choice.value}
                onChange={(event) => setValue(event.target.value)}
              />
              <span>{choice.label}</span>
            </label>
          ))}
        </div>
      ) : isUngradedStep ? null : (
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={content.answerPlaceholder ?? "Write your answer here"}
          className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 outline-none ring-0 transition focus:border-cyan-400"
        />
      )}

      {feedback ? <div className="rounded-[1.5rem] bg-emerald-50 p-4 text-sm text-emerald-900">{feedback}</div> : null}
      {error ? <div className="rounded-[1.5rem] bg-rose-50 p-4 text-sm text-rose-900">{error}</div> : null}

      {isUngradedStep ? (
        <button
          onClick={continueStep}
          disabled={pending}
          className="rounded-full bg-slate-950 px-5 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {pending ? "Advancing the run..." : content.ctaLabel ?? "Continue"}
        </button>
      ) : (
        <button
          onClick={submit}
          disabled={pending || (!value && !hasChoices)}
          className="rounded-full bg-accent px-5 py-3 font-medium text-white transition hover:bg-cyan-600 disabled:opacity-60"
        >
          {pending ? "Checking your move..." : "Lock in answer"}
        </button>
      )}
    </div>
  );
}
