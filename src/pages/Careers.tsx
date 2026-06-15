import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import SeoHead from "@/components/SeoHead";
import { DollarSign, Briefcase, Heart, CheckCircle2, ArrowRight, Loader2, Send, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Careers() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zip_code: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("leads").insert({
        ...formData,
        notes: `CAREER APPLICATION: ${formData.message}`
      });

      if (error) throw error;

      toast({
        title: "Application Received",
        description: "Thank you for your interest! We will contact you soon.",
      });
      setFormData({ name: "", email: "", phone: "", zip_code: "", message: "" });
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/careers" fallbackTitle="Join Our Team | CNA MAIDPRO" />
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-10 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "hsl(var(--primary))" }} />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label text-accent mb-4">Work For Us</motion.p>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
                className="heading-display text-primary mb-6" 
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
                Grow with a <br />
                <span className="text-secondary-blue italic">positive team.</span>
            </motion.h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Join an <strong className="text-primary">outstanding cleaning services company</strong> where professionals are valued and rewarded for their excellence.
              <br />
              Competitive pay <span className="font-bold text-secondary-blue">$700 - $1,000</span> per week with weekly payroll via direct deposit.
            </p>
        </div>
      </section>

      {/* Perks & Pay */}
      <section className="pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
           <div className="space-y-10">
              <div className="bg-secondary/40 p-10 rounded-[3rem] border border-border/40 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                     <DollarSign className="w-20 h-20" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Competitive Earnings</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                     <span className="text-5xl font-extrabold text-primary" style={{ fontFamily: "var(--font-heading)" }}>$700 to $1,000</span>
                     <span className="text-muted-foreground font-medium">/ week</span>
                  </div>
                  <p className="text-primary/70 text-sm italic">Direct deposit weekly payroll for your total convenience.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                 {[
                   { icon: Heart, title: "Positive work environment", text: "Work with supportive owners and professional peers in a healthy atmosphere." },
                   { icon: Briefcase, title: "Opportunity for professional growing", text: "We value internal promotion and career advancement." },
                   { icon: CheckCircle2, title: "Products, equipment and uniforms provided", text: "We provide everything you need to deliver excellence." },
                   { icon: Star, title: "Performanced based incentives", text: "Rewarding our top performers for their consistency and dedication." },
                 ].map((perk, i) => (
                    <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-border/40 shadow-sm transition-all hover:shadow-md">
                       <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-6">
                          <perk.icon className="w-6 h-6" strokeWidth={1.5} />
                       </div>
                       <h4 className="font-bold text-primary mb-2" style={{ fontFamily: "var(--font-heading)" }}>{perk.title}</h4>
                       <p className="text-xs text-muted-foreground leading-relaxed">{perk.text}</p>
                    </div>
                 ))}
              </div>
           </div>

           {/* Form */}
           <div className="bg-primary p-10 md:p-14 rounded-[3.5rem] shadow-2xl relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent rounded-full -mr-10 -mt-10 opacity-20 blur-3xl" />
              <h3 className="heading-display text-white mb-8" style={{ fontSize: "2.2rem" }}>Apply in <em className="text-accent-light">seconds.</em></h3>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3 ml-1">Full Name</label>
                      <input required type="text" placeholder="First Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                         className="w-full px-6 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-white/20" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3 ml-1">Email</label>
                      <input required type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                         className="w-full px-6 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-white/20" />
                    </div>
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3 ml-1">Phone Number</label>
                      <input required type="tel" placeholder="978.235.7033" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                         className="w-full px-6 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-white/20" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3 ml-1">Zip Code</label>
                      <input required type="text" placeholder="01234" value={formData.zip_code} onChange={e => setFormData({...formData, zip_code: e.target.value})}
                         className="w-full px-6 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-white/20" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3 ml-1">Tell us about your experience</label>
                    <textarea rows={4} placeholder="I have 2 years of experience in residential cleaning..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                       className="w-full px-6 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-white/20 resize-none" />
                 </div>
                 
                 <button type="submit" disabled={loading}
                    className="w-full bg-accent hover:bg-accent-dark text-white py-5 rounded-2xl font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Submit Application</>}
                 </button>
              </form>
           </div>
        </div>
      </section>

      <Footer />
      <FloatingCallButton />
    </div>
  );
}
