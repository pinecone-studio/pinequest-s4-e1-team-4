import { activityItems } from "../data";

type WelcomeOverlayProps = {
  showWelcome: boolean;
  isLightMode: boolean;
};

export function WelcomeOverlay({
  showWelcome,
  isLightMode,
}: WelcomeOverlayProps) {
  const paperClass = isLightMode ? "welcome-paper-light" : "welcome-paper-dark";
  const noteClass = isLightMode
    ? "border-[#bae6fd] bg-white/[0.82] text-[#08111f]"
    : "border-[#25527f] bg-[#07111f]/[0.78] text-white";
  const chipClass = isLightMode
    ? "border-[#dbeafe] bg-white/[0.78] text-[#526b82]"
    : "border-white/10 bg-white/[0.06] text-white/70";

  return (
    <div
      className={`fixed inset-0 z-50 grid place-items-center overflow-hidden px-5 transition-all duration-700 sm:px-8 ${
        isLightMode ? "bg-[#f7fbff] text-[#08111f]" : "bg-[#020617] text-white"
      } ${
        showWelcome
          ? "opacity-100"
          : "pointer-events-none invisible scale-[3] opacity-0"
      }`}
    >
      <div className={`absolute inset-0 welcome-paper ${paperClass}`} />
      <div aria-hidden="true" className="welcome-pencil-line left-[10%] top-[18%]" />
      <div aria-hidden="true" className="welcome-pencil-line right-[8%] top-[68%]" />
      <div aria-hidden="true" className="welcome-corner-mark left-[8%] top-[12%]" />
      <div aria-hidden="true" className="welcome-corner-mark bottom-[12%] right-[9%] rotate-180" />

      <div className="relative w-full max-w-5xl welcome-pop">
        <div
          className={`welcome-note relative mx-auto overflow-hidden rounded-[1.75rem] border px-5 py-8 shadow-[0_24px_80px_rgba(2,6,23,0.18)] backdrop-blur-sm sm:px-9 sm:py-10 ${noteClass}`}
        >
          <div aria-hidden="true" className="welcome-note-rule top-7" />
          <div aria-hidden="true" className="welcome-note-rule bottom-7" />

          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">
              AI-тай ярилцлагад бэлдэж, өөрийн хариултаа сайжруул.
            </h1>

            <div className="mx-auto mt-7 h-1 w-48 overflow-hidden rounded-full bg-[#38bdf8]/15 sm:w-64">
              <div className="h-full w-full origin-left animate-[welcomeLoad_2.1s_ease-out_forwards] rounded-full bg-[#0ea5e9]" />
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-2 text-xs font-semibold">
              {activityItems.map((item, index) => (
                <span
                  key={item}
                  className={`welcome-chip rounded-full border px-3 py-1.5 shadow-sm ${chipClass}`}
                  style={{ animationDelay: `${0.35 + index * 0.18}s` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
