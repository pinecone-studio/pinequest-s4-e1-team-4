"use client";

import {
  CanvasPanel,
  ResumeDocument,
  ResumeData,
} from "@/components/canvas-panel";
import { CommandCenter } from "@/components/Command-center";

import { useState } from "react";
import Design from "@/components/Design/page";

export default function CareerCoachPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  return (
    <div className="flex w-screen h-screen">
      <div className="w-full h-full">
        <CommandCenter onExtract={setResumeData} />
      </div>
      {/* <CanvasPanel resumeData={resumeData} /> */}
      {/* <ResumeDocument data={resumeData} /> */}
      {/* <Design /> */}
    </div>
  );
}
