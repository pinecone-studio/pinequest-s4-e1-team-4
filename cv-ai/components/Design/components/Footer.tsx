import {
  ArrowRight,
  BrainCircuit,
  FileText,
  Mail,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

type FooterProps = {
  isLightMode: boolean;
};

const footerLinks = [
  {
    title: "Навигац",
    links: [
      { label: "Танилцуулга", href: "#intro" },
      { label: "Яаж ажилладаг вэ?", href: "#how" },
      { label: "Хэрэгслүүд", href: "#tools" },
    ],
  },
  {
    title: "Хэрэгсэл",
    links: [
      { label: "Resume builder", href: "/cv" },
      { label: "Interview дасгал", href: "#tools" },
      { label: "AI зөвлөмж", href: "#intro" },
    ],
  },
  {
    title: "Тусламж",
    links: [
      { label: "CV оношилгоо", href: "/cv" },
      { label: "Ярилцлагын бэлтгэл", href: "#tools" },
      { label: "Санал хүсэлт", href: "mailto:hello@interview-ai.mn" },
    ],
  },
];

export function Footer({ isLightMode }: FooterProps) {
  const textPrimary = isLightMode ? "text-[#08111f]" : "text-white";
  const textMuted = isLightMode ? "text-[#526b82]" : "text-[#9db7d3]";
  const panelClass = isLightMode ? "footer-glass-light" : "footer-glass-dark";
  const iconBoxClass = isLightMode
    ? "border-[#bae6fd] bg-white text-[#0284c7]"
    : "border-[#25527f] bg-[#081525] text-[#7dd3fc]";
  const subtleBorder = isLightMode ? "border-[#dbeafe]" : "border-[#173757]";

  return (
    <footer
      id="footer"
      className={`relative border-t px-5 py-12 transition-colors duration-500 sm:px-8 sm:py-16 ${
        isLightMode
          ? "border-[#dbeafe] bg-white text-[#08111f]"
          : "border-[#0f2942] bg-[#07111f] text-white"
      }`}
    >
      <div
        className={`footer-glass mx-auto max-w-7xl rounded-[1.75rem] px-5 py-8 sm:px-8 sm:py-10 ${panelClass}`}
      >
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1.85fr]">
          <div className="max-w-xl">
            <Link href="#home" className="inline-flex items-center gap-3">
              <span
                className={`grid h-12 w-12 place-items-center rounded-xl border transition duration-300 hover:rotate-3 hover:scale-105 ${iconBoxClass}`}
              >
                <BrainCircuit className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className={`block text-lg font-bold ${textPrimary}`}>
                  Interview AI
                </span>
                <span className={`block text-sm font-medium ${textMuted}`}>
                  CV ба ярилцлагын туслах
                </span>
              </span>
            </Link>

            <p className={`mt-5 max-w-lg text-sm leading-7 ${textMuted}`}>
              Resume-гээ ойлгомжтой болгож, ярилцлагын асуултаар бэлтгэн,
              дараагийн алхмаа монголоор тодорхой харахад туслах AI платформ.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/cv"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0ea5e9] px-5 text-sm font-bold text-white shadow-[0_14px_35px_rgba(14,165,233,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0284c7]"
              >
                CV эхлүүлэх
                <ArrowRight
                  className="h-4 w-4 transition duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <a
                href="#tools"
                className={`inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-bold transition duration-300 hover:-translate-y-0.5 hover:border-[#38bdf8] ${
                  isLightMode
                    ? "border-[#bae6fd] bg-white/80 text-[#164766] hover:bg-[#e0f2fe]"
                    : "border-[#1f4f7a] bg-[#081525]/80 text-[#dcecff] hover:bg-[#0b1e33]"
                }`}
              >
                Хэрэгслүүд харах
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <p className={`text-sm font-bold ${textPrimary}`}>
                  {group.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className={`text-sm font-medium transition hover:text-[#38bdf8] ${textMuted}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div
          className={`mt-10 grid gap-4 border-t pt-6 md:grid-cols-[1fr_auto] md:items-center ${subtleBorder}`}
        >
          <div className={`flex flex-wrap items-center gap-4 text-sm ${textMuted}`}>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" />
              Хувийн мэдээллийг хүндэтгэнэ
            </span>
            <a
              href="mailto:hello@interview-ai.mn"
              className="inline-flex items-center gap-2 transition hover:text-[#38bdf8]"
            >
              <Mail className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" />
              hello@interview-ai.mn
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/cv"
              aria-label="Resume builder"
              className={`grid h-10 w-10 place-items-center rounded-full border transition duration-300 hover:-translate-y-0.5 hover:border-[#38bdf8] ${iconBoxClass}`}
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="#tools"
              aria-label="Interview дасгал"
              className={`grid h-10 w-10 place-items-center rounded-full border transition duration-300 hover:-translate-y-0.5 hover:border-[#38bdf8] ${iconBoxClass}`}
            >
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div
          className={`mt-6 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between ${textMuted}`}
        >
          <p>© 2026 Interview AI. Бүх эрх хуулиар хамгаалагдсан.</p>
          <p>Монгол хэл дээрх CV ба ярилцлагын бэлтгэл.</p>
        </div>
      </div>
    </footer>
  );
}
