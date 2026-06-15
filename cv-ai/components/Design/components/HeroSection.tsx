"use client";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  MessageSquareText,
  Moon,
  Sparkles,
  Sun,
  UploadCloud,
} from "lucide-react";
import { jobIconTiles } from "../data";
import { useClerk } from "@clerk/nextjs";

type HeroSectionProps = {
  heroOffset: number;
  isLightMode: boolean;
  onToggleTheme: () => void;
};

export function HeroSection({
  heroOffset,
  isLightMode,
  onToggleTheme,
}: HeroSectionProps) {
  const { redirectToSignUp } = useClerk();

  const textPrimary = isLightMode ? "text-[#08111f]" : "text-white";
  const textMuted = isLightMode ? "text-[#526b82]" : "text-[#9db7d3]";
  const chipClass = isLightMode
    ? "border-[#bae6fd] bg-white/85 text-[#164766]"
    : "border-[#1f4f7a] bg-[#081525]/85 text-[#dcecff]";

  return (
    <section
      className={` ${
        isLightMode
          ? "border-[#cde8fb] bg-[#f7fbff]"
          : "border-transparent bg-[#07111f]"
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0  ${
          isLightMode
            ? "bg-[linear-gradient(120deg,rgba(125,211,252,0.36),rgba(219,234,254,0.72),transparent)]"
            : "bg-[linear-gradient(120deg,rgba(14,165,233,0.26),rgba(29,78,216,0.18),transparent)]"
        }`}
        style={{ transform: `translateY(${heroOffset * 0.16}px)` }}
      />
      <div
        className="hero-grid absolute inset-0 opacity-60 will-change-transform"
        style={{ transform: `translateY(${heroOffset * 0.1}px)` }}
      />
      <div className="scan-line absolute inset-x-0 top-0 h-28 opacity-70" />
      <div className="hero-aurora absolute inset-x-0 top-24 h-72" />

      <nav className="relative mx-auto flex max-w-7xl animate-[slideDown_0.75s_ease-out_both] items-center justify-between px-5 py-5 sm:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span
            className={`grid h-11 w-11 place-items-center rounded-xl border text-[#38bdf8] transition duration-300 hover:rotate-3 hover:scale-105 ${
              isLightMode
                ? "border-[#bae6fd] bg-white shadow-[0_14px_34px_rgba(14,165,233,0.18)] hover:shadow-[0_18px_44px_rgba(14,165,233,0.25)]"
                : "border-[#38bdf8]/35 bg-[#07111f] shadow-[0_0_30px_rgba(56,189,248,0.25)] hover:shadow-[0_0_40px_rgba(56,189,248,0.4)]"
            }`}
          >
            <BrainCircuit className="h-6 w-6" aria-hidden="true" />
          </span>
          <span>
            <span className={`block text-base font-bold ${textPrimary}`}>
              Interview AI
            </span>
            <span className={`block text-xs font-medium ${textMuted}`}>
              CV ба ярилцлагын туслах
            </span>
          </span>
        </a>

        <div
          className={`hidden items-center gap-7 text-sm font-semibold ${textMuted} md:flex`}
        >
          <a className="transition hover:text-[#38bdf8]" href="#intro">
            Танилцуулга
          </a>
          <a className="transition hover:text-[#38bdf8]" href="#tools">
            Хэрэгслүүд
          </a>
          <a className="transition hover:text-[#38bdf8]" href="#footer">
            Холбоо
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isLightMode ? "Dark mode" : "Light mode"}
            className={`grid h-11 w-11 place-items-center rounded-full border transition duration-700 hover:-translate-y-2 ${
              isLightMode
                ? "border-[#bae6fd] bg-[#1f4f7a] text-[#0284c7] hover:bg-[#e0f2fe]"
                : "border-[#1f4f7a] bg-[#081525] text-[#7dd3fc] hover:border-[#38bdf8]"
            }`}
          >
            {isLightMode ? (
              <Moon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Sun className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          <a
            href="#tools"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-[#0ea5e9] px-5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(14,165,233,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0284c7]"
          >
            Эхлэх
            <ArrowRight
              className="h-4 w-4 transition duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
       =
        </div>
      </nav>

      <div
        id="home"
        className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-8 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pb-14 lg:pt-10"
      >
        <div className="job-icon-cluster pointer-events-none absolute inset-0 hidden xl:block">
          {jobIconTiles.map((tile, index) => (
            <div
              key={tile.label}
              className={`job-icon-tile job-icon-tile-${index + 1} ${
                isLightMode ? "job-icon-tile-light" : "job-icon-tile-dark"
              }`}
            >
              <tile.icon className="h-4 w-4" aria-hidden="true" />
              <span>{tile.label}</span>
            </div>
          ))}
        </div>
        <div
          id="intro"
          className={`intro-gradient animate-[fadeUp_0.85s_ease-out_both] rounded-[2rem] p-5 will-change-transform sm:p-6 ${
            isLightMode ? "intro-gradient-light" : "intro-gradient-dark"
          }`}
          style={{
            opacity: Math.max(1 - heroOffset / 680, 0.25),
            transform: `translateY(${heroOffset * -0.08}px)`,
          }}
        >
          <div
            className={`hero-kicker mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur ${chipClass}`}
          >
            <Sparkles className="h-4 w-4 text-[#0284c7]" aria-hidden="true" />
            Ажилд ороход туслах ухаалаг хөтөч
          </div>

          <p
            className={`hero-copy mt-5 max-w-2xl text-lg leading-8 ${textMuted}`}
          >
            Interview AI нь таны resume-г ойлгомжтой болгож, ажилд орох
            ярилцлагын асуултаар дасгал хийлгэнэ. Хаанаас эхлэхээ мэдэхгүй
            байсан ч дараагийн алхам бүрийг монголоор тодорхой харуулна.
          </p>
          <div className="job-icon-mobile mt-5 flex flex-wrap gap-3 xl:hidden">
            {jobIconTiles.map((tile) => (
              <div
                key={tile.label}
                className={`job-icon-tile job-icon-tile-inline ${
                  isLightMode ? "job-icon-tile-light" : "job-icon-tile-dark"
                }`}
              >
                <tile.icon className="h-4 w-4" aria-hidden="true" />
                <span>{tile.label}</span>
              </div>
            ))}
          </div>
          <div className="stagger-actions mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#tools"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0ea5e9] px-6 text-sm font-bold text-white shadow-[0_16px_38px_rgba(14,165,233,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-[#0284c7]"
            >
              Хэрэгслүүдийг харах
              <ArrowRight
                className="h-4 w-4 transition duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#how"
              className={`inline-flex h-12 items-center justify-center rounded-full border px-6 text-sm font-bold shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#38bdf8] ${
                isLightMode
                  ? "border-[#bae6fd] bg-white/85 text-[#164766] hover:bg-[#e0f2fe]"
                  : "border-[#1f4f7a] bg-[#081525]/85 text-[#dcecff] hover:bg-[#0b1e33]"
              }`}
            >
              Яаж ажилладаг вэ?
            </a>
          </div>
        </div>

        <div
          className="relative will-change-transform"
          style={{ transform: `translateY(${heroOffset * 0.06}px)` }}
        >
          <div className="hero-panel relative z-10">
            <div
              className={`absolute -left-2 top-14 hidden rounded-2xl border px-4 py-3 text-sm font-semibold shadow-xl backdrop-blur float-slow lg:block ${chipClass}`}
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#38bdf8] pulse-dot" />
              3 минутын дотор эхэлнэ
            </div>
            <div
              className={`absolute -right-1 bottom-14 hidden rounded-2xl border px-4 py-3 text-sm font-semibold shadow-xl backdrop-blur float-slow-reverse lg:block ${chipClass}`}
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#60a5fa] pulse-dot" />
              Шууд зөвлөгөө өгнө
            </div>
            <div
              className={`dashboard-shell rounded-[2rem] border p-4 backdrop-blur ${
                isLightMode
                  ? "border-[#bae6fd] bg-white/80 shadow-[0_30px_90px_rgba(14,165,233,0.16)]"
                  : "border-[#1d4f78] bg-[#07111f]/85 shadow-[0_30px_90px_rgba(2,6,23,0.48)]"
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-[1.5rem] p-5 ${isLightMode ? "bg-white text-[#08111f]" : "bg-[#030712] text-white"}`}
              >
                <div className="" />
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0284c7]">
                      Өнөөдрийн бэлтгэл
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">
                      Junior Frontend Developer
                    </h3>
                  </div>
                  <BadgeCheck
                    className="h-8 w-8 text-[#0284c7]"
                    aria-hidden="true"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div
                    className={`  rounded-2xl border p-4 ${
                      isLightMode
                        ? "border-[#dbeafe] bg-[#f1f8ff] "
                        : "border-transparent bg-white/10 "
                    }`}
                  >
                    <UploadCloud
                      className="mb-5 h-7 w-7 text-[#7dd3fc]"
                      aria-hidden="true"
                    />
                    <p
                      className={`text-sm ${isLightMode ? "text-[#526b82]" : "text-white/65"}`}
                    >
                      Resume оношилгоо
                    </p>
                    <p className="metric-count mt-2 text-3xl font-semibold">
                      82%
                    </p>
                    <p
                      className={`mt-3 text-sm leading-6 ${isLightMode ? "text-[#526b82]" : "text-white/70"}`}
                    >
                      Гарчиг, ур чадвар, туршлагын хэсгийг сайжруулах саналтай.
                    </p>
                  </div>
                  <div className=" rounded-2xl bg-[#0ea5e9] p-4 text-white">
                    <MessageSquareText
                      className="mb-5 h-7 w-7"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-white/80">Ярилцлагын дасгал</p>
                    <p className="metric-count mt-2 text-3xl font-semibold">
                      12 асуулт
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/80">
                      Өөрийгөө танилцуулах, төсөл тайлбарлах асуултууд бэлэн.
                    </p>
                  </div>
                </div>

                <div
                  className={`mt-4 rounded-2xl border p-4 ${
                    isLightMode
                      ? "border-[#dbeafe] bg-[#f7fbff]"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <p className={`text-sm font-semibold ${textPrimary}`}>
                    AI зөвлөмж
                  </p>
                  <p
                    className={`mt-2 text-sm leading-6 ${isLightMode ? "text-[#526b82]" : "text-white/70"}`}
                  >
                    “Хариултаа эхлээд нөхцөл, дараа нь хийсэн ажил, эцэст нь үр
                    дүн гэсэн дарааллаар хэлбэл илүү итгэлтэй сонсогдоно.”
                  </p>
                  <div
                    className={`mt-4 h-2 overflow-hidden rounded-full ${isLightMode ? "bg-[#dbeafe]" : "bg-white/10"}`}
                  >
                    <div className="h-full w-[78%] rounded-full bg-[#0ea5e9] progress-glow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
