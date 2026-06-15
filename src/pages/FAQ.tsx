import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import SeoHead from "@/components/SeoHead";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, HelpCircle, ArrowRight } from "lucide-react";

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
      "Clients are kindly asked to provide paper towels and trash bags. All other cleaning supplies and equipment are provided by CNA MAIDPRO. If you prefer the use of a specific product in your home, we are happy to accommodate as long as the product is provided upon arrival.",
  },
  {
    question: "Do you clean homes with pets?",
    answer:
      "We are happy to work in pet-friendly homes. For the safety of both pets and our team, we recommend securing anxious or reactive animals during the cleaning visit. For health and safety reasons, our team does not remove or clean pet or human urine, feces, vomit, or other biohazard materials.",
  },
  {
    question: "Do you take photos or videos during the service?",
    answer:
      "To document cleaning results and maintain service quality, CNA MAIDPRO may occasionally take before and after photos or videos for internal or marketing purposes. No personal or identifying information will ever be shared. Content will focus exclusively on the cleaning results. If you prefer not to allow photos or videos, simply let our team know in advance.",
  },
  {
    question: "How is my cleaning team assigned?",
    answer:
      "Team members may occasionally vary based on scheduling and availability. All CNA MAIDPRO professionals follow the same training and quality standards to ensure a consistent experience at every visit.",
  },
  {
    question: "How should I prepare my home before the visit?",
    answer:
      "To allow our team to focus entirely on the cleaning itself, we kindly ask that excessive clutter, clothing, toys, and personal items are picked up prior to arrival. Organization and decluttering services are not included.",
  },
  {
    question: "What are your scheduling hours?",
    answer:
      "Administrative support is available Monday to Friday from 9:00 AM to 5:00 PM. Cleaning appointments are scheduled based on route availability and service type.",
  },
  {
    question: "Do your cleaners use tall ladders?",
    answer:
      "For safety and insurance compliance, our team is only permitted to use 2 step ladders/stools while performing cleaning services.",
  },
  {
    question: "Do you have a referral program?",
    answer:
      "Yes! As a thank you, clients receive a $50 service credit when a referred client starts recurring cleaning services with CNA MAIDPRO. There is no limit to referrals.",
  },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/faq" fallbackTitle="Frequently Asked Questions | CNA MAIDPRO" />
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-10 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "hsl(var(--primary))" }} />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label text-accent mb-4">Support & Guidance</motion.p>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
                className="heading-display text-primary mb-6" 
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
                Common <span className="text-secondary-blue italic">Questions.</span>
            </motion.h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                Everything you need to know about our premium cleaning standards, policies, and how we care for your home.
            </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="w-full pb-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="rounded-[2rem] border border-border/60 bg-white px-8 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <AccordionTrigger className="text-base md:text-lg font-bold text-primary hover:no-underline py-6 text-left" style={{ fontFamily: "var(--font-heading)" }}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          {/* Still Have Questions? */}
          <motion.div
            className="mt-20 p-10 md:p-14 rounded-[3rem] text-center bg-secondary/50 border border-border/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mx-auto mb-8">
               <HelpCircle className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-heading)" }}>Still have questions?</h3>
            <p className="text-muted-foreground mb-10 max-w-md mx-auto italic">
               "We're here to help you find the perfect cleaning plan for your family's needs."
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               <a href="/contact" className="btn-primary">Message Us</a>
               <a href="tel:9782357033" className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-primary hover:bg-secondary transition-all">
                  <Phone className="w-4 h-4" /> 978.235.7033
               </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-24 px-6 md:px-10">
        <motion.div
          className="max-w-5xl mx-auto rounded-[3.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl"
          style={{ background: "var(--gradient-blue)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10">
            <h2 className="heading-display mb-8" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
               Ready for a <br />
               <em className="italic" style={{ color: "hsl(var(--accent-light))" }}>MaidPro clean?</em>
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="/quote" className="btn-primary bg-white text-primary hover:bg-white/95 px-12">Get Free Estimate <ArrowRight className="w-4 h-4 ml-2" /></a>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
      <FloatingCallButton />
    </div>
  );
}
