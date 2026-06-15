import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { Star, Shield, Users, ArrowUpRight } from "lucide-react";

const partners = [
  {
    name: "Turno",
    description: "Automated scheduling and seamless integration for short term rental turnovers. Our 5 star rating on Turno reflects our commitment to consistent, guest ready results.",
    icon: Star,
    stats: "5.0 ★ Rating",
  },
  {
    name: "Nextdoor",
    description: "Trusted by local communities across Massachusetts. Our presence on Nextdoor connects us with homeowners who value reliability, quality, and neighborhood trust.",
    icon: Users,
    stats: "Top Recommended",
  },
  {
    name: "Google Business",
    description: "Verified business with consistent 5 star reviews. Our Google presence ensures transparency and trust for every potential client who finds us.",
    icon: Shield,
    stats: "5.0 ★ Reviews",
  },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Partnerships() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/partnerships" fallbackTitle="Our Partnerships | CNA MAIDPRO" />
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-10 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "hsl(var(--primary))" }} />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label text-accent mb-4">Trusted Networks</motion.p>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
                className="heading-display text-primary mb-6" 
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
                Platforms that <br />
                <span className="text-secondary-blue italic">trust our quality.</span>
            </motion.h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                Verified across major service platforms, our reputation for quality and reliability is recognized site wide.
            </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner, i) => {
              const Icon = partner.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  className="group"
                >
                  <div className="relative h-full bg-white rounded-[2.5rem] border border-border/40 p-10 flex flex-col items-center text-center shadow-sm hover:shadow-[var(--shadow-luxe)] hover:-translate-y-2 transition-all duration-500">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <Icon className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-primary mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      {partner.name}
                    </h3>
                    
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest">
                       {partner.stats}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {partner.description}
                    </p>

                    <div className="mt-auto pt-8">
                       <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all">
                          <ArrowUpRight className="w-4 h-4" />
                       </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-24 px-6 md:px-10 bg-secondary/30">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-display text-primary mb-8" style={{ fontSize: "2.8rem" }}>A local favorite.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
               "CNA MAIDPRO consistently sets the benchmark for residential cleaning in Massachusetts. Their attention to detail on turnovers is why guests keep coming back."
            </p>
            <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Local Partner Network</p>
         </div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
