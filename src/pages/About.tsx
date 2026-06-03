import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";

const ease = [0.22, 1, 0.36, 1] as const;

const aboutSlides = [
  "/images/about-hero.png",
  "/images/about-slide-2.png",
  "/images/about-slide-3.png",
];

const qualityItems = [
  {
    image: "/images/quality-1.png",
    title: "TRAINED PROFESSIONALS",
    description: "Background-checked team following a detailed cleaning standard.",
  },
  {
    image: "/images/quality-2.png",
    title: "CONSISTENT STANDARD",
    description: "The same training and quality standards on every visit.",
  },
  {
    image: "/images/quality-3.png",
    title: "LICENSED & INSURED",
    description: "A reliable, professional service you can trust at home.",
  },
  {
    image: "/images/clean-bathroom.png",
    title: "24-HOUR GUARANTEE",
    description: "If anything is missed, we return at no additional cost.",
  },
];

const standards = [
  {
    title: "Team Assignment",
    body:
      "Team members may occasionally vary based on scheduling and availability. All WeHome Cleaning professionals follow the same training and quality standards to ensure a consistent experience at every visit.",
  },
  {
    title: "Home Preparation",
    body:
      "To allow our team to focus entirely on the cleaning itself, we kindly ask that excessive clutter, clothing, toys, and personal items are picked up prior to arrival. Organization and decluttering services are not included unless previously requested.",
  },
  {
    title: "Health & Safety",
    body:
      "For safety and hygiene reasons, our team members do not perform cleanings barefoot or without proper footwear. Shoe covers are worn during every service to help protect your home while maintaining professional safety standards.",
  },
  {
    title: "Pets",
    body:
      "We are happy to work in pet-friendly homes. For the safety of both pets and our team, we recommend securing anxious or reactive animals during the cleaning visit.",
  },
  {
    title: "Safety Guidelines",
    body:
      "For the safety of our team and the protection of your home, we do not move excessively heavy furniture or large appliances during the cleaning service. We kindly recommend securing fragile, valuable, or sentimental items prior to the appointment.",
  },
  {
    title: "Supplies & Equipment",
    body:
      "Clients are kindly asked to provide paper towels and trash bags. All other cleaning supplies and equipment are provided by WeHome Cleaning. If you prefer the use of a specific product, we are happy to accommodate as long as it is provided upon arrival.",
  },
];

export default function About() {
  const [current, setCurrent] = useState(0);

  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % aboutSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/about" fallbackTitle="About Us, WeHome Cleaning" />
      <Header />

      {/* ── Banner with rotating images (topo) ── */}
      <section className="relative w-full min-h-[550px] md:min-h-[650px] overflow-hidden">
        {/* Rotating background images */}
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={aboutSlides[current]}
            alt={`About slide ${current + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        {/* Dark blue overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(30 10% 15% / 0.90) 0%, hsl(30 10% 20% / 0.80) 50%, hsl(var(--brand-pink) / 0.35) 100%)",
          }}
        />

        <motion.div
          className="relative z-10 max-w-3xl px-8 md:px-16 pt-32 md:pt-40 pb-20 md:pb-28 flex flex-col justify-center h-full"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Details Matter
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            WeHome Cleaning
          </h2>
          <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4">
            WeHome Cleaning provides premium residential cleaning services
            designed to keep your home consistently clean, comfortable, and
            well maintained. Our services include recurring cleaning, deep
            cleaning, move-in/move-out cleaning, Airbnb cleaning, and post
            construction cleaning.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            Our team is professionally trained, background checked, licensed,
            and insured, following a detailed cleaning standard developed to
            deliver a consistent and reliable experience at every visit.
          </p>
        </motion.div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-8 md:left-16 flex gap-3 z-10">
          {aboutSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: current === idx ? "3rem" : "0.75rem",
                background:
                  current === idx
                    ? "linear-gradient(90deg, hsl(var(--brand-pink)), hsl(var(--brand-pink-soft)))"
                    : "hsl(210 20% 60%)",
              }}
            />
          ))}
        </div>
      </section>

      {/* ── Quality Standards ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-heading)", backgroundImage: "linear-gradient(135deg, hsl(var(--brand-pink)), hsl(var(--brand-pink-soft)), hsl(210 80% 55%))" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            Quality Standards.
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {qualityItems.map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease }}
              >
                <div
                  className="w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden mb-4 md:mb-6 shadow-lg border-3 md:border-4"
                  style={{ borderColor: "hsl(30 15% 30%)" }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3
                  className="text-xs md:text-sm font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] mb-1 md:mb-2"
                  style={{ color: "hsl(30 15% 30%)" }}
                >
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm max-w-[220px] hidden md:block">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Split, Image + "Where Clean Meets Care" ── */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-7 min-h-[500px]">
          {/* Left, Image with blue overlay */}
          <div className="relative overflow-hidden min-h-[400px] md:min-h-[500px] md:order-2 md:col-span-4">
            <img
              src="/images/about-comfort.png"
              alt="Happy cleaning professional"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, hsl(30 10% 15% / 0.3) 0%, transparent 50%)",
              }}
            />
          </div>

          {/* Right, Text with gradient background */}
          <motion.div
            className="flex flex-col justify-center px-6 md:px-14 lg:px-20 py-10 md:py-14 text-white relative overflow-hidden md:order-1 md:col-span-3"
            style={{ background: "var(--gradient-gold)" }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, hsl(200 80% 70% / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 30%, hsl(var(--brand-pink) / 0.2) 0%, transparent 40%)",
              }}
            />
            <div className="relative z-10">
              <span className="text-white/70 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                Details Matter
              </span>
              <h2
                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 md:mb-8"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                A Seamless Cleaning Experience
              </h2>
              <p className="text-white/85 text-base md:text-lg leading-relaxed">
                Every visit follows a carefully developed cleaning standard to
                ensure your home feels fresh, organized, and consistently cared
                for. We appreciate your trust and look forward to providing you
                with a seamless cleaning experience, and our team is always
                available whenever you need assistance.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Our Standards ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-secondary/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
              Our Standards
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              How We Care for Your Home
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mt-4 max-w-2xl mx-auto">
              The policies and standards that protect your home and ensure a
              consistent, professional experience at every visit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {standards.map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-7 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <div
                  className="w-10 h-1 rounded-full mb-5"
                  style={{ background: "var(--gradient-gold)" }}
                />
                <h3
                  className="text-lg md:text-xl font-bold mb-3 text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          className="max-w-4xl mx-auto rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden"
          style={{ background: "var(--gradient-gold)" }}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, hsl(200 80% 70% / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 30%, hsl(var(--brand-pink) / 0.2) 0%, transparent 40%)",
            }}
          />
          <div className="relative z-10">
            <h2
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ready to experience the difference?
            </h2>
            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto mb-8">
              Let our family take care of yours. Get a free, no-obligation quote today.
            </p>
            <motion.a
              href="/quote"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold bg-white shadow-lg transition-all duration-300"
              style={{ color: "hsl(30 15% 30%)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone className="w-4 h-4" />
              Get a Free Quote
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
