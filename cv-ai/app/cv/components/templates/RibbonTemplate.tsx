import type { CvData } from "@/lib/cv/types";
import { splitItems } from "@/lib/cv/local-ai";
import { EducationTimeline } from "./EducationTimeline";
import { ExperienceTimeline } from "./ExperienceTimeline";

function TextList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="list-disc text-[13px] leading-5 text-stone-500">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function RibbonTemplate({ cv }: { cv: CvData }) {
  const skills = splitItems(cv.skills).length
    ? splitItems(cv.skills)
    : ["Organizational skills", "Time management", "Adaptability"];
  return (
    <article className="print-area mx-auto grid min-h-[920px] w-full max-w-[760px] grid-cols-[250px_1fr] bg-[#fffefe] px-12 shadow-lg ring-1 ring-stone-200">
      <aside className="relative pb-12 pt-10 text-center">
        <div className="relative mx-auto mb-12 w-[210px] bg-blue-500 px-7 pb-16 pt-10 text-white [clip-path:polygon(0_0,100%_0,100%_78%,50%_100%,0_78%)]">
          <h1 className="break-words font-serif text-[36px] font-bold leading-none">
            {cv.name || "Deborah Payne"}
          </h1>
          <p className="mt-4 font-serif text-lg font-bold">{cv.title || cv.targetRole}</p>
          {cv.summary && (
            <>
              <p className="mt-6 font-serif text-xl font-bold">Summary</p>
              <p className="mt-5 text-[12px] font-semibold leading-4">{cv.summary}</p>
            </>
          )}
        </div>

        <div className="space-y-9 text-[12px] leading-5 text-stone-400">
          <div>
            <p className="mx-auto mb-5 flex h-6 w-6 items-center justify-center rounded-sm border-2 border-blue-500 text-blue-500">
              @
            </p>
            <p>{cv.email}</p>
            <p>{cv.location}</p>
          </div>
          <div>
            <p className="mx-auto mb-5 flex h-6 w-6 items-center justify-center rounded-sm border-2 border-blue-500 text-blue-500">
              P
            </p>
            <p>{cv.phone}</p>
            <p>{cv.link}</p>
          </div>
        </div>
      </aside>

      <main className="py-12 pl-7">
        <ExperienceTimeline cv={cv} variant="ribbon" />

        <EducationTimeline cv={cv} variant="ribbon" />

        <div>
          <section>
            <h3 className="mb-4 font-serif text-lg font-bold text-stone-700">Skills</h3>
            <TextList items={skills} />
          </section>
        </div>
      </main>
    </article>
  );
}
