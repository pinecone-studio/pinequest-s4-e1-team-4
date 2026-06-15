"use client";

import {
  CheckCircle2,
  X,
  MessageSquareText,
  Target,
  Wand2,
} from "lucide-react";
import type { AiResult } from "@/lib/cv/types";
import { ATSScore } from "./ATSScore";
import { CompanyRecommendations } from "./CompanyRecommendations";

type Props = {
  busy: boolean;
  onClose: () => void;
  onAnalyze: () => void;
  onApplySummary: () => void;
  open: boolean;
  result: AiResult;
};

export function InsightsPanel({
  busy,
  onClose,
  onAnalyze,
  onApplySummary,
  open,
  result,
}: Props) {
  return (
    <>
      <button
        aria-label="ATS sidebar хаах"
        className={`no-print fixed inset-0 z-30 bg-black/25 transition-opacity xl:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        type="button"
      />
      <aside
        className={`no-print fixed right-0 top-0 z-40 h-screen w-[min(86vw,320px)] overflow-y-auto border-l border-zinc-200 bg-white shadow-[-18px_0_45px_rgba(15,23,42,0.14)] transition-transform duration-300 dark:border-[#173757] dark:bg-[#081525] xl:static xl:z-auto xl:h-auto xl:max-h-screen xl:w-[340px] xl:shrink-0 xl:translate-x-0 xl:shadow-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-[#173757] dark:bg-[#081525]/95 xl:hidden">
          <p className="text-sm font-semibold text-zinc-950 dark:text-white">
            CV Дүгнэлт
          </p>
          <button
            aria-label="ATS sidebar хаах"
            className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 dark:border-[#25527f] dark:text-[#dcecff] dark:hover:bg-[#0b1e33]"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 p-4 sm:p-5">
          <ATSScore score={result.score} busy={busy} onAnalyze={onAnalyze} />

          <Panel icon={Target} title="Advice">
            <ul className="space-y-2">
              {result.advice.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-6 text-zinc-700 dark:text-[#dcecff]"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-black dark:text-[#7dd3fc]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel icon={Wand2} title="AI Summary">
            <p className="text-sm leading-6 text-zinc-700 dark:text-[#dcecff]">
              {result.improvedSummary}
            </p>
            <button
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-black px-3 py-2 text-sm font-medium text-black transition-all hover:bg-black hover:text-white active:scale-95 dark:border-[#38bdf8] dark:text-[#dcecff] dark:hover:bg-[#0ea5e9] dark:hover:text-white"
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
            <ul className="space-y-2 text-sm leading-6 text-zinc-700 dark:text-[#dcecff]">
              {result.interview.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 text-lg font-bold text-black dark:text-[#7dd3fc]">
                    →
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </aside>
    </>
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
    <section className="rounded-md border border-zinc-200 bg-gradient-to-br from-white to-slate-50 p-4 transition hover:border-zinc-300 dark:border-[#173757] dark:from-[#0b1728] dark:to-[#07111f] dark:hover:border-[#38bdf8]/70">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-white">
        <Icon className="h-4 w-4 text-black dark:text-[#7dd3fc]" />
        {title}
      </h2>
      {children}
    </section>
  );
}
