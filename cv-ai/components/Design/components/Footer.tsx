
"use client";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, FileText, Mail, MessageSquareText, ShieldCheck } from "lucide-react";
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
      { label: "Resume Builder", href: "/cv" },
      { label: "Interview Дасгал", href: "#tools" },
    ],
  },
  {
    title: "Тусламж",
    links: [
      { label: "CV Оношилгоо", href: "/cv" },
      { label: "Ярилцлагын Бэлтгэл", href: "#tools" },
      { label: "Санал Хүсэлт", href: "mailto:hello@interview-ai.mn" },
    ],
  },
];

export function Footer({ isLightMode }: FooterProps) {
  const textPrimary = isLightMode ? "text-[#08111f]" : "text-white";
  const textMuted = isLightMode ? "text-[#526b82]" : "text-[#9db7d3]";
  const subtleBorder = isLightMode ? "border-gray-200/60" : "border-white/10";

  // Скролл хийх үед тодрох логик
  const [isIntersecting, setIsIntersecting] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Footer-ийн 10% нь дэлгэцэнд харагдаж эхэлмэгц blur-ийг арилгана
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      id="footer"
      ref={footerRef}
      className={`relative border-t transition-all duration-700 ease-out ${
        isIntersecting 
          ? "blur-none opacity-100 translate-y-0" 
          : "blur-md opacity-70 translate-y-4"
      } ${
        isLightMode
          ? "border-gray-100 bg-[#f8faff] text-[#08111f]"
          : "border-white/[0.03] bg-[#030712] text-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16">

        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <div className="flex flex-col items-start space-y-5">
            <Link href="#home" className="group flex items-center gap-2.5">
              <div>
                <span className={`block text-lg font-bold tracking-tight ${textPrimary}`}>
                  ЯрилцлагаAI
                </span>
                <span className={`block text-xs font-medium tracking-wide ${textMuted}`}>
                  CV БА ЯРИЛЦЛАГЫН ТУСЛАХ
                </span>
              </div>
            </Link>

            <p className={`text-sm leading-6 max-w-sm ${textMuted}`}>
              Resume-гээ ойлгомжтой болгож, ярилцлагын асуултаар бэлтгэн,
              дараагийн алхмаа монголоор тодорхой харахад туслах AI платформ.
            </p>

            <div className="pt-2">
              <Link
                href="/cv"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#0ea5e9] px-4.5 text-xs font-semibold text-white shadow-lg shadow-[#0ea5e9]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0284c7]"
              >
                Эхлүүлэх
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid gap-8 grid-cols-2 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-4">
                <p className={`text-xs font-bold uppercase tracking-wider ${isLightMode ? "text-[#0ea5e9]" : "text-[#38bdf8]"}`}>
                  {group.title}
                </p>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className={`text-sm transition-colors duration-200 hover:text-[#0ea5e9] ${textMuted}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-12 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between ${subtleBorder}`}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            
          </div>
          <div>
            <a
              href="mailto:hello@interview-ai.mn"
              className={`inline-flex items-center gap-2 text-xs font-semibold border-b pb-0.5 transition-colors hover:text-[#0ea5e9] ${isLightMode ? "border-gray-300" : "border-white/10"}`}
            >
             
            </a>
          </div>
        </div>

        <div className={`mt-6 flex flex-col gap-3 text-[11px] sm:flex-row sm:items-center sm:justify-between ${textMuted}`}>
          <p> {new Date().getFullYear()} ЯрилцлагаAI</p>
          <div className="flex items-center gap-1">

            <span>Монгол хэл дээрх ухаалаг карьер хөтөч</span>
          </div>
        </div>

      </div>
    </footer>
  );
}