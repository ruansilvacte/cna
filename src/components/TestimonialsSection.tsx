import { motion } from "framer-motion";
import { Star, Quote, CheckCircle } from "lucide-react";
import { useHomeContent } from "@/hooks/useHomeContent";
import { useNavigate } from "react-router-dom";

/* Boston-area reviews */
const homeReviews = [
  {
    text: "I walked into my home after their first visit and just stood there. Every surface was spotless, even the places I forgot to mention. CNA MAIDPRO is something special.",
    name: "Olivia M.",
    place: "Boston, MA",
    service: "Regular Cleaning",
    featured: true,
  },
  {
    text: "As a Boston mom of three, I was drowning. CNA MAIDPRO gave me my weekends back. I can't put a price on that.",
    name: "Sarah K.",
    place: "Cambridge, MA",
    service: "Recurring Service",
  },
  {
    text: "They asked about our pets and our cleaning preferences before quoting. Felt like hiring a partner, not a vendor. Outstanding service.",
    name: "Marcus T.",
    place: "South End",
    service: "Regular Cleaning",
  },
  {
    text: "Moved into a new apartment and it was rough. CNA MAIDPRO transformed it. I actually cried. It looked brand new.",
    name: "Priya R.",
    place: "Brookline, MA",
    service: "Move In Cleaning",
  },
];

function StarsRow({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + i * 0.06, duration: 0.3, type: "spring", stiffness: 300 }}
        >
          <Star
            className="w-3.5 h-3.5"
            style={{ fill: "hsl(var(--cna-sage))", color: "hsl(var(--cna-sage))" }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const navigate = useNavigate();
  const { data: content } = useHomeContent();
  const scale = parseFloat(content?.home_font_scale_testimonials || "1") || 1;

  return (
    <section
      className="relative w-full py-24 md:py-32 px-6 lg:px-10 overflow-hidden bg-white"
    >
      {/* Soft wash backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.03]"
          style={{ background: "hsl(var(--cna-sage))" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.03]"
          style={{ background: "hsl(var(--cna-navy))" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-6">Voices Across Boston</p>
            <h2
              className="heading-display leading-[1.05]"
              style={{
                fontSize: `clamp(${2.5 * scale}rem, ${5 * scale}vw, ${4 * scale}rem)`,
              }}
            >
              The families we <br />
              <em className="italic font-normal text-muted-foreground" style={{ color: "hsl(var(--cna-sage-dark))" }}>
                keep protected.
              </em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button
               onClick={() => navigate("/testimonials")}
               className="group flex flex-col items-start md:items-end gap-2"
            >
               <div className="flex items-center gap-3">
                  <span className="text-4xl md:text-5xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>5.0</span>
                  <div className="flex flex-col items-start">
                     <StarsRow />
                     <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Certified Excellence</span>
                  </div>
               </div>
               <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent-dark border-b border-accent/30 group-hover:border-accent transition-all">
                  Read all 300+ reviews
               </span>
            </button>
          </motion.div>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid md:grid-cols-12 gap-8 lg:gap-10">
           {/* Primary Testimonial */}
           <motion.div
              className="md:col-span-12 lg:col-span-7 bg-[#FDFCFB] rounded-[3.5rem] p-10 md:p-14 border border-border/40 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
           >
              <Quote className="absolute top-10 right-10 w-20 h-20 text-accent/5 group-hover:scale-110 transition-transform duration-700" />
              <StarsRow delay={0.2} />
              <p className="mt-10 text-2xl md:text-3xl leading-snug text-primary font-light mb-12" style={{ fontFamily: "var(--font-heading)" }}>
                 "I walked into my home after their first visit and just stood there. Every surface was spotless, even the places I forgot to mention. <em className="text-accent-dark">CNA MAIDPRO is something special.</em>"
              </p>
              <div className="flex items-center justify-between pt-10 border-t border-border/40">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-lg">O</div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wide">Olivia M.</h4>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Beacon Hill, Boston</p>
                    </div>
                 </div>
                 <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-full border shadow-sm">
                    <CheckCircle className="w-3 h-3 text-accent" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Regular Service</span>
                 </div>
              </div>
           </motion.div>

           {/* Side Stack */}
           <div className="md:col-span-12 lg:col-span-5 space-y-8">
              {homeReviews.slice(1, 3).map((r, i) => (
                 <motion.div
                    key={i}
                    className="p-10 rounded-[2.5rem] bg-white border border-border/50 hover:bg-[#FDFCFB]/50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                 >
                    <div className="mb-6"><StarsRow delay={0.3} /></div>
                    <p className="text-lg text-primary font-light italic mb-8" style={{ fontFamily: "var(--font-heading)" }}>
                       "{r.text}"
                    </p>
                    <div className="flex items-center justify-between border-t border-border/30 pt-6">
                       <h4 className="text-xs font-bold uppercase tracking-widest">{r.name}</h4>
                       <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{r.place}</span>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* Final Home CTA */}
        <motion.div
           className="mt-20 text-center"
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.5 }}
        >
           <button
              onClick={() => navigate("/testimonials")}
               className="btn-outline px-10 py-4 text-[11px] uppercase tracking-widest font-bold hover:bg-primary hover:text-white transition-all rounded-full"
           >
              Experience the CNA MAIDPRO difference
           </button>
        </motion.div>
      </div>
    </section>
  );
}
