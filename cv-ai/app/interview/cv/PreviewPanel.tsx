"use client";

import { Download, FileText } from "lucide-react";
import type { AiResult, CvData } from "@/lib/cv/types";
import { CvDocument } from "./CvDocument";
import { InsightsPanel } from "./InsightsPanel";

type Props = {
  busy: boolean;
  cv: CvData;
  onAnalyze: () => void;
  onApplySummary: () => void;
  result: AiResult;
};

export function PreviewPanel({
  busy,
  cv,
  onAnalyze,
  onApplySummary,
  result,
}: Props) {
  return (
    <section className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="no-print flex items-center justify-between border-b border-zinc-200 bg-[#f7f7f4]/90 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-black" />
            <div>
              <p className="text-sm font-semibold">Live CV preview</p>
              <p className="text-xs text-zinc-600">{cv.template} template</p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 rounded-md bg-black px-3 py-2 text-sm font-medium text-white"
            onClick={() => window.print()}
            type="button"
          >
            <Download className="h-4 w-4" />
            PDF
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          <CvDocument cv={cv} />
        </div>
      </div>
      <InsightsPanel
        busy={busy}
        onAnalyze={onAnalyze}
        onApplySummary={onApplySummary}
        result={result}
      />
    </section>
  );
}
