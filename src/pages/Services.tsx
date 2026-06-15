import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { ArrowRight, Phone, CheckCircle2, ShieldCheck, Sparkles, Building2, Home, Star, PlusCircle } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const mainServices = [
  {
    title: "Regular Cleaning",
    description: "Recommended for homes that want to maintain a high standard of cleanliness with consistency. We keep your house free of dust, cobwebs, and dirt so the environment remains harmonious.",
    slug: "regular-cleaning",
    image: "/images/regular-cleaning.jpg",
    checklists: [
      { 
        title: "Kitchen", 
        items: ["Countertops & shelves disinfected", "Sink & backsplash washed", "Cabinet fronts cleaned", "Appliance exteriors wiped", "Microwave cleaned inside/out", "Garbage bins emptied", "Floors vacuumed & washed"] 
      },
      { 
        title: "Bathrooms", 
        items: ["Tub, shower & glass disinfected", "Toilet sanitized inside & out", "Mirrors cleaned", "Cabinet fronts wiped", "Sinks & faucets polished", "Baseboards & blinds dusted", "Trash emptied"] 
      },
      { 
        title: "Living Areas & Bedrooms", 
        items: ["All surfaces dusted/disinfected", "Cobwebs removed", "Mirrors cleaned", "Window sills & blinds dusted", "Light organization", "Beds made", "Floors vacuumed & mopped"] 
      }
    ]
  },
  {
    title: "Deep Cleaning",
    description: "A spa treatment for your home! Essential if you haven't had a professional clean recently. We focus on areas often forgotten, removing heavy dirt buildup.",
    slug: "deep-cleaning",
    image: "/images/deep-cleaning.jpg",
    is_featured: true,
    checklists: [
      { 
        title: "Includes Regular Cleaning +", 
        items: ["Ceiling fan blades", "Light fixtures & domes", "Molding, woodwork & doorframes", "Baseboards (detailed dusting)", "Picture frames & decor", "Inside microwave", "Behind furniture (where accessible)", "Stovetop & range hood"] 
      }
    ]
  },
  {
    title: "Move In / Out",
    description: "Moving is stressful, let us shoulder the burden. We pay extra attention to detail to ensure your old property is sparkling or your new one is ready for your family.",
    slug: "move-in-out",
    image: "/images/move-in.jpg",
    checklists: [
      { 
        title: "Detailed Property Turnover", 
        items: ["All add-ons included", "Inside all cabinets & drawers", "Inside oven & fridge", "Inside windows & tracks", "Detailed baseboard washing", "Full property sanitization"] 
      }
    ]
  }
];

const addons = [
  { name: "Inside Oven", price: "$40" },
  { name: "Inside Fridge", price: "$40" },
  { name: "Inside Windows", price: "$20" },
  { name: "Outside Windows (Track included)", price: "$45" },
  { name: "Inside Cabinets", price: "$60 to $100" },
  { name: "Basboards (Wash)", price: "$50" },
  { name: "Wood Blinds (Dry Clean)", price: "$10 each" },
  { name: "Couches Vacuumed", price: "$20" },
  { name: "Porch Cleaning", price: "$20" }
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/services" fallbackTitle="Our Services | CNA MAIDPRO" />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label text-accent mb-4">Expertise That Cares</motion.p>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
                className="heading-display text-primary mb-6" 
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
                Restoring your lar, <br />
                <span className="text-secondary-blue italic">one detail at a time.</span>
            </motion.h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our commitment goes beyond a clean and fragrant house; our commitment is to give you back a harmonious home.
            </p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-24">
          {mainServices.map((service, i) => (
            <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
               className={`group flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-start`}
            >
               <div className="lg:w-1/2 w-full">
                  <div className="rounded-[3rem] overflow-hidden shadow-2xl relative" style={{ aspectRatio: "16/10" }}>
                     <img 
                       src={service.image} 
                       alt={service.title} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                       loading={i === 0 ? "eager" : "lazy"}
                       fetchPriority={i === 0 ? "high" : "auto"}
                       decoding="async"
                     />
                     {service.is_featured && (
                        <div className="absolute top-8 left-8 glass-white px-4 py-2 rounded-full text-primary font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                           <Sparkles className="w-3 h-3 text-accent" /> Recommended choice
                        </div>
                     )}
                  </div>
               </div>
               <div className="lg:w-1/2 w-full space-y-8 py-4">
                  <div>
                    <h2 className="heading-display text-primary mb-4" style={{ fontSize: "2.8rem" }}>{service.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                     {service.checklists.map((check, idx) => (
                        <div key={idx} className="space-y-4">
                           <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-dark">{check.title}</h4>
                           <ul className="space-y-2.5">
                              {check.items.map((item, itemIdx) => (
                                 <li key={itemIdx} className="flex gap-2.5 text-sm text-foreground/80 leading-snug">
                                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                    {item}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </div>

                  <a href="/quote" className="btn-primary inline-flex mt-4">Book this service <ArrowRight className="w-4 h-4 ml-2" /></a>
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-24 px-6 md:px-10 bg-secondary/30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
           <div className="lg:w-1/3">
              <span className="section-label text-accent mb-4">Add-On Services</span>
              <h2 className="heading-display text-primary mb-6" style={{ fontSize: "2.8rem" }}>A custom <em className="italic text-secondary-blue">finishing touch.</em></h2>
              <p className="text-muted-foreground mb-8">Personalize your experience by adding specialty cleaning to any standard appointment.</p>
              <div className="flex items-center gap-4 p-8 rounded-[2rem] bg-white border border-border shadow-sm">
                 <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <PlusCircle className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-primary">Need something else?</p>
                    <p className="text-xs text-muted-foreground">Contact us for custom cleaning tasks.</p>
                 </div>
              </div>
           </div>
           
           <div className="lg:w-2/3">
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
                 {addons.map((add, i) => (
                    <div key={i} className="flex items-center justify-between py-4 border-b border-border/60">
                       <span className="font-bold text-primary text-sm uppercase tracking-wide">{add.name}</span>
                       <span className="text-accent font-bold text-sm">{add.price}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-24 px-6 md:px-10">
         <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-start gap-12">
            <div className="flex gap-6 max-w-sm">
               <div className="w-16 h-16 rounded-[1.5rem] bg-secondary flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
               </div>
               <div>
                  <h4 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: "var(--font-heading)" }}>100% Insured</h4>
                  <p className="text-sm text-muted-foreground">Peace of mind for your home and family. We are fully bonded and insured across all service areas.</p>
               </div>
            </div>
            <div className="flex gap-6 max-w-sm">
               <div className="w-16 h-16 rounded-[1.5rem] bg-secondary flex items-center justify-center text-primary shrink-0">
                  <Star className="w-8 h-8" strokeWidth={1.5} />
               </div>
               <div>
                  <h4 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: "var(--font-heading)" }}>Trained Teams</h4>
                  <p className="text-sm text-muted-foreground">Professionals who go beyond physical cleaning to foster well-being in your living space.</p>
               </div>
            </div>
            <div className="flex gap-6 max-w-sm">
               <div className="w-16 h-16 rounded-[1.5rem] bg-secondary flex items-center justify-center text-primary shrink-0">
                  <Building2 className="w-8 h-8" strokeWidth={1.5} />
               </div>
               <div>
                  <h4 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: "var(--font-heading)" }}>10+ Years Expertise</h4>
                  <p className="text-sm text-muted-foreground">Consolidated experience delivering quality and reliability that Massachusetts families trust.</p>
               </div>
            </div>
         </div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
