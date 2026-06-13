"use client";
import { useEffect, useState } from "react";
import { BenefitsSection } from "./components/BenefitsSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { LandingStyles } from "./components/LandingStyles";
import { ToolsSection } from "./components/ToolsSection";
import { WelcomeOverlay } from "./components/WelcomeOverlay";
export default function InterviewAiLandingPage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroOffset, setHeroOffset] = useState(0);
  const [isLightMode, setIsLightMode] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setShowWelcome(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
      setHeroOffset(Math.min(scrollTop, 520));
      frame = 0;
    };
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScroll);
    };
    updateScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <main
      className={`min-h-screen scroll-smooth transition-colors duration-500 ${
        isLightMode ? "bg-[#f7fbff] text-[#08111f]" : "bg-[#07111f] text-[#eaf3ff]"
      }`}
    >
      <div
        className="fixed left-0 top-0 z-40 h-1 w-full origin-left bg-[#38bdf8] shadow-[0_0_24px_rgba(56,189,248,0.75)] transition-transform duration-150"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <WelcomeOverlay showWelcome={showWelcome} isLightMode={isLightMode} />
      <HeroSection
        heroOffset={heroOffset}
        isLightMode={isLightMode}
        onToggleTheme={() => setIsLightMode((current) => !current)}
      />
      <BenefitsSection isLightMode={isLightMode} />
      <ToolsSection isLightMode={isLightMode} />
      <Footer isLightMode={isLightMode} />
      <LandingStyles />
    </main>
  );
}
