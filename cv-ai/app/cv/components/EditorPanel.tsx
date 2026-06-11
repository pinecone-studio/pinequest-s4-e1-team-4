"use client";

import {
  FileScan,
  LayoutTemplate,
  Sparkles,
  Upload,
  Wand2,
} from "lucide-react";
import { templates, type CvData } from "@/lib/cv/types";
import { inputClass, inputs, textClass, TextArea } from "./FormBits";

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
    <aside className="no-print flex max-h-screen flex-col border-r border-zinc-200 bg-white overflow-hidden">
      <header className="border-b border-zinc-200 px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-white to-slate-50">
        <p className="text-xs font-semibold uppercase text-zinc-600 tracking-widest">CV AI Studio</p>
        <div className="mt-2 flex items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight truncate text-black">
            Career Builder
          </h1>
        </div>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5">
        <section className="space-y-3 animate-in fade-in-50 duration-300">
          <div className="grid grid-cols-2 gap-2">
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-zinc-300 px-3 py-2.5 text-xs sm:text-sm font-medium hover:border-black hover:bg-slate-50 transition-all active:scale-95">
              <Upload className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{uploading ? "Reading..." : "Upload"}</span>
              <input
                className="sr-only"
                type="file"
                accept=".pdf,.txt,.md,.png,.jpg,.jpeg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onUpload(file);
                }}
              />
            </label>
            <button
              className="flex items-center justify-center gap-2 rounded-md bg-black px-3 py-2.5 text-xs sm:text-sm font-semibold text-white disabled:opacity-50 hover:bg-zinc-800 transition-all active:scale-95"
              disabled={busy}
              onClick={onAnalyze}
              type="button"
            >
              <Sparkles className={`h-4 w-4 flex-shrink-0 transition-transform ${busy ? "animate-spin" : ""}`} />
              <span className="truncate">{busy ? "AI..." : "Analyze"}</span>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => onField("template", t.id)}
                className={`flex items-center justify-center gap-1 rounded-md border px-2 py-2 text-xs transition-all active:scale-95 ${
                  cv.template === t.id
                    ? "border-black bg-black text-white shadow-md"
                    : "border-zinc-300 hover:border-black hover:bg-slate-50"
                }`}
              >
                <LayoutTemplate className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-2 sm:gap-3 animate-in fade-in-50 duration-300 delay-100">
          {inputs.map((item) => (
            <label key={item.key} className="space-y-1">
              <span className="text-xs font-medium text-zinc-600 uppercase tracking-wide">{item.label}</span>
              <input
                className={inputClass}
                placeholder={item.placeholder}
                value={cv[item.key]}
                onChange={(e) => onField(item.key, e.target.value)}
              />
            </label>
          ))}
          <label className="col-span-2 space-y-1">
            <span className="text-xs font-medium text-zinc-600 uppercase tracking-wide">Target Role</span>
            <input
              className={inputClass}
              value={cv.targetRole}
              onChange={(e) => onField("targetRole", e.target.value)}
              placeholder="e.g., Frontend Engineer"
            />
          </label>
        </section>

        <section className="space-y-3 animate-in fade-in-50 duration-300 delay-200">
          <TextArea label="Summary" field="summary" value={cv.summary} onField={onField} />
          <TextArea label="Skills" field="skills" value={cv.skills} onField={onField} />
          <TextArea label="Experience" field="experience" value={cv.experience} onField={onField} />
          <TextArea label="Education" field="education" value={cv.education} onField={onField} />
          <label className="block space-y-1">
            <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 uppercase tracking-wide">
              <FileScan className="h-3.5 w-3.5" />
              Raw CV Text
            </span>
            <textarea
              className={`${textClass} min-h-24`}
              placeholder="Paste your CV text here for automatic extraction..."
              value={cv.cvText}
              onChange={(e) => onField("cvText", e.target.value)}
            />
          </label>
          <button
            className="w-full flex items-center justify-center gap-2 rounded-md border border-black px-3 py-2.5 text-sm font-semibold text-black hover:bg-black hover:text-white transition-all active:scale-95"
            onClick={onExtract}
            type="button"
          >
            <Wand2 className="h-4 w-4" />
            Extract from Text
          </button>
        </section>
      </div>
    </aside>
  );
}
