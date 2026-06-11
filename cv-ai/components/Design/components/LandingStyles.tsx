export function LandingStyles() {
  return (
    <style jsx>{`
      .welcome-mesh {
        background:
          radial-gradient(circle at 20% 20%, rgba(215, 255, 99, 0.22), transparent 28%),
          radial-gradient(circle at 78% 70%, rgba(92, 196, 255, 0.16), transparent 30%),
          linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 18px);
        animation: meshDrift 5s ease-in-out infinite alternate;
      }

      .hero-grid {
        background-image:
          linear-gradient(rgba(24, 32, 25, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(24, 32, 25, 0.08) 1px, transparent 1px);
        background-size: 44px 44px;
        mask-image: linear-gradient(to bottom, black, transparent 70%);
      }

      .welcome-pop {
        animation: welcomePop 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
      }

      .welcome-ring {
        animation: ringPulse 2.3s ease-in-out infinite;
      }

      .welcome-chip {
        animation: fadeUp 0.7s ease-out both;
      }

      .bot-breathe {
        animation: botBreathe 1.6s ease-in-out infinite;
      }

      .float-slow {
        animation: floatSlow 4.2s ease-in-out infinite;
      }

      .float-slow-reverse {
        animation: floatSlow 4.6s ease-in-out infinite reverse;
      }

      .bounce-soft {
        animation: bounceSoft 1.6s ease-in-out infinite;
      }

      .progress-glow {
        animation: progressPulse 2s ease-in-out infinite;
      }

      .reveal {
        animation: fadeUp linear both;
        animation-timeline: view();
        animation-range: entry 0% cover 28%;
      }

      .scroll-fade-left {
        animation: slideFromLeft linear both;
        animation-timeline: view();
        animation-range: entry 0% cover 36%;
      }

      .scroll-fade-right {
        animation: slideFromRight linear both;
        animation-timeline: view();
        animation-range: entry 0% cover 36%;
      }

      @keyframes welcomeLoad {
        from {
          transform: scaleX(0);
        }
        to {
          transform: scaleX(1);
        }
      }

      @keyframes welcomePop {
        from {
          opacity: 0;
          transform: translateY(18px) scale(0.96);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes meshDrift {
        from {
          transform: translate3d(-1.5%, -1.5%, 0) scale(1);
        }
        to {
          transform: translate3d(1.5%, 1.5%, 0) scale(1.04);
        }
      }

      @keyframes ringPulse {
        0%,
        100% {
          opacity: 0.3;
          transform: translate(-50%, -50%) scale(0.82);
        }
        50% {
          opacity: 0.65;
          transform: translate(-50%, -50%) scale(1.18);
        }
      }

      @keyframes botBreathe {
        0%,
        100% {
          transform: translateY(0) scale(1);
        }
        50% {
          transform: translateY(-3px) scale(1.04);
        }
      }

      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translateY(26px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-14px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideFromLeft {
        from {
          opacity: 0;
          transform: translateX(-90px) scale(0.96);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }

      @keyframes slideFromRight {
        from {
          opacity: 0;
          transform: translateX(90px) scale(0.96);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }

      @keyframes floatSlow {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-12px);
        }
      }

      @keyframes bounceSoft {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(6px);
        }
      }

      @keyframes progressPulse {
        0%,
        100% {
          box-shadow: 0 0 0 rgba(215, 255, 99, 0);
        }
        50% {
          box-shadow: 0 0 22px rgba(215, 255, 99, 0.55);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .welcome-mesh,
        .welcome-pop,
        .welcome-ring,
        .welcome-chip,
        .bot-breathe,
        .float-slow,
        .float-slow-reverse,
        .bounce-soft,
        .progress-glow,
        .reveal,
        .scroll-fade-left,
        .scroll-fade-right {
          animation: none;
        }
      }
    `}</style>
  );
}
