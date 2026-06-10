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
    <aside className="no-print flex max-h-screen flex-col border-r border-zinc-200 bg-white">
      <header className="border-b border-zinc-200 px-6 py-5">
        <p className="text-xs font-semibold uppercase text-black-700">CV AI</p>
        <div className="mt-2 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Career Studio
          </h1>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">
            score ready
          </span>
        </div>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
        <section className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium hover:border-emerald-600">
              <Upload className="h-4 w-4" />
              {uploading ? "Уншиж байна" : "CV upload"}
              <input
                className="sr-only"
                type="file"
                accept=".pdf,.txt,.md,.png,.jpg,.jpeg"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) onUpload(file);
                }}
              />
            </label>
            <button
              className="flex items-center justify-center gap-2 rounded-md bg-zinc-950 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
              disabled={busy}
              onClick={onAnalyze}
              type="button"
            >
              <Sparkles className="h-4 w-4" />
              AI зөвлөх
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {templates.map((template) => (
              <button
                className={`flex items-center justify-center gap-1 rounded-md border px-2 py-2 text-xs ${
                  cv.template === template.id
                    ? "border-black bg-black text-white"
                    : "border-zinc-300 text-zinc-600"
                }`}
                key={template.id}
                onClick={() => onField("template", template.id)}
                type="button"
              >
                <LayoutTemplate className="h-3.5 w-3.5" />
                {template.label}
              </button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          {inputs.map((item) => (
            <label className="space-y-1.5" key={item.key}>
              <span className="text-xs font-medium text-zinc-600">
                {item.label}
              </span>
              <input
                className={inputClass}
                onChange={(event) => onField(item.key, event.target.value)}
                placeholder={item.placeholder}
                value={cv[item.key]}
              />
            </label>
          ))}
          <label className="col-span-2 space-y-1.5">
            <span className="text-xs font-medium text-zinc-600">
              Зорьж буй ажил
            </span>
            <input
              className={inputClass}
              onChange={(event) => onField("targetRole", event.target.value)}
              value={cv.targetRole}
            />
          </label>
        </section>

        <section className="space-y-3">
          <TextArea
            label="Summary"
            onField={onField}
            value={cv.summary}
            field="summary"
          />
          <TextArea
            label="Skills"
            onField={onField}
            value={cv.skills}
            field="skills"
          />
          <TextArea
            label="Experience"
            onField={onField}
            value={cv.experience}
            field="experience"
          />
          <TextArea
            label="Education / Projects"
            onField={onField}
            value={cv.education}
            field="education"
          />
          <label className="block space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-600">
              <FileScan className="h-3.5 w-3.5" />
              Raw CV text
            </span>
            <textarea
              className={`${textClass} min-h-32`}
              onChange={(event) => onField("cvText", event.target.value)}
              value={cv.cvText}
            />
          </label>
          <button
            className="flex w-full items-center justify-center gap-2 rounded-md border border-emerald-700 px-3 py-2 text-sm font-medium text-emerald-800"
            onClick={onExtract}
            type="button"
          >
            <Wand2 className="h-4 w-4" />
            Мэдээлэл ялгах
          </button>
        </section>
      </div>
    </aside>
  );
}
