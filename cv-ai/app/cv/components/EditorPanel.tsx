"use client";

import { ArrowLeft, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import type { CvData } from "@/lib/cv/types";
import { BasicInfoSection } from "./editor-panel/BasicInfoSection";
import { EducationEditor } from "./editor-panel/EducationEditor";
import { ExperienceEditor } from "./editor-panel/ExperienceEditor";
import { RawCvSection } from "./editor-panel/RawCvSection";
import { SummarySkillsSection } from "./editor-panel/SummarySkillsSection";
import { TopActions } from "./editor-panel/TopActions";

type Props = {
  busy: boolean;
  cv: CvData;
  isDarkMode: boolean;
  onClose: () => void;
  onAnalyze: () => void;
  onExtract: () => void;
  onField: <K extends keyof CvData>(field: K, value: CvData[K]) => void;
  onToggleTheme: () => void;
  onUpload: (file: File) => void;
  open: boolean;
  uploading: boolean;
};

export function EditorPanel({
  busy,
  cv,
  isDarkMode,
  onClose,
  onAnalyze,
  onExtract,
  onField,
  onToggleTheme,
  onUpload,
  open,
  uploading,
}: Props) {
  return (
    <>
      <button
        aria-label="Editor sidebar хаах"
        className={`no-print fixed inset-0 z-30 bg-black/25 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        type="button"
      />
      <aside
        className={`no-print fixed left-0 top-0 z-40 flex h-screen w-[min(88vw,360px)] shrink-0 flex-col overflow-hidden border-r border-zinc-200 bg-white shadow-[18px_0_45px_rgba(15,23,42,0.14)] transition-transform duration-300 dark:border-[#173757] dark:bg-[#081525] xl:w-[460px] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <header className="border-b border-zinc-200 bg-gradient-to-r from-white to-slate-50 px-4 py-4 transition-colors duration-300 dark:border-[#173757] dark:from-[#0b1728] dark:to-[#07111f] sm:px-6 sm:py-5">
          <div className="flex items-center justify-between justify-center gap-3">
            {/* <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-[#9db7d3]">
    CV AI Studio        
          </p> */}
            <div className="flex items-center  gap-2">
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={isDarkMode ? "Light mode" : "Dark mode"}
                className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 dark:border-[#25527f] dark:bg-[#07111f] dark:text-[#7dd3fc] dark:hover:border-[#38bdf8]"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Moon className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
              <Link
                href="/"
                className="inline-flex h-9 items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 text-xs font-semibold text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 dark:border-[#25527f] dark:bg-[#07111f] dark:text-[#dcecff] dark:hover:border-[#38bdf8] dark:hover:bg-[#0b1e33]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Буцах
              </Link>
              <button
                aria-label="Editor sidebar хаах"
                className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 dark:border-[#25527f] dark:text-[#dcecff] dark:hover:bg-[#0b1e33]"
                onClick={onClose}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between gap-4">
            <h1 className="truncate text-xl font-bold tracking-tight text-black dark:text-white sm:text-2xl">
              Career Builder
            </h1>
          </div>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          <TopActions
            busy={busy}
            cv={cv}
            onAnalyze={onAnalyze}
            onField={onField}
            onUpload={onUpload}
            uploading={uploading}
          />
          <BasicInfoSection cv={cv} onField={onField} />
          <section className="space-y-3 animate-in fade-in-50 duration-300 delay-200">
            <SummarySkillsSection cv={cv} onField={onField} />
            <ExperienceEditor cv={cv} onField={onField} />
            <EducationEditor cv={cv} onField={onField} />
            <RawCvSection cv={cv} onExtract={onExtract} onField={onField} />
          </section>
        </div>
      </aside>
    </>
  );
}
