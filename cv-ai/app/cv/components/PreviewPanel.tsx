"use client";

import { Download, FileText, PanelLeftOpen, PanelRightOpen } from "lucide-react";
import type { AiResult, CvData } from "@/lib/cv/types";
import { CvDocument } from "./CvDocument";
import { InsightsPanel } from "./InsightsPanel";
import { generatePdfFromElement } from "@/lib/cv/pdf-export";
import { useEffect, useRef, useState } from "react";

type Props = {
  busy: boolean;
  cv: CvData;
  onAnalyze: () => void;
  onApplySummary: () => void;
  onOpenEditor: () => void;
  result: AiResult;
};

export function PreviewPanel({
  busy,
  cv,
  onAnalyze,
  onApplySummary,
  onOpenEditor,
  result,
}: Props) {
  const cvRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const [previewHeight, setPreviewHeight] = useState(920);

  useEffect(() => {
    const preview = previewRef.current;
    const document = cvRef.current;
    if (!preview || !document) return;

    const updatePreviewSize = () => {
      const availableWidth = preview.clientWidth - 24;
      const nextScale = Math.min(1, Math.max(0.42, availableWidth / 760));
      setPreviewScale(nextScale);
      setPreviewHeight(document.scrollHeight * nextScale);
    };

    updatePreviewSize();
    const observer = new ResizeObserver(updatePreviewSize);
    observer.observe(preview);
    observer.observe(document);

    return () => observer.disconnect();
  }, [cv]);

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
    <section className="relative flex min-h-screen flex-row gap-0 overflow-hidden">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="no-print flex flex-col items-center justify-between gap-3 border-b border-zinc-200 bg-gradient-to-r from-white to-slate-50 px-4 py-3 backdrop-blur-sm transition-colors duration-300 dark:border-[#173757] dark:from-[#0b1728] dark:to-[#07111f] sm:flex-row sm:px-5 sm:py-4">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="h-5 w-5 flex-shrink-0 animate-pulse text-black dark:text-[#7dd3fc]" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-zinc-950 dark:text-white">CV Preview</p>
              <p className="truncate text-xs capitalize text-zinc-600 dark:text-[#9db7d3]">{cv.template} template</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition-all hover:bg-zinc-100 active:scale-95 dark:border-[#25527f] dark:bg-[#07111f] dark:text-[#dcecff] dark:hover:bg-[#0b1e33] xl:hidden"
              onClick={onOpenEditor}
              type="button"
            >
              <PanelLeftOpen className="h-4 w-4" />
              Editor
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition-all hover:bg-zinc-100 active:scale-95 dark:border-[#25527f] dark:bg-[#07111f] dark:text-[#dcecff] dark:hover:bg-[#0b1e33] xl:hidden"
              onClick={() => setInsightsOpen(true)}
              type="button"
            >
              <PanelRightOpen className="h-4 w-4" />
              ATS
            </button>
            <button
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-zinc-800 hover:shadow-lg active:scale-95 disabled:opacity-50 sm:px-4"
              onClick={downloadPDF}
              disabled={isExporting}
              type="button"
            >
              <Download className={`h-4 w-4 transition-transform ${isExporting ? "animate-bounce" : ""}`} />
              <span className="sm:hidden">{isExporting ? "..." : "PDF"}</span>
              <span className="hidden sm:inline">
                {isExporting ? "Exporting..." : "Download PDF"}
              </span>
            </button>
          </div>
        </header>
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-slate-50 to-white px-3 py-4 transition-colors duration-300 dark:from-[#07111f] dark:to-[#020617] sm:px-4 sm:py-6 md:px-6 lg:px-8"
          ref={previewRef}
        >
          <div
            className="mx-auto flex justify-center"
            style={{ height: previewHeight }}
          >
            <div
              className="w-[760px] shrink-0"
              style={{
                transform: `scale(${previewScale})`,
                transformOrigin: "top center",
              }}
            >
              <div ref={cvRef}>
                <CvDocument cv={cv} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <InsightsPanel
        busy={busy}
        onAnalyze={onAnalyze}
        onApplySummary={onApplySummary}
        open={insightsOpen}
        result={result}
        onClose={() => setInsightsOpen(false)}
      />
    </section>
  );
}
