import type { CvData } from "@/lib/cv/types";
import { ModernTemplate } from "./templates/ModernTemplate";
import { CompactTemplate } from "./templates/CompactTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ExecutiveTemplate } from "./templates/ExecutiveTemplate";
import { EuropeanTemplate } from "./templates/EuropeanTemplate";
import { NewTemplate } from "./templates/NewTemplate";
import { RibbonTemplate } from "./templates/RibbonTemplate";
import { TimelineTemplate } from "./templates/TimelineTemplate";

export function CvDocument({ cv }: { cv: CvData }) {
  switch (cv.template) {
    case "classic":
      return <ClassicTemplate cv={cv} />;
    case "compact":
      return <CompactTemplate cv={cv} />;
    case "executive":
      return <ExecutiveTemplate cv={cv} />;
    case "new":
      return <NewTemplate cv={cv} />;
    case "european":
      return <EuropeanTemplate cv={cv} />;
    case "ribbon":
      return <RibbonTemplate cv={cv} />;
    case "timeline":
      return <TimelineTemplate cv={cv} />;
    case "modern":
    default:
      return <ModernTemplate cv={cv} />;
  }
}
