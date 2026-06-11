"use client";

import type { CvData } from "@/lib/cv/types";

export const inputClass =
  "h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:border-emerald-600";

export const textClass =
  "min-h-24 w-full resize-none rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-600";

export const inputs: { key: keyof CvData; label: string; placeholder: string }[] = [
  { key: "name", label: "Нэр", placeholder: "Бат-Эрдэнэ" },
  { key: "title", label: "Одоогийн role", placeholder: "Frontend Developer" },
  { key: "email", label: "Имэйл", placeholder: "name@mail.com" },
  { key: "phone", label: "Утас", placeholder: "+976 9900 0000" },
  { key: "location", label: "Байршил", placeholder: "Ulaanbaatar" },
  { key: "link", label: "LinkedIn/GitHub", placeholder: "github.com/..." },
];

export function TextArea({
  field,
  label,
  onField,
  value,
}: {
  field: keyof CvData;
  label: string;
  onField: <K extends keyof CvData>(field: K, value: CvData[K]) => void;
  value: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-zinc-600">{label}</span>
      <textarea
        className={textClass}
        onChange={(event) => onField(field, event.target.value)}
        value={value}
      />
    </label>
  );
}
