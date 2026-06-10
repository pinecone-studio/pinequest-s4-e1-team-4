// "use client";

// import {
//   CheckCircle2,
//   MessageSquareText,
//   RefreshCw,
//   Target,
//   Wand2,
// } from "lucide-react";
// import type { AiResult } from "@/lib/cv/types";

// type Props = {
//   busy: boolean;
//   onAnalyze: () => void;
//   onApplySummary: () => void;
//   result: AiResult;
// };

// export function InsightsPanel({
//   busy,
//   onAnalyze,
//   onApplySummary,
//   result,
// }: Props) {
//   return (
//     <aside className="no-print w-full border-t border-zinc-200 bg-white lg:w-[340px] lg:border-l lg:border-t-0">
//       <div className="space-y-5 p-5">
//         <section className="rounded-md border border-zinc-200 p-4">
//           <div className="flex items-center justify-between">
//             <span className="text-sm font-medium text-zinc-600">ATS score</span>
//             <strong className="text-3xl tabular-nums">{result.score}%</strong>
//           </div>
//           <div className="mt-3 h-2 rounded-full bg-zinc-100">
//             <div
//               className="h-2 rounded-full bg-black transition-[width]"
//               style={{ width: `${result.score}%` }}
//             />
//           </div>
//           <button
//             className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-zinc-950 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
//             disabled={busy}
//             onClick={onAnalyze}
//             type="button"
//           >
//             <RefreshCw className={`h-4 w-4 ${busy ? "animate-spin" : ""}`} />
//             Шинэчлэх
//           </button>
//         </section>

//         <Panel icon={Target} title="Зөвлөмж">
//           <ul className="space-y-2">
//             {result.advice.map((item) => (
//               <li
//                 className="flex gap-2 text-sm leading-6 text-zinc-700"
//                 key={item}
//               >
//                 <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </Panel>

//         <Panel icon={Wand2} title="AI summary">
//           <p className="text-sm leading-6 text-zinc-700">
//             {result.improvedSummary}
//           </p>
//           <button
//             className="mt-3 flex items-center gap-2 rounded-md border border-emerald-700 px-3 py-2 text-sm font-medium text-emerald-800"
//             onClick={onApplySummary}
//             type="button"
//           >
//             <Wand2 className="h-4 w-4" />
//             Ашиглах
//           </button>
//         </Panel>

//         <Panel icon={MessageSquareText} title="Interview prep">
//           <ul className="space-y-2 text-sm leading-6 text-zinc-700">
//             {result.interview.map((item) => (
//               <li key={item}>{item}</li>
//             ))}
//           </ul>
//         </Panel>

//         <div className="flex flex-wrap gap-2">
//           {result.keywords.map((word) => (
//             <span
//               className="rounded bg-amber-100 px-2.5 py-1 text-xs text-amber-900"
//               key={word}
//             >
//               {word}
//             </span>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// }

// function Panel({
//   children,
//   icon: Icon,
//   title,
// }: {
//   children: React.ReactNode;
//   icon: React.ElementType;
//   title: string;
// }) {
//   return (
//     <section className="rounded-md border border-zinc-200 p-4">
//       <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
//         <Icon className="h-4 w-4 text-emerald-700" />
//         {title}
//       </h2>
//       {children}
//     </section>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import {
  CheckCircle2,
  MessageSquareText,
  RefreshCw,
  Target,
  Wand2,
} from "lucide-react";
import type { AiResult } from "@/lib/cv/types";

type Props = {
  busy: boolean;
  onAnalyze: () => void;
  onApplySummary: () => void;
  result: AiResult;
};

const STAR_COLORS = ["#f59e0b", "#fbbf24", "#a78bfa", "#6ee7b7", "#ffffff"];

function spawnSparkles(container: HTMLDivElement, xPct: number) {
  for (let i = 0; i < 3; i++) {
    const el = document.createElement("div");
    el.className = "ats-sparkle";
    const size = 6 + Math.random() * 7;
    const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    const offsetX = (Math.random() - 0.5) * 14;
    // top: отрицательное значение — sparkle стартует НАД баром
    const topPx = -(4 + Math.random() * 6);
    el.style.cssText = `left:calc(${xPct}% + ${offsetX}px);top:${topPx}px;animation-delay:${Math.random() * 250}ms`;
    el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 12 12"><path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill="${color}"/></svg>`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }
}

export function InsightsPanel({
  busy,
  onAnalyze,
  onApplySummary,
  result,
}: Props) {
  const sparkleRef = useRef<HTMLDivElement>(null);
  const prevScore = useRef(0);

  useEffect(() => {
    const container = sparkleRef.current;
    if (!container) return;

    const from = prevScore.current;
    const to = result.score;
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
  }, [result.score]);

  return (
    <aside className="no-print w-full border-t border-zinc-200 bg-white lg:w-[340px] lg:border-l lg:border-t-0">
      <div className="space-y-5 p-5">
        <section className="rounded-md border border-zinc-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-600">ATS score</span>
            <strong className="text-3xl tabular-nums">{result.score}%</strong>
          </div>

          {/* Bar wrapper: overflow-visible тул sparkle дээш харагдана */}
          <div className="relative mt-3 h-2 overflow-visible rounded-full bg-zinc-100">
            {/* Өнгөт bar: overflow-hidden тул shimmer зөвхөн дотор харагдана */}
            <div
              className="relative h-2 overflow-hidden rounded-full bg-black transition-[width] duration-1000"
              style={{ width: `${result.score}%` }}
            >
              {/* Shimmer — ats-shimmer class ашиглана */}
              <div className="ats-shimmer absolute inset-0 w-[40%] rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>

            {/* Sparkle layer — bar-аас гадуур, overflow-visible-ийн ачаар дээш харагдана */}
            <div
              ref={sparkleRef}
              className="pointer-events-none absolute inset-0 overflow-visible"
            />
          </div>

          <button
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-zinc-950 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
            disabled={busy}
            onClick={onAnalyze}
            type="button"
          >
            <RefreshCw className={`h-4 w-4 ${busy ? "animate-spin" : ""}`} />
            Шинэчлэх
          </button>
        </section>

        <Panel icon={Target} title="Зөвлөмж">
          <ul className="space-y-2">
            {result.advice.map((item) => (
              <li
                className="flex gap-2 text-sm leading-6 text-zinc-700"
                key={item}
              >
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 black" />
                {item}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel icon={Wand2} title="AI summary">
          <p className="text-sm leading-6 text-zinc-700">
            {result.improvedSummary}
          </p>
          <button
            className="mt-3 flex items-center gap-2 rounded-md border border-black px-3 py-2 text-sm font-medium text-black"
            onClick={onApplySummary}
            type="button"
          >
            <Wand2 className="h-4 w-4" />
            Ашиглах
          </button>
        </Panel>

        <Panel icon={MessageSquareText} title="Interview prep">
          <ul className="space-y-2 text-sm leading-6 text-zinc-700">
            {result.interview.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Panel>

        {/* <div className="flex flex-wrap gap-2">
          {result.keywords.map((word) => (
            <span
              className="rounded bg-amber-100 px-2.5 py-1 text-xs text-amber-900"
              key={word}
            >
              {word}
            </span>
          ))}
        </div> */}
      </div>
    </aside>
  );
}

function Panel({
  children,
  icon: Icon,
  title,
}: {
  children: React.ReactNode;
  icon: React.ElementType;
  title: string;
}) {
  return (
    <section className="rounded-md border border-zinc-200 p-4">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <Icon className="h-4 w-4 text-black" />
        {title}
      </h2>
      {children}
    </section>
  );
}
