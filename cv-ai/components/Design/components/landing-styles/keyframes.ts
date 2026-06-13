export const landingKeyframesStyles = String.raw`
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

  @keyframes auroraDrift {
    from {
      opacity: 0.35;
      transform: translate3d(-4%, 0, 0) skewY(-6deg) scale(0.96);
    }
    to {
      opacity: 0.6;
      transform: translate3d(5%, -2%, 0) skewY(-6deg) scale(1.03);
    }
  }

  @keyframes meshFloat {
    from {
      transform: translate3d(0, 0, 0) scale(1);
    }
    to {
      transform: translate3d(1.5%, -2%, 0) scale(1.04);
    }
  }

  @keyframes gridShift {
    from {
      background-position: 0 0, 0 0;
    }
    to {
      background-position: 38px 38px, 38px 38px;
    }
  }

  @keyframes lineBreathe {
    0%,
    100% {
      opacity: 0.28;
      transform: scaleX(0.92);
    }
    50% {
      opacity: 0.62;
      transform: scaleX(1);
    }
  }

  @keyframes actionPop {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes botSettle {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
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

  @keyframes fadeBlurUp {
    from {
      opacity: 0;
      filter: blur(10px);
      transform: translateY(28px) scale(0.985);
    }
    to {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0) scale(1);
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

  @keyframes slideBlurLeft {
    from {
      opacity: 0;
      filter: blur(10px);
      transform: translateX(-52px) scale(0.985);
    }
    to {
      opacity: 1;
      filter: blur(0);
      transform: translateX(0) scale(1);
    }
  }

  @keyframes slideBlurRight {
    from {
      opacity: 0;
      filter: blur(10px);
      transform: translateX(52px) scale(0.985);
    }
    to {
      opacity: 1;
      filter: blur(0);
      transform: translateX(0) scale(1);
    }
  }

  @keyframes heroPanelIn {
    from {
      opacity: 0;
      filter: blur(12px);
      transform: translateY(36px) scale(0.97) rotateX(6deg);
    }
    to {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0) scale(1) rotateX(0deg);
    }
  }

  @keyframes floatCard {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  @keyframes jobTileDrift {
    0%,
    100% {
      transform: translate3d(0, 0, 0) rotate(0deg);
    }
    25% {
      transform: translate3d(0, -8px, 0) rotate(-3deg);
    }
    50% {
      transform: translate3d(4px, -14px, 0) rotate(2deg);
    }
    75% {
      transform: translate3d(-3px, -7px, 0) rotate(-1deg);
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

  @keyframes cardSweep {
    to {
      transform: translateX(120%);
    }
  }

  @keyframes metricPop {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.92);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes sheenDrift {
    from {
      transform: translate3d(-2%, 0, 0) scale(0.98);
      opacity: 0.5;
    }
    to {
      transform: translate3d(2%, -3%, 0) scale(1.04);
      opacity: 0.9;
    }
  }

  @keyframes titleShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes iconSettle {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes checklistRise {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
