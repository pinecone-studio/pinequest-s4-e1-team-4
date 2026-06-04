import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import InterviewForm from "@/components/InterviewForm";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f9f9ff] text-[#141b2b]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <InterviewForm />
      <CTA />
      <Footer />
    </main>
  );
}
