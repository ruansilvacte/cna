import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowRight, Star, MapPin } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

const HERO_VIDEOS = [
  "/videos/hero1.mp4",
  "/videos/hero2.mp4",
  "/videos/hero3.mp4",
  "/videos/hero4.mp4",
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function HeroBanner() {
  const navigate = useNavigate();

  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [sources, setSources] = useState<[string, string]>([HERO_VIDEOS[0], HERO_VIDEOS[1]]);
  const [whiteTransition, setWhiteTransition] = useState(false);
  const currentIndexRef = useRef(0);
  const activeLayerRef = useRef<0 | 1>(0);
  const transitionLockedRef = useRef(false);
  const transitionTimerRef = useRef<number | null>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  const safePlay = useCallback((v: HTMLVideoElement | null) => {
    if (!v) return;
    try {
      v.muted = true;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } catch { /* noop */ }
  }, []);

  const prepareVideo = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;
    video.muted = true;
    video.preload = "auto";
    if (video.readyState === 0) video.load();
  }, []);

  const advance = useCallback(() => {
    if (transitionLockedRef.current) return;
    const currentLayer = activeLayerRef.current;
    const nextLayer = currentLayer === 0 ? 1 : 0;
    const currentVideo = currentLayer === 0 ? videoARef.current : videoBRef.current;
    const nextVideo = nextLayer === 0 ? videoARef.current : videoBRef.current;
    const nextIndex = (currentIndexRef.current + 1) % HERO_VIDEOS.length;
    const upcomingIndex = (nextIndex + 1) % HERO_VIDEOS.length;

    transitionLockedRef.current = true;
    setWhiteTransition(true);

    if (nextVideo) {
      try { nextVideo.currentTime = 0; } catch { /* noop */ }
      safePlay(nextVideo);
    }

    currentIndexRef.current = nextIndex;
    activeLayerRef.current = nextLayer;
    setActiveLayer(nextLayer);

    if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = window.setTimeout(() => {
      if (currentVideo) {
        currentVideo.pause();
        try { currentVideo.currentTime = 0; } catch { /* noop */ }
      }
      setSources((currentSources) => {
        const updated: [string, string] = [...currentSources] as [string, string];
        updated[currentLayer] = HERO_VIDEOS[upcomingIndex];
        return updated;
      });
      setWhiteTransition(false);
      transitionLockedRef.current = false;
    }, 650);
  }, [safePlay]);

  const handleTimeUpdate = useCallback(
    (layer: 0 | 1, video: HTMLVideoElement) => {
      if (layer !== activeLayerRef.current || transitionLockedRef.current || !Number.isFinite(video.duration)) return;
      if (video.duration - video.currentTime <= 0.85) advance();
    },
    [advance]
  );

  useEffect(() => { activeLayerRef.current = activeLayer; }, [activeLayer]);

  useEffect(() => {
    prepareVideo(videoARef.current);
    prepareVideo(videoBRef.current);
    safePlay(activeLayerRef.current === 0 ? videoARef.current : videoBRef.current);
  }, [prepareVideo, safePlay, sources]);

  useEffect(() => {
    prepareVideo(videoARef.current);
    prepareVideo(videoBRef.current);
    safePlay(videoARef.current);
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        safePlay(activeLayerRef.current === 0 ? videoARef.current : videoBRef.current);
      }
    };
    const watchdog = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      const currentVideo = activeLayerRef.current === 0 ? videoARef.current : videoBRef.current;
      if (currentVideo?.paused && !transitionLockedRef.current) safePlay(currentVideo);
    }, 1800);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(watchdog);
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    };
  }, [prepareVideo, safePlay]);

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease } },
  };

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100svh" }}>
      {/* Full-bleed video background */}
      <div className="absolute inset-0 z-0">
        {sources.map((src, layer) => (
          <video
            key={`hero-video-layer-${layer}`}
            ref={layer === 0 ? videoARef : videoBRef}
            src={src}
            autoPlay={layer === 0}
            muted
            playsInline
            preload="auto"
            onCanPlay={() => {
              if (layer === activeLayerRef.current) safePlay(layer === 0 ? videoARef.current : videoBRef.current);
            }}
            onTimeUpdate={(event) => handleTimeUpdate(layer as 0 | 1, event.currentTarget)}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out"
            style={{ opacity: activeLayer === layer ? 1 : 0 }}
          />
        ))}

        {/* Natural, warm cinematic overlay — deep navy tones, not dark blue */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(120deg, hsl(218 60% 9% / 0.44) 0%, hsl(218 52% 18% / 0.36) 50%, hsl(148 42% 16% / 0.22) 100%)",
          }}
        />
        {/* Bottom vignette for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{ background: "linear-gradient(to top, hsl(218 60% 9% / 0.32), transparent)" }}
        />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, hsl(218 60% 9% / 0.15), transparent)" }}
        />

        {/* Flash transition */}
        <div
          className="absolute inset-0 bg-white transition-opacity duration-500 ease-out pointer-events-none"
          style={{ opacity: whiteTransition ? 0.12 : 0 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[100svh] flex flex-col justify-center pt-36 lg:pt-44 pb-20 px-6 md:px-10 max-w-7xl mx-auto w-full">
        <motion.div
          className="max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Location badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-[0.68rem] font-bold uppercase tracking-[0.22em]"
              style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.14)" }}
            >
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(var(--cna-sage-light))" }} />
              Boston, Massachusetts
            </span>
          </motion.div>

          {/* Main headline — Playfair editorial style */}
          <motion.h1
            variants={fadeUp}
            className="font-bold text-white leading-[1.06] mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.8rem, 6.5vw, 5.8rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Your home deserves{" "}
            <span
              className="block italic font-normal"
              style={{ color: "hsl(148 42% 72%)" }}
            >
              more than clean.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-white max-w-lg mb-10 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2vw, 1.175rem)", fontFamily: "var(--font-body)" }}
          >
            We give Boston families back the one thing that truly matters: time. Trusted, insured, and deeply personal home cleaning by CNA MAIDPRO.
          </motion.p>

          {/* CTA Row */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
            <button
              id="hero-cta-quote"
              onClick={() => navigate("/quote")}
              className="btn-sage group"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-cta-services"
              onClick={() => navigate("/services")}
              className="btn-outline-white"
            >
              Our Services
            </button>
          </motion.div>

          {/* Trust indicators row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-6 md:gap-10"
          >
            {/* Stars + Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4" style={{ fill: "hsl(148 42% 68%)", color: "hsl(148 42% 68%)" }} />
                ))}
              </div>
              <span className="text-white/80 text-sm font-semibold">5.0 on Google</span>
            </div>

            <div className="w-px h-6 bg-white/20 hidden md:block" />

            {/* Phone */}
            <a
              href="tel:9782357033"
              className="flex items-center gap-3 group"
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--cna-sage))" }}>
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/50 text-[0.6rem] uppercase tracking-[0.2em] font-bold">Call us free</p>
                <p className="text-white font-bold text-lg">978.235.7033</p>
              </div>
            </a>

            <div className="w-px h-6 bg-white/20 hidden md:block" />

            {/* Quick stat */}
            <div>
              <p className="text-white font-bold text-2xl leading-tight" style={{ fontFamily: "var(--font-heading)" }}>500+</p>
              <p className="text-white/50 text-[0.65rem] uppercase tracking-[0.16em] font-bold">Boston Families</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom accent bar — Sage green, not gold */}
      <div className="absolute bottom-0 inset-x-0 z-20">
        <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, hsl(var(--cna-sage-dark)), hsl(var(--cna-sage-light)), hsl(var(--cna-sage-dark)))" }} />
      </div>
    </section>
  );
}
