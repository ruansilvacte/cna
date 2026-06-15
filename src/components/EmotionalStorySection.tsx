import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Heart, Clock, Home } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function EmotionalStorySection() {
  const navigate = useNavigate();

  return (
    <section
      className="w-full py-24 md:py-32 px-6 md:px-10 relative overflow-hidden"
      style={{ background: "white" }}
    >
      {/* Decorative background shape */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: "hsl(var(--cna-sage))", transform: "translate(40%, -30%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top editorial label */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="section-label mb-4">Why It Matters</p>
        </motion.div>

        {/* Main 2-column layout — alternating */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center mb-24">
          {/* Left: large image column (3/5) */}
          <motion.div
            className="lg:col-span-3 relative hidden md:block"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            {/* Main image */}
            <div className="rounded-[3rem] overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&auto=format&fit=crop"
                alt="Bright, welcoming kitchen in a Boston home"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating quote card */}
            <motion.div
              className="absolute -bottom-8 -right-6 rounded-2xl p-6 max-w-[220px] shadow-xl"
              style={{ background: "hsl(var(--cna-navy))" }}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45, ease }}
            >
              <p className="italic text-sm leading-snug mb-3" style={{ fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.90)" }}>
                "They gave my Sundays back to me."
              </p>
              <p className="text-[0.6rem] font-bold uppercase tracking-widest" style={{ color: "hsl(var(--cna-sage-light))" }}>
                Verified Boston Client
              </p>
            </motion.div>

            {/* Small overlay image */}
            <motion.div
              className="absolute -top-8 -left-6 w-40 h-40 rounded-2xl overflow-hidden shadow-xl"
              style={{ border: "4px solid white" }}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
            >
              <img
                src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300&q=80&auto=format"
                alt="Clean, peaceful bedroom"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Stat badge */}
            <motion.div
              className="absolute top-1/2 -right-8 -translate-y-1/2 rounded-2xl p-5 text-center shadow-xl"
              style={{ background: "hsl(var(--cna-sage))" }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
            >
              <p className="text-white font-bold text-3xl leading-none" style={{ fontFamily: "var(--font-heading)" }}>500+</p>
              <p className="text-white/70 text-[0.58rem] uppercase tracking-wider font-bold mt-1">Boston<br/>Families</p>
            </motion.div>
          </motion.div>

          {/* Right: Emotional content (2/5) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <h2
              className="heading-display mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              We don't just clean.{" "}
              <em
                className="block italic font-normal mt-1"
                style={{ color: "hsl(var(--cna-sage-dark))", fontFamily: "var(--font-heading)" }}
              >
                We give you your life back.
              </em>
            </h2>

            <p className="leading-relaxed mb-10 text-base" style={{ color: "hsl(var(--cna-gray-mid))" }}>
              The average family spends 6 hours a week cleaning. That's 26 full days a year. Imagine what you'd do with that time: quiet mornings, family dinners, and long weekends that belong entirely to you.
            </p>

            <div className="space-y-7 mb-10">
              {[
                {
                  icon: Heart,
                  headline: "More family time",
                  body: "Trade hours of scrubbing for hours of connection. Be present for the moments that truly define your family's story.",
                },
                {
                  icon: Clock,
                  headline: "Reclaim your weekends",
                  body: "Imagine a Saturday morning with nowhere to be and nothing to clean. That's the life CNA MAIDPRO gives back to you.",
                },
                {
                  icon: Home,
                  headline: "A home that feels like a sanctuary",
                  body: "There's a specific kind of peace that comes from entering a truly clean home. We create that feeling for your Boston family, every visit.",
                },
              ].map((point, i) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={i}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "hsl(var(--cna-sage-pale))" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "hsl(var(--cna-sage-dark))" }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1.5" style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--cna-navy))", fontSize: "1.05rem" }}>
                        {point.headline}
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--cna-gray-mid))" }}>{point.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              id="emotional-cta"
              onClick={() => navigate("/quote")}
              className="btn-primary group"
            >
              Reclaim Your Time
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Second row — horizontal editorial strip */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 pt-16 border-t"
          style={{ borderColor: "hsl(var(--cna-gray))" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          {[
            {
              number: "26",
              unit: "days/year",
              text: "The average family spends cleaning their own home every year.",
            },
            {
              number: "500+",
              unit: "happy clients",
              text: "Boston families who've discovered what life looks like without cleaning stress.",
            },
            {
              number: "100%",
              unit: "satisfaction",
              text: "Of our clients say they'd recommend CNA MAIDPRO to their own family.",
            },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-end gap-2 mb-3">
                <span
                  className="text-5xl font-bold leading-none"
                  style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--cna-navy))" }}
                >
                  {stat.number}
                </span>
                <span
                  className="text-sm font-semibold pb-1"
                  style={{ color: "hsl(var(--cna-sage))" }}
                >
                  {stat.unit}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--cna-gray-mid))" }}>{stat.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
