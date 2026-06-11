import type { CvData } from "@/lib/cv/types";

export type OnCvField = <K extends keyof CvData>(
  field: K,
  value: CvData[K],
) => void;
