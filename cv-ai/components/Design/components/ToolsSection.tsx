import { CheckCircle2, FileText, MessageSquareText } from "lucide-react";

import { interviewSteps, resumeSteps } from "../data";

export function ToolsSection() {
  return (
    <section id="tools" className="bg-[#eef3e8] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#26746f]">
              Доош гүйлгээд ашиглана
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-normal sm:text-5xl">
              Зүүн талд resume, баруун талд interview.
            </h2>
          </div>
          <p className="max-w-md leading-7 text-[#5b6657]">
            Хоёр үндсэн хэсэгтэй тул хүн бүр юунаас эхлэхээ шууд ойлгоно:
            эхлээд CV-гээ цэгцэл, дараа нь ярилцлагаа давт.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="scroll-fade-left rounded-2xl border border-[#d5decf] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(38,51,36,0.12)]">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#26746f]">
                  Зүүн тал
                </p>
                <h3 className="mt-2 text-3xl font-semibold">Resume хэсэг</h3>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#e8f7ff] text-[#12606a]">
                <FileText className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <p className="leading-7 text-[#5b6657]">
              Resume хэсэг таны мэдээллийг эмхэлж, ажил олгогчид хурдан
              ойлгогдох хэлбэрт оруулна.
            </p>
            <ul className="mt-7 space-y-4">
              {resumeSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-3"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#26746f]"
                    aria-hidden="true"
                  />
                  <span className="text-[#2f392e]">{step}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="scroll-fade-right rounded-2xl border border-[#d5decf] bg-[#111812] p-6 text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(17,24,18,0.22)]">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#d7ff63]">
                  Баруун тал
                </p>
                <h3 className="mt-2 text-3xl font-semibold">Interview хэсэг</h3>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#d7ff63] text-[#111812]">
                <MessageSquareText className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <p className="leading-7 text-white/70">
              Interview хэсэг таныг бодит ярилцлагад бэлтгэж, хариултаа илүү
              тод, итгэлтэй хэлэхэд тусална.
            </p>
            <ul className="mt-7 space-y-4">
              {interviewSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-3"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#d7ff63]"
                    aria-hidden="true"
                  />
                  <span className="text-white/90">{step}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
