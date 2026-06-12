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

export function ClassicTemplate({ cv }: { cv: CvData }) {
  const skills = splitItems(cv.skills).length
    ? splitItems(cv.skills)
    : ["React", "TypeScript", "Teamwork"];
  const projLines = cv.projects ? lines(cv.projects) : [];

  return (
    <article className="print-area mx-auto flex min-h-[920px] w-full max-w-[760px] overflow-hidden bg-[#f0f0f0] shadow-sm ring-1 ring-zinc-300 text-sm">
      <aside className="w-[240px] min-w-[240px] bg-zinc-900 text-white flex flex-col items-center pt-10 px-6 pb-8">
        <div className="w-[120px] h-[120px] rounded-full border-4 border-white overflow-hidden bg-zinc-700 flex items-center justify-center mb-6 flex-shrink-0">
          <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
            <circle cx="40" cy="32" r="18" fill="#9ca3af" />
            <ellipse cx="40" cy="72" rx="28" ry="20" fill="#9ca3af" />
          </svg>
        </div>

        <h2 className="text-xl font-black uppercase tracking-wide text-center leading-tight">
          {cv.name || "Your Name"}
        </h2>
        <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-400 mt-1 text-center">
          {cv.title || cv.targetRole}
        </p>

        <div className="w-full h-px bg-zinc-600 my-5" />

        <div className="w-full">
          <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-3 text-center">
            Contact
          </p>
          <ul className="w-full space-y-1">
            {cv.phone && (
              <li className="flex items-start gap-2 text-[11px] text-zinc-300 leading-5">
                <span className="text-[10px] mt-0.5">📱</span>
                <span className="break-all">{cv.phone}</span>
              </li>
            )}
            {cv.email && (
              <li className="flex items-start gap-2 text-[11px] text-zinc-300 leading-5">
                <span className="text-[10px] mt-0.5">✉️</span>
                <span className="break-all">{cv.email}</span>
              </li>
            )}
            {cv.link && (
              <li className="flex items-start gap-2 text-[11px] text-zinc-300 leading-5">
                <span className="text-[10px] mt-0.5">🔗</span>
                <span className="break-all">{cv.link}</span>
              </li>
            )}
            {cv.location && (
              <li className="flex items-start gap-2 text-[11px] text-zinc-300 leading-5">
                <span className="text-[10px] mt-0.5">📍</span>
                <span className="break-all">{cv.location}</span>
              </li>
            )}
          </ul>
        </div>

        <div className="w-full h-px bg-zinc-600 my-5" />

        <div className="w-full">
          <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-3 text-center">
            Skills
          </p>
          <ul className="w-full space-y-1">
            {skills.map((s) => (
              <li
                key={s}
                className="list-disc list-inside text-[12px] text-zinc-300 leading-6"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {projLines.length > 0 && (
          <>
            <div className="w-full h-px bg-zinc-600 my-5" />
            <div className="w-full">
              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-3 text-center">
                Projects
              </p>
              <ul className="w-full space-y-1">
                {projLines.map((e, i) => (
                  <li
                    key={i}
                    className="list-disc list-inside text-[12px] text-zinc-300 leading-6"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </aside>

      <main className="flex-1 bg-[#f0f0f0] px-8 py-10 flex flex-col gap-7">
        {cv.summary && (
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-800 border-b border-zinc-300 pb-1 mb-3">
              Profile
            </h3>
            <p className="text-zinc-700 leading-7 text-[13px]">
              {cv.summary}
            </p>
          </section>
        )}

        <ExperienceTimeline cv={cv} variant="classic" />
        <EducationTimeline cv={cv} variant="classic" />
      </main>
    </article>
  );
}
