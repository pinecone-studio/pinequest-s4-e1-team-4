import { CheckCircle2, FileText, MessageSquareText } from "lucide-react";

import { interviewSteps, resumeSteps } from "../data";

type ToolsSectionProps = {
  isLightMode: boolean;
};

export function ToolsSection({ isLightMode }: ToolsSectionProps) {
  return (
    <section
      id="tools"
      className={`py-16 transition-colors duration-500 sm:py-24 ${
        isLightMode ? "bg-[#f7fbff]" : "bg-[#07111f]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h2
              className={`max-w-3xl text-3xl font-semibold tracking-normal sm:text-5xl ${
                isLightMode ? "text-[#08111f]" : "text-white"
              }`}
            >
              Resume болон interview бэлтгэлээ нэг дор.
            </h2>
          </div>
          <p
            className={`max-w-md leading-7 ${
              isLightMode ? "text-[#526b82]" : "text-[#9db7d3]"
            }`}
          >
            Хоёр үндсэн хэсэгтэй тул хүн бүр юунаас эхлэхээ шууд ойлгоно:
            эхлээд CV-гээ цэгцэл, дараа нь ярилцлагаа давт.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <article
            className={`tool-card scroll-fade-left surface-hover rounded-2xl border p-6 shadow-sm hover:border-[#38bdf8]/70 hover:shadow-[0_22px_55px_rgba(14,165,233,0.16)] ${
              isLightMode
                ? "border-[#dbeafe] bg-white"
                : "border-[#1f4f7a] bg-[#0b1728]"
            }`}
          >
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <h3
                  className={`text-3xl font-semibold ${
                    isLightMode ? "text-[#08111f]" : "text-white"
                  }`}
                >
                  Resume хэсэг
                </h3>
              </div>
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
                  isLightMode
                    ? "bg-[#e0f2fe] text-[#0284c7]"
                    : "bg-[#0ea5e9] text-white"
                }`}
              >
                <FileText className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <p className={`leading-7 ${isLightMode ? "text-[#526b82]" : "text-[#9db7d3]"}`}>
              Resume хэсэг таны мэдээллийг эмхэлж, ажил олгогчид хурдан
              ойлгогдох хэлбэрт оруулна.
            </p>
            <ul className="mt-7 space-y-4">
              {resumeSteps.map((step, index) => (
                <li
                  key={step}
                  className="checklist-item flex gap-3"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#0284c7]"
                    aria-hidden="true"
                  />
                  <span className={isLightMode ? "text-[#24384a]" : "text-[#dcecff]"}>
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <article
            className={`tool-card scroll-fade-right surface-hover rounded-2xl border p-6 shadow-sm hover:border-[#60a5fa] ${
              isLightMode
                ? "border-[#bae6fd] bg-[#eff8ff] text-[#08111f] hover:shadow-[0_22px_55px_rgba(37,99,235,0.16)]"
                : "border-[#2563eb]/50 bg-[#020617] text-white hover:shadow-[0_22px_55px_rgba(37,99,235,0.22)]"
            }`}
          >
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-3xl font-semibold">Interview хэсэг</h3>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#0ea5e9] text-white">
                <MessageSquareText className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <p className={`leading-7 ${isLightMode ? "text-[#526b82]" : "text-white/70"}`}>
              Interview хэсэг таныг бодит ярилцлагад бэлтгэж, хариултаа илүү
              тод, итгэлтэй хэлэхэд тусална.
            </p>
            <ul className="mt-7 space-y-4">
              {interviewSteps.map((step, index) => (
                <li
                  key={step}
                  className="checklist-item flex gap-3"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#0284c7]"
                    aria-hidden="true"
                  />
                  <span className={isLightMode ? "text-[#24384a]" : "text-white/90"}>
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
