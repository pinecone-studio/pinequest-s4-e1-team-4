import { Bot } from "lucide-react";

import { activityItems } from "../data";

type WelcomeOverlayProps = {
  showWelcome: boolean;
  isLightMode: boolean;
};

export function WelcomeOverlay({
  showWelcome,
  isLightMode,
}: WelcomeOverlayProps) {
  return (
    <div
      className={`fixed inset-0 z-50 grid place-items-center overflow-hidden px-6 transition-all duration-700 ${
        isLightMode ? "bg-[#f7fbff] text-[#08111f]" : "bg-[#020617] text-white"
      } ${
        showWelcome
          ? "opacity-100"
          : "pointer-events-none invisible scale-[1.03] opacity-0"
      }`}
    >
      <div className="absolute inset-0 opacity-60 welcome-mesh" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-[#38bdf8]/20 welcome-ring" />
      <div className="relative text-center welcome-pop">
        <div
          className={`mx-auto mb-6 grid h-24 w-24 place-items-center rounded-[1.75rem] border text-[#38bdf8] shadow-[0_20px_70px_rgba(56,189,248,0.18)] ${
            isLightMode
              ? "border-[#bae6fd] bg-white"
              : "border-[#7dd3fc]/45 bg-[#07111f]"
          }`}
        >
          <Bot className="h-12 w-12 bot-breathe" aria-hidden="true" />
        </div>

        <h1 className="text-4xl font-semibold tracking-normal sm:text-6xl">
          Welcome to Interview AI
        </h1>
        <div
          className={`mx-auto mt-7 h-1.5 w-64 overflow-hidden rounded-full ${
            isLightMode ? "bg-[#dbeafe]" : "bg-white/15"
          }`}
        >
          <div className="h-full w-full origin-left animate-[welcomeLoad_2.1s_ease-out_forwards] rounded-full bg-[#0ea5e9]" />
        </div>
        <div
          className={`mt-7 flex flex-wrap justify-center gap-2 text-xs font-semibold ${
            isLightMode ? "text-[#526b82]" : "text-white/70"
          }`}
        >
          {activityItems.map((item, index) => (
            <span
              key={item}
              className={`welcome-chip rounded-full border px-3 py-1.5 ${
                isLightMode
                  ? "border-[#dbeafe] bg-white/75"
                  : "border-white/10 bg-white/5"
              }`}
              style={{ animationDelay: `${0.35 + index * 0.18}s` }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
