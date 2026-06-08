function ResumeDocument() {
  return (
    <article className="mx-auto w-full max-w-[640px] rounded-sm bg-card shadow-[0_8px_40px_-8px_rgba(0,0,0,0.18)] ring-1 ring-border">
      <div className="aspect-[1/1.414] overflow-hidden px-10 py-12 sm:px-14 sm:py-16">
        {/* Name + title */}
        <header className="border-b border-border pb-5">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Alex Morgan</h1>
          <p className="mt-1 text-sm text-muted-foreground">Senior Frontend Engineer</p>
          <p className="mt-2 text-[11px] text-muted-foreground">
            alex.morgan@email.com · San Francisco, CA · linkedin.com/in/alexmorgan
          </p>
        </header>

        {/* Summary */}
        <section className="mt-5">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-foreground">Summary</h2>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            Results-driven frontend engineer with 8+ years architecting large-scale React systems serving
            millions of users. Specialized in performance optimization, design systems, and shipping
            accessible, high-impact product experiences.
          </p>
        </section>

        {/* Experience */}
        <section className="mt-5">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-foreground">Experience</h2>
          <div className="mt-3 space-y-4">
            <div>
              <div className="flex items-baseline justify-between">
                <p className="text-xs font-medium text-foreground">Lead Frontend Engineer · Vantage</p>
                <span className="text-[10px] text-muted-foreground">2021 — Present</span>
              </div>
              <ul className="mt-1.5 space-y-1 text-[11px] leading-relaxed text-muted-foreground">
                <li>· Cut initial load time by 47% through code-splitting and edge rendering.</li>
                <li>· Built the company design system adopted across 12 product teams.</li>
              </ul>
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <p className="text-xs font-medium text-foreground">Frontend Engineer · Northwind</p>
                <span className="text-[10px] text-muted-foreground">2018 — 2021</span>
              </div>
              <ul className="mt-1.5 space-y-1 text-[11px] leading-relaxed text-muted-foreground">
                <li>· Led migration of legacy app to React, improving velocity by 30%.</li>
                <li>· Drove WCAG 2.1 AA compliance across the core platform.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mt-5">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-foreground">Skills</h2>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            React · TypeScript · Next.js · Web Performance · Design Systems · Accessibility · GraphQL · Testing
          </p>
        </section>
      </div>
    </article>
  )
}

export function CanvasPanel() {
  return (
    <section className="relative flex h-screen w-full flex-col bg-muted lg:w-1/2">
      {/* Floating status bar */}
      <div className="sticky top-0 z-10 px-6 pt-6 sm:px-10">
        <div className="flex items-center justify-between rounded-full border border-border bg-card/90 px-5 py-2.5 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground">ATS Score</span>
            <span className="text-base font-semibold tabular-nums text-foreground">91%</span>
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            <span className="text-xs text-muted-foreground">Resume.pdf</span>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90"
          >
            Export / Send
          </button>
        </div>
      </div>

      {/* Document */}
      <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">
        <ResumeDocument />
      </div>
    </section>
  )
}
