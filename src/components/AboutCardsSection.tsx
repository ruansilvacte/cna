import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, HeartHandshake, MapPin, Users, Star, Award } from "lucide-react";
import { useHomeContent } from "@/hooks/useHomeContent";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Trained, vetted teams",
    text: "The same reliable crew, every visit, no rotating strangers in your home.",
  },
  {
    icon: Sparkles,
    title: "Detail-obsessed standard",
    text: "Checklists tailored per service. Nothing skipped, nothing overlooked.",
  },
  {
    icon: HeartHandshake,
    title: "24-hour guarantee",
    text: "If something isn't right, we return within 24 hours. Always.",
  },
];

const stats = [
  { icon: MapPin, value: "100+", label: "ZIP Codes" },
  { icon: Users, value: "400+", label: "Monthly Services" },
  { icon: Star, value: "5.0", label: "Google Rating" },
  { icon: Award, value: "100%", label: "Quality Guarantee" },
];

export default function AboutCardsSection() {
  const { data: content } = useHomeContent();

  return (
    <section className="w-full py-20 md:py-28 px-5 md:px-10 relative overflow-hidden">
      {/* soft accent shape */}
      <div
        className="absolute top-20 -left-32 w-[420px] h-[420px] rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--brand-pink-soft)) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left, sticky editorial intro */}
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
          >
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-5"
              style={{ color: "hsl(var(--brand-pink))" }}
            >
              About WeHome
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight mb-6 font-light"
              style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--primary))" }}
            >
              More than cleaning.{" "}
              <em className="italic font-normal" style={{ color: "hsl(var(--brand-pink))" }}>
                A feeling of home.
              </em>
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {content?.home_about_text_1 ||
                "Founded in 2023 and serving Massachusetts and North Carolina, WeHome Cleaning is built around one promise: every visit feels consistent, considered, and genuinely cared for. From recurring residential service to Airbnb turnovers, we deliver the elevated standard your home deserves."}
            </p>

            <div
              className="rounded-2xl p-6 border"
              style={{
                background: "hsl(var(--brand-blush))",
                borderColor: "hsl(var(--brand-pink) / 0.25)",
              }}
            >
              <p
                className="text-lg italic leading-snug"
                style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--primary))" }}
              >
                "Your home is our priority, and the details prove it."
              </p>
            </div>
          </motion.div>

          {/* Right, pillars + image + stats */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              className="relative h-72 md:h-80 rounded-3xl overflow-hidden"
              style={{ boxShadow: "var(--shadow-soft)" }}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
            >
              <img
                src="/images/luxury-clean-home.jpg"
                alt="Luxurious clean classic living room with crystal chandelier"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="grid gap-4">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={i}
                    className="group flex gap-5 items-start rounded-2xl p-6 bg-card border transition-all duration-500 hover:-translate-y-0.5"
                    style={{
                      borderColor: "hsl(var(--border))",
                      boxShadow: "var(--shadow-soft)",
                    }}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[hsl(var(--brand-blush))]"
                      style={{ background: "hsl(var(--secondary))" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "hsl(var(--brand-pink))" }} strokeWidth={1.7} />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-semibold mb-1"
                        style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--primary))" }}
                      >
                        {p.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {p.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-4 text-center border"
                    style={{
                      background: "hsl(var(--secondary))",
                      borderColor: "hsl(var(--border))",
                    }}
                  >
                    <Icon className="w-4 h-4 mx-auto mb-2" style={{ color: "hsl(var(--brand-pink))" }} />
                    <p
                      className="text-2xl font-light"
                      style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--primary))" }}
                    >
                      {s.value}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
