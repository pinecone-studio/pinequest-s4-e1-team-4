import { LayoutTemplate, Sparkles, Upload } from "lucide-react";
import { templates, type CvData } from "@/lib/cv/types";
import type { OnCvField } from "./types";

type Props = {
  busy: boolean;
  cv: CvData;
  onAnalyze: () => void;
  onField: OnCvField;
  onUpload: (file: File) => void;
  uploading: boolean;
};

export function TopActions({
  busy,
  cv,
  onAnalyze,
  onField,
  onUpload,
  uploading,
}: Props) {
  return (
    <section className="space-y-3 animate-in fade-in-50 duration-300">
      <div className="grid grid-cols-2 gap-2">
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-zinc-300 px-3 py-2.5 text-xs font-medium transition-all active:scale-95 dark:border-[#25527f] dark:text-[#dcecff]  sm:text-sm text-white bg-[#0ea5e9] hover:bg-[#0284c7]">
          <Upload className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">
            {uploading ? "Reading..." : "Upload"}
          </span>
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
          className="flex items-center justify-center gap-2 rounded-md bg-[#0ea5e9] px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#0284c7] active:scale-95 disabled:opacity-50 dark:bg-[#0ea5e9] dark:hover:bg-[#0284c7] sm:text-sm"
          disabled={busy}
          onClick={onAnalyze}
          type="button"
        >
          <Sparkles
            className={`h-4 w-4 flex-shrink-0 transition-transform ${busy ? "animate-spin" : ""}`}
          />
          <span className="truncate">{busy ? "AI..." : "Analyze"}</span>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onField("template", template.id)}
            className={`flex items-center justify-center gap-1 rounded-md border px-2 py-2 text-xs transition-all active:scale-95 ${
              cv.template === template.id
                ? " bg-[#0ea5e9] text-white shadow-md dark:border-[#38bdf8] dark:bg-[#0ea5e9]"
                : "border-zinc-300 hover:border-[#0ea5e9] hover:bg-slate-50 dark:border-[#25527f] dark:text-[#dcecff] dark:hover:border-[#38bdf8] dark:hover:bg-[#0b1e33]"
            }`}
            type="button"
          >
            <LayoutTemplate className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">{template.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
