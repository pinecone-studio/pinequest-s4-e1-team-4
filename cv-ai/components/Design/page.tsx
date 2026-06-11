"use client";

import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  FileText,
  MessageSquareText,
  Mic,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { useEffect, useState } from "react";

const resumeSteps = [
  "CV эсвэл resume файлаа оруулна",
  "AI гол ур чадвар, туршлагыг тань ялгаж уншина",
  "Сайжруулсан товч, ойлгомжтой хувилбар бэлдэнэ",
];

const interviewSteps = [
  "Сонгосон ажлын байртай тань таарсан асуулт асууна",
  "Хариултыг тань сонсоод шууд зөвлөгөө өгнө",
  "Давуу тал, сайжруулах хэсгийг энгийнээр тайлбарлана",
];

const benefits = [
  {
    icon: FileText,
    title: "Resume ойлгомжтой болно",
    text: "Ажил олгогч хурдан уншаад ойлгохоор бүтэц, үг хэллэгийг цэгцэлнэ.",
  },
  {
    icon: Mic,
    title: "Ярилцлагад дасгал хийнэ",
    text: "Бодит ярилцлага шиг асуулт, хариултаар өөртөө итгэлтэй болно.",
  },
  {
    icon: ShieldCheck,
    title: "Алхам бүр тодорхой",
    text: "Юу хийхээ мэдэхгүй гацахгүй. Дэлгэц дээрх бүх зүйл энгийн заавартай.",
  },
];

const activityItems = [
  "CV оношилж байна",
  "Гол ур чадварыг ялгаж байна",
  "Ярилцлагын асуулт бэлдэж байна",
];

export default function InterviewAiLandingPage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroOffset, setHeroOffset] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowWelcome(false), 2600);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
      setHeroOffset(Math.min(scrollTop, 520));
      frame = 0;
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="min-h-screen scroll-smooth bg-[#f7f8f3] text-[#182019]">
      <div
        className="fixed left-0 top-0 z-40 h-1 w-full origin-left bg-[#d7ff63] shadow-[0_0_22px_rgba(215,255,99,0.65)] transition-transform duration-150"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <div
        className={`fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#101712] px-6 text-white transition-all duration-700 ${
          showWelcome
            ? "opacity-100"
            : "pointer-events-none invisible scale-[1.03] opacity-0"
        }`}
      >
        <div className="absolute inset-0 opacity-50 welcome-mesh" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d7ff63]/20 welcome-ring" />
        <div className="relative text-center welcome-pop">
          <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-[1.75rem] bg-[#d7ff63] text-[#101712] shadow-[0_0_90px_rgba(215,255,99,0.38)]">
            <Bot className="h-12 w-12 bot-breathe" aria-hidden="true" />
          </div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-[#d7ff63]">
            Эхэлж байна
          </p>
          <h1 className="text-4xl font-semibold tracking-normal sm:text-6xl">
            Welcome to Interview AI
          </h1>
          <div className="mx-auto mt-7 h-1.5 w-64 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-full origin-left animate-[welcomeLoad_2.5s_ease-in-out_forwards] rounded-full bg-[#d7ff63]" />
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-2 text-xs font-semibold text-white/70">
            {activityItems.map((item, index) => (
              <span
                key={item}
                className="welcome-chip rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
                style={{ animationDelay: `${0.35 + index * 0.18}s` }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

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

          <a
            href="#tools"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-[#182019] px-5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#2a352b]"
          >
            Эхлэх
            <ArrowRight
              className="h-4 w-4 transition duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
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
                  <p className="text-sm font-semibold text-white">
                    AI зөвлөмж
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    “Хариултаа эхлээд нөхцөл, дараа нь хийсэн ажил, эцэст нь
                    үр дүн гэсэн дарааллаар хэлбэл илүү итгэлтэй сонсогдоно.”
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

      <section id="how" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#6e8f00]">
              Танилцуулга
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-5xl">
              Ажил хайж буй хүнд ойлгомжтой, шууд хэрэглэж болох систем.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className="reveal rounded-2xl border border-[#dfe5da] bg-[#fbfcf8] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c6d4bf] hover:shadow-[0_18px_45px_rgba(38,51,36,0.09)]"
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <benefit.icon
                  className="mb-8 h-8 w-8 text-[#26746f]"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="mt-3 leading-7 text-[#5b6657]">{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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
                  <h3 className="mt-2 text-3xl font-semibold">
                    Interview хэсэг
                  </h3>
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

      <footer id="footer" className="bg-[#101712] px-5 py-10 text-white sm:px-8">
        <div className="reveal mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold">Interview AI</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
              Resume засах, ярилцлагад бэлдэх, дараагийн алхмаа ойлгоход
              зориулсан AI туслах.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-white/75">
            <a className="hover:text-white" href="#intro">
              Танилцуулга
            </a>
            <a className="hover:text-white" href="#tools">
              Resume ба Interview
            </a>
            <a className="hover:text-white" href="#home">
              Дээш буцах
            </a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .welcome-mesh {
          background:
            radial-gradient(circle at 20% 20%, rgba(215, 255, 99, 0.22), transparent 28%),
            radial-gradient(circle at 78% 70%, rgba(92, 196, 255, 0.16), transparent 30%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 18px);
          animation: meshDrift 5s ease-in-out infinite alternate;
        }

        .hero-grid {
          background-image:
            linear-gradient(rgba(24, 32, 25, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(24, 32, 25, 0.08) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: linear-gradient(to bottom, black, transparent 70%);
        }

        .welcome-pop {
          animation: welcomePop 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .welcome-ring {
          animation: ringPulse 2.3s ease-in-out infinite;
        }

        .welcome-chip {
          animation: fadeUp 0.7s ease-out both;
        }

        .bot-breathe {
          animation: botBreathe 1.6s ease-in-out infinite;
        }

        .float-slow {
          animation: floatSlow 4.2s ease-in-out infinite;
        }

        .float-slow-reverse {
          animation: floatSlow 4.6s ease-in-out infinite reverse;
        }

        .bounce-soft {
          animation: bounceSoft 1.6s ease-in-out infinite;
        }

        .progress-glow {
          animation: progressPulse 2s ease-in-out infinite;
        }

        .reveal {
          animation: fadeUp linear both;
          animation-timeline: view();
          animation-range: entry 0% cover 28%;
        }

        .scroll-fade-left {
          animation: slideFromLeft linear both;
          animation-timeline: view();
          animation-range: entry 0% cover 36%;
        }

        .scroll-fade-right {
          animation: slideFromRight linear both;
          animation-timeline: view();
          animation-range: entry 0% cover 36%;
        }

        @keyframes welcomeLoad {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes welcomePop {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes meshDrift {
          from {
            transform: translate3d(-1.5%, -1.5%, 0) scale(1);
          }
          to {
            transform: translate3d(1.5%, 1.5%, 0) scale(1.04);
          }
        }

        @keyframes ringPulse {
          0%,
          100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(0.82);
          }
          50% {
            opacity: 0.65;
            transform: translate(-50%, -50%) scale(1.18);
          }
        }

        @keyframes botBreathe {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-3px) scale(1.04);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(26px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideFromLeft {
          from {
            opacity: 0;
            transform: translateX(-90px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes slideFromRight {
          from {
            opacity: 0;
            transform: translateX(90px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes bounceSoft {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }

        @keyframes progressPulse {
          0%,
          100% {
            box-shadow: 0 0 0 rgba(215, 255, 99, 0);
          }
          50% {
            box-shadow: 0 0 22px rgba(215, 255, 99, 0.55);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .welcome-mesh,
          .welcome-pop,
          .welcome-ring,
          .welcome-chip,
          .bot-breathe,
          .float-slow,
          .float-slow-reverse,
          .bounce-soft,
          .progress-glow,
          .reveal,
          .scroll-fade-left,
          .scroll-fade-right {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
 
