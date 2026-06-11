import { GraduationCap, Plus, Trash2 } from "lucide-react";
import {
  createEducation,
  type CvData,
  type EducationItem,
} from "@/lib/cv/types";
import { inputClass } from "../FormBits";
import type { OnCvField } from "./types";

type Props = {
  cv: CvData;
  onField: OnCvField;
};

const educationLevels = [
  "Бүрэн дунд",
  "Мэргэжлийн боловсрол",
  "Диплом",
  "Бакалавр",
  "Магистр",
  "Доктор",
  "Сертификат",
];

export function EducationEditor({ cv, onField }: Props) {
  function updateEducation(
    id: string,
    field: keyof Omit<EducationItem, "id">,
    value: string,
  ) {
    onField(
      "educations",
      cv.educations.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  }

  function addEducation() {
    onField("educations", [...cv.educations, createEducation()]);
  }

  function removeEducation(id: string) {
    const next = cv.educations.filter((item) => item.id !== id);
    onField("educations", next.length ? next : [createEducation()]);
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-zinc-600">
          <GraduationCap className="h-3.5 w-3.5" />
          Education /боловсрол/
        </span>
        <button
          className="flex h-8 items-center justify-center gap-1.5 rounded-md border border-zinc-300 px-2.5 text-xs font-semibold text-zinc-800 transition hover:border-black hover:bg-slate-50 active:scale-95"
          onClick={addEducation}
          type="button"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      <div className="space-y-3">
        {cv.educations.map((item, index) => (
          <div
            className="rounded-md border border-zinc-200 bg-slate-50/70 p-3"
            key={item.id}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-700">
                Education {index + 1}
              </p>
              {cv.educations.length > 1 && (
                <button
                  aria-label={`Remove education ${index + 1}`}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-300 text-zinc-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 active:scale-95"
                  onClick={() => removeEducation(item.id)}
                  type="button"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <label className="space-y-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                  Боловсролын түвшин
                </span>
                <select
                  className={inputClass}
                  onChange={(event) =>
                    updateEducation(item.id, "level", event.target.value)
                  }
                  value={item.level}
                >
                  <option value="">Сонгох</option>
                  {educationLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </label>
              <EducationInput
                label="Сургуулийн нэр"
                onChange={(value) => updateEducation(item.id, "schoolName", value)}
                placeholder="National University of Mongolia"
                value={item.schoolName}
              />
              <EducationInput
                className="col-span-2"
                label="Сургуулийн хаяг"
                onChange={(value) => updateEducation(item.id, "address", value)}
                placeholder="Ulaanbaatar, Mongolia"
                value={item.address}
              />
              <EducationInput
                label="Анх элссэн огноо"
                onChange={(value) => updateEducation(item.id, "startDate", value)}
                type="date"
                value={item.startDate}
              />
              <EducationInput
                label="Төгссөн огноо"
                onChange={(value) => updateEducation(item.id, "endDate", value)}
                type="date"
                value={item.endDate}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationInput({
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
      <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
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
