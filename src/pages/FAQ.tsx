import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone } from "lucide-react";
import faqBanner from "@/assets/faq-banner.jpg";

const faqs = [
  {
    question: "What is your payment and cancellation policy?",
    answer:
      "An invoice with payment instructions will be sent immediately after the cleaning service is completed, and payment is due on the same day of service. Appointments may be rescheduled or canceled with at least 48 hours notice at no charge. Changes made within 48 hours of the scheduled appointment may be subject to a cancellation fee, and same-day cancellations may be charged the full service amount.",
  },
  {
    question: "What is your satisfaction guarantee?",
    answer:
      "If there is anything that does not meet your expectations, please notify us within 24 hours. Our team will gladly return to address the area at no additional cost.",
  },
  {
    question: "How does the arrival window work?",
    answer:
      "Appointments operate within an arrival window to allow for route and traffic adjustments. Clients will receive updates with the estimated arrival time when needed.",
  },
  {
    question: "Do I need to provide any supplies?",
    answer:
      "Clients are kindly asked to provide paper towels and trash bags. All other cleaning supplies and equipment are provided by WeHome Cleaning. If you prefer the use of a specific product in your home, we are happy to accommodate as long as the product is provided upon arrival.",
  },
  {
    question: "Do you clean homes with pets?",
    answer:
      "We are happy to work in pet-friendly homes. For the safety of both pets and our team, we recommend securing anxious or reactive animals during the cleaning visit. For health and safety reasons, our team does not remove or clean pet or human urine, feces, vomit, or other biohazard materials.",
  },
  {
    question: "Do you take photos or videos during the service?",
    answer:
      "To document cleaning results and maintain service quality, WeHome Cleaning may occasionally take before and after photos or videos for internal or marketing purposes. No personal or identifying information will ever be shared, including faces, family photos, documents, addresses, or sensitive details. Content will focus exclusively on the cleaning results. If you prefer not to allow photos or videos during your service, simply let our team know in advance.",
  },
  {
    question: "How is my cleaning team assigned?",
    answer:
      "Team members may occasionally vary based on scheduling and availability. All WeHome Cleaning professionals follow the same training and quality standards to ensure a consistent experience at every visit.",
  },
  {
    question: "How should I prepare my home before the visit?",
    answer:
      "To allow our team to focus entirely on the cleaning itself, we kindly ask that excessive clutter, clothing, toys, and personal items are picked up prior to arrival. Organization and decluttering services are not included unless previously requested.",
  },
  {
    question: "What about closed rooms or restricted areas?",
    answer:
      "For privacy and security reasons, rooms, closets, or areas with closed doors at the time of service will be considered intentionally unavailable and will not be cleaned during the appointment.",
  },
  {
    question: "What are your scheduling hours?",
    answer:
      "Administrative support is available Monday–Friday from 9:00 AM to 5:00 PM. Cleaning appointments are scheduled based on route availability and service type. Weekend appointments are available upon request.",
  },
  {
    question: "Do your cleaners use tall ladders?",
    answer:
      "For safety and insurance compliance, our team is only permitted to use 2 step ladders/stools while performing cleaning services. We appreciate your understanding as we prioritize a safe and fully insured work environment.",
  },
  {
    question: "Do you have a referral program?",
    answer:
      "We truly appreciate referrals from our clients. As a thank you, clients receive a $50 service credit when a referred client starts recurring cleaning services with WeHome Cleaning. There is no limit to referrals, and credits may be applied toward future services.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/faq" fallbackTitle="FAQ, WeHome Cleaning" />
      <Header />

      {/* Hero Banner */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={faqBanner}
          alt="Clean modern home interior"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={640}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(30 10% 8% / 0.75) 0%, hsl(30 10% 12% / 0.6) 60%, hsl(30 10% 8% / 0.8) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5">
          <motion.span
            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-3"
            style={{ color: "hsl(var(--brand-pink))", fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.span>
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Got questions?{" "}
            <span style={{ color: "hsl(var(--brand-pink))" }}>We've got answers.</span>
          </motion.h1>
          <motion.p
            className="text-sm md:text-base mt-3 max-w-lg"
            style={{ color: "hsl(0 0% 80%)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Everything you need to know about our cleaning services.
          </motion.p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border/60 bg-card px-5 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <AccordionTrigger className="text-sm md:text-base font-semibold text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <motion.div
            className="mt-16 rounded-3xl overflow-hidden text-center"
            style={{ background: "var(--gradient-blue)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-8 md:p-16 flex flex-col items-center gap-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "hsl(var(--brand-pink))" }}>
                Still Have Questions?
              </span>
              <h3
                className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight max-w-lg"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Let's make your property shine.
              </h3>
              <p className="text-white/80 text-sm md:text-base max-w-md leading-relaxed">
                Request your personalized quote in minutes. Every service is tailored to your property.
              </p>
              <motion.a
                href="/quote"
                className="mt-2 inline-flex items-center gap-2 px-8 py-3 rounded-full text-[13px] font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                style={{ background: "hsl(var(--brand-pink))", color: "hsl(var(--primary))" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone className="w-4 h-4" />
                Get a Free Quote
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
