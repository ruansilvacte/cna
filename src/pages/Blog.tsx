import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import BlogSection from "@/components/BlogSection";
import SeoHead from "@/components/SeoHead";
import blogBanner from "@/assets/blog-banner.jpg";

const TYPE_WORDS = ["Ideas.", "Rituals.", "Inspiration.", "Stories."];

function Typewriter() {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPE_WORDS[wordIdx];
    const speed = deleting ? 55 : 110;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1600);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % TYPE_WORDS.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx]);

  return (
    <span style={{ color: "hsl(var(--brand-pink))" }}>
      {text}
      <span
        className="inline-block w-[0.08em] h-[0.85em] ml-1 align-middle animate-pulse"
        style={{ background: "hsl(var(--brand-pink))" }}
      />
    </span>
  );
}

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/blog" fallbackTitle="Blog, WeHome Cleaning" />
      <Header />

      {/* Editorial Hero */}
      <section
        className="relative w-full overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--brand-blush)) 0%, hsl(var(--background)) 55%, hsl(350 70% 94%) 100%)",
        }}
      >
        {/* Decorative grid lines */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--brand-blue)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--brand-blue)) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="h-px w-12"
                style={{ background: "hsl(var(--brand-pink))" }}
              />
              <span
                className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em]"
                style={{ color: "hsl(var(--brand-blue))" }}
              >
                The Journal · Edition Nº 04
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] font-light tracking-tight"
              style={{
                fontFamily: "var(--font-heading)",
                color: "hsl(var(--brand-blue))",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Fresh{" "}
              <em className="italic font-normal" style={{ color: "hsl(var(--brand-pink))" }}>
                takes
              </em>
              <br />
              on home <br className="hidden md:block" />
              <Typewriter />
            </motion.h1>

            <motion.p
              className="mt-8 max-w-md text-base md:text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A slow-reading collection of expert cleaning rituals, seasonal notes,
              and the quiet craft behind every WeHome visit.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.25em] font-semibold"
              style={{ color: "hsl(var(--brand-blue))" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span>Weekly</span>
              <span className="w-1 h-1 rounded-full" style={{ background: "hsl(var(--brand-pink))" }} />
              <span>5 Min Reads</span>
              <span className="w-1 h-1 rounded-full" style={{ background: "hsl(var(--brand-pink))" }} />
              <span>No Fluff</span>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-5 order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="absolute -top-4 -left-4 w-full h-full rounded-[2rem]"
              style={{ background: "hsl(var(--brand-pink) / 0.35)" }}
            />
            <video
              src="/videos/blog-hero.mp4"
              className="relative w-full aspect-[9/16] object-contain rounded-[2rem] shadow-2xl bg-black"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
            <div
              className="absolute -bottom-6 -right-6 px-5 py-4 rounded-2xl shadow-xl backdrop-blur"
              style={{
                background: "hsl(var(--brand-blue))",
                color: "white",
              }}
            >
              <div className="text-[10px] uppercase tracking-[0.3em] opacity-70">Since</div>
              <div className="text-2xl font-light" style={{ fontFamily: "var(--font-heading)" }}>
                2023
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <BlogSection />
      <Footer />
      <FloatingSocial />
    </div>
  );
}
