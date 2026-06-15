"use client";

export interface ResumeData {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  experience?: { company: string; role: string; duration: string }[];
  education?: { school: string; degree: string; duration: string }[];
}

interface CanvasPanelProps {
  resumeData?: ResumeData | null;
}

export function ResumeDocument({ data }: { data?: ResumeData | null }) {
  const displayData = data || {
    name: "Alex Morgan",
    email: "alex.morgan@email.com",
    phone: "San Francisco, CA",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Web Performance",
      "Design Systems",
    ],
    experience: [
      {
        company: "Vantage",
        role: "Lead Frontend Engineer",
        duration: "2021 — Present",
      },
      {
        company: "Northwind",
        role: "Frontend Engineer",
        duration: "2018 — 2021",
      },
    ],
    education: [],
  };

  return (
    <article className="mx-auto w-full max-w-160 rounded-sm bg-card shadow-[0_8px_40px_-8px_rgba(0,0,0,0.18)] ring-1 ring-border transition-all duration-500">
      <div className="aspect-[1/1.414] overflow-hidden px-10 py-12 sm:px-14 sm:py-16">
        <header className="border-b border-border pb-5">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {displayData.name || "Нэр олдсонгүй"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {displayData.experience?.[0]?.role || "Мэргэжилтэн"}
          </p>
          <p className="mt-2 text-[11px] text-muted-foreground">
            {displayData.email} {displayData.phone && `· ${displayData.phone}`}
          </p>
        </header>

        {displayData.experience && displayData.experience.length > 0 && (
          <section className="mt-5">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
              Experience
            </h2>
            <div className="mt-3 space-y-4">
              {displayData.experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs font-medium text-foreground">
                      {exp.role} · {exp.company}
                    </p>
                    <span className="text-[10px] text-muted-foreground">
                      {exp.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {displayData.education && displayData.education.length > 0 && (
          <section className="mt-5">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
              Education
            </h2>
            <div className="mt-3 space-y-4">
              {displayData.education.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs font-medium text-foreground">
                      {edu.degree} · {edu.school}
                    </p>
                    <span className="text-[10px] text-muted-foreground">
                      {edu.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {displayData.skills && displayData.skills.length > 0 && (
          <section className="mt-5">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
              Skills
            </h2>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              {displayData.skills.join(" · ")}
            </p>
          </section>
        )}
      </div>
    </article>
  );
}

export function CanvasPanel({ resumeData }: CanvasPanelProps) {
  return (
    <section className="relative flex h-screen w-full flex-col bg-muted lg:w-1/2">
      <div className="sticky top-0 z-10 px-6 pt-6 sm:px-10">
        <div className="flex items-center justify-between rounded-full border border-border bg-card/90 px-5 py-2.5 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground">
              ATS Score
            </span>
            <span className="text-base font-semibold tabular-nums text-foreground">
              {resumeData ? "98%" : "---"}
            </span>
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            <span className="text-xs text-muted-foreground">
              {resumeData ? "Шинэчлэгдсэн CV" : "Жишээ CV"}
            </span>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90"
          >
            Export / Send
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">
        <ResumeDocument data={resumeData} />
      </div>
    </section>
  );
}
