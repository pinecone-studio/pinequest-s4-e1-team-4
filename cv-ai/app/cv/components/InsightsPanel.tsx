"use client";

import {
  CheckCircle2,
  MessageSquareText,
  Target,
  Wand2,
} from "lucide-react";
import type { AiResult } from "@/lib/cv/types";
import { ATSScore } from "./ATSScore";
import { CompanyRecommendations } from "./CompanyRecommendations";

type Props = {
  busy: boolean;
  onAnalyze: () => void;
  onApplySummary: () => void;
  result: AiResult;
};

export function InsightsPanel({
  busy,
  onAnalyze,
  onApplySummary,
  result,
}: Props) {
  return (
    <aside className="no-print w-full border-t border-zinc-200 bg-white lg:w-[340px] lg:border-l lg:border-t-0 overflow-y-auto max-h-screen">
      <div className="space-y-5 p-4 sm:p-5">
        <ATSScore score={result.score} busy={busy} onAnalyze={onAnalyze} />

        <Panel icon={Target} title="Advice">
          <ul className="space-y-2">
            {result.advice.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-6 text-zinc-700">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-black" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel icon={Wand2} title="AI Summary">
          <p className="text-sm leading-6 text-zinc-700">
            {result.improvedSummary}
          </p>
          <button
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-black px-3 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition-all active:scale-95"
            onClick={onApplySummary}
            type="button"
          >
            <Wand2 className="h-4 w-4" />
            Apply Summary
          </button>
        </Panel>

        {result.topCompanies && (
          <CompanyRecommendations companies={result.topCompanies} />
        )}

        <Panel icon={MessageSquareText} title="Interview Prep">
          <ul className="space-y-2 text-sm leading-6 text-zinc-700">
            {result.interview.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-black font-bold flex-shrink-0 text-lg">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </aside>
  );
}

function Panel({
  children,
  icon: Icon,
  title,
}: {
  children: React.ReactNode;
  icon: React.ElementType;
  title: string;
}) {
  return (
    <section className="rounded-md border border-zinc-200 p-4 bg-gradient-to-br from-white to-slate-50 hover:border-zinc-300 transition">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <Icon className="h-4 w-4 text-black" />
        {title}
      </h2>
      {children}
    </section>
  );
}
