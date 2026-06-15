import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import {
  Home,
  KeyRound,
  PawPrint,
  Gem,
  Sparkles,
  CalendarX,
  CalendarClock,
  CreditCard,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const sections = [
  {
    icon: Home,
    title: "Preparing Your Home",
    body: "A quick tidy before our arrival helps us focus on the deep cleaning that matters. Please pick up loose items from floors, surfaces, and beds so our team can reach every corner efficiently.",
  },
  {
    icon: KeyRound,
    title: "Access to Your Home",
    body: "You can be home to greet us, share a lockbox code, leave a key with the doorman, or grant smart-lock access. Whatever works for you, your method stays securely on file and is only shared with the assigned team.",
  },
  {
    icon: PawPrint,
    title: "Pets",
    body: "We love pets and use pet-safe products. To keep your companions calm and our team focused, please let us know about any pets in advance and secure anxious or reactive animals in a separate room during the visit.",
  },
  {
    icon: Gem,
    title: "Fragile & Valuable Items",
    body: "Please point out heirlooms, electronics, and delicate decor before we begin, or store them safely away. We treat every home with care, but advance notice helps us protect what matters most to you.",
  },
  {
    icon: Sparkles,
    title: "Service Expectations",
    body: "Each visit follows a detailed checklist tailored to your service type. If a specific area needs extra attention, tell us at the start and we will prioritize it. Our 24-hour satisfaction guarantee means we make it right if anything is missed.",
  },
  {
    icon: CalendarX,
    title: "Cancellations",
    body: "Plans change, we understand. We kindly ask for at least 24 hours notice for cancellations so we can offer the slot to another family. Late cancellations may be subject to a small fee.",
  },
  {
    icon: CalendarClock,
    title: "Rescheduling",
    body: "Need to move your appointment? Reach out by phone, WhatsApp, or email and we will find a new time that fits your week. Recurring clients always receive priority on rescheduled visits.",
  },
  {
    icon: CreditCard,
    title: "Payment Methods",
    body: "We accept all major credit cards, Zelle, Venmo, and check. Payment is processed on the day of service. For recurring clients, we can keep a card securely on file for a seamless experience.",
  },
  {
    icon: MessageSquare,
    title: "Communicating With the Team",
    body: "Our preferred channel is WhatsApp for the fastest response, but you can also call or email anytime during business hours. Feedback, requests, and special notes go directly to your account so every visit improves.",
  },
];

export default function CustomerGuidelines() {
  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--cna-cream))" }}>
      <SeoHead
        slug="/customer-guidelines"
        fallbackTitle="Customer Guidelines | CNA MAIDPRO Boston"
      />
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-10 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
          style={{ background: "hsl(var(--cna-sage))", transform: "translate(30%, -20%)" }}
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.p
            className="section-label mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            For Our Clients
          </motion.p>
          <motion.h1
            className="heading-display mb-6"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            Customer{" "}
            <em
              className="italic font-normal"
              style={{ color: "hsl(var(--cna-sage-dark))" }}
            >
              Guidelines.
            </em>
          </motion.h1>
          <motion.p
            className="text-lg leading-relaxed max-w-2xl"
            style={{ color: "hsl(var(--cna-gray-mid))" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            A short, transparent guide that helps every visit feel calm, predictable
            and professional, from the moment we arrive to the second we hand your home back to you.
          </motion.p>
        </div>
      </section>

      {/* Guideline cards */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 lg:gap-8">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                className="p-8 md:p-10 rounded-3xl bg-white border"
                style={{ borderColor: "hsl(var(--cna-gray))" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "hsl(var(--cna-sage-pale))" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "hsl(var(--cna-sage-dark))" }} />
                </div>
                <h3
                  className="heading-display text-xl mb-3"
                  style={{ color: "hsl(var(--cna-navy))" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "hsl(var(--cna-gray-mid))", fontFamily: "var(--font-body)" }}
                >
                  {s.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 pb-24">
        <motion.div
          className="max-w-4xl mx-auto rounded-[2.5rem] p-10 md:p-16 text-center"
          style={{ background: "hsl(var(--cna-sage-pale))" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <h2
            className="heading-display mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
          >
            Questions? We're here.
          </h2>
          <p
            className="mb-8 text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "hsl(var(--cna-gray-mid))" }}
          >
            Reach out anytime, our team responds within business hours.
          </p>
          <Link to="/contact" className="btn-sage inline-flex items-center gap-2">
            Contact our team
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
