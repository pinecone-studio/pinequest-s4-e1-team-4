import type { CvData } from "@/lib/cv/types";
import type { ReactNode } from "react";
import { splitItems } from "@/lib/cv/local-ai";
import { EducationTimeline } from "./EducationTimeline";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { Mail, MapPin, Phone, Link } from "lucide-react";

const heading =
  "text-[11px] font-bold uppercase tracking-[0.28em] text-stone-700";

function lines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className={`${heading} mb-4`}>{title}</h3>
      {children}
    </section>
  );
}

function ContactRow({ icon, value }: { icon: string; value: string }) {
  if (!value) return null;

  return (
    <li className="flex items-start gap-3 text-[11px] font-semibold leading-5 text-stone-600">
      <span className="mt-0.5 w-3 text-center text-stone-400">{icon}</span>
      <span className="break-words">{value}</span>
    </li>
  );
}

export function NewTemplate({ cv }: { cv: CvData }) {
  const skills = splitItems(cv.skills).length
    ? splitItems(cv.skills)
    : [
        "Organizational skills",
        "Time management",
        "Adaptability",
        "Leadership",
      ];
  const projects = lines(cv.projects);
  const role = cv.title || cv.targetRole;

  return (
    <article className="print-area relative mx-auto grid min-h-[920px] w-full max-w-[760px] grid-cols-[230px_1fr] overflow-hidden bg-[#fffdfb] px-12 py-14 shadow-lg ring-1 ring-stone-200">
      <div className="pointer-events-none absolute -left-20 -top-16 h-72 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(251,146,130,0.36),rgba(251,146,130,0.12)_55%,transparent_72%)] blur-sm" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(251,146,130,0.34),rgba(251,146,130,0.08)_62%,transparent_74%)] blur-sm" />

      <aside className="relative pr-8">
        <ul className="space-y-4">
          <ContactRow icon="@" value={cv.email} />
          <ContactRow icon="L" value={cv.location} />
          <ContactRow icon="☎" value={cv.phone} />
          <ContactRow icon="W" value={cv.link} />
        </ul>

        <div className="mt-10 space-y-9">
          <Section title="Skills">
            <ul className="space-y-4">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="list-disc text-[11px] leading-5 text-stone-600"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </aside>

      <main className="relative pl-6">
        <header className="mb-9">
          <h1 className="max-w-[360px] break-words font-serif text-[58px] leading-[0.95] tracking-normal text-stone-800">
            {cv.name || "Таны нэр"}
          </h1>
          <p className="mt-7 text-[12px] font-bold uppercase tracking-[0.42em] text-stone-700">
            {role || "Accountant"}
          </p>
        </header>

        {cv.summary && (
          <p className="mb-8 max-w-[420px] text-[15px] leading-7 text-stone-700">
            {cv.summary}
          </p>
        )}

        <ExperienceTimeline cv={cv} variant="new" />

        <EducationTimeline cv={cv} variant="new" />

        {projects.length > 0 && (
          <div className="mt-8">
            <Section title="Projects">
              <div className="space-y-4">
                {projects.map((item, index) => (
                  <p
                    key={index}
                    className="text-[11px] leading-5 text-stone-600"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </Section>
          </div>
        )}
      </main>
    </article>
  );
}
