export const landingBackgroundStyles = String.raw`
  .welcome-paper {
    background-size:
      140px 140px,
      22px 22px,
      auto;
  }

  .welcome-paper-light {
    background:
      radial-gradient(circle at 24% 18%, rgba(14, 165, 233, 0.08), transparent 28%),
      linear-gradient(90deg, rgba(8, 17, 31, 0.035) 1px, transparent 1px),
      linear-gradient(180deg, #f8fbff 0%, #eef7ff 100%);
  }

  .welcome-paper-dark {
    background:
      radial-gradient(circle at 22% 20%, rgba(56, 189, 248, 0.1), transparent 30%),
      linear-gradient(90deg, rgba(125, 211, 252, 0.045) 1px, transparent 1px),
      linear-gradient(180deg, #07111f 0%, #020617 100%);
  }

  .welcome-paper::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
    background-size: 28px 28px;
    mask-image: linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent);
    pointer-events: none;
  }

  .welcome-note {
    isolation: isolate;
  }

  .welcome-note::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: calc(1.75rem - 1px);
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 45%),
      repeating-linear-gradient(
        -8deg,
        transparent 0 16px,
        rgba(56, 189, 248, 0.035) 16px 17px,
        transparent 17px 34px
      );
    pointer-events: none;
    z-index: -1;
  }

  .welcome-note-rule {
    position: absolute;
    left: 2rem;
    right: 2rem;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.28), transparent);
    opacity: 0.65;
  }

  .welcome-pencil-line {
    position: absolute;
    height: 5.8rem;
    width: 12rem;
    border-top: 2px solid rgba(56, 189, 248, 0.24);
    border-radius: 999px;
    transform: rotate(-12deg);
    opacity: 0.75;
  }

  .welcome-pencil-line::after {
    content: "";
    position: absolute;
    left: 18%;
    top: -0.65rem;
    height: 2px;
    width: 54%;
    border-radius: 999px;
    background: rgba(56, 189, 248, 0.16);
    transform: rotate(3deg);
  }

  .welcome-corner-mark {
    position: absolute;
    height: 4.25rem;
    width: 4.25rem;
    border-left: 2px solid rgba(56, 189, 248, 0.22);
    border-top: 2px solid rgba(56, 189, 248, 0.22);
    border-radius: 1.2rem 0 0 0;
    opacity: 0.7;
  }

  .welcome-mesh {
    background:
      linear-gradient(120deg, rgba(56, 189, 248, 0.2), transparent 34%),
      linear-gradient(300deg, rgba(186, 230, 253, 0.44), transparent 38%),
      linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0 1px, transparent 1px 18px);
    animation: meshFloat 22s ease-in-out infinite alternate;
  }

  .hero-grid {
    background-image:
      linear-gradient(rgba(56, 189, 248, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(56, 189, 248, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
    animation: gridShift 26s linear infinite;
  }

  .scan-line {
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(56, 189, 248, 0.08),
      transparent
    );
    animation: lineBreathe 8s ease-in-out infinite;
  }

  .hero-aurora {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(56, 189, 248, 0.08),
      rgba(37, 99, 235, 0.12),
      rgba(125, 211, 252, 0.08),
      transparent
    );
    filter: blur(38px);
    transform: skewY(-6deg);
    opacity: 0.55;
    animation: auroraDrift 16s cubic-bezier(0.37, 0, 0.21, 1) infinite alternate;
    pointer-events: none;
  }

  .intro-gradient {
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(18px);
  }

  .intro-gradient-dark {
    border: 1px solid rgba(31, 79, 122, 0.78);
    background:
      linear-gradient(135deg, rgba(8, 21, 37, 0.92), rgba(3, 7, 18, 0.72)),
      linear-gradient(120deg, rgba(56, 189, 248, 0.18), rgba(37, 99, 235, 0.16), transparent 68%);
    box-shadow: 0 24px 80px rgba(2, 6, 23, 0.35);
  }

  .intro-gradient-light {
    border: 1px solid rgba(186, 230, 253, 0.78);
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(239, 248, 255, 0.72)),
      linear-gradient(120deg, rgba(56, 189, 248, 0.22), rgba(147, 197, 253, 0.18), transparent 68%);
    box-shadow: 0 24px 80px rgba(14, 165, 233, 0.13);
  }

  .intro-gradient::before {
    content: "";
    position: absolute;
    inset: auto -12% -28% auto;
    height: 18rem;
    width: 18rem;
    border-radius: 9999px;
    background: radial-gradient(
      circle,
      rgba(125, 211, 252, 0.2) 0%,
      rgba(56, 189, 248, 0.08) 38%,
      transparent 72%
    );
    pointer-events: none;
    filter: blur(8px);
  }

  .intro-gradient::after {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: calc(2rem - 1px);
    pointer-events: none;
  }

  .intro-gradient-dark::after {
    background: linear-gradient(135deg, rgba(8, 21, 37, 0.72), rgba(3, 7, 18, 0.58));
  }

  .intro-gradient-light::after {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.82), rgba(240, 249, 255, 0.66));
  }

  .intro-gradient > * {
    position: relative;
    z-index: 1;
  }

  .dashboard-shell {
    position: relative;
    animation: floatCard 14s ease-in-out infinite;
  }

  .dashboard-shell::before,
  .modern-card::before,
  .tool-card::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: linear-gradient(
      145deg,
      rgba(125, 211, 252, 0.08),
      rgba(56, 189, 248, 0.28),
      rgba(96, 165, 250, 0.06)
    );
    opacity: 0;
    pointer-events: none;
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: exclude;
    padding: 1px;
  }

  .dashboard-shell::before {
    opacity: 0.6;
  }

  .modern-card,
  .tool-card,
  .dashboard-card {
    position: relative;
    overflow: hidden;
    transform-style: preserve-3d;
  }

  .modern-card::before,
  .tool-card::before {
    transition:
      opacity 0.35s ease,
      transform 0.35s ease;
    transform: scale(0.98);
  }

  .modern-card:hover::before,
  .tool-card:hover::before {
    opacity: 0.72;
    transform: scale(1);
  }

  .panel-sheen {
    background: radial-gradient(
      circle at top right,
      rgba(125, 211, 252, 0.14),
      transparent 42%
    );
    pointer-events: none;
    animation: sheenDrift 10s ease-in-out infinite alternate;
  }

  .footer-glass {
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }

  .footer-glass::before {
    content: "";
    position: absolute;
    inset: -20% auto auto -10%;
    height: 10rem;
    width: 18rem;
    background: radial-gradient(
      circle,
      rgba(56, 189, 248, 0.12) 0%,
      rgba(56, 189, 248, 0.04) 38%,
      transparent 72%
    );
    pointer-events: none;
    opacity: 0.95;
  }

  .footer-glass::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
  }

  .footer-glass-light {
    border: 1px solid rgba(125, 211, 252, 0.95);
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.97), rgba(241, 249, 255, 0.92)),
      linear-gradient(120deg, rgba(56, 189, 248, 0.14), transparent 70%);
    box-shadow:
      0 24px 60px rgba(14, 165, 233, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.82);
  }

  .footer-glass-light::after {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.18),
      rgba(255, 255, 255, 0.04)
    );
  }

  .footer-glass-dark {
    border: 1px solid rgba(56, 189, 248, 0.42);
    background:
      linear-gradient(135deg, rgb(12, 30, 52), rgb(8, 20, 37)),
      linear-gradient(120deg, rgba(56, 189, 248, 0.18), transparent 72%);
    box-shadow:
      0 0 0 1px rgba(56, 189, 248, 0.08),
      0 30px 72px rgba(2, 6, 23, 0.5),
      inset 0 1px 0 rgba(125, 211, 252, 0.14);
  }

  .footer-glass-dark::after {
    background: linear-gradient(
      135deg,
      rgba(125, 211, 252, 0.1),
      rgba(15, 23, 42, 0.04)
    );
  }

  .footer-glass > * {
    position: relative;
    z-index: 1;
  }

  .pulse-dot {
    box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.16);
  }

  .kinetic-title {
    background-size: 220% 100%;
    background-clip: text;
    color: transparent;
    animation: titleShift 12s ease-in-out infinite;
  }

  .kinetic-title-light {
    background: linear-gradient(
      100deg,
      #08111f 0%,
      #164766 34%,
      #0284c7 50%,
      #08111f 68%,
      #08111f 100%
    );
  }

  .kinetic-title-dark {
    background: linear-gradient(
      100deg,
      #ffffff 0%,
      #dcecff 34%,
      #7dd3fc 50%,
      #ffffff 68%,
      #ffffff 100%
    );
  }
`;
