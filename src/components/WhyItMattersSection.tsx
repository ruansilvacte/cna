import { motion } from "framer-motion";
import { Shield, Sparkles, Heart } from "lucide-react";
import { useHomeContent } from "@/hooks/useHomeContent";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const icons = [Shield, Sparkles, Heart];

const defaults = [
  {
    title: "Trust & Reliability",
    description:
      "Letting someone into your home requires trust, and we honor it. A high-trust team, clear communication, and proven systems guarantee every service is handled with professionalism and accountability.",
    tagline: "Your home is in safe hands",
  },
  {
    title: "Quality & Consistency",
    description:
      "Our operation is built on repeatable systems and detailed checklists tailored per service. Whether it's a recurring residential clean or an Airbnb turnover, the same elevated standard, every single time.",
    tagline: "Consistent results, every time",
  },
  {
    title: "Peace of Mind",
    description:
      "Remove the stress from your routine. With WeHome you don't double-check, follow up, or worry. We handle everything with precision so you can focus on what matters most.",
    tagline: "We handle the details",
  },
];

export default function WhyItMattersSection() {
  const { data: content } = useHomeContent();

  const cards = defaults.map((d, i) => ({
    icon: icons[i],
    title: content?.[`home_why_title_${i + 1}`] || d.title,
    description: content?.[`home_why_description_${i + 1}`] || d.description,
    tagline: content?.[`home_why_tagline_${i + 1}`] || d.tagline,
  }));

  return (
    <section
      className="relative w-full py-24 md:py-32 px-5 md:px-10 overflow-hidden"
      style={{ background: "hsl(var(--primary))" }}
    >
      {/* Pink decorative glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--brand-pink)) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--brand-pink-soft)) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-5"
              style={{ color: "hsl(var(--brand-pink))" }}
            >
              Why It Matters
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.05] tracking-tight font-light text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Cleaning is the service.{" "}
              <em
                className="italic font-normal"
                style={{ color: "hsl(var(--brand-pink))" }}
              >
                Tranquility is the result.
              </em>
            </h2>
          </motion.div>
          <motion.p
            className="lg:col-span-5 text-base md:text-lg leading-relaxed text-white/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            You're not just hiring a cleaner, you're investing in consistency, reliability, and the elevated daily experience of a home that always feels cared for.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                className="group relative rounded-3xl p-8 md:p-10 flex flex-col overflow-hidden border"
                style={{
                  background: "hsl(0 0% 100% / 0.04)",
                  borderColor: "hsl(0 0% 100% / 0.1)",
                  backdropFilter: "blur(8px)",
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease }}
                whileHover={{ y: -6 }}
              >
                {/* Pink gradient accent on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 0% 0%, hsl(var(--brand-pink) / 0.18) 0%, transparent 60%)",
                  }}
                />

                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7"
                    style={{ background: "var(--gradient-pink)" }}
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.6} />
                  </div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.25em] mb-3"
                    style={{ color: "hsl(var(--brand-pink))" }}
                  >
                    0{i + 1} ·{" "}
                    <span className="text-white/60">{card.tagline}</span>
                  </p>
                  <h3
                    className="text-2xl md:text-[1.65rem] font-light text-white leading-tight mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/70">{card.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
