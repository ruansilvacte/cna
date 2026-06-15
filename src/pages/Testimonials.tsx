import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { Star, Quote, CheckCircle } from "lucide-react";

/* 8 real Google reviews — extracted from ava1.jpg through ava8.jpg */
const bostonReviews = [
  {
    name: "Fernando Henrique",
    avatar: "/images/testimonials/ava1.jpg",
    badge: "Local Guide",
    service: "Deep Cleaning",
    text: "I can't say enough good things about this cleaning company. From the moment they arrived, it was clear that they take their work seriously. They were right on time, and their attention to detail was truly impressive. Every nook and cranny of my home was cleaned thoroughly, and I couldn't find a single spot they missed. Not only did they leave my house sparkling clean, but their staff was also friendly and professional throughout the entire process. It's rare to find a cleaning service that combines efficiency with such a high level of customer service. I have used other cleaning companies in the past, but this one stands out as exceptional. If you're looking for a top-notch cleaning service, I highly recommend giving them a call. They've earned every one of these five stars!",
  },
  {
    name: "Susan Campbell",
    avatar: "/images/testimonials/ava2.jpg",
    badge: "7 reviews",
    service: "Move In / Move Out",
    text: "I am VERY pleased with 2 woman who I hired and how thorough they were. I used them today to clean an apartment in my only investment property. The kitchen cabinets, appliances, and bathroom all sparkled. They went above and beyond even doing a few things I'd not asked them to do. They were so pleasant and friendly, and happy to do whatever I asked of them. I have used many cleaning services in both my professional business and in my own home and they top the list. They had such wonderful personalities too. Just the best!!!",
  },
  {
    name: "Grace Bilodeau",
    avatar: "/images/testimonials/ava3.jpg",
    badge: "Local Guide",
    service: "Regular Cleaning",
    text: "Cindi cleaned our home meticulously! It smelled and looked so good. She went above and beyond our expectations and was communicative through the cleaning about what we specifically wanted completed. We have two dogs and a baby and our home now looks like it belongs in a magazine. We switched from our previous cleaner to her based off seeing her work at a relatives home. Can't recommend enough!",
  },
  {
    name: "Samuel Jeronimo",
    avatar: "/images/testimonials/ava4.jpg",
    badge: "4 reviews",
    service: "Recurring Service",
    text: "Our experience with they has been great! Everything was absolutely perfect. I haven't seen our house this clean in years and I couldn't be happier with the service. Team was on time friendly, efficient, and the results were even better than I had expected. Very very grateful to have found Cindi and her team.",
  },
  {
    name: "Jean-Paul Otin",
    avatar: "/images/testimonials/ava5.jpg",
    badge: "1 review",
    service: "Standard Cleaning",
    text: "CNA MaidPro stands out in all five areas. They offer high quality work at a reasonable price, in a professional manner, and are attentive to our questions and always on time.",
  },
  {
    name: "Adriana Turkson",
    avatar: "/images/testimonials/ava6.jpg",
    badge: "6 reviews",
    service: "Deep Cleaning",
    text: "Great communication through out the whole process. The cleaning was deep, no corner was missed. Extremely friendly and accommodating with us.",
  },
  {
    name: "Cristiane Santos",
    avatar: "/images/testimonials/ava7.jpg",
    badge: "1 review",
    service: "Commercial",
    text: "I have Cindi clean our office every two weeks. Her comes on time and leaves the office clean and smelling good. Her manages a good team and is able to execute a wide variety of different services.",
  },
  {
    name: "Daniel Gratzer-Cheney",
    avatar: "/images/testimonials/ava8.jpg",
    badge: "8 reviews",
    service: "Regular Cleaning",
    text: "They are the best cleaning service in the metro-west! Thank you for such great service!",
  },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <SeoHead
        slug="/testimonials"
        fallbackTitle="Client Testimonials | CNA MAIDPRO Boston"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-44 pb-24 px-6 md:px-10 overflow-hidden bg-white">
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.02] blur-3xl pointer-events-none translate-x-1/4 -translate-y-1/4" 
          style={{ background: "hsl(var(--cna-sage))" }} 
        />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent mb-6 bg-accent/5 inline-block px-4 py-1.5 rounded-full">
              The Gold Standard
            </p>
            <h1 
              className="text-5xl md:text-7xl font-light tracking-tight text-primary leading-[1.05] mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Trust is earned in <br />
              <em className="font-normal italic text-accent-dark">every home we touch.</em>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl font-light">
              Voices from across Greater Boston. Discover why families, hosts, and professionals choose CNA MAIDPRO for their most personal spaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats / Proof Line */}
      <section className="border-y border-border/50 bg-[#FDFCFB] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
           {[
             { label: "Client Satisfaction", value: "98%" },
             { label: "Google Rating", value: "5.0 ★" },
             { label: "Cleaning Specialists", value: "Verified" },
             { label: "Trusted Since", value: "2015" }
           ].map((stat, i) => (
             <div key={i} className="flex flex-col items-center">
               <span className="text-primary font-bold text-2xl" style={{ fontFamily: "var(--font-heading)" }}>{stat.value}</span>
               <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</span>
             </div>
           ))}
        </div>
      </section>

      {/* Google Reviews Masonry */}
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {bostonReviews.map((r, i) => (
              <motion.article
                key={i}
                className="break-inside-avoid relative group rounded-[2.5rem] p-10 border border-border/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.07)] overflow-hidden"
                style={{ 
                  background: i % 2 === 0 ? "white" : "hsl(var(--cna-sage-pale) / 0.3)",
                  boxShadow: "0 10px 30px -15px rgba(0,0,0,0.02)"
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease }}
              >
                {/* Visual Flair */}
                <Quote 
                  className="absolute -top-4 -right-4 w-24 h-24 text-accent/5 group-hover:text-accent/10 transition-colors pointer-events-none" 
                />
                
                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-[#FBBC04] text-[#FBBC04]" />
                    ))}
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Google Review</span>
                  </div>

                  {/* Review text */}
                  <p 
                    className="text-base md:text-lg leading-relaxed text-primary/80 font-light italic mb-10"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    "{r.text}"
                  </p>

                  {/* Reviewer info */}
                  <div className="pt-8 border-t border-border/40 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                        <img 
                          src={r.avatar} 
                          alt={r.name} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-primary tracking-wide leading-none mb-1">{r.name}</h4>
                        <p className="text-[10px] font-semibold text-muted-foreground">{r.badge}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border/40 shadow-sm transition-transform group-hover:scale-105 shrink-0">
                       <CheckCircle className="w-3 h-3 text-accent" />
                       <span className="text-[9px] font-bold uppercase tracking-wider text-primary/70">{r.service}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Location Spotlight */}
      <section className="bg-primary py-24 md:py-32 px-6">
         <div className="max-w-5xl mx-auto text-center text-white">
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease }}
            >
               <h2 className="text-3xl md:text-5xl font-light mb-8" style={{ fontFamily: "var(--font-heading)" }}>
                  Ready for the <em className="italic font-normal text-accent-light">MaidPro Standard?</em>
               </h2>
               <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                  Join hundreds of families across Greater Boston who have reclaimed their time and restored their peace of mind.
               </p>
               <div className="flex flex-wrap justify-center gap-6">
                  <Link to="/quote" className="btn-sage px-12 py-5 text-sm uppercase tracking-widest font-bold">
                    Get a Free Estimate
                  </Link>
                  <a href="tel:9782357033" className="flex items-center gap-2 px-10 py-5 rounded-full border border-white/20 hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-widest">
                    Call 978.235.7033
                  </a>
               </div>
            </motion.div>
         </div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
