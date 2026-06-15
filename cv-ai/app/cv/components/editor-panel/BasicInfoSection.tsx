import type { CvData } from "@/lib/cv/types";
import { inputClass, inputs } from "../FormBits";
import type { OnCvField } from "./types";
import { Camera, X } from "lucide-react";

type Props = {
  cv: CvData;
  onField: OnCvField;
};

export function BasicInfoSection({ cv, onField }: Props) {
  function uploadPhoto(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onField("photo", reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <section className="grid grid-cols-2 gap-2 sm:gap-3 animate-in fade-in-50 duration-300 delay-100">
      <div className="col-span-2 flex items-center gap-3 rounded-md border border-zinc-200 bg-slate-50 p-3 dark:border-[#25527f] dark:bg-[#07111f]">
        <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border border-zinc-200 bg-white dark:border-[#25527f] dark:bg-[#0b1e33]">
          {cv.photo ? (
            <img
              alt={cv.name ? `${cv.name} profile` : "Profile"}
              className="h-full w-full object-cover"
              src={cv.photo}
            />
          ) : (
            <Camera className="h-5 w-5 text-zinc-500 dark:text-[#9db7d3]" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-[#9db7d3]">
            Profile зураг
          </p>
          <div className="mt-2 flex gap-2">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#0ea5e9] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#0284c7]">
              <Camera className="h-4 w-4" />
              Зураг оруулах
              <input
                accept="image/*"
                className="sr-only"
                type="file"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) uploadPhoto(file);
                }}
              />
            </label>
            {cv.photo && (
              <button
                className="grid h-8 w-8 place-items-center rounded-md border border-zinc-300 text-zinc-600 transition hover:bg-white dark:border-[#25527f] dark:text-[#dcecff] dark:hover:bg-[#0b1e33]"
                type="button"
                aria-label="Зураг устгах"
                onClick={() => onField("photo", "")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      {inputs.map((item) => (
        <label key={item.key} className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-[#9db7d3]">
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
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-[#9db7d3]">
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
