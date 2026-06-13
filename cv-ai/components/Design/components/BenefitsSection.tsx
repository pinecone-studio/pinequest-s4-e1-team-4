import { benefitHighlights, benefits } from "../data";

type BenefitsSectionProps = {
  isLightMode: boolean;
};

export function BenefitsSection({ isLightMode }: BenefitsSectionProps) {
  return (
    <section
      id="how"
      className={`relative overflow-hidden py-16 transition-colors duration-500 sm:py-20 ${
        isLightMode ? "bg-white" : "bg-[#07111f]"
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-56 ${
          isLightMode
            ? "bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_68%)]"
            : "bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_70%)]"
        }`}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal relative z-10 mb-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
              Яаж туслах вэ?
            </p>
            <h2
              className={`mt-3 text-3xl font-semibold tracking-normal sm:text-5xl ${
                isLightMode ? "text-[#08111f]" : "text-white"
              }`}
            >
              CV ба ярилцлагын энгийн бэлтгэл.
            </h2>
            <p
              className={`mt-4 max-w-2xl text-base leading-7 sm:text-lg ${
                isLightMode ? "text-[#526b82]" : "text-[#9db7d3]"
              }`}
            >
              Хаанаас эхлэхээ мэдэхгүй үед эхлээд CV-гээ цэгцэлж, дараа нь
              ярилцлагын асуултуудаар өөрийгөө тайван бэлдэх энгийн урсгал.
            </p>
          </div>
       
        </div>

        <div className="reveal relative z-10 mb-10 grid gap-3 sm:grid-cols-3">
          {benefitHighlights.map((highlight) => (
            <div
              key={highlight.label}
              className={`rounded-2xl border px-4 py-4 ${
                isLightMode
                  ? "border-[#dbeafe] bg-[#f7fbff]"
                  : "border-[#173757] bg-[#0b1728]"
              }`}
            >
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0284c7]">
                {highlight.value}
              </p>
              <p
                className={`mt-2 text-sm leading-6 ${
                  isLightMode ? "text-[#526b82]" : "text-[#9db7d3]"
                }`}
              >
                {highlight.label}
              </p>
            </div>
          ))}
        </div>

        <div className="relative z-10 grid gap-4 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className={`modern-card reveal surface-hover group rounded-[1.75rem] border p-6 hover:border-[#38bdf8]/70 hover:shadow-[0_18px_45px_rgba(14,165,233,0.14)] ${
                isLightMode
                  ? "border-[#dbeafe] bg-[#f7fbff] hover:bg-[#eff8ff]"
                  : "border-[#173757] bg-[#0b1728] hover:bg-[#0d1d33]"
              }`}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#38bdf8]">
                  0{index + 1}
                </span>
                <div
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border transition duration-300 group-hover:-translate-y-0.5 ${
                    isLightMode
                      ? "border-[#bae6fd] bg-white text-[#0284c7]"
                      : "border-[#25527f] bg-[#081525] text-[#7dd3fc]"
                  }`}
                >
                  <benefit.icon
                    className="icon-pop h-6 w-6 transition duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <h3
                className={`text-xl font-semibold leading-8 ${
                  isLightMode ? "text-[#08111f]" : "text-white"
                }`}
              >
                {benefit.title}
              </h3>
              <p
                className={`mt-3 leading-7 ${
                  isLightMode ? "text-[#526b82]" : "text-[#9db7d3]"
                }`}
              >
                {benefit.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
