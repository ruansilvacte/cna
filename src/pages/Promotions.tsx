import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { Gift, RefreshCw, Sparkles, ArrowRight, Tag } from "lucide-react";

const promotions = [
  {
    icon: Gift,
    tag: "New Clients",
    title: "Introductory Care",
    description: "Experience the CNA MAIDPRO standard with a special introductory rate for new families. Let us show you why we're Massachusetts' preferred choice.",
    cta: "Claim Offer",
  },
  {
    icon: RefreshCw,
    tag: "Recurring Plans",
    title: "Consistency Rewards",
    description: "Lock in exclusive rates with weekly or biweekly plans. Peace of mind is even better when it comes with preferred pricing for our loyal clients.",
    cta: "Start Saving",
  },
  {
    icon: Sparkles,
    tag: "Referral",
    title: "Share the Shine",
    description: "Refer a friend and both of you receive a $50 service credit. Good news travels fast, and quality cleaning is news worth sharing.",
    cta: "Refer a Friend",
  },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Promotions() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/promotions" fallbackTitle="Exclusive Offers | CNA MAIDPRO" />
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-10 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "hsl(var(--primary))" }} />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label text-accent mb-4">Smart Rewards</motion.p>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
                className="heading-display text-primary mb-6" 
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
                Quality that <br />
                <span className="text-secondary-blue italic">gives back.</span>
            </motion.h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
               We believe in rewarding loyalty and welcoming new families into our community with premium value.
            </p>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promotions.map((promo, i) => {
              const Icon = promo.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  className="group"
                >
                  <div className="relative h-full bg-white rounded-[2.5rem] border border-border/40 overflow-hidden shadow-sm hover:shadow-[var(--shadow-luxe)] hover:-translate-y-2 transition-all duration-500">
                    {/* Top Accent */}
                    <div className="h-2 w-full bg-accent" />
                    
                    <div className="p-10 flex flex-col h-full">
                       <div className="flex items-center justify-between mb-8">
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            <Icon className="w-7 h-7" strokeWidth={1.5} />
                          </div>
                          <span className="px-4 py-1.5 rounded-full bg-secondary text-primary text-[10px] font-bold uppercase tracking-widest">
                             {promo.tag}
                          </span>
                       </div>
                       
                       <h3 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                         {promo.title}
                       </h3>

                       <p className="text-muted-foreground text-sm leading-relaxed mb-10">
                         {promo.description}
                       </p>

                       <div className="mt-auto pt-6 border-t border-border/50">
                          <a href="/quote" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent group-hover:gap-4 transition-all">
                             {promo.cta} <ArrowRight className="w-4 h-4" />
                          </a>
                       </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fine Print / Note */}
      <section className="px-6 md:px-10 pb-24">
         <div className="max-w-3xl mx-auto p-12 rounded-[3.5rem] bg-primary text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Tag className="w-24 h-24 rotate-12" />
            </div>
            <p className="text-accent-light text-xs font-bold uppercase tracking-[0.3em] mb-4">Note on Offers</p>
            <p className="text-lg leading-relaxed mb-10 opacity-80">
               Promotions cannot be combined and are subject to availability. Our priority is always maintaining our 5 star quality standard for every client.
            </p>
            <a href="tel:9782357033" className="inline-flex items-center gap-3 text-xl font-bold hover:text-accent-light transition-colors">
               978.235.7033
            </a>
         </div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
