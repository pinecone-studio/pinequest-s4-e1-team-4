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

  useEffect(() => {
    const timer = window.setTimeout(() => setShowWelcome(false), 2600);

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
    <main className="min-h-screen scroll-smooth bg-[#f7f8f3] text-[#182019]">
      <div
        className="fixed left-0 top-0 z-40 h-1 w-full origin-left bg-[#d7ff63] shadow-[0_0_22px_rgba(215,255,99,0.65)] transition-transform duration-150"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <WelcomeOverlay showWelcome={showWelcome} />
      <HeroSection heroOffset={heroOffset} />
      <BenefitsSection />
      <ToolsSection />
      <Footer />
      <LandingStyles />
    </main>
  );
}
