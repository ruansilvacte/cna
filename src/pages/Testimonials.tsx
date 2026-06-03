import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { ArrowRight, Star, Quote } from "lucide-react";

/* 10 unique editorial reviews, no overlap with home section */
const wallReviews = [
  {
    text: "I host on Airbnb full time. Switched to WeHome eight months ago and my Superhost status has never been more secure. Their consistency is what sells.",
    name: "Marina E.",
    place: "Sarasota, FL",
    service: "Short-Term Rental",
  },
  {
    text: "First service after we moved in, they cleaned cabinets I hadn't even opened yet. Found a hidden water stain behind the sink and flagged it before it spread.",
    name: "Caleb J.",
    place: "Parrish, FL",
    service: "Move-In Cleaning",
  },
  {
    text: "I'm picky. I notice everything. After four monthly visits I still have nothing to flag. That alone is worth the price.",
    name: "Diane O.",
    place: "Bradenton, FL",
    service: "Recurring Monthly",
  },
  {
    text: "Sent before/after photos and the team beat their own quote on quality. Refreshing to work with people who genuinely care about the craft.",
    name: "Wesley A.",
    place: "Lakewood Ranch",
    service: "Deep Cleaning",
  },
  {
    text: "Our office cleaning got an upgrade the day we hired them. Conference rooms ready before the first meeting, every Monday, without a single reminder.",
    name: "Lauren P.",
    place: "Tampa, FL",
    service: "Commercial",
  },
  {
    text: "They handle our short-term rental between every guest. I haven't logged in to fix a checklist in months. They just know what each unit needs.",
    name: "Rafael S.",
    place: "Anna Maria Island",
    service: "Airbnb Turnover",
  },
  {
    text: "Booked a deep clean for my mom's house before the holidays. She cried when she walked in. The team treated her place like their own grandmother's home.",
    name: "Sophia L.",
    place: "Ellenton, FL",
    service: "Deep Cleaning",
  },
  {
    text: "Post-renovation chaos: drywall dust everywhere, paint splatter on tile, fixtures cloudy. One visit and the house was magazine-ready. Unreal.",
    name: "Greg D.",
    place: "Palmetto, FL",
    service: "Post-Construction",
  },
  {
    text: "Moved out of a rental that had a tough landlord. Their move-out clean got us our full deposit back, no questions, no deductions. Receipts speak for themselves.",
    name: "Nadia F.",
    place: "Bradenton, FL",
    service: "Move-Out Cleaning",
  },
  {
    text: "Bi-weekly service for two years now. Same lead cleaner every visit, knows our routines, our pet, our preferences. That continuity is rare.",
    name: "James & Eliana W.",
    place: "Parrish, FL",
    service: "Recurring Bi-Weekly",
  },
];

function PinkStars({ delay = 0, size = "w-4 h-4" }: { delay?: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + i * 0.06, duration: 0.3, type: "spring", stiffness: 300 }}
        >
          <Star
            className={size}
            style={{ fill: "hsl(var(--brand-pink))", color: "hsl(var(--brand-pink))" }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/testimonials" fallbackTitle="Testimonials, WeHome Cleaning" />
      <Header />

      {/* HERO, minimal editorial */}
      <section className="relative pt-32 md:pt-40 pb-16 px-6 overflow-hidden" style={{ background: "hsl(var(--brand-blush))" }}>
        <div
          className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-40 pointer-events-none"
          style={{ background: "hsl(var(--brand-pink))" }}
        />
        <div className="relative max-w-7xl mx-auto grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <motion.span
              className="text-[0.7rem] font-bold uppercase tracking-[0.32em]"
              style={{ color: "hsl(var(--brand-pink))" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
             , Testimonials
            </motion.span>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.98] mt-5"
              style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--primary))" }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Stories from <em className="italic font-light" style={{ color: "hsl(var(--brand-pink))" }}>real homes</em><br />
              we've cared for.
            </motion.h1>
          </div>
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="rounded-[1.5rem] bg-white p-6 border border-border shadow-sm">
              <div className="flex items-baseline gap-3">
                <span
                  className="text-5xl font-bold tabular-nums"
                  style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--primary))" }}
                >
                  5.0
                </span>
                <PinkStars size="w-5 h-5" />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] mt-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                Average rating · 100+ verified reviews
              </p>
              <a
                href="https://share.google/ylu8IY0nGt63rCcYy"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-xs font-bold uppercase tracking-[0.2em] underline underline-offset-4"
                style={{ color: "hsl(var(--primary))" }}
              >
                Read on Google →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WALL, zigzag editorial blocks */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          {wallReviews.map((r, i) => {
            const variants = [
              { bg: "white", border: "hsl(var(--border))", color: "hsl(var(--primary))", isDark: false },
              { bg: "hsl(var(--brand-pink) / 0.12)", border: "hsl(var(--brand-pink) / 0.3)", color: "hsl(var(--primary))", isDark: false },
              { bg: "hsl(var(--primary))", border: "transparent", color: "white", isDark: true },
            ];
            const v = variants[i % 3];
            const align = i % 2 === 0 ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0";

            return (
              <motion.article
                key={i}
                className={`relative max-w-3xl ${align} rounded-[2rem] p-8 md:p-12 border`}
                style={{ background: v.bg, borderColor: v.border }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Quote
                  className="absolute -top-4 left-8 w-12 h-12"
                  style={{
                    color: v.isDark ? "hsl(var(--brand-pink))" : "hsl(var(--brand-pink))",
                    opacity: v.isDark ? 0.6 : 0.25,
                  }}
                />
                <div className="flex items-center justify-between mb-5">
                  <PinkStars delay={0.1} />
                  <span
                    className="text-[0.65rem] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full"
                    style={{
                      background: v.isDark ? "hsl(var(--brand-pink) / 0.2)" : "hsl(var(--primary) / 0.08)",
                      color: v.isDark ? "hsl(var(--brand-pink-soft))" : "hsl(var(--primary))",
                    }}
                  >
                    {r.service}
                  </span>
                </div>
                <p
                  className="text-xl md:text-2xl leading-snug font-light"
                  style={{ fontFamily: "var(--font-heading)", color: v.color }}
                >
                  "{r.text}"
                </p>
                <div
                  className="mt-8 pt-6 border-t flex items-baseline justify-between gap-4"
                  style={{ borderColor: v.isDark ? "rgba(255,255,255,0.15)" : "hsl(var(--border))" }}
                >
                  <p className="text-sm font-bold" style={{ color: v.color }}>
                   , {r.name}
                  </p>
                  <p
                    className="text-[0.7rem] uppercase tracking-[0.22em]"
                    style={{ color: v.isDark ? "rgba(255,255,255,0.6)" : "hsl(var(--muted-foreground))" }}
                  >
                    {r.place}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20" style={{ background: "hsl(var(--brand-blush))" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--primary))" }}
          >
            Your story could be <em className="italic font-light" style={{ color: "hsl(var(--brand-pink))" }}>next</em>.
          </h2>
          <p className="text-muted-foreground mt-5 mb-9 max-w-xl mx-auto">
            Get a personalized cleaning plan tailored to your home, rental, or workspace.
          </p>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 px-9 py-3.5 rounded-full text-sm font-semibold tracking-[0.15em] text-white transition-all hover:-translate-y-0.5"
            style={{ background: "hsl(var(--primary))", boxShadow: "var(--shadow-soft)" }}
          >
            REQUEST A FREE QUOTE <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
