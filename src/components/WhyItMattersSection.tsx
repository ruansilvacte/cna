import { motion } from "framer-motion";
import { Heart, Sparkles, Coffee, Users } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const emotionalPoints = [
  {
    icon: Coffee,
    title: "A cleaner home. A calmer life.",
    description: "Your environment directly impacts your well-being. We create the serenity you need to recharge and find peace after a long day.",
  },
  {
    icon: Heart,
    title: "More family time starts at home.",
    description: "Reclaim the hours spent on chores and invest them where they matter most: with the people you love, creating memories that last.",
  },
  {
    icon: Sparkles,
    title: "We clean so you can enjoy life.",
    description: "Whether it's hosting friends or enjoying a quiet evening, our professional touch ensures your home is always ready for life's best moments.",
  },
];

export default function WhyItMattersSection() {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 md:px-10 overflow-hidden bg-white">
      {/* Subtle decorative shapes */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{ background: "hsl(var(--accent))" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.02] blur-3xl pointer-events-none"
        style={{ background: "hsl(var(--primary))" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <motion.div
            className="lg:col-span-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-accent"
            >
              The CNA MAIDPRO Difference
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-[4rem] leading-[1.1] tracking-tight font-bold text-primary mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              We Care for Your Home So <br className="hidden md:block" />
              <span className="text-secondary-blue italic">You Can Care for Yourself</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
              We believe your home should be a sanctuary, not a series of endless tasks. Our mission is to handle the precision and care of your cleaning so you can reclaim your time and enjoy a stress free lifestyle.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {emotionalPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={i}
                className="group relative flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-secondary/20 border border-border/10 hover:bg-white hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-white shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-6"
                >
                  <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-2xl font-bold text-primary leading-tight mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {point.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed italic">"{point.description}"</p>
              </motion.div>
            );
          })}
        </div>
        
        {/* Memory section / Emotional story footer */}
        <motion.div 
          className="mt-20 p-10 md:p-16 rounded-[3rem] bg-primary text-white overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          {/* Subtle light effect */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h4 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                Because some moments are priceless
              </h4>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Imagine coming home to the scent of fresh sheets and sparkling surfaces. Instead of reaching for a mop, you reach for a book, or play with your kids, or prepare a quiet dinner with your partner. That's the peace of mind we deliver every single day.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="w-12 h-12 rounded-full border-2 border-primary bg-secondary/20 flex items-center justify-center overflow-hidden">
                       <Users className="w-6 h-6 text-white/40" />
                    </div>
                  ))}
                </div>
                <span className="text-sm font-semibold text-accent-light uppercase tracking-widest">Trusted by 500+ local families</span>
              </div>
            </div>
            <div className="flex justify-center flex-col items-center">
              <div className="relative w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
                <video
                  src="/videos/why.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "9/16", maxHeight: "400px", objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
