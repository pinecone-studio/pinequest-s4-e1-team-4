import { benefits } from "../data";

export function BenefitsSection() {
  return (
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
  );
}
