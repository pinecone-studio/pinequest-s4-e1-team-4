"use client";

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
  onAnalyze: () => void;
  onExtract: () => void;
  onField: <K extends keyof CvData>(field: K, value: CvData[K]) => void;
  onUpload: (file: File) => void;
  uploading: boolean;
};

export function EditorPanel({
  busy,
  cv,
  onAnalyze,
  onExtract,
  onField,
  onUpload,
  uploading,
}: Props) {
  return (
    <aside className="no-print flex max-h-screen flex-col overflow-hidden border-r border-zinc-200 bg-white">
      <header className="border-b border-zinc-200 bg-gradient-to-r from-white to-slate-50 px-4 py-4 sm:px-6 sm:py-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
          CV AI Studio
        </p>
        <div className="mt-2 flex items-center justify-between gap-4">
          <h1 className="truncate text-xl font-bold tracking-tight text-black sm:text-2xl">
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
  );
}
