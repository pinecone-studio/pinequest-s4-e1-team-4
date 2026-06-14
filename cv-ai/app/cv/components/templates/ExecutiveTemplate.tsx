import type { CvData } from "@/lib/cv/types";
import { splitItems } from "@/lib/cv/local-ai";
import { EducationTimeline } from "./EducationTimeline";
import { ExperienceTimeline } from "./ExperienceTimeline";

const sectionTitle =
  "text-[10px] font-black uppercase tracking-[0.22em] text-sky-700";

function lines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function Detail({ label, value }: { label: string; value: string }) {
  if (!value) return null;

  return (
    <div>
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 break-words text-[11px] font-semibold leading-5 text-slate-700">
        {value}
      </p>
    </div>
  );
}

export function ExecutiveTemplate({ cv }: { cv: CvData }) {
  const skills = splitItems(cv.skills).length
    ? splitItems(cv.skills)
    : ["Leadership", "React", "TypeScript", "Communication"];
  const projects = lines(cv.projects);

  return (
    <article className="print-area mx-auto min-h-[920px] w-full max-w-[760px] overflow-hidden bg-white shadow-lg ring-1 ring-sky-100">
      <header className="relative bg-slate-950 px-10 py-9 text-white">
        <div className="absolute inset-y-0 right-0 w-48 bg-[linear-gradient(135deg,rgba(14,165,233,0.5),transparent_65%)]" />
        <div className="relative">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-sky-300">
            Executive Profile
          </p>
          <h1 className="max-w-xl break-words text-4xl font-black leading-tight tracking-normal">
            {cv.name || "Your Name"}
          </h1>
          <p className="mt-3 text-base font-semibold text-sky-200">
            {cv.title || cv.targetRole}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-[250px_1fr]">
        <aside className="bg-sky-50 px-7 py-8">
          <section className="mb-8">
            <h3 className={sectionTitle}>Contact</h3>
            <div className="mt-4 space-y-4">
              <Detail label="Email" value={cv.email} />
              <Detail label="Phone" value={cv.phone} />
              <Detail label="Location" value={cv.location} />
              <Detail label="Link" value={cv.link} />
            </div>
          </section>

          <section className="mb-8">
            <h3 className={sectionTitle}>Core Skills</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-sky-200 bg-white px-2.5 py-1 text-[10px] font-bold text-sky-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </aside>

        <main className="px-9 py-8">
          {cv.summary && (
            <section className="mb-8">
              <h3 className={sectionTitle}>Professional Summary</h3>
              <p className="mt-3 border-l-4 border-sky-400 pl-4 text-[13px] leading-7 text-slate-700">
                {cv.summary}
              </p>
            </section>
          )}

          <ExperienceTimeline cv={cv} variant="executive" />
          <EducationTimeline cv={cv} variant="executive" />

          {projects.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Selected Projects</h3>
              <div className="mt-4 grid gap-3">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <p className="text-[12px] leading-6 text-slate-700">
                      {project}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </article>
  );
}
