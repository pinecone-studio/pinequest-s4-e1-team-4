import { FileScan, Wand2 } from "lucide-react";
import type { CvData } from "@/lib/cv/types";
import { textClass } from "../FormBits";
import type { OnCvField } from "./types";

type Props = {
  cv: CvData;
  onExtract: () => void;
  onField: OnCvField;
};

export function RawCvSection({ cv, onExtract, onField }: Props) {
  return (
    <>
      <label className="block space-y-1">
        <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-[#9db7d3]">
          <FileScan className="h-3.5 w-3.5" />
          Raw CV Text
        </span>
        <textarea
          className={`${textClass} min-h-24`}
          placeholder="Paste your CV text here for automatic extraction..."
          value={cv.cvText}
          onChange={(event) => onField("cvText", event.target.value)}
        />
      </label>
      <button
        className="flex w-full items-center justify-center gap-2 rounded-md border border-black px-3 py-2.5 text-sm font-semibold text-black transition-all hover:bg-black hover:text-white active:scale-95 dark:border-[#38bdf8] dark:text-[#dcecff] dark:hover:bg-[#0ea5e9] dark:hover:text-white"
        onClick={onExtract}
        type="button"
      >
        <Wand2 className="h-4 w-4" />
        Extract from Text
      </button>
    </>
  );
}
