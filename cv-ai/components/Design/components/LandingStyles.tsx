import { landingBackgroundStyles } from "./landing-styles/background";
import { landingKeyframesStyles } from "./landing-styles/keyframes";
import { landingMotionStyles } from "./landing-styles/motion";
import { landingResponsiveStyles } from "./landing-styles/responsive";

const landingStyles = [
  landingBackgroundStyles,
  landingMotionStyles,
  landingKeyframesStyles,
  landingResponsiveStyles,
].join("\n");

export function LandingStyles() {
  return <style jsx global>{landingStyles}</style>;
}
