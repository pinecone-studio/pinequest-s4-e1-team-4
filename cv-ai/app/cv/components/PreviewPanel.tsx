"use client";

import { Download, FileText } from "lucide-react";
import type { AiResult, CvData } from "@/lib/cv/types";
import { CvDocument } from "./CvDocument";
import { InsightsPanel } from "./InsightsPanel";
import { generatePdfFromElement } from "@/lib/cv/pdf-export";
import { useRef, useState } from "react";

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
  const cvRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    setIsExporting(true);
    try {
      await generatePdfFromElement(cvRef.current, `${cv.name || "cv"}.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className="flex min-h-screen flex-col lg:flex-row gap-0">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="no-print flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-zinc-200 bg-gradient-to-r from-white to-slate-50 px-4 sm:px-5 py-3 sm:py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="h-5 w-5 text-black flex-shrink-0 animate-pulse" />
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">CV Preview</p>
              <p className="text-xs text-zinc-600 truncate capitalize">{cv.template} template</p>
            </div>
          </div>
          <button
            className="flex items-center justify-center gap-2 rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50 transition-all active:scale-95 shadow-md hover:shadow-lg whitespace-nowrap"
            onClick={downloadPDF}
            disabled={isExporting}
            type="button"
          >
            <Download className={`h-4 w-4 transition-transform ${isExporting ? "animate-bounce" : ""}`} />
            {isExporting ? "Exporting..." : "Download PDF"}
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 bg-gradient-to-b from-slate-50 to-white" ref={cvRef}>
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
