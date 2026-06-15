import type { CvData } from "@/lib/cv/types";
import { splitItems } from "@/lib/cv/local-ai";
import { EducationTimeline } from "./EducationTimeline";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { UserRound } from "lucide-react";

function SidebarList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;

  return (
    <section className="border-t border-sky-200 pt-5">
      <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-sky-700">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-[11px] leading-5 text-slate-600"
          >
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function EuropeanTemplate({ cv }: { cv: CvData }) {
  const skills = splitItems(cv.skills).length
    ? splitItems(cv.skills)
    : ["Таны ур чадварууд энд бичигдэнэ."];
  return (
    <article className="print-area mx-auto grid min-h-[920px] w-full max-w-[760px] grid-cols-[280px_1fr] overflow-hidden bg-white shadow-lg ring-1 ring-slate-200">
      <aside className="flex flex-col bg-[#e8f2fb] px-9 py-12">
        <div className="mx-auto mb-9 grid h-[132px] w-[132px] place-items-center overflow-hidden rounded-full bg-white text-sky-300 ring-1 ring-sky-100">
          {cv.photo ? (
            <img
              alt={cv.name ? `${cv.name} profile` : "Profile"}
              className="h-full w-full object-cover object-center"
              src={cv.photo}
            />
          ) : (
            <UserRound className="h-14 w-14" strokeWidth={1.4} />
          )}
        </div>

        {cv.summary && (
          <p className="mb-9 text-[12px] leading-6 text-slate-600">
            {cv.summary}
          </p>
        )}

        <ul className="mb-8 space-y-4 text-[11px] font-semibold leading-5 text-slate-600">
          {[cv.email, cv.location, cv.phone, cv.link]
            .filter(Boolean)
            .map((item) => (
              <li key={item} className="break-words">
                {item}
              </li>
            ))}
        </ul>

        <div className="space-y-8">
          <SidebarList title="Skills" items={skills} />
        </div>
      </aside>

      <main className="relative px-11 py-12">
        <div className="absolute right-9 top-7 h-24 w-28 opacity-20 [background-image:radial-gradient(circle,#7da7c8_1.5px,transparent_1.5px)] [background-size:8px_8px]" />
        <header className="mb-10">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-sky-300">
            {cv.title || cv.targetRole || "Таны мэргэжил энд бичигдэнэ."}
          </p>
          <h1 className="break-words text-[54px] leading-[1.02] tracking-normal text-slate-800">
            {cv.name || "Таны нэр"}
          </h1>
        </header>

        <ExperienceTimeline cv={cv} variant="european" />
        <EducationTimeline cv={cv} variant="european" />
      </main>
    </article>
  );
}
