import { Bot } from "lucide-react";

import { activityItems } from "../data";

type WelcomeOverlayProps = {
  showWelcome: boolean;
};

export function WelcomeOverlay({ showWelcome }: WelcomeOverlayProps) {
  return (
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
  );
}
