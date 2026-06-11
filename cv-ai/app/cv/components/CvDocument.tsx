import type { CvData } from "@/lib/cv/types";
import { ModernTemplate } from "./templates/ModernTemplate";
import { CompactTemplate } from "./templates/CompactTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";

export function CvDocument({ cv }: { cv: CvData }) {
  switch (cv.template) {
    case "classic":
      return <ClassicTemplate cv={cv} />;
    case "compact":
      return <CompactTemplate cv={cv} />;
    case "modern":
    default:
      return <ModernTemplate cv={cv} />;
  }
}
