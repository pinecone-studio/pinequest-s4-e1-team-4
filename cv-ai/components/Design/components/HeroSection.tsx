"use client";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  ChevronDown,
  MessageSquareText,
  Sparkles,
  UploadCloud,
} from "lucide-react";

import { useClerk } from "@clerk/nextjs";

type HeroSectionProps = {
  heroOffset: number;
};

export function HeroSection({ heroOffset }: HeroSectionProps) {
  const { redirectToSignUp } = useClerk();
  return (
    <section className="relative min-h-screen overflow-hidden border-b border-[#d6ddd0] bg-[#f7f8f3]">
      <div
        className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(120deg,rgba(215,255,99,0.38),rgba(92,196,255,0.22),transparent)] will-change-transform"
        style={{ transform: `translateY(${heroOffset * 0.16}px)` }}
      />
      <div
        className="hero-grid absolute inset-0 opacity-[0.34] will-change-transform"
        style={{ transform: `translateY(${heroOffset * 0.08}px)` }}
      />

      <nav className="relative mx-auto flex max-w-7xl animate-[slideDown_0.75s_ease-out_both] items-center justify-between px-5 py-5 sm:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#182019] text-[#d7ff63] shadow-[0_12px_30px_rgba(24,32,25,0.18)] transition duration-300 hover:rotate-3 hover:scale-105">
            <BrainCircuit className="h-6 w-6" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-bold">Interview AI</span>
            <span className="block text-xs font-medium text-[#65705f]">
              CV ба ярилцлагын туслах
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 text-sm font-semibold text-[#4d5848] md:flex">
          <a className="hover:text-[#182019]" href="#intro">
            Танилцуулга
          </a>
          <a className="hover:text-[#182019]" href="#tools">
            Хэрэгслүүд
          </a>
          <a className="hover:text-[#182019]" href="#footer">
            Холбоо
          </a>
        </div>

        {/* <a
          href="#tools"
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-[#182019] px-5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#2a352b]"
        >
          Эхлэх
          <ArrowRight
            className="h-4 w-4 transition duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a> */}
        <button
          onClick={() => redirectToSignUp({ redirectUrl: "/sign-up" })}
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-[#182019] px-5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#2a352b]"
        >
          Эхлэх
          <ArrowRight
            className="h-4 w-4 transition duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </nav>

      <div
        id="home"
        className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pb-24 lg:pt-16"
      >
        <div
          id="intro"
          className="animate-[fadeUp_0.85s_ease-out_both] will-change-transform"
          style={{
            opacity: Math.max(1 - heroOffset / 680, 0.25),
            transform: `translateY(${heroOffset * -0.08}px)`,
          }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cad5c4] bg-white/80 px-4 py-2 text-sm font-semibold text-[#42503d] shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-[#6e8f00]" aria-hidden="true" />
            Ажилд ороход туслах ухаалаг хөтөч
          </div>
          <h2 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-[#152015] sm:text-6xl lg:text-7xl">
            CV-гээ сайжруулаад, ярилцлагадаа тайван бэлд.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#566152]">
            Interview AI нь таны resume-г ойлгомжтой болгож, ажилд орох
            ярилцлагын асуултаар дасгал хийлгэнэ. Хаанаас эхлэхээ мэдэхгүй
            байсан ч дараагийн алхам бүрийг монголоор тодорхой харуулна.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#tools"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#d7ff63] px-6 text-sm font-bold text-[#182019] shadow-[0_16px_32px_rgba(134,165,0,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-[#c8f052]"
            >
              Хэрэгслүүдийг харах
              <ArrowRight
                className="h-4 w-4 transition duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#how"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#cbd6c5] bg-white/90 px-6 text-sm font-bold text-[#233026] shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Яаж ажилладаг вэ?
            </a>
          </div>
        </div>

        <div
          className="relative animate-[fadeUp_0.95s_0.12s_ease-out_both] will-change-transform"
          style={{ transform: `translateY(${heroOffset * 0.06}px)` }}
        >
          <div className="absolute -left-5 top-10 hidden rounded-2xl border border-[#d9dfd3] bg-white/85 px-4 py-3 text-sm font-semibold text-[#42503d] shadow-xl backdrop-blur float-slow lg:block">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#26746f]" />
            3 минутын дотор эхэлнэ
          </div>
          <div className="absolute -right-4 bottom-10 hidden rounded-2xl border border-[#d9dfd3] bg-white/85 px-4 py-3 text-sm font-semibold text-[#42503d] shadow-xl backdrop-blur float-slow-reverse lg:block">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#d7ff63]" />
            Шууд зөвлөгөө өгнө
          </div>
          <div className="rounded-[2rem] border border-[#d9dfd3] bg-white/85 p-4 shadow-[0_30px_90px_rgba(38,51,36,0.14)] backdrop-blur">
            <div className="rounded-[1.5rem] bg-[#101712] p-5 text-white">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#d7ff63]">
                    Өнөөдрийн бэлтгэл
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">
                    Junior Frontend Developer
                  </h3>
                </div>
                <BadgeCheck
                  className="h-8 w-8 text-[#d7ff63]"
                  aria-hidden="true"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="group rounded-2xl bg-white/10 p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                  <UploadCloud
                    className="mb-5 h-7 w-7 text-[#94d8ff]"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-white/65">Resume оношилгоо</p>
                  <p className="mt-2 text-3xl font-semibold">82%</p>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    Гарчиг, ур чадвар, туршлагын хэсгийг сайжруулах саналтай.
                  </p>
                </div>
                <div className="group rounded-2xl bg-[#d7ff63] p-4 text-[#101712] transition duration-300 hover:-translate-y-1 hover:bg-[#e0ff7d]">
                  <MessageSquareText
                    className="mb-5 h-7 w-7"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-[#425017]">Ярилцлагын дасгал</p>
                  <p className="mt-2 text-3xl font-semibold">12 асуулт</p>
                  <p className="mt-3 text-sm leading-6 text-[#425017]">
                    Өөрийгөө танилцуулах, төсөл тайлбарлах асуултууд бэлэн.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">AI зөвлөмж</p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  “Хариултаа эхлээд нөхцөл, дараа нь хийсэн ажил, эцэст нь үр
                  дүн гэсэн дарааллаар хэлбэл илүү итгэлтэй сонсогдоно.”
                </p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[78%] rounded-full bg-[#d7ff63] progress-glow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#how"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#5b6657] md:flex"
      >
        Доош харах
        <ChevronDown className="h-5 w-5 bounce-soft" aria-hidden="true" />
      </a>
    </section>
  );
}
