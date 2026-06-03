import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import ServiceChecklistCards from "@/components/ServiceChecklistCards";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServicesBentoGrid from "@/components/ServicesBentoGrid";
import AboutCardsSection from "@/components/AboutCardsSection";
import WhyItMattersSection from "@/components/WhyItMattersSection";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";

export default function Example() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/" fallbackTitle="WeHome Cleaning, Premium Cleaning in Florida" />
      <Header />
      <HeroBanner />

      <ServiceChecklistCards />
      <AboutCardsSection />
      <WhyItMattersSection />
      <ServicesBentoGrid />

      <TestimonialsSection />

      <Footer />
      <FloatingSocial />
    </div>
  );
}
