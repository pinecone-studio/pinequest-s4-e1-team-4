"use client";

// import { CanvasPanel, ResumeData } from "@/components/canvas-panel";
// import { CommandCenter } from "@/components/Command-center";

import { useState } from "react";
import Design from "@/components/Design/page"

export default function CareerCoachPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  return (
    <div className="flex h-screen w-full">
      {/* <CommandCenter onExtract={setResumeData} />
      <CanvasPanel resumeData={resumeData} /> */}
      <Design/>
    </div>
  );
}
