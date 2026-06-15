import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

export default function FinalCtaSection() {
  const navigate = useNavigate();

  return (
    <section
      className="w-full py-24 md:py-32 px-6 md:px-10 relative overflow-hidden"
      style={{ background: "var(--gradient-dark)" }}
    >
      {/* Sage radial glow */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--cna-sage) / 0.10) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
      />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--cna-sage) / 0.07) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label mb-5 tracking-[0.28em]" style={{ color: "hsl(var(--cna-sage-light))" }}>
            Serving Boston, Massachusetts
          </p>
          <h2
            className="heading-display text-white mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
          >
            Your cleanest home.{" "}
            <span className="block italic font-normal mt-2" style={{ color: "hsl(var(--cna-sage-light))", fontFamily: "var(--font-heading)" }}>
              Starts with one call.
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.68)", fontFamily: "var(--font-body)" }}>
            Join 500+ Boston families who've discovered the joy of coming home to a space that's truly clean. Your first step is free, with no obligation and no pressure.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              id="final-cta-quote"
              onClick={() => navigate("/quote")}
              className="flex items-center gap-2 px-9 py-4 rounded-full font-bold text-sm uppercase tracking-wide bg-white hover:bg-white/95 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
              style={{ fontFamily: "var(--font-body)", color: "hsl(var(--cna-navy))" }}
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:9782357033"
              id="final-cta-phone"
              className="btn-outline-white flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call 978.235.7033
            </a>
          </div>

          {/* Bottom trust line */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-8 text-[0.68rem] uppercase tracking-[0.22em] font-semibold"
            style={{ color: "rgba(255,255,255,0.38)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {["Licensed & Insured", "Background Checked", "5.0 Google Rating", "Boston Area"].map((item, i) => (
              <span key={i} className="flex items-center gap-3">
                {i > 0 && <span className="w-1 h-1 rounded-full" style={{ background: "hsl(var(--cna-sage) / 0.40)" }} />}
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
