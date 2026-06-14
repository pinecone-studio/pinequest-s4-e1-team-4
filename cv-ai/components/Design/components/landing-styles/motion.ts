export const landingMotionStyles = String.raw`
  .stagger-actions > * {
    animation: actionPop 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .stagger-actions > *:nth-child(2) {
    animation-delay: 0.1s;
  }

  .dashboard-card::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    opacity: 0;
    transform: translateX(-120%);
    transition: opacity 0.25s ease;
  }

  .dashboard-card:hover::after {
    opacity: 0.65;
    transform: translateX(0);
  }

  .dashboard-card-active::after {
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.32),
      transparent
    );
  }

  .metric-count {
    animation: metricPop 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .icon-pop {
    animation: iconSettle 0.7s ease both;
  }

  .checklist-item {
    animation: checklistRise 0.65s ease both;
  }

  .welcome-pop {
    animation: welcomePop 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .welcome-ring {
    opacity: 0.45;
  }

  .welcome-chip {
    animation: fadeUp 0.7s ease-out both;
  }

  .bot-breathe {
    animation: botSettle 0.75s ease both;
  }

  .float-slow {
    animation: fadeUp 0.75s ease both;
  }

  .float-slow-reverse {
    animation: fadeUp 0.75s 0.12s ease both;
  }

  .bounce-soft {
    animation: bounceSoft 1.6s ease-in-out infinite;
  }

  .progress-glow {
    box-shadow: 0 0 18px rgba(56, 189, 248, 0.24);
  }

  .reveal {
    animation: fadeBlurUp linear both;
    animation-timeline: view();
    animation-range: entry 8% cover 34%;
  }

  .scroll-fade-left {
    animation: slideBlurLeft linear both;
    animation-timeline: view();
    animation-range: entry 8% cover 38%;
  }

  .scroll-fade-right {
    animation: slideBlurRight linear both;
    animation-timeline: view();
    animation-range: entry 8% cover 38%;
  }

  .hero-kicker {
    animation: fadeBlurUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .hero-title {
    animation: fadeBlurUp 0.9s 0.08s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .hero-copy {
    animation: fadeBlurUp 0.9s 0.16s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .hero-panel {
    animation: heroPanelIn 0.95s 0.14s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .job-icon-cluster {
    z-index: 3;
  }

  .job-icon-mobile {
    position: relative;
    z-index: 1;
  }

  .job-icon-tile {
    position: absolute;
    display: flex;
    min-height: 4.35rem;
    min-width: 5.55rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    border-radius: 1.15rem;
    border: 1px solid rgba(125, 211, 252, 0.25);
    padding: 0.68rem 0.62rem;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0;
    backdrop-filter: blur(18px);
    box-shadow: 0 18px 45px rgba(8, 15, 30, 0.18);
    animation: jobTileDrift 4.1s ease-in-out infinite;
  }

  .job-icon-tile-inline {
    position: relative;
    min-height: 3.7rem;
    min-width: 5rem;
    animation-duration: 4.6s;
  }

  .job-icon-tile-light {
    background: rgba(255, 255, 255, 0.84);
    color: #0f3d5a;
  }

  .job-icon-tile-dark {
    background: rgba(8, 21, 37, 0.74);
    color: #d8f1ff;
  }

  .job-icon-tile span {
    line-height: 1.2;
    text-align: center;
    text-wrap: balance;
  }

  .job-icon-tile-1 {
    left: -5.25rem;
    top: 4%;
    animation-delay: 0s;
  }

  .job-icon-tile-2 {
    left: -4rem;
    top: 24%;
    animation-delay: 0.5s;
  }

  .job-icon-tile-3 {
    left: -3.5rem;
    top: 44%;
    animation-delay: 1s;
  }

  .job-icon-tile-4 {
    left: -2.25rem;
    bottom: 10%;
    animation-delay: 0.3s;
  }

  .job-icon-tile-5 {
    right: 3.5rem;
    top: 8%;
    animation-delay: 0.9s;
  }

  .job-icon-tile-6 {
    right: -1.25rem;
    top: 28%;
    animation-delay: 1.3s;
  }

  .job-icon-tile-7 {
    right: 1.5rem;
    top: 47%;
    animation-delay: 0.7s;
  }

  .job-icon-tile-8 {
    right: -2.5rem;
    bottom: 18%;
    animation-delay: 1.6s;
  }

  .job-icon-tile-9 {
    right: 0.75rem;
    bottom: 2%;
    animation-delay: 0.2s;
  }

  .job-icon-tile-10 {
    right: -3rem;
    top: 56%;
    animation-delay: 1.1s;
  }

  .job-icon-tile-11 {
    right: -1.5rem;
    bottom: 16%;
    animation-delay: 0.8s;
  }

  .job-icon-tile-12 {
    right: -3.5rem;
    bottom: 1%;
    animation-delay: 1.9s;
  }

  .surface-hover {
    transition:
      transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 0.35s ease,
      border-color 0.35s ease,
      background-color 0.35s ease;
  }

  .surface-hover:hover {
    transform: translateY(-6px);
  }

  .dashboard-card {
    transition:
      transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
      background-color 0.35s ease;
  }
`;
