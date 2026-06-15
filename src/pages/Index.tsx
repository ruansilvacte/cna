import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import TrustBar from "@/components/TrustBar";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import EmotionalStorySection from "@/components/EmotionalStorySection";
import ServicesPreviewSection from "@/components/ServicesPreviewSection";
import FamilyValuesSection from "@/components/FamilyValuesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import HomepageQuoteForm from "@/components/HomepageQuoteForm";
import FinalCtaSection from "@/components/FinalCtaSection";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        slug="/"
        fallbackTitle="CNA MAIDPRO. Premium Home Cleaning Services in Massachusetts"
      />
      <Header />

      {/* Full-viewport cinematic hero */}
      <HeroBanner />

      {/* Scrolling trust bar */}
      <TrustBar />

      {/* Why Choose Us — value proposition */}
      <WhyChooseUsSection />

      {/* Emotional story — time, family, life */}
      <EmotionalStorySection />

      {/* Services preview — card grid */}
      <ServicesPreviewSection />

      {/* Family values — dark section */}
      <FamilyValuesSection />

      {/* Testimonials — social proof */}
      <TestimonialsSection />

      {/* Homepage quote form — lead capture */}
      <HomepageQuoteForm />

      {/* Final bold CTA */}
      <FinalCtaSection />

      <Footer />
      <FloatingSocial />
    </div>
  );
}
