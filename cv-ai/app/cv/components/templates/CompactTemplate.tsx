import type { CvData } from "@/lib/cv/types";
import { splitItems } from "@/lib/cv/local-ai";
import { EducationTimeline } from "./EducationTimeline";
import { ExperienceTimeline } from "./ExperienceTimeline";

function lines(value: string) {
  return value
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

export function CompactTemplate({ cv }: { cv: CvData }) {
  const skills = splitItems(cv.skills).length
    ? splitItems(cv.skills)
    : ["React", "TypeScript"];

  return (
    <article className="print-area mx-auto min-h-[920px] w-full max-w-[720px] bg-white p-6 shadow-sm ring-1 ring-zinc-200 text-[11px]">
      <header className="border-b border-zinc-300 pb-3 mb-4">
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">
              {cv.name || "Your Name"}
            </h1>
            <p className="text-[10px] font-semibold text-zinc-600">
              {cv.title || cv.targetRole}
            </p>
          </div>
          <div className="text-[10px] text-zinc-600 space-y-0.5">
            {cv.email && <p>{cv.email}</p>}
            {cv.phone && <p>{cv.phone}</p>}
            {cv.location && <p>{cv.location}</p>}
          </div>
        </div>
      </header>

      {cv.summary && (
        <section className="mb-3">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-800 border-b border-zinc-300 pb-1">
            About
          </h3>
          <p className="text-zinc-700 leading-4 text-[10px] mt-1">
            {cv.summary}
          </p>
        </section>
      )}

      <ExperienceTimeline cv={cv} variant="compact" />

      <section className="mb-3">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-800 border-b border-zinc-300 pb-1">
          Skills
        </h3>
        <div className="flex flex-wrap gap-1 mt-1">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-zinc-200 text-zinc-900 px-2 py-0.5 rounded text-[9px] font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <EducationTimeline cv={cv} variant="compact" />

      {cv.projects && lines(cv.projects).length > 0 && (
        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-800 border-b border-zinc-300 pb-1">
            Projects
          </h3>
          <ul className="space-y-0.5 mt-1">
            {lines(cv.projects).map((item, i) => (
              <li key={i} className="text-zinc-700 text-[10px]">
                • {item}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
