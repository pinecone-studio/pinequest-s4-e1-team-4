"use client";

import { useState } from "react";
import {
  CvStudio,
  normalizeCvPatch,
  type LoosePatch,
} from "../cv/components/CvStudio";
import ResumeBot from "../resumeBot/page";
import { blankCv, type CvData } from "@/lib/cv/types";

const ResumePage = () => {
  const [cv, setCv] = useState<CvData>(blankCv);

  function applyCvUpdate(patch: LoosePatch) {
    setCv((current) => ({
      ...current,
      ...normalizeCvPatch(patch),
    }));
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-background lg:h-screen lg:flex-row">
      <div className="min-h-[520px] w-full shrink-0 border-b border-border lg:h-screen lg:w-[42%] lg:border-b-0 lg:border-r">
        <ResumeBot resumeData={cv} onCvUpdate={applyCvUpdate} />
      </div>
      <div className="min-h-screen min-w-0 flex-1 lg:h-screen">
        <CvStudio cv={cv} onCvChange={setCv} />
      </div>
    </div>
  );
};

export default ResumePage;
