"use client";

import { CommandCenter } from "@/components/Command-center";
import type { CvData } from "@/lib/cv/types";

type ResumeBotProps = {
  resumeData?: CvData;
  onCvUpdate?: (data: any) => void;
};

const ResumeBot = ({ resumeData, onCvUpdate }: ResumeBotProps) => {
  return (
    <CommandCenter
      resumeData={resumeData}
      onCvUpdate={onCvUpdate}
      onExtract={onCvUpdate}
    />
  );
};

export default ResumeBot;
