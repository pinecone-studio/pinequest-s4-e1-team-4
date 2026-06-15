import type { CvData } from "@/lib/cv/types";
import type { ReactNode } from "react";
import { splitItems } from "@/lib/cv/local-ai";
import { EducationTimeline } from "./EducationTimeline";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { UserRound } from "lucide-react";

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h3 className="border-b border-blue-300 pb-3 text-[12px] font-bold text-white">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function TimelineTemplate({ cv }: { cv: CvData }) {
  const skills = splitItems(cv.skills).length
    ? splitItems(cv.skills)
    : [
        "Team management",
        "Microsoft Office",
        "Conflict management",
        "Business development",
      ];
  return (
    <article className="print-area mx-auto grid min-h-[920px] w-full max-w-[760px] grid-cols-[210px_1fr] overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-stone-200">
      <aside className="bg-blue-500 px-8 py-10 text-white">
        <div className="space-y-8">
          <SidebarSection title="Contact information">
            <div className="space-y-4 text-[11px] leading-5 text-blue-50">
              <p>
                <strong className="block text-white">Email</strong>
                {cv.email}
              </p>
              <p>
                <strong className="block text-white">Address</strong>
                {cv.location}
              </p>
              <p>
                <strong className="block text-white">Phone</strong>
                {cv.phone}
              </p>
              <p>
                <strong className="block text-white">Link</strong>
                {cv.link}
              </p>
            </div>
          </SidebarSection>

          <SidebarSection title="Skills">
            <ul className="space-y-2 text-[11px] leading-5 text-blue-50">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </SidebarSection>
        </div>
      </aside>

      <main className="px-6 py-10">
        <header className="mb-6 border-b border-stone-200 pb-5">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0 flex-1">
              <h1 className="break-words text-2xl font-bold text-stone-800">
                {cv.name || "Таны нэр"}
              </h1>
              <p className="mt-1 text-[13px] font-bold text-stone-700">
                {cv.title || cv.targetRole}
              </p>
              {cv.summary && (
                <p className="mt-2 text-[12px] leading-5 text-stone-600">
                  {cv.summary}
                </p>
              )}
            </div>
            <div className="grid h-[86px] w-[70px] shrink-0 place-items-center overflow-hidden bg-stone-100 text-stone-400 ring-1 ring-stone-200">
              {cv.photo ? (
                <img
                  alt={cv.name ? `${cv.name} profile` : "Profile"}
                  className="h-full w-full object-cover object-center"
                  src={cv.photo}
                />
              ) : (
                <UserRound className="h-9 w-9" strokeWidth={1.4} />
              )}
            </div>
          </div>
        </header>

        <div className="space-y-6">
          <ExperienceTimeline cv={cv} variant="timeline" />
          <EducationTimeline cv={cv} variant="timeline" />
          {cv.projects && (
            <section className="border-t border-stone-200 pt-5">
              <h3 className="mb-4 font-serif text-lg font-bold text-stone-700">
                References
              </h3>
              <p className="text-[12px] leading-6 text-stone-600">
                {cv.projects}
              </p>
            </section>
          )}
        </div>
      </main>
    </article>
  );
}
