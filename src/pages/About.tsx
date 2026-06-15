import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { ArrowRight, Phone, MapPin, BookOpen } from "lucide-react";
import aboutKitchen from "@/assets/about-kitchen.jpg.asset.json";
import aboutLiving from "@/assets/about-living.jpg.asset.json";
import aboutInterior from "@/assets/about-interior.jpg.asset.json";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--cna-cream))" }}>
      <SeoHead slug="/about" fallbackTitle="Our Family Story | CNA MAIDPRO. Boston Home Cleaning" />
      <Header />

      {/* Hero Section — editorial, full-width */}
      <section className="relative pt-40 pb-24 px-6 md:px-10 overflow-hidden">
        {/* Decorative BG shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.05]"
          style={{ background: "hsl(var(--cna-sage))", transform: "translate(35%, -20%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.04]"
          style={{ background: "hsl(var(--cna-navy))", transform: "translate(-30%, 30%)" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-4 h-4" style={{ color: "hsl(var(--cna-sage))" }} />
                  <span className="section-label">Boston, Massachusetts</span>
                </div>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
                className="heading-display mb-6"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)" }}
              >
                A small dream.{" "}
                <br />
                <em className="italic font-normal" style={{ color: "hsl(var(--cna-sage-dark))" }}>
                  A big heart.
                </em>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-lg leading-relaxed max-w-xl mb-8"
                style={{ color: "hsl(var(--cna-gray-mid))", fontFamily: "var(--font-body)" }}
              >
                CNA MAIDPRO is more than a cleaning service. It's the result of a family's dedication to making every Boston home a true sanctuary.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <Link
                  to="/customer-guidelines"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:gap-3"
                  style={{
                    background: "hsl(var(--cna-navy))",
                    color: "white",
                  }}
                >
                  <BookOpen className="w-4 h-4" />
                  Customer Guidelines
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* Right side stat line */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "10+", label: "Years serving Boston families" },
                  { value: "500+", label: "Homes cleaned with care" },
                  { value: "5.0", label: "Google rating, consistently" },
                  { value: "100%", label: "Vetted & insured team members" },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl p-5" style={{ background: i % 2 === 0 ? "hsl(var(--cna-sage-pale))" : "white", border: "1px solid hsl(var(--cna-gray))" }}>
                    <p className="font-bold mb-1" style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--cna-navy))", fontSize: "2rem" }}>
                      {stat.value}
                    </p>
                    <p className="text-xs leading-snug" style={{ color: "hsl(var(--cna-gray-mid))" }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE STORY — Cindi, Anderson, Nicolly */}
      <section className="py-24 px-6 md:px-10" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              {/* Large editorial image */}
              <div className="relative">
                <div className="rounded-[3rem] overflow-hidden shadow-[0_24px_80px_-20px_hsl(218_52%_22%/0.18)]" style={{ aspectRatio: "4/5" }}>
                  <img
                    src="" + aboutLiving.url + ""
                    alt="Cindi and the CNA MAIDPRO family team in Boston"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Quote overlay */}
                <div
                  className="absolute -bottom-8 -right-6 p-7 max-w-[240px] rounded-2xl shadow-xl"
                  style={{ background: "hsl(var(--cna-navy))" }}
                >
                  <p className="italic text-sm leading-relaxed mb-3" style={{ fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.92)" }}>
                    "We know how frustrating it is to hire and not receive what was promised."
                  </p>
                  <p className="text-[0.6rem] font-bold uppercase tracking-widest" style={{ color: "hsl(var(--cna-sage-light))" }}>
                    Cindi, Founder
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="section-label mb-5">Our Story</p>
              <h2
                className="heading-display mb-8"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                How it all{" "}
                <em className="italic font-normal" style={{ color: "hsl(var(--cna-sage-dark))" }}>
                  started.
                </em>
              </h2>

              <div className="space-y-6 text-lg leading-relaxed" style={{ color: "hsl(var(--cna-gray-mid))", fontFamily: "var(--font-body)" }}>
                <p>
                  CNA arose from a family dream. When we started, every member of our family was involved in a different area of the business.
                </p>
                <p>
                  I, <strong style={{ color: "hsl(var(--cna-navy))" }}>Cindi</strong>, personally cared for each home. My husband <strong style={{ color: "hsl(var(--cna-navy))" }}>Anderson</strong> and our daughter <strong style={{ color: "hsl(var(--cna-navy))" }}>Nicolly</strong> carefully managed marketing and operations.
                </p>
                <p>
                  That's how our name was born:{" "}
                  <strong style={{ color: "hsl(var(--cna-sage-dark))" }}>CNA</strong> represents our initials:{" "}
                  <em>Cindi, Nicolly, and Anderson.</em>
                  <span className="block text-sm mt-2 opacity-70">(A beautiful coincidence, but no relation to the nursing degree!)</span>
                </p>
                <p>
                  Today, we're proud to serve Boston families with over 7 years of specialized expertise and a team trained to exceed your highest expectations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT DRIVES US — integrated storytelling, NO generic Mission/Vision boxes */}
      <section className="py-24 px-6 md:px-10" style={{ background: "hsl(var(--cna-sage-pale))" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="section-label mb-4">What Drives Us</p>
            <h2 className="heading-display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              More than clean homes.
            </h2>
          </motion.div>

          {/* Alternating editorial value blocks */}
          <div className="space-y-0">
            {[
              {
                tag: "Quality of Time",
                headline: "We give you back what matters most.",
                body: "Our mission is rooted in a simple truth: the most valuable luxury isn't a clean home. It's the time you get to spend with the people you love. Every visit by CNA MAIDPRO is an investment in your family's quality of life. We handle the scrubbing so you can handle the living.",
                image: "" + aboutKitchen.url + "",
                imageAlt: "Bright Boston living room filled with natural light",
                reverse: false,
              },
              {
                tag: "Trust Earned Daily",
                headline: "We enter your home. That's sacred.",
                body: "We understand the weight of the trust you place in us. When you hand us your keys or let us into your space, you're trusting our team with your most personal environment. We honor that every single day through background checks, respect, communication, and consistency.",
                image: "" + aboutLiving.url + "",
                imageAlt: "Professional team caring for a Boston family home",
                reverse: true,
              },
              {
                tag: "Harmony in Every Visit",
                headline: "A clean home is so much more.",
                body: "We don't just deliver a clean house, we restore harmony. There's a feeling you get when you walk into a home that's been truly cared for. The air feels lighter. The space feels bigger. That specific calm is what we create for Boston families, visit after visit.",
                image: "" + aboutInterior.url + "",
                imageAlt: "Peaceful, welcoming home interior in Boston",
                reverse: false,
              },
            ].map((block, i) => (
              <motion.div
                key={i}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 ${i !== 2 ? "border-b" : ""}`}
                style={{ borderColor: "hsl(var(--cna-sage-light) / 0.30)" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
              >
                {/* Image */}
                <div className={block.reverse ? "lg:order-2" : ""}>
                  <div className="rounded-[2.5rem] overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img
                      src={block.image}
                      alt={block.imageAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className={block.reverse ? "lg:order-1" : ""}>
                  <span className="section-label block mb-4">{block.tag}</span>
                  <h3 className="heading-display mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
                    {block.headline}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "hsl(var(--cna-gray-mid))", fontFamily: "var(--font-body)" }}>
                    {block.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LONG-TERM RELATIONSHIPS — subtle dark section */}
      <section className="py-24 px-6 md:px-10" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "We respect your home.",
                text: "Your space is your sanctuary. We move with care, clean with intention, and leave no trace except the shine.",
              },
              {
                number: "02",
                title: "We build real relationships.",
                text: "We want to be the cleaning team you rely on year after year, not just a one-time service. Consistency creates trust.",
              },
              {
                number: "03",
                title: "We care about your family.",
                text: "Having children or pets? We ask. We adapt. We use products that are safe for everyone in your household.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-3xl border"
                style={{ borderColor: "hsl(var(--cna-gray))", background: i === 1 ? "hsl(var(--cna-sage-pale))" : "transparent" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease }}
              >
                <span className="font-bold text-4xl mb-6 block" style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--cna-sage) / 0.35)" }}>
                  {item.number}
                </span>
                <h4 className="heading-display text-xl mb-4">{item.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--cna-gray-mid))" }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 md:px-10" style={{ background: "hsl(var(--cna-sage-pale))" }}>
        <motion.div
          className="max-w-4xl mx-auto rounded-[3.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl"
          style={{ background: "var(--gradient-dark)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Sage glow */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(var(--cna-sage) / 0.15) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />

          <div className="relative z-10 flex flex-col items-center">
            <p className="section-label mb-6" style={{ color: "hsl(var(--cna-sage-light))" }}>Boston, Massachusetts</p>
            <h2 className="heading-display text-white mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Ready for your{" "}
              <em className="italic font-normal" style={{ color: "hsl(var(--cna-sage-light))" }}>quality time?</em>
            </h2>
            <p className="text-white/70 max-w-lg mx-auto mb-10 leading-relaxed">
              Let us take cleaning off your plate so you can focus on what truly matters. Your family, your moments, your life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/quote" id="about-cta-quote" className="btn-sage flex items-center gap-2">
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="tel:9782357033" id="about-cta-phone" className="btn-outline-white flex items-center gap-2">
                <Phone className="w-4 h-4" />
                978.235.7033
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
