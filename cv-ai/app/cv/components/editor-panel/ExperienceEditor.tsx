import { BriefcaseBusiness, Plus, Trash2 } from "lucide-react";
import {
  createExperience,
  type CvData,
  type ExperienceItem,
} from "@/lib/cv/types";
import { inputClass, textClass } from "../FormBits";
import type { OnCvField } from "./types";

type Props = {
  cv: CvData;
  onField: OnCvField;
};

export function ExperienceEditor({ cv, onField }: Props) {
  function updateExperience(
    id: string,
    field: keyof Omit<ExperienceItem, "id">,
    value: string,
  ) {
    onField(
      "experiences",
      cv.experiences.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  }

  function addExperience() {
    onField("experiences", [...cv.experiences, createExperience()]);
  }

  function removeExperience(id: string) {
    const next = cv.experiences.filter((item) => item.id !== id);
    onField("experiences", next.length ? next : [createExperience()]);
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-[#9db7d3]">
          <BriefcaseBusiness className="h-3.5 w-3.5" />
          Experience/ажлын туршлага/
        </span>
        <button
          className="flex h-8 items-center justify-center gap-1.5 rounded-md border border-zinc-300 px-2.5 text-xs font-semibold text-zinc-800 transition hover:border-black hover:bg-slate-50 active:scale-95 dark:border-[#25527f] dark:text-[#dcecff] dark:hover:border-[#38bdf8] dark:hover:bg-[#0b1e33]"
          onClick={addExperience}
          type="button"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      <div className="space-y-3">
        {cv.experiences.map((item, index) => (
          <div
            className="rounded-md border border-zinc-200 bg-slate-50/70 p-3 dark:border-[#173757] dark:bg-[#0b1728]"
            key={item.id}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-700 dark:text-white">
                Experience {index + 1}
              </p>
              {cv.experiences.length > 1 && (
                <button
                  aria-label={`Remove experience ${index + 1}`}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-300 text-zinc-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 active:scale-95 dark:border-[#25527f] dark:text-[#9db7d3] dark:hover:border-red-400 dark:hover:bg-red-950/40 dark:hover:text-red-300"
                  onClick={() => removeExperience(item.id)}
                  type="button"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <ExperienceInput
                label="Албан тушаалын нэр"
                onChange={(value) => updateExperience(item.id, "jobTitle", value)}
                placeholder="Frontend Developer"
                value={item.jobTitle}
              />
              <ExperienceInput
                label="Компани"
                onChange={(value) => updateExperience(item.id, "companyName", value)}
                placeholder="Company LLC"
                value={item.companyName}
              />
              <ExperienceInput
                className="col-span-2"
                label="Ажлын хаяг"
                onChange={(value) => updateExperience(item.id, "address", value)}
                placeholder="Ulaanbaatar, Mongolia"
                value={item.address}
              />
              <ExperienceInput
                label="Орсон огноо"
                onChange={(value) => updateExperience(item.id, "startDate", value)}
                type="date"
                value={item.startDate}
              />
              <ExperienceInput
                label="Гарсан огноо"
                onChange={(value) => updateExperience(item.id, "endDate", value)}
                type="date"
                value={item.endDate}
              />
              <label className="col-span-2 space-y-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-[#9db7d3]">
                  Functions and achievements
                </span>
                <textarea
                  className={`${textClass} min-h-28`}
                  onChange={(event) =>
                    updateExperience(
                      item.id,
                      "functionsAchievements",
                      event.target.value,
                    )
                  }
                  placeholder="Built reusable components&#10;Improved page speed by 35%"
                  value={item.functionsAchievements}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceInput({
  className,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  className?: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  value: string;
}) {
  return (
    <label className={`space-y-1 ${className ?? ""}`}>
      <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-[#9db7d3]">
        {label}
      </span>
      <input
        className={inputClass}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  );
}
