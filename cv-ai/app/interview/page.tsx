"use client";

import { CanvasPanel, ResumeData } from "@/components/canvas-panel";
import { CommandCenter } from "@/components/Command-center";

import { useState } from "react";
import Design from "@/components/Design/page";

export default function CareerCoachPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  return (
    <div>
      {/**INTERVIEW, CV PAGE **/}
      <div className="flex h-screen w-screen">
        <CommandCenter onExtract={setResumeData} />
        <CanvasPanel resumeData={resumeData} />
      </div>
    </div>
  );
}
