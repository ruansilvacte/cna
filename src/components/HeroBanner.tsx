import { motion } from "framer-motion";
import { useHomeContent } from "@/hooks/useHomeContent";
import { useNavigate } from "react-router-dom";
import { Phone, Sparkles, ShieldCheck, Star } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

const HERO_VIDEOS = [
  "/videos/hero1.mp4",
  "/videos/hero2.mp4",
  "/videos/hero3.mp4",
  "/videos/hero4.mp4",
  "/videos/hero5.mp4",
  "/videos/hero6.mp4",
  "/videos/hero7.mp4",
  "/videos/hero8.mp4",
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export default function HeroBanner() {
  const { data: content } = useHomeContent();
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
    } catch {
      /* noop */
    }
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
      try {
        nextVideo.currentTime = 0;
      } catch {
        /* noop */
      }
      safePlay(nextVideo);
    }

    currentIndexRef.current = nextIndex;
    activeLayerRef.current = nextLayer;
    setActiveLayer(nextLayer);

    if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = window.setTimeout(() => {
      if (currentVideo) {
        currentVideo.pause();
        try {
          currentVideo.currentTime = 0;
        } catch {
          /* noop */
        }
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

  useEffect(() => {
    activeLayerRef.current = activeLayer;
  }, [activeLayer]);

  useEffect(() => {
    prepareVideo(videoARef.current);
    prepareVideo(videoBRef.current);
    safePlay(activeLayerRef.current === 0 ? videoARef.current : videoBRef.current);
  }, [prepareVideo, safePlay, sources]);

  // Kick off initial play, keep autoplay alive, and preload the next clip.
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

  return (
    <section className="relative w-full overflow-hidden aspect-[16/9] min-h-[600px] max-h-[88vh] flex items-center pt-20 md:pt-24 pb-16 md:pb-24">
      {/* Full background video, sequenced autoplay with white-only transition */}
      <div className="absolute inset-0 z-0 bg-primary/20">
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
            onEnded={() => {
              if (layer === activeLayerRef.current) advance();
            }}
            onError={() => {
              if (layer === activeLayerRef.current) advance();
            }}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-out"
            style={{ opacity: activeLayer === layer ? 1 : 0 }}
          />
        ))}

        {/* Dark gradient overlay matching About hero */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, hsl(30 10% 15% / 0.90) 0%, hsl(30 10% 20% / 0.80) 50%, hsl(var(--brand-pink) / 0.35) 100%)",
          }}
        />

        {/* White-only transition veil between videos */}
        <div
          className="absolute inset-0 bg-white transition-opacity duration-500 ease-out"
          style={{ opacity: whiteTransition ? 0.42 : 0 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >

          <motion.h1
            variants={fadeUp}
            className="font-light leading-[1.02] tracking-[-0.02em] text-[2.6rem] md:text-[4.2rem] lg:text-[5rem] mb-6 text-white"
            style={{ fontFamily: "var(--font-heading)", textShadow: "0 2px 30px hsl(var(--primary) / 0.4)" }}
          >
            {content?.home_hero_title_line1 || "A truly cared-for"}
            <br />
            <em
              className="not-italic font-normal italic"
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                color: "hsl(var(--brand-pink))",
              }}
            >
              {content?.home_hero_title_line2 || "home, every time."}
            </em>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg leading-relaxed max-w-xl mb-9 text-white/90"
          >
            {content?.home_hero_description ||
              "WeHome Cleaning delivers tranquility, consistency, and the elevated experience of arriving home to a space that's been treated with genuine care, across Massachusetts and North Carolina."}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => navigate("/quote")}
              className="px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 text-white"
              style={{
                background: "var(--gradient-blue)",
                boxShadow: "var(--shadow-luxe)",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.02em",
              }}
            >
              Request a Free Quote
            </button>
            <button
              onClick={() => navigate("/services")}
              className="px-7 py-3.5 rounded-full text-sm font-semibold border transition-all duration-300 hover:-translate-y-0.5 text-white backdrop-blur-md"
              style={{
                borderColor: "hsl(0 0% 100% / 0.4)",
                background: "hsl(0 0% 100% / 0.1)",
              }}
            >
              Explore Our Services
            </button>
          </motion.div>

          {/* Trust strip */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 md:gap-7 text-xs text-white/85">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "hsl(var(--brand-pink))" }} />
                ))}
              </div>
              <span>5.0 · Google Reviews</span>
            </div>
            <div className="h-4 w-px bg-white/30" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: "hsl(var(--brand-pink))" }} />
              Licensed · Bonded · Insured
            </div>
            <div className="h-4 w-px hidden md:block bg-white/30" />
            <a href="tel:+18135202535" className="hidden md:flex items-center gap-2 hover:opacity-80 transition text-white">
              <Phone className="w-3.5 h-3.5" />
              <span className="font-semibold">(813) 520-2535</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
