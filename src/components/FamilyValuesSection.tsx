import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function FamilyValuesSection() {
  const navigate = useNavigate();

  return (
    <section
      className="w-full py-24 md:py-32 px-6 md:px-10 relative overflow-hidden grain-overlay"
      style={{ background: "var(--gradient-dark)" }}
    >
      {/* Radial sage glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--cna-sage) / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Story content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <p className="section-label mb-6" style={{ color: "hsl(var(--cna-sage-light))" }}>
              Family-Owned Since 2010
            </p>
            <h2
              className="heading-display text-white mb-7"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Built on family values.{" "}
              <span className="block italic font-normal mt-1" style={{ color: "hsl(var(--cna-sage-light))", fontFamily: "var(--font-heading)" }}>
                Delivered with heart.
              </span>
            </h2>
            <p className="leading-relaxed text-lg mb-6" style={{ color: "rgba(255,255,255,0.70)" }}>
              CNA MAIDPRO was born from a simple belief: every family deserves a home they love coming back to. We've spent over a decade earning the trust of Boston families through consistent, exceptional, and deeply personal cleaning services.
            </p>
            <p className="leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.60)", fontFamily: "var(--font-body)" }}>
              As a family-owned business, we understand what home means. It's where your children grow, where memories are made, where you should feel completely at ease. We don't just clean spaces: we protect sanctuaries.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                id="family-cta-story"
                onClick={() => navigate("/about")}
                className="btn-outline-white group"
              >
                Our Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                id="family-cta-quote"
                onClick={() => navigate("/quote")}
                className="btn-sage group"
              >
                Book Your Clean
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right: Image + Values */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            {/* Main image card */}
            <div className="rounded-3xl overflow-hidden relative" style={{ aspectRatio: "16/9" }}>
              <img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=85&auto=format&fit=crop"
                alt="Warm, welcoming family home in Boston"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(135deg, hsl(218 60% 14% / 0.35) 0%, transparent 60%)" }}
              />
              <div className="absolute bottom-5 left-5 rounded-xl px-4 py-3" style={{ background: "rgba(0,0,0,0.50)", backdropFilter: "blur(12px)" }}>
                <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-heading)" }}>Family Business</p>
                <p className="text-[0.6rem] font-bold uppercase tracking-wider" style={{ color: "hsl(var(--cna-sage-light))" }}>Boston, Massachusetts</p>
              </div>
            </div>

            {/* Values — 3 compact cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Care", icon: "♡", text: "We treat every Boston home like our own." },
                { label: "Trust", icon: "◈", text: "Built on honesty and transparent communication." },
                { label: "Legacy", icon: "◉", text: "10+ years earning trust, one home at a time." },
              ].map((v, i) => (
                <motion.div
                  key={i}
                  className="glass-card rounded-2xl p-4 flex flex-col gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease }}
                >
                  <span className="text-xl" style={{ color: "hsl(var(--cna-sage-light))" }}>{v.icon}</span>
                  <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                    {v.label}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{v.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
