import type { CvData } from "@/lib/cv/types";
import { splitItems } from "@/lib/cv/local-ai";

const sectionTitle = "text-[11px] font-bold uppercase tracking-[0.16em]";

function lines(value: string) {
  return value
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

export function ModernTemplate({ cv }: { cv: CvData }) {
  const skills = splitItems(cv.skills).length
    ? splitItems(cv.skills)
    : ["React", "TypeScript", "Teamwork"];

  return (
    <article className="print-area mx-auto min-h-[920px] w-full max-w-[720px] bg-gradient-to-br from-white via-slate-50 to-blue-50 p-10 shadow-lg ring-1 ring-slate-200">
      <header className="border-b-2 border-blue-500 pb-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {cv.name || "Your Name"}
            </h1>
            <p className="mt-2 text-lg font-semibold text-blue-600">
              {cv.title || cv.targetRole}
            </p>
          </div>
          <div className="text-left sm:text-right text-xs text-slate-600 space-y-1">
            {cv.email && <p>{cv.email}</p>}
            {cv.phone && <p>{cv.phone}</p>}
            {cv.location && <p>{cv.location}</p>}
          </div>
        </div>
      </header>

      {cv.summary && (
        <section className="mb-8">
          <h3 className={`${sectionTitle} text-blue-700 mb-3`}>About</h3>
          <p className="text-slate-700 leading-relaxed text-sm">{cv.summary}</p>
        </section>
      )}

      <section className="mb-8">
        <h3 className={`${sectionTitle} text-blue-700 mb-3`}>Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {cv.experience && (
        <section className="mb-8">
          <h3 className={`${sectionTitle} text-blue-700 mb-3`}>Experience</h3>
          <ul className="space-y-3">
            {lines(cv.experience).map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-blue-500 font-bold mt-0.5">▸</span>
                <span className="text-slate-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {cv.education && (
        <section className="mb-8">
          <h3 className={`${sectionTitle} text-blue-700 mb-3`}>Education</h3>
          <ul className="space-y-2">
            {lines(cv.education).map((item, i) => (
              <li key={i} className="text-slate-700 text-sm">
                • {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {cv.projects && (
        <section>
          <h3 className={`${sectionTitle} text-blue-700 mb-3`}>Projects</h3>
          <ul className="space-y-2">
            {lines(cv.projects).map((item, i) => (
              <li key={i} className="text-slate-700 text-sm">
                • {item}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
