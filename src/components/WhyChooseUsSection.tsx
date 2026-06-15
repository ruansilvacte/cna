import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserCheck, Shield, Heart, CheckCircle2, Clock, Star, ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const reasons = [
  {
    icon: UserCheck,
    title: "Background Checked Professionals",
    description: "Every team member passes thorough background screening. You only open your door to people who've earned our trust first.",
    stat: "100% Vetted",
  },
  {
    icon: Shield,
    title: "Fully Insured Coverage",
    description: "Full liability and workers compensation insurance protects your home and our staff on every single visit.",
    stat: "Fully Covered",
  },
  {
    icon: Heart,
    title: "Family Owned Values",
    description: "We treat your home with the same care we give our own. Every decision is guided by the values of family, respect, and integrity.",
    stat: "Since 2010",
  },
  {
    icon: CheckCircle2,
    title: "Precision Every Visit",
    description: "Our detailed proprietary checklists ensure nothing is ever missed. Baseboards, blinds, and corners: we see what others skip.",
    stat: "100% Checklist",
  },
  {
    icon: Clock,
    title: "Your Time, Respected",
    description: "We arrive on schedule, complete the job efficiently, and communicate throughout. No surprises, no excuses.",
    stat: "On Time Always",
  },
  {
    icon: Star,
    title: "24 Hour Guarantee",
    description: "If anything doesn't meet your expectations, contact us within 24 hours and we'll return to correct it at zero cost.",
    stat: "Risk Free",
  },
];

export default function WhyChooseUsSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full py-24 md:py-32 px-6 md:px-10 relative overflow-hidden"
      style={{ background: "hsl(var(--cna-cream))" }}
    >
      {/* Decorative large watermark text */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[18rem] font-bold leading-none select-none pointer-events-none hidden xl:block"
        style={{
          fontFamily: "var(--font-heading)",
          color: "hsl(var(--cna-sage) / 0.04)",
          transform: "translateY(-50%) translateX(10%)",
        }}
      >
        TRUST
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header — split layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 md:mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="section-label mb-4">Why Choose CNA MAIDPRO</p>
            <h2
              className="heading-display"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
            >
              The standard others{" "}
              <em className="italic font-normal" style={{ color: "hsl(var(--cna-sage))" }}>
                aspire to.
              </em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="flex flex-col gap-6"
          >
            <p className="text-base leading-relaxed" style={{ color: "hsl(var(--cna-gray-mid))", fontFamily: "var(--font-body)" }}>
              Serving Boston families with care that goes beyond cleaning. We earn your trust visit after visit because we understand that you're letting us into your most personal space.
            </p>
            <div>
              <button
                id="why-us-cta"
                onClick={() => navigate("/quote")}
                className="btn-sage group"
              >
                Book Your Clean
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Card grid — alternating layout, not uniform */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            const isFeatured = i === 2; // Family-owned card gets emphasis
            return (
              <motion.div
                key={i}
                className={`group relative rounded-3xl p-8 border transition-all duration-500 hover:-translate-y-1 overflow-hidden ${
                  isFeatured
                    ? "border-transparent"
                    : "border-border/50 bg-white hover:shadow-[0_8px_48px_-12px_hsl(218_52%_22%/0.12)]"
                }`}
                style={isFeatured ? { background: "hsl(var(--cna-sage-pale))", border: "1px solid hsl(var(--cna-sage-light) / 0.30)" } : {}}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
              >
                {/* Hover accent */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{ background: "linear-gradient(135deg, hsl(var(--cna-navy)/0.02) 0%, transparent 60%)" }}
                />

                <div className="relative z-10">
                  {/* Icon + stat row */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: isFeatured ? "hsl(var(--cna-sage) / 0.18)" : "hsl(var(--cna-sage-pale))" }}
                    >
                      <Icon className="w-6 h-6" strokeWidth={1.5} style={{ color: "hsl(var(--cna-sage-dark))" }} />
                    </div>
                    <span
                      className="text-[0.63rem] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full"
                      style={{ background: "hsl(var(--cna-navy) / 0.07)", color: "hsl(var(--cna-navy))" }}
                    >
                      {r.stat}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-bold leading-tight mb-3"
                    style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--cna-navy))" }}
                  >
                    {r.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--cna-gray-mid))" }}>{r.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom trust strip */}
        <motion.div
          className="mt-16 pt-10 border-t flex flex-wrap items-center justify-center gap-x-12 gap-y-4"
          style={{ borderColor: "hsl(var(--cna-gray))" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {["Licensed & Insured", "5.0 Google Rating", "500+ Happy Clients in Boston", "10+ Years of Experience"].map((t, i) => (
            <div key={i} className="flex items-center gap-2.5" style={{ color: "hsl(var(--cna-gray-mid))" }}>
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--cna-sage))" }} />
              <span className="text-sm font-semibold">{t}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
