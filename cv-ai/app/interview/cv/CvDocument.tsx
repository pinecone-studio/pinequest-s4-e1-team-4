// import type { CvData } from "@/lib/cv/types";
// import { splitItems } from "@/lib/cv/local-ai";

// const sectionTitle = "text-[11px] font-bold uppercase tracking-[0.16em]";

// function lines(value: string) {
//   return value
//     .split(/\r?\n/)
//     .map((line) => line.trim())
//     .filter(Boolean);
// }

// export function CvDocument({ cv }: { cv: CvData }) {
//   const isClassic = cv.template === "classic";
//   const isCompact = cv.template === "compact";
//   const accent = isClassic
//     ? "border-zinc-900 text-zinc-900"
//     : "border-emerald-700 text-emerald-800";
//   return (
//     <article
//       className={`print-area mx-auto min-h-[920px] w-full max-w-[720px] bg-white p-10 shadow-sm ring-1 ring-zinc-200 ${
//         isCompact ? "text-[12px]" : "text-sm"
//       }`}
//     >
//       <header
//         className={
//           isClassic
//             ? "border-b-2 border-zinc-900 pb-5"
//             : "grid gap-5 border-b border-zinc-200 pb-6 sm:grid-cols-[1fr_auto]"
//         }
//       >
//         <div>
//           <h2 className="text-3xl font-semibold tracking-tight">
//             {cv.name || "Таны нэр"}
//           </h2>
//           <p className="mt-1 text-base text-zinc-600">
//             {cv.title || cv.targetRole}
//           </p>
//         </div>
//         <div className="space-y-1 text-xs text-zinc-600 sm:text-right">
//           <p>{cv.email || "email@example.com"}</p>
//           <p>{cv.phone || "+976 9900 0000"}</p>
//           <p>{cv.location || "Ulaanbaatar"}</p>
//           {cv.link && <p>{cv.link}</p>}
//         </div>
//       </header>

//       <section className="mt-7">
//         <h3 className={`${sectionTitle} ${accent}`}>Profile</h3>
//         <p className="mt-2 leading-7 text-zinc-700">
//           {cv.summary ||
//             "Зорьж буй ажлын байранд таарах товч summary энд харагдана."}
//         </p>
//       </section>

//       <section className="mt-7">
//         <h3 className={`${sectionTitle} ${accent}`}>Skills</h3>
//         <div className="mt-3 flex flex-wrap gap-2">
//           {(splitItems(cv.skills).length
//             ? splitItems(cv.skills)
//             : ["React", "TypeScript", "Teamwork"]
//           ).map((skill) => (
//             <span
//               className="rounded border border-zinc-200 px-2.5 py-1 text-xs text-zinc-700"
//               key={skill}
//             >
//               {skill}
//             </span>
//           ))}
//         </div>
//       </section>

//       <ListSection accent={accent} title="Experience" value={cv.experience} />
//       <ListSection accent={accent} title="Education" value={cv.education} />
//       {cv.projects && (
//         <ListSection accent={accent} title="Projects" value={cv.projects} />
//       )}
//     </article>
//   );
// }

// function ListSection({
//   accent,
//   title,
//   value,
// }: {
//   accent: string;
//   title: string;
//   value: string;
// }) {
//   const items = lines(value);
//   return (
//     <section className="mt-7">
//       <h3 className={`${sectionTitle} ${accent}`}>{title}</h3>
//       {items.length ? (
//         <ul className="mt-3 space-y-2 text-zinc-700">
//           {items.map((item) => (
//             <li className="leading-7" key={item}>
//               {item}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="mt-2 text-zinc-500">
//           Мэдээлэл оруулахад энд автоматаар харагдана.
//         </p>
//       )}
//     </section>
//   );
// }

import type { CvData } from "@/lib/cv/types";
import { splitItems } from "@/lib/cv/local-ai";

const RIGHT_TITLE =
  "text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-800 border-b border-zinc-300 pb-1 mb-3";

function lines(value: string) {
  return value
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

export function CvDocument({ cv }: { cv: CvData }) {
  const isClassic = cv.template === "classic";
  const isCompact = cv.template === "compact";

  if (isClassic) {
    return <ClassicLayout cv={cv} />;
  }

  const accent = isCompact
    ? "border-zinc-900 text-zinc-900"
    : "border-emerald-700 text-emerald-800";
  const sectionTitle = "text-[11px] font-bold uppercase tracking-[0.16em]";

  return (
    <article
      className={`print-area mx-auto min-h-[920px] w-full max-w-[720px] bg-white p-10 shadow-sm ring-1 ring-zinc-200 ${
        isCompact ? "text-[12px]" : "text-sm"
      }`}
    >
      <header className="grid gap-5 border-b border-zinc-200 pb-6 sm:grid-cols-[1fr_auto]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            {cv.name || "Таны нэр"}
          </h2>
          <p className="mt-1 text-base text-zinc-600">
            {cv.title || cv.targetRole}
          </p>
        </div>
        <div className="space-y-1 text-xs text-zinc-600 sm:text-right">
          <p>{cv.email || "email@example.com"}</p>
          <p>{cv.phone || "+976 9900 0000"}</p>
          <p>{cv.location || "Ulaanbaatar"}</p>
          {cv.link && <p>{cv.link}</p>}
        </div>
      </header>

      <section className="mt-7">
        <h3 className={`${sectionTitle} ${accent}`}>Profile</h3>
        <p className="mt-2 leading-7 text-zinc-700">
          {cv.summary ||
            "Зорьж буй ажлын байранд таарах товч summary энд харагдана."}
        </p>
      </section>

      <section className="mt-7">
        <h3 className={`${sectionTitle} ${accent}`}>Skills</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {(splitItems(cv.skills).length
            ? splitItems(cv.skills)
            : ["React", "TypeScript", "Teamwork"]
          ).map((skill) => (
            <span
              className="rounded border border-zinc-200 px-2.5 py-1 text-xs text-zinc-700"
              key={skill}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <ListSection accent={accent} title="Experience" value={cv.experience} />
      <ListSection accent={accent} title="Education" value={cv.education} />
      {cv.projects && (
        <ListSection accent={accent} title="Projects" value={cv.projects} />
      )}
    </article>
  );
}

// ── Classic two-column layout ──────────────────────────────────────────────
function ClassicLayout({ cv }: { cv: CvData }) {
  const skills = splitItems(cv.skills).length
    ? splitItems(cv.skills)
    : ["React", "TypeScript", "Teamwork"];

  const expLines = lines(cv.experience);

  // Education/Projects хоёулаа sidebar-т харуулна
  const eduLines = lines(cv.education);
  const projLines = cv.projects ? lines(cv.projects) : [];
  const eduProjLines = [...eduLines, ...projLines];

  // Contact: link нь LinkedIn/GitHub field
  const contactLink = cv.link;

  return (
    <article className="print-area mx-auto flex min-h-[920px] w-full max-w-[760px] overflow-hidden bg-[#f0f0f0] shadow-sm ring-1 ring-zinc-300 text-sm">
      {/* ── LEFT sidebar ── */}
      <aside className="w-[240px] min-w-[240px] bg-zinc-900 text-white flex flex-col items-center pt-10 px-6 pb-8">
        {/* Avatar circle */}
        <div className="w-[120px] h-[120px] rounded-full border-4 border-white overflow-hidden bg-zinc-700 flex items-center justify-center mb-6 flex-shrink-0">
          <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
            <circle cx="40" cy="32" r="18" fill="#9ca3af" />
            <ellipse cx="40" cy="72" rx="28" ry="20" fill="#9ca3af" />
          </svg>
        </div>

        {/* Name + title */}
        <h2 className="text-xl font-black uppercase tracking-wide text-center leading-tight">
          {cv.name || "Таны нэр"}
        </h2>
        <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-400 mt-1 text-center">
          {cv.title || cv.targetRole || "Your Title"}
        </p>

        <Divider />

        {/* Contact — бүх field */}
        <SideSection label="Contact">
          {(cv.phone || "+976 9900 0000") && (
            <SideItem icon="📱" text={cv.phone || "+976 9900 0000"} />
          )}
          {(cv.email || "email@example.com") && (
            <SideItem icon="✉️" text={cv.email || "email@example.com"} />
          )}
          {contactLink && <SideItem icon="🔗" text={contactLink} />}
          {(cv.location || "Ulaanbaatar") && (
            <SideItem icon="📍" text={cv.location || "Ulaanbaatar"} />
          )}
        </SideSection>

        <Divider />

        {/* Skills */}
        <SideSection label="Skills">
          {skills.map((s) => (
            <li
              key={s}
              className="list-disc list-inside text-[12px] text-zinc-300 leading-6"
            >
              {s}
            </li>
          ))}
        </SideSection>

        {/* Education + Projects sidebar-т */}
        {eduProjLines.length > 0 && (
          <>
            <Divider />
            <SideSection label="Education / Projects">
              {eduProjLines.map((e, i) => (
                <li
                  key={i}
                  className="list-disc list-inside text-[12px] text-zinc-300 leading-6"
                >
                  {e}
                </li>
              ))}
            </SideSection>
          </>
        )}
      </aside>

      {/* ── RIGHT content ── */}
      <main className="flex-1 bg-[#f0f0f0] px-8 py-10 flex flex-col gap-7">
        {/* Profile / Summary */}
        <RightSection label="Profile">
          <p className="text-zinc-700 leading-7 text-[13px]">
            {cv.summary ||
              "Зорьж буй ажлын байранд таарах товч summary энд харагдана."}
          </p>
        </RightSection>

        {/* Target Role — summary дээр гарчиг болгон харуулна */}
        {cv.targetRole && cv.targetRole !== cv.title && (
          <RightSection label="Target Role">
            <p className="text-zinc-700 text-[13px]">{cv.targetRole}</p>
          </RightSection>
        )}

        {/* Experience */}
        <RightSection label="Work Experience">
          {expLines.length ? (
            <div className="space-y-4">
              {expLines.map((item, i) => (
                <ExperienceItem key={i} text={item} />
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-[13px]">
              Мэдээлэл оруулахад энд автоматаар харагдана.
            </p>
          )}
        </RightSection>
      </main>
    </article>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────

function Divider() {
  return <div className="w-full h-px bg-zinc-600 my-5" />;
}

function SideSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-3 text-center">
        {label}
      </p>
      <ul className="w-full space-y-1">{children}</ul>
    </div>
  );
}

function SideItem({ icon, text }: { icon: string; text: string }) {
  return (
    <li className="flex items-start gap-2 text-[11px] text-zinc-300 leading-5">
      <span className="text-[10px] mt-0.5 flex-shrink-0">{icon}</span>
      <span className="break-all">{text}</span>
    </li>
  );
}

function RightSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className={RIGHT_TITLE}>{label}</h3>
      {children}
    </section>
  );
}

function ExperienceItem({ text }: { text: string }) {
  const parts = text.split(/[·\/\|]/).map((p) => p.trim());
  const title = parts[0] || text;
  const rest = parts.slice(1).join(" · ");

  return (
    <div className="flex gap-3">
      <div className="mt-1 w-2.5 h-2.5 flex-shrink-0 bg-zinc-900 rounded-sm" />
      <div>
        <p className="font-bold text-[12px] uppercase tracking-wide text-zinc-900">
          {title}
        </p>
        {rest && (
          <p className="text-[11px] text-zinc-500 uppercase tracking-wide mt-0.5">
            {rest}
          </p>
        )}
      </div>
    </div>
  );
}

function ListSection({
  accent,
  title,
  value,
}: {
  accent: string;
  title: string;
  value: string;
}) {
  const sectionTitle = "text-[11px] font-bold uppercase tracking-[0.16em]";
  const items = lines(value);
  return (
    <section className="mt-7">
      <h3 className={`${sectionTitle} ${accent}`}>{title}</h3>
      {items.length ? (
        <ul className="mt-3 space-y-2 text-zinc-700">
          {items.map((item) => (
            <li className="leading-7" key={item}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-zinc-500">
          Мэдээлэл оруулахад энд автоматаар харагдана.
        </p>
      )}
    </section>
  );
}
