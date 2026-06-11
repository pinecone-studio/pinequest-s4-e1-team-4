import type { CvData } from "@/lib/cv/types";
import { inputClass, inputs } from "../FormBits";
import type { OnCvField } from "./types";

type Props = {
  cv: CvData;
  onField: OnCvField;
};

export function BasicInfoSection({ cv, onField }: Props) {
  return (
    <section className="grid grid-cols-2 gap-2 sm:gap-3 animate-in fade-in-50 duration-300 delay-100">
      {inputs.map((item) => (
        <label key={item.key} className="space-y-1">
          <span className="text-xs font-medium text-zinc-600 uppercase tracking-wide">
            {item.label}
          </span>
          <input
            className={inputClass}
            placeholder={item.placeholder}
            value={cv[item.key]}
            onChange={(event) => onField(item.key, event.target.value)}
          />
        </label>
      ))}
      <label className="col-span-2 space-y-1">
        <span className="text-xs font-medium text-zinc-600 uppercase tracking-wide">
          Target Role
        </span>
        <input
          className={inputClass}
          value={cv.targetRole}
          onChange={(event) => onField("targetRole", event.target.value)}
          placeholder="e.g., Frontend Engineer"
        />
      </label>
    </section>
  );
}
