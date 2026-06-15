import type { CvData, EducationItem, ExperienceItem } from "@/lib/cv/types";
import { splitItems } from "@/lib/cv/local-ai";
import { Mail, Smartphone, UserRound } from "lucide-react";
import type { ReactNode } from "react";

function lines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function TextList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-4">
      {items.map((item, index) => (
        <li
          key={index}
          className="list-disc text-[12px] leading-5 text-stone-500 marker:text-stone-500"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function dateLine(startDate: string, endDate: string, address: string) {
  const dates = [startDate, endDate || (startDate ? "Present" : "")]
    .filter(Boolean)
    .join(" - ");

  return [dates, address].filter(Boolean).join(", ");
}

function ContactBlock({
  children,
  icon,
}: {
  children: ReactNode;
  icon: ReactNode;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-5 grid h-6 w-6 place-items-center rounded-sm border-2 border-[#347ee3] text-[#347ee3]">
        {icon}
      </div>
      <div className="space-y-1 text-[11px] leading-5 text-stone-400">
        {children}
      </div>
    </div>
  );
}

function RibbonExperienceItem({ item }: { item: ExperienceItem }) {
  const achievements = lines(item.functionsAchievements);
  const meta = dateLine(item.startDate, item.endDate, item.address);

  return (
    <div className="break-inside-avoid">
      {meta && (
        <p className="mb-1 pl-4 font-serif text-[11px] italic leading-4 text-stone-400">
          {meta}
        </p>
      )}
      <div className="grid grid-cols-[8px_1fr] gap-2">
        <span className="mt-1.5 h-1.5 w-1.5 bg-stone-700" />
        <div>
          <h4 className="font-serif text-[15px] font-bold leading-5 text-stone-700">
            {item.jobTitle || "Job Title"}
          </h4>
          {item.companyName && (
            <p className="font-serif text-[13px] font-bold italic leading-5 text-stone-400">
              {item.companyName}
            </p>
          )}
          {achievements.length > 0 && (
            <ul className="mt-1.5 space-y-1 pl-3">
              {achievements.map((achievement, index) => (
                <li
                  className="list-disc text-[12px] leading-5 text-stone-500 marker:text-stone-400"
                  key={`${item.id}-${index}`}
                >
                  {achievement}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function RibbonEducationItem({ item }: { item: EducationItem }) {
  const meta = dateLine(item.startDate, item.endDate, item.address);

  return (
    <div className="break-inside-avoid">
      {meta && (
        <p className="mb-1 pl-4 font-serif text-[11px] italic leading-4 text-stone-400">
          {meta}
        </p>
      )}
      <div className="grid grid-cols-[8px_1fr] gap-2">
        <span className="mt-1.5 h-1.5 w-1.5 bg-stone-700" />
        <div>
          <h4 className="font-serif text-[15px] font-bold leading-5 text-stone-700">
            {item.level || "Education Level"}
          </h4>
          {item.schoolName && (
            <p className="font-serif text-[13px] font-bold italic leading-5 text-stone-400">
              {item.schoolName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function LegacyItems({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div className="grid grid-cols-[8px_1fr] gap-2" key={index}>
          <span className="mt-1.5 h-1.5 w-1.5 bg-stone-700" />
          <p className="text-[12px] leading-5 text-stone-500">{item}</p>
        </div>
      ))}
    </div>
  );
}

export function RibbonTemplate({ cv }: { cv: CvData }) {
  const skills = splitItems(cv.skills).length
    ? splitItems(cv.skills)
    : ["Organizational skills", "Time management", "Adaptability"];
  const role = cv.title || cv.targetRole || "Accountant";
  const experiences = cv.experiences.filter((item) =>
    [
      item.jobTitle,
      item.companyName,
      item.address,
      item.functionsAchievements,
      item.startDate,
      item.endDate,
    ].some(Boolean),
  );
  const educations = cv.educations.filter((item) =>
    [
      item.level,
      item.schoolName,
      item.address,
      item.startDate,
      item.endDate,
    ].some(Boolean),
  );
  const legacyExperiences = experiences.length ? [] : lines(cv.experience);
  const legacyEducations = educations.length ? [] : lines(cv.education);
  const extraItems = splitItems(cv.projects);

  return (
    <article className="print-area mx-auto grid min-h-[980px] w-full max-w-[760px] grid-cols-[260px_1fr] overflow-hidden bg-[#fffefe] px-10 shadow-lg ring-1 ring-stone-200">
      <aside className="pb-12 text-center">
        <div className="mx-auto mb-10 w-[230px] bg-[#347ee3] px-7 pb-16 pt-10 text-white [clip-path:polygon(0_0,100%_0,100%_84%,50%_100%,0_84%)]">
          <h1 className="break-words font-serif text-[36px] font-bold leading-[0.92]">
            {cv.name || "Таны нэр"}
          </h1>
          <p className="mt-4 font-serif text-lg font-bold leading-5">{role}</p>

          <div className="mx-auto mt-5 grid h-[124px] w-[124px] place-items-center overflow-hidden rounded-full bg-white text-[#347ee3] ring-4 ring-white">
            {cv.photo ? (
              <img
                alt={cv.name ? `${cv.name} profile` : "Profile"}
                className="h-full w-full object-cover object-center"
                src={cv.photo}
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-blue-50">
                <UserRound className="h-12 w-12" strokeWidth={1.5} />
              </div>
            )}
          </div>

          <p className="mt-6 font-serif text-xl font-bold">Summary</p>
          <p className="mt-5 text-[12px] font-semibold leading-4">
            {cv.summary || ""}
          </p>
        </div>

        <div className="space-y-9">
          <ContactBlock icon={<Mail className="h-4 w-4" strokeWidth={2.5} />}>
            {cv.email && <p className="break-words">{cv.email}</p>}
            {cv.location && <p className="break-words">{cv.location}</p>}
          </ContactBlock>

          <ContactBlock
            icon={<Smartphone className="h-4 w-4" strokeWidth={2.5} />}
          >
            {cv.phone && <p className="break-words">{cv.phone}</p>}
            {cv.link && <p className="break-words">{cv.link}</p>}
          </ContactBlock>
        </div>
      </aside>

      <main className="py-10 pl-2 pr-1">
        {(experiences.length > 0 || legacyExperiences.length > 0) && (
          <section className="mb-5">
            <h3 className="mb-4 font-serif text-lg font-bold text-stone-700">
              Experience
            </h3>
            <div className="space-y-4">
              {experiences.length > 0 ? (
                experiences.map((item) => (
                  <RibbonExperienceItem item={item} key={item.id} />
                ))
              ) : (
                <LegacyItems items={legacyExperiences} />
              )}
            </div>
          </section>
        )}

        {(educations.length > 0 || legacyEducations.length > 0) && (
          <section className="mb-5">
            <h3 className="mb-4 font-serif text-lg font-bold text-stone-700">
              Education
            </h3>
            <div className="space-y-4">
              {educations.length > 0 ? (
                educations.map((item) => (
                  <RibbonEducationItem item={item} key={item.id} />
                ))
              ) : (
                <LegacyItems items={legacyEducations} />
              )}
            </div>
          </section>
        )}

        <div className="mt-5 grid grid-cols-2 gap-8">
          <section>
            <h3 className="mb-4 font-serif text-lg font-bold text-stone-700">
              Skills
            </h3>
            <TextList items={skills} />
          </section>
          {extraItems.length > 0 && (
            <section>
              <h3 className="mb-4 font-serif text-lg font-bold text-stone-700">
                Projects
              </h3>
              <TextList items={extraItems} />
            </section>
          )}
        </div>
      </main>
    </article>
  );
}
