import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useHomeContent } from "@/hooks/useHomeContent";

/* Fresh, original reviews, Home section */
const homeReviews = [
  {
    text: "Walked into my house after their first visit and just stood there. Every surface gleamed, even places I forgot to mention.",
    name: "Olivia M.",
    place: "Parrish, FL",
    featured: true,
  },
  {
    text: "Booking took two minutes, the team arrived early, and they left a handwritten note. That's hospitality.",
    name: "Brendan K.",
    place: "Sarasota, FL",
  },
  {
    text: "We rent three cabins. Turnover used to be chaos, now it's a 90-minute window and zero guest complaints in eight months.",
    name: "Priya N.",
    place: "Anna Maria Island",
  },
  {
    text: "Honestly skeptical at first. These folks delivered. Baseboards, blinds, inside the oven. All of it.",
    name: "Tomás R.",
    place: "Bradenton, FL",
  },
  {
    text: "They asked about our dog, our allergies, and our priorities before quoting. Felt like hiring a partner, not a vendor.",
    name: "Hana W.",
    place: "Lakewood Ranch",
  },
];

function StarsRow({ delay = 0 }: { delay?: number }) {
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
            className="w-4 h-4"
            style={{ fill: "hsl(var(--brand-pink))", color: "hsl(var(--brand-pink))" }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { data: content } = useHomeContent();
  const scale = parseFloat(content?.home_font_scale_testimonials || "1") || 1;

  // DB override
  const reviews = (() => {
    if (!content) return homeReviews;
    const dbReviews: typeof homeReviews = [];
    for (let i = 1; i <= 5; i++) {
      const name = content[`home_testimonial_name_${i}`];
      const text = content[`home_testimonial_text_${i}`];
      if (name && text) {
        dbReviews.push({
          text,
          name,
          place: content[`home_testimonial_location_${i}`] || "",
          featured: i === 1,
        });
      }
    }
    return dbReviews.length > 0 ? dbReviews : homeReviews;
  })();

  const [featured, ...rest] = reviews;

  return (
    <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "hsl(var(--brand-blush))" }}
    >
      {/* Soft brand wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full blur-[140px] opacity-50"
          style={{ background: "hsl(var(--brand-pink) / 0.35)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full blur-[140px] opacity-40"
          style={{ background: "hsl(var(--primary) / 0.18)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header, editorial alignment */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-end mb-14">
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[0.7rem] font-bold tracking-[0.32em] uppercase mb-5"
              style={{ color: "hsl(var(--brand-pink))" }}
            >
             , In Their Words
            </p>
            <h2
              className="font-bold leading-[1.02] tracking-tight"
              style={{
                fontFamily: "var(--font-heading)",
                color: "hsl(var(--primary))",
                fontSize: `clamp(${2.25 * scale}rem, ${5 * scale}vw, ${4 * scale}rem)`,
              }}
            >
              Real homes.<br />
              <em className="italic font-light" style={{ color: "hsl(var(--brand-pink))" }}>
                Real reviews.
              </em>
            </h2>
          </motion.div>

          <motion.div
            className="md:col-span-5 md:text-right"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex flex-col gap-2 items-start md:items-end">
              <div className="flex items-center gap-2">
                <span
                  className="text-5xl md:text-6xl font-bold tabular-nums"
                  style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--primary))" }}
                >
                  5.0
                </span>
                <div className="flex flex-col items-start">
                  <StarsRow />
                  <span className="text-[0.7rem] tracking-wider uppercase mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Average Rating
                  </span>
                </div>
              </div>
              <a
                href="https://share.google/ylu8IY0nGt63rCcYy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-[0.2em] underline underline-offset-4 hover:opacity-70 transition-opacity"
                style={{ color: "hsl(var(--primary))" }}
              >
                Read all Google reviews →
              </a>
            </div>
          </motion.div>
        </div>

        {/* Editorial masonry */}
        <div className="grid md:grid-cols-12 gap-5 md:gap-6">
          {/* Featured large card, navy with serif quote */}
          {featured && (
            <motion.article
              className="md:col-span-7 md:row-span-2 relative rounded-[2rem] p-8 md:p-12 overflow-hidden"
              style={{ background: "hsl(var(--primary))" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Quote
                className="absolute top-8 right-8 w-24 h-24 opacity-10"
                style={{ color: "hsl(var(--brand-pink))" }}
              />
              <StarsRow delay={0.2} />
              <p
                className="mt-6 text-2xl md:text-3xl leading-snug font-light text-white relative z-10"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                "{featured.text}"
              </p>
              <div className="mt-10 pt-8 border-t border-white/15 flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-white">{featured.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] mt-1 text-white/60">
                    {featured.place}
                  </p>
                </div>
                <span
                  className="text-[0.65rem] font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-full"
                  style={{ background: "hsl(var(--brand-pink) / 0.2)", color: "hsl(var(--brand-pink-soft))" }}
                >
                  ✓ Verified Google Review
                </span>
              </div>
            </motion.article>
          )}

          {/* Small cards, alternating white & blush */}
          {rest.slice(0, 4).map((r, i) => {
            const isWhite = i % 2 === 0;
            return (
              <motion.article
                key={i}
                className={`md:col-span-5 ${i >= 2 ? "md:col-start-8" : ""} relative rounded-[1.75rem] p-7 md:p-8 border`}
                style={{
                  background: isWhite ? "white" : "hsl(var(--brand-pink) / 0.15)",
                  borderColor: isWhite ? "hsl(var(--border))" : "hsl(var(--brand-pink) / 0.3)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                <StarsRow delay={0.1 + i * 0.05} />
                <p
                  className="mt-4 text-base leading-relaxed"
                  style={{ color: "hsl(var(--primary))", fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic" }}
                >
                  "{r.text}"
                </p>
                <div className="mt-6 flex items-baseline justify-between gap-3">
                  <p className="text-sm font-bold" style={{ color: "hsl(var(--primary))" }}>{r.name}</p>
                  <p className="text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {r.place}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="/quote"
            className="inline-flex items-center gap-2 px-9 py-3.5 rounded-full text-sm font-semibold tracking-[0.15em] text-white transition-all hover:-translate-y-0.5"
            style={{ background: "hsl(var(--primary))", boxShadow: "var(--shadow-soft)" }}
          >
            JOIN OUR HAPPY CLIENTS
          </a>
        </motion.div>
      </div>
    </section>
  );
}
