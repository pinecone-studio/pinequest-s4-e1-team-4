import { isFilledEducation, type CvData, type EducationItem } from "@/lib/cv/types";

type EducationVariant =
  | "modern"
  | "classic"
  | "compact"
  | "executive"
  | "european"
  | "new"
  | "ribbon"
  | "timeline";

const styles: Record<
  EducationVariant,
  {
    body: string;
    company: string;
    date: string;
    dot: string;
    gap: string;
    grid: string;
    heading: string;
    line: string;
    section: string;
    title: string;
  }
> = {
  modern: {
    body: "text-[13px] leading-6 text-slate-500",
    company: "mt-2 text-[14px] font-black leading-5 tracking-[0.06em] text-slate-500",
    date: "space-y-2 text-[15px] font-semibold leading-5 text-blue-800",
    dot: "mt-1.5 h-3.5 w-3.5 rounded-full bg-blue-800",
    gap: "gap-5",
    grid: "grid-cols-[150px_1fr] gap-8",
    heading: "mb-9 text-[15px] font-black uppercase tracking-[0.16em] text-blue-400",
    line: "bg-blue-100",
    section: "mb-8 border-t-4 border-blue-100 pt-5",
    title: "text-[15px] font-black uppercase leading-5 tracking-[0.08em] text-slate-700",
  },
  classic: {
    body: "text-[12px] leading-6 text-zinc-600",
    company: "mt-2 text-[11px] font-bold uppercase leading-5 tracking-[0.12em] text-zinc-500",
    date: "space-y-2 text-[13px] font-bold leading-5 text-zinc-900",
    dot: "mt-1.5 h-3 w-3 rounded-sm bg-zinc-900",
    gap: "gap-4",
    grid: "grid-cols-[118px_1fr] gap-6",
    heading: "mb-6 border-b border-zinc-300 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-800",
    line: "bg-zinc-300",
    section: "mb-1",
    title: "text-[12px] font-black uppercase leading-5 tracking-wide text-zinc-900",
  },
  compact: {
    body: "text-[10px] leading-4 text-zinc-600",
    company: "mt-1 text-[9px] font-bold uppercase leading-4 tracking-wide text-zinc-500",
    date: "space-y-1 text-[10px] font-bold leading-4 text-zinc-800",
    dot: "mt-1 h-2.5 w-2.5 rounded-full bg-zinc-800",
    gap: "gap-3",
    grid: "grid-cols-[76px_1fr] gap-3",
    heading: "mb-3 border-b border-zinc-300 pb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-800",
    line: "bg-zinc-200",
    section: "mb-3",
    title: "text-[10px] font-black uppercase leading-4 tracking-wide text-zinc-900",
  },
  executive: {
    body: "text-[13px] leading-6 text-slate-500",
    company: "mt-2 text-[14px] font-black leading-5 tracking-[0.06em] text-slate-500",
    date: "space-y-2 text-[15px] font-semibold leading-5 text-sky-700",
    dot: "mt-1.5 h-3.5 w-3.5 rounded-full bg-sky-700",
    gap: "gap-5",
    grid: "grid-cols-[150px_1fr] gap-8",
    heading: "mb-9 text-[15px] font-black uppercase tracking-[0.16em] text-sky-700",
    line: "bg-sky-100",
    section: "mb-8 border-t-4 border-sky-100 pt-5",
    title: "text-[15px] font-black uppercase leading-5 tracking-[0.08em] text-slate-700",
  },
  european: {
    body: "text-[12px] leading-6 text-slate-600",
    company: "mt-2 text-[12px] font-black uppercase leading-5 tracking-[0.08em] text-slate-500",
    date: "space-y-2 text-[12px] font-bold leading-5 text-blue-700",
    dot: "mt-1.5 h-3 w-3 rounded-full bg-blue-700",
    gap: "gap-4",
    grid: "grid-cols-[118px_1fr] gap-5",
    heading: "mb-7 text-[10px] font-black uppercase tracking-[0.2em] text-sky-400",
    line: "bg-sky-200",
    section: "mb-9 border-t border-slate-200 pt-3",
    title: "text-[13px] font-black uppercase leading-5 tracking-[0.08em] text-slate-700",
  },
  new: {
    body: "text-[11px] leading-5 text-stone-500",
    company: "mt-2 text-[11px] font-black leading-5 tracking-[0.08em] text-stone-500",
    date: "space-y-2 text-[12px] font-bold leading-5 text-stone-600",
    dot: "mt-1.5 h-3 w-3 rounded-full bg-stone-700",
    gap: "gap-4",
    grid: "grid-cols-[105px_1fr] gap-5",
    heading: "mb-6 text-[11px] font-bold uppercase tracking-[0.28em] text-stone-700",
    line: "bg-stone-200",
    section: "mb-8",
    title: "text-[11px] font-black uppercase leading-5 tracking-[0.14em] text-stone-700",
  },
  ribbon: {
    body: "text-[12px] leading-5 text-stone-500",
    company: "mt-2 text-[12px] font-bold leading-5 tracking-wide text-stone-500",
    date: "space-y-2 text-[13px] font-bold leading-5 text-blue-500",
    dot: "mt-1.5 h-3 w-3 rounded-sm bg-blue-500",
    gap: "gap-4",
    grid: "grid-cols-[112px_1fr] gap-5",
    heading: "mb-5 font-serif text-lg font-bold text-stone-700",
    line: "bg-blue-100",
    section: "mb-6",
    title: "font-serif text-[15px] font-bold leading-5 text-stone-700",
  },
  timeline: {
    body: "text-[12px] leading-6 text-stone-600",
    company: "mt-2 text-[12px] font-bold leading-5 text-stone-500",
    date: "space-y-2 text-[12px] italic leading-5 text-stone-600",
    dot: "mt-1.5 h-3 w-3 rounded-sm bg-blue-500",
    gap: "gap-4",
    grid: "grid-cols-[132px_1fr] gap-5",
    heading: "mb-5 font-serif text-lg font-bold text-stone-700",
    line: "bg-stone-300",
    section: "border-t border-stone-200 pt-5",
    title: "block text-[14px] font-bold leading-5 text-blue-500",
  },
};

function lines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

const flatStyles: Record<
  EducationVariant,
  {
    item: string;
    meta: string;
    textWrap: string;
  }
> = {
  modern: {
    item: "rounded-lg border border-blue-100 bg-white/70 px-5 py-4 shadow-sm",
    meta: "shrink-0 rounded-full bg-blue-100 px-3 py-1 text-[11px] font-bold text-blue-700",
    textWrap: "flex items-start justify-between gap-4",
  },
  classic: {
    item: "border-b border-zinc-300 pb-4 last:border-b-0",
    meta: "shrink-0 text-right text-[11px] font-bold italic text-zinc-500",
    textWrap: "flex items-start justify-between gap-4",
  },
  compact: {
    item: "border-b border-zinc-200 pb-2 last:border-b-0",
    meta: "shrink-0 text-right text-[9px] font-bold text-zinc-500",
    textWrap: "flex items-start justify-between gap-2",
  },
  executive: {
    item: "rounded-md border border-sky-100 bg-sky-50/60 px-4 py-3",
    meta: "shrink-0 rounded-md bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-sky-700 ring-1 ring-sky-100",
    textWrap: "flex items-start justify-between gap-4",
  },
  european: {
    item: "",
    meta: "",
    textWrap: "",
  },
  new: {
    item: "pb-5",
    meta: "shrink-0 text-right text-[11px] font-bold text-stone-500",
    textWrap: "flex items-start justify-between gap-5",
  },
  ribbon: {
    item: "pb-4",
    meta: "shrink-0 font-serif text-[11px] italic text-stone-400",
    textWrap: "flex items-start justify-between gap-4",
  },
  timeline: {
    item: "",
    meta: "",
    textWrap: "",
  },
};

function dateLabel(value: string) {
  if (!value) return "";

  const [year, month] = value.split("-");
  const monthIndex = Number(month) - 1;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (year && monthIndex >= 0 && monthIndex < months.length) {
    return `${months[monthIndex]} ${year}`;
  }

  return year || value;
}

function dateRange(startDate: string, endDate: string) {
  const start = dateLabel(startDate);
  const end = endDate ? dateLabel(endDate) : start ? "Present" : "";

  return [start, end].filter(Boolean).join(" - ");
}

function usesRail(variant: EducationVariant) {
  return variant === "european" || variant === "timeline";
}

function RailStructuredItem({
  isLast,
  item,
  variant,
}: {
  isLast: boolean;
  item: EducationItem;
  variant: EducationVariant;
}) {
  const style = styles[variant];
  const start = dateLabel(item.startDate);
  const end = item.endDate ? dateLabel(item.endDate) : start ? "Present" : "";
  const detailLine = [item.schoolName, item.address].filter(Boolean).join(". ");

  return (
    <div className={`grid ${style.grid}`}>
      <div className={`grid grid-cols-[18px_1fr] ${style.gap}`}>
        <div className="relative flex justify-center">
          <span className={style.dot} />
          {!isLast && (
            <span className={`absolute top-5 h-[calc(100%+30px)] w-px ${style.line}`} />
          )}
        </div>
        <div className={style.date}>
          {start && <p>{start}</p>}
          {end && <p>{end}</p>}
        </div>
      </div>

      <div className="pb-8">
        <h4 className={style.title}>{item.level || "Education Level"}</h4>
        {detailLine && <p className={style.company}>{detailLine}</p>}
      </div>
    </div>
  );
}

function FlatStructuredItem({
  item,
  variant,
}: {
  item: EducationItem;
  variant: EducationVariant;
}) {
  const style = styles[variant];
  const flat = flatStyles[variant];
  const range = dateRange(item.startDate, item.endDate);
  const detailLine = [item.schoolName, item.address].filter(Boolean).join(" | ");

  return (
    <div className={flat.item}>
      <div className={flat.textWrap}>
        <div className="min-w-0">
          <h4 className={style.title}>{item.level || "Education Level"}</h4>
          {detailLine && <p className={style.company}>{detailLine}</p>}
        </div>
        {range && <p className={flat.meta}>{range}</p>}
      </div>
    </div>
  );
}

function RailLegacyItem({
  isLast,
  item,
  variant,
}: {
  isLast: boolean;
  item: string;
  variant: EducationVariant;
}) {
  const style = styles[variant];

  return (
    <div className={`grid ${style.grid}`}>
      <div className={`grid grid-cols-[18px_1fr] ${style.gap}`}>
        <div className="relative flex justify-center">
          <span className={style.dot} />
          {!isLast && (
            <span className={`absolute top-5 h-[calc(100%+20px)] w-px ${style.line}`} />
          )}
        </div>
      </div>
      <p className={`pb-4 ${style.body}`}>{item}</p>
    </div>
  );
}

function FlatLegacyItem({
  item,
  variant,
}: {
  item: string;
  variant: EducationVariant;
}) {
  const style = styles[variant];
  const flat = flatStyles[variant];

  return (
    <div className={flat.item}>
      <p className={style.body}>{item}</p>
    </div>
  );
}

export function EducationTimeline({
  cv,
  variant = "modern",
}: {
  cv: CvData;
  variant?: EducationVariant;
}) {
  const style = styles[variant];
  const structuredItems = cv.educations.filter(isFilledEducation);
  const legacyItems = structuredItems.length ? [] : lines(cv.education);

  if (structuredItems.length === 0 && legacyItems.length === 0) return null;

  return (
    <section className={style.section}>
      <h3 className={style.heading}>Education</h3>
      <div className={usesRail(variant) ? "space-y-1" : "space-y-3"}>
        {structuredItems.length > 0
          ? structuredItems.map((item, index) =>
              usesRail(variant) ? (
                <RailStructuredItem
                  isLast={index === structuredItems.length - 1}
                  item={item}
                  key={item.id}
                  variant={variant}
                />
              ) : (
                <FlatStructuredItem item={item} key={item.id} variant={variant} />
              ),
            )
          : legacyItems.map((item, index) =>
              usesRail(variant) ? (
                <RailLegacyItem
                  isLast={index === legacyItems.length - 1}
                  item={item}
                  key={index}
                  variant={variant}
                />
              ) : (
                <FlatLegacyItem item={item} key={index} variant={variant} />
              ),
            )}
      </div>
    </section>
  );
}
