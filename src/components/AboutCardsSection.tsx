import { motion } from "framer-motion";
import { ShieldCheck, Heart, Star, Clock, CheckCircle2, UserCheck, Shield } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const reasonCards = [
  {
    icon: UserCheck,
    title: "Trusted Professionals",
    description: "Every member of our team is background checked, hospitality trained, and committed to integrity in every visit.",
  },
  {
    icon: Shield,
    title: "Fully Insured Team",
    description: "Your peace of mind is paramount. We carry full liability and workers insurance to protect your home and our staff.",
  },
  {
    icon: Heart,
    title: "Family Owned Company",
    description: "Built on family values, we treat your home with the same care and respect as we would our own.",
  },
  {
    icon: CheckCircle2,
    title: "Attention to Detail",
    description: "We don't just clean, we restore. Our precision driven approach ensures every corner meets our premium standard.",
  },
  {
    icon: Clock,
    title: "Reliable Scheduling",
    description: "Consistency you can count on. We value your time and arrive on schedule to maintain your home's rhythm.",
  },
  {
    icon: Star,
    title: "Exceptional Customer Care",
    description: "Personalized service is at our core. We listen, adapt, and go above and beyond to exceed your expectations.",
  },
];

export default function AboutCardsSection() {
  return (
    <section className="w-full py-24 md:py-32 px-6 md:px-10 bg-secondary/30 relative overflow-hidden">
      {/* Decorative background element */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{ background: "hsl(var(--primary))" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.p
            className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-accent"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Core Values
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight font-bold text-primary mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            Why Choose CNA MAIDPRO
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We deliver more than a clean space. We provide the foundation for a better quality of life through trust, consistency, and professional excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasonCards.map((card, idx) => (
            <motion.div
              key={idx}
              className="group bg-white p-8 md:p-10 rounded-[2rem] border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease }}
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-8 transition-colors duration-300 group-hover:bg-primary group-hover:text-white text-primary">
                <card.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h3
                className="text-2xl font-bold mb-4 text-primary"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* Trust badge row */}
        <motion.div 
          className="mt-20 pt-10 border-t border-border/50 flex flex-wrap justify-center items-center gap-8 md:gap-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <span className="font-bold text-sm uppercase tracking-widest text-primary">Fully Insured</span>
          </div>
          <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <UserCheck className="w-6 h-6 text-primary" />
            <span className="font-bold text-sm uppercase tracking-widest text-primary">Vetted Staff</span>
          </div>
          <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <Star className="w-6 h-6 text-primary" />
            <span className="font-bold text-sm uppercase tracking-widest text-primary">5 Star Rated</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
