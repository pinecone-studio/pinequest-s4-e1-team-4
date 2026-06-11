"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { blankCv, type AiResult, type CvData } from "@/lib/cv/types";
import { buildAiResult, extractCvFromText } from "@/lib/cv/local-ai";
import { EditorPanel } from "./EditorPanel";
import { PreviewPanel } from "./PreviewPanel";

export function CvStudio() {
  const [cv, setCv] = useState<CvData>(blankCv);
  const [result, setResult] = useState<AiResult>(() => buildAiResult(blankCv));
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  function update<K extends keyof CvData>(field: K, value: CvData[K]) {
    const next = { ...cv, [field]: value };
    setCv(next);
    setResult(buildAiResult(next, next.cvText));
  }

  function mergeCv(patch: Partial<CvData>) {
    const next = { ...cv, ...patch };
    setCv(next);
    setResult(buildAiResult(next, next.cvText));
  }

  function extractFromText() {
    if (!cv.cvText.trim()) {
      toast.error("Please enter CV text or notes");
      return;
    }
    mergeCv(extractCvFromText(cv.cvText));
    toast.success("Extracted information to form");
  }

  async function analyze() {
    setBusy(true);
    try {
      const response = await fetch("/api/cv-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv, cvText: cv.cvText }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "AI analysis failed");
      setResult(body.data);
      toast.success("AI insights updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "AI analysis failed");
    } finally {
      setBusy(false);
    }
  }

  async function upload(file: File) {
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    try {
      const response = await fetch("/api/cv-extract", { method: "POST", body: data });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "File read failed");
      mergeCv(body.data);
      if (body.analysis) setResult(body.analysis);
      toast.success("Extracted from file");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "File read failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-zinc-950">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[460px_1fr]">
        <EditorPanel
          busy={busy}
          cv={cv}
          onAnalyze={analyze}
          onExtract={extractFromText}
          onField={update}
          onUpload={upload}
          uploading={uploading}
        />
        <PreviewPanel
          busy={busy}
          cv={cv}
          onAnalyze={analyze}
          onApplySummary={() => update("summary", result.improvedSummary)}
          result={result}
        />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
