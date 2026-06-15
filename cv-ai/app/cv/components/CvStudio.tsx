"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  blankCv,
  createEducation,
  createExperience,
  serializeEducations,
  serializeExperiences,
  type AiResult,
  type CvData,
  type EducationItem,
  type ExperienceItem,
} from "@/lib/cv/types";
import { buildAiResult, extractCvFromText } from "@/lib/cv/local-ai";
import { EditorPanel } from "./EditorPanel";
import { PreviewPanel } from "./PreviewPanel";

export type LoosePatch = Partial<CvData> & {
  experience?: unknown;
  skills?: unknown;
  education?: unknown;
};

function joinLooseList(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object") return Object.values(item).join(" - ");
        return "";
      })
      .filter(Boolean)
      .join("\n");
  }

  return typeof value === "string" ? value : "";
}

function normalizeExperienceItems(value: unknown): ExperienceItem[] {
  if (!Array.isArray(value)) return [];

  return value.map((item) => {
    const next = createExperience();
    if (typeof item === "string") {
      next.functionsAchievements = item;
      return next;
    }

    if (!item || typeof item !== "object") return next;

    const record = item as Record<string, unknown>;
    next.companyName = String(record.companyName ?? record.company ?? "");
    next.jobTitle = String(record.jobTitle ?? record.role ?? record.title ?? "");
    next.address = String(record.address ?? record.location ?? "");
    next.functionsAchievements = String(
      record.functionsAchievements ??
        record.achievements ??
        record.description ??
        record.details ??
        "",
    );
    next.startDate = String(record.startDate ?? "");
    next.endDate = String(record.endDate ?? "");

    const duration = String(record.duration ?? "");
    if (duration && !next.startDate && !next.endDate) {
      next.functionsAchievements = [next.functionsAchievements, duration]
        .filter(Boolean)
        .join("\n");
    }

    return next;
  });
}

function normalizeEducationItems(value: unknown): EducationItem[] {
  if (!Array.isArray(value)) return [];

  return value.map((item) => {
    const next = createEducation();
    if (typeof item === "string") {
      next.schoolName = item;
      return next;
    }

    if (!item || typeof item !== "object") return next;

    const record = item as Record<string, unknown>;
    next.level = String(record.level ?? record.degree ?? record.educationLevel ?? "");
    next.schoolName = String(record.schoolName ?? record.school ?? record.name ?? "");
    next.address = String(record.address ?? record.location ?? "");
    next.startDate = String(record.startDate ?? "");
    next.endDate = String(record.endDate ?? "");

    const duration = String(record.duration ?? "");
    if (duration && !next.startDate && !next.endDate) {
      next.address = [next.address, duration].filter(Boolean).join(" | ");
    }

    return next;
  });
}

export function normalizeCvPatch(patch: LoosePatch): Partial<CvData> {
  const next: Partial<CvData> = { ...patch };

  if (patch.skills !== undefined) {
    next.skills = Array.isArray(patch.skills)
      ? patch.skills.filter(Boolean).join(", ")
      : String(patch.skills ?? "");
  }

  if (patch.education !== undefined) {
    const structured = normalizeEducationItems(patch.education);
    if (structured.length > 0) {
      next.educations = structured;
      next.education = serializeEducations(structured);
    } else {
      next.education = joinLooseList(patch.education);
    }
  }

  if (patch.experience !== undefined) {
    const structured = normalizeExperienceItems(patch.experience);
    if (structured.length > 0) {
      next.experiences = structured;
      next.experience = serializeExperiences(structured);
    } else {
      next.experience = joinLooseList(patch.experience);
    }
  }

  return next;
}

type CvStudioProps = {
  cv?: CvData;
  onCvChange?: (cv: CvData) => void;
};

export function CvStudio({ cv: controlledCv, onCvChange }: CvStudioProps = {}) {
  const [internalCv, setInternalCv] = useState<CvData>(blankCv);
  const cv = controlledCv ?? internalCv;
  const [result, setResult] = useState<AiResult>(() => buildAiResult(blankCv));
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (controlledCv) {
      setResult(buildAiResult(controlledCv, controlledCv.cvText));
    }
  }, [controlledCv]);

  function setCv(next: CvData) {
    if (!controlledCv) {
      setInternalCv(next);
    }
    onCvChange?.(next);
  }

  function update<K extends keyof CvData>(field: K, value: CvData[K]) {
    const next = { ...cv, [field]: value };
    if (field === "experiences") {
      next.experience = serializeExperiences(value as CvData["experiences"]);
    }
    if (field === "educations") {
      next.education = serializeEducations(value as CvData["educations"]);
    }
    setCv(next);
    setResult(buildAiResult(next, next.cvText));
  }

  function mergeCv(patch: LoosePatch) {
    const normalized = normalizeCvPatch(patch);
    const next = { ...cv, ...normalized };
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
    <main className={`min-h-screen overflow-hidden bg-[#f7f7f4] text-zinc-950 transition-colors duration-300 dark:bg-[#07111f] dark:text-slate-100 ${isDarkMode ? "dark" : ""}`}>
      <div className="flex min-h-screen">
        <EditorPanel
          busy={busy}
          cv={cv}
          isDarkMode={isDarkMode}
          open={editorOpen}
          onAnalyze={analyze}
          onClose={() => setEditorOpen(false)}
          onExtract={extractFromText}
          onField={update}
          onToggleTheme={() => setIsDarkMode((current) => !current)}
          onUpload={upload}
          uploading={uploading}
        />
        <div className="min-w-0 flex-1">
          <PreviewPanel
            busy={busy}
            cv={cv}
            onAnalyze={analyze}
            onApplySummary={() => update("summary", result.improvedSummary)}
            onOpenEditor={() => setEditorOpen(true)}
            result={result}
          />
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
