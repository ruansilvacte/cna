import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { MapPin, Phone, ArrowRight, ShieldCheck, Star } from "lucide-react";
import { useServiceAreas } from "@/hooks/useServiceAreas";

const defaultCityImages: { src: string; label: string }[] = [
  { src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80", label: "Premium Homes" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", label: "Local Communities" },
  { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80", label: "Trusted Neighborhoods" },
];

function RegionCarousel({ regionName }: { regionName: string }) {
  const images = defaultCityImages;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % images.length), 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-56 rounded-[2rem] overflow-hidden mb-6 bg-muted group">
      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.label}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
      <div className="absolute bottom-6 left-8">
        <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1 block">
          {regionName}
        </span>
        <p className="text-white text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          {images[current].label}
        </p>
      </div>
    </div>
  );
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function ServiceAreas() {
  const { data: dbAreas = [], isLoading } = useServiceAreas(true);

  const groupedAreas = dbAreas.reduce<Record<string, typeof dbAreas>>((acc, area) => {
    const region = area.region || "Other Areas";
    if (!acc[region]) acc[region] = [];
    acc[region].push(area);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/service-areas" fallbackTitle="Our Service Areas | CNA MAIDPRO" />
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-10 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "hsl(var(--primary))" }} />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label text-accent mb-4">Massachusetts Presence</motion.p>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
                className="heading-display text-primary mb-6" 
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
                Where professional clean <br />
                <span className="text-secondary-blue italic">meets your community.</span>
            </motion.h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
               Proudly serving families across the Massachusetts region with a commitment to local excellence and absolute reliability.
            </p>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="rounded-[2.5rem] bg-muted animate-pulse h-[400px]" />
                ))
              : Object.entries(groupedAreas).map(([regionName, regionAreas], i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  className="bg-white rounded-[3rem] border border-border/40 p-10 hover:shadow-[var(--shadow-luxe)] transition-all duration-500"
                >
                  <RegionCarousel regionName={regionName} />
                  <div className="flex flex-wrap gap-3">
                    {regionAreas.map((area) => (
                      <span
                        key={area.id}
                        className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-secondary text-primary border border-primary/5"
                      >
                        {area.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
                ))}
          </div>

          {/* Stats bar */}
          <motion.div
            className="mt-20 rounded-[3rem] px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white relative overflow-hidden"
            style={{ background: "var(--gradient-blue)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6" />
               </div>
              <span className="text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>100+</span>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-2">ZIP Codes Covered</p>
            </div>
            <div className="relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6" />
               </div>
              <span className="text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>5.0 ★</span>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-2">Average Rating</p>
            </div>
            <div className="relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-6 h-6" />
               </div>
              <span className="text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>10k+</span>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-2">Service Hours</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-24 px-6 md:px-10">
        <motion.div
          className="max-w-5xl mx-auto rounded-[3.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl"
          style={{ background: "var(--gradient-blue)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="heading-display mb-8" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
               Experience the <br />
               <em className="italic" style={{ color: "hsl(var(--accent-light))" }}>MaidPro difference.</em>
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="/quote" className="btn-primary bg-white text-primary hover:bg-white/95 px-12">Get Free Rate Quote <ArrowRight className="w-4 h-4 ml-2" /></a>
              <a href="tel:9782357033" className="flex items-center gap-2 font-bold text-xl hover:text-accent-light transition-colors">
                <Phone className="w-5 h-5" /> 978.235.7033
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
