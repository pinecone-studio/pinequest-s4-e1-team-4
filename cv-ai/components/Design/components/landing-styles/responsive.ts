export const landingResponsiveStyles = String.raw`
  @media (max-width: 1279px) {
    .job-icon-tile-inline {
      font-size: 0.68rem;
      box-shadow: 0 14px 34px rgba(8, 15, 30, 0.14);
    }
  }

  @media (max-width: 767px) {
    .job-icon-tile-inline {
      min-height: 3.5rem;
      min-width: 3.5rem;
      gap: 0.35rem;
      border-radius: 1rem;
      padding: 0.55rem;
      font-size: 0.62rem;
    }

    .job-icon-tile-inline svg {
      height: 0.95rem;
      width: 0.95rem;
    }

    .surface-hover:hover {
      transform: translateY(-3px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .welcome-mesh,
    .hero-grid,
    .hero-aurora,
    .welcome-pop,
    .welcome-ring,
    .welcome-chip,
    .bot-breathe,
    .float-slow,
    .float-slow-reverse,
    .bounce-soft,
    .progress-glow,
    .scan-line,
    .intro-gradient::before,
    .dashboard-shell,
    .panel-sheen,
    .pulse-dot,
    .kinetic-title,
    .stagger-actions > *,
    .dashboard-card::after,
    .metric-count,
    .icon-pop,
    .hero-kicker,
    .hero-title,
    .hero-copy,
    .hero-panel,
    .job-icon-tile,
    .reveal,
    .scroll-fade-left,
    .scroll-fade-right {
      animation: none;
    }

    .kinetic-title-light {
      color: #08111f;
    }

    .kinetic-title-dark {
      color: #ffffff;
    }
  }
`;
