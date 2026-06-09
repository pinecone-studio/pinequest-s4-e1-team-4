"use client";

import { CanvasPanel, ResumeData } from "@/components/Canvas-panel";
import { CommandCenter } from "@/components/Command-center";
import { useState } from "react";

export default function CareerCoachPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  return (
    <div className="flex h-screen w-full">
      <CommandCenter onExtract={setResumeData} />
      <CanvasPanel resumeData={resumeData} />
    </div>
  );
}
