import React from "react";
import { CvStudio } from "../cv/components/CvStudio";
import ResumeBot from "../resumeBot/page";
const page = () => {
  return (
    <div className="h-screen w-screen flex flex-row">
      <ResumeBot />
      <CvStudio />
    </div>
  );
};

export default page;
