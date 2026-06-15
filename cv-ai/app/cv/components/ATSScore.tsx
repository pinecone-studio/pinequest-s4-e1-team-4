import { useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";

const STAR_COLORS = ["#f59e0b", "#fbbf24", "#a78bfa", "#6ee7b7", "#ffffff"];

function spawnSparkles(container: HTMLDivElement, xPct: number) {
  for (let i = 0; i < 3; i++) {
    const el = document.createElement("div");
    el.className = "ats-sparkle";
    const size = 6 + Math.random() * 7;
    const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    const offsetX = (Math.random() - 0.5) * 14;
    const topPx = -(4 + Math.random() * 6);
    el.style.cssText = `left:calc(${xPct}% + ${offsetX}px);top:${topPx}px;animation-delay:${Math.random() * 250}ms`;
    el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 12 12"><path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill="${color}"/></svg>`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }
}

interface ATSScoreProps {
  score: number;
  busy: boolean;
  onAnalyze: () => void;
}

export function ATSScore({ score, busy, onAnalyze }: ATSScoreProps) {
  const sparkleRef = useRef<HTMLDivElement>(null);
  const prevScore = useRef(0);

  useEffect(() => {
    const container = sparkleRef.current;
    if (!container) return;

    const from = prevScore.current;
    const to = score;
    prevScore.current = to;

    if (from === to) return;

    const steps = 20;
    const stepSize = (to - from) / steps;
    let current = from;
    let i = 0;

    const interval = setInterval(() => {
      current += stepSize;
      i++;
      spawnSparkles(container, Math.min(current, to));
      if (i >= steps) clearInterval(interval);
    }, 60);

    return () => clearInterval(interval);
  }, [score]);

  return (
    <section className="rounded-md border border-zinc-200 bg-gradient-to-br from-white to-slate-50 p-4 transition hover:border-zinc-300 dark:border-[#173757] dark:from-[#0b1728] dark:to-[#07111f] dark:hover:border-[#38bdf8]/70">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-600 dark:text-[#9db7d3]">
          CV Үнэлгээ
        </span>
        <strong className="animate-pulse text-4xl font-bold tabular-nums text-black dark:text-white">
          {score}%
        </strong>
      </div>

      <div className="relative mt-4 h-3 overflow-visible rounded-full bg-zinc-100 shadow-sm dark:bg-[#173757]">
        <div
          className="relative h-3 overflow-hidden rounded-full bg-gradient-to-r from-black via-zinc-800 to-black transition-all duration-1000 ease-out dark:from-[#0ea5e9] dark:via-[#38bdf8] dark:to-[#2563eb]"
          style={{ width: `${score}%` }}
        >
          <div className="ats-shimmer absolute inset-0 w-[40%] rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
        <div
          ref={sparkleRef}
          className="pointer-events-none absolute inset-0 overflow-visible"
        />
      </div>

      <button
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-50 dark:bg-[#0ea5e9] dark:hover:bg-[#0284c7]"
        disabled={busy}
        onClick={onAnalyze}
        type="button"
      >
        <RefreshCw
          className={`h-4 w-4 transition-transform ${busy ? "animate-spin" : ""}`}
        />
        {busy ? "Analyzing..." : "Update Score"}
      </button>
    </section>
  );
}
