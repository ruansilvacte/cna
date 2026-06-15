import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import SeoHead from "@/components/SeoHead";
import { Phone, Mail, Instagram, Clock, MapPin, Facebook, Loader2, AlertCircle, Send, CheckCircle2 } from "lucide-react";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  zip_code: z.string().trim().min(3, "Zip code is required").max(20),
  notes: z.string().trim().max(1000).optional(),
});
type QuoteFields = z.infer<typeof quoteSchema>;
type FieldErrors = Partial<Record<keyof QuoteFields, string>>;

const contactCards = [
  {
    icon: Phone,
    label: "Call Now",
    value: "978.235.7033",
    href: "tel:+19782357033",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "cnamaidprobos@gmail.com",
    href: "mailto:cnamaidprobos@gmail.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@cnamaidpro",
    href: "https://www.instagram.com/cnamaidpro/",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "CNA MAIDPRO",
    href: "https://www.facebook.com/cnamaidpro",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon to Fri · 9:00 AM to 5:00 PM",
  },
  {
    icon: MapPin,
    label: "Service Area",
    value: "Massachusetts",
  },
];

export default function Contact() {
  const navigate = useNavigate();
  const [fields, setFields] = useState<QuoteFields>({
    name: "", email: "", phone: "", zip_code: "", notes: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof QuoteFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = quoteSchema.safeParse(fields);
    if (!parsed.success) {
      const next: FieldErrors = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof QuoteFields;
        if (!next[k]) next[k] = i.message;
      });
      setErrors(next);
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      zip_code: parsed.data.zip_code,
      notes: parsed.data.notes || null,
    });
    if (error) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or call us directly.");
      return;
    }
    navigate("/thank-you");
  };

  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/contact" fallbackTitle="Contact | CNA MAIDPRO" />
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-10 bg-white relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "hsl(var(--primary))" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "hsl(var(--accent))" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="section-label text-accent mb-4"
              >
                Contact Us
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="heading-display text-primary mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Let's start your <br />
                <span className="text-secondary-blue italic">best cleaning experience.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
              >
                Whether you have a question, need a custom estimate, or want to schedule your first visit, our team is here to help you reclaim your time.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center md:items-end gap-3"
            >
              <a href="tel:9782357033" className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary text-white shadow-lg shadow-primary/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Call Directly</p>
                  <p className="text-xl font-bold text-primary">978.235.7033</p>
                </div>
              </a>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactCards.filter(c => c.label !== "Call Now").map((card, i) => {
              const Icon = card.icon;
              const inner = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                  className="h-full p-8 rounded-3xl border border-border bg-card hover:shadow-[0_8px_48px_-12px_hsl(211_28%_17%/0.12)] transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-secondary text-primary">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <p className="section-label text-muted-foreground mb-2">{card.label}</p>
                  <p className="text-lg font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                    {card.value}
                  </p>
                </motion.div>
              );
              return card.href ? (
                <a key={card.label} href={card.href} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={card.label}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="quote-form" className="py-24 px-6 md:px-10" style={{ background: "hsl(var(--brand-blush))" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="section-label text-accent mb-4">Request a Quote</motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="heading-display text-primary mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Get your free estimate
            </motion.h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fill out the form below and we'll reach out within 24 hours with a personalized plan for your home.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[var(--shadow-luxe)] border border-border/40"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3 pl-1">Full name *</label>
                  <input
                    type="text"
                    required
                    value={fields.name} 
                    onChange={set("name")} 
                    className={`w-full px-5 py-4 rounded-2xl border bg-secondary/30 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.name ? "border-destructive" : "border-border"}`}
                    placeholder="John Smith" 
                  />
                  {errors.name && <p className="text-xs text-destructive mt-2 pl-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3 pl-1">Email address *</label>
                  <input
                    type="email"
                    required
                    value={fields.email} 
                    onChange={set("email")} 
                    className={`w-full px-5 py-4 rounded-2xl border bg-secondary/30 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.email ? "border-destructive" : "border-border"}`}
                    placeholder="john@example.com" 
                  />
                  {errors.email && <p className="text-xs text-destructive mt-2 pl-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3 pl-1">Phone number *</label>
                  <input
                    type="tel"
                    required
                    value={fields.phone} 
                    onChange={set("phone")} 
                    className={`w-full px-5 py-4 rounded-2xl border bg-secondary/30 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.phone ? "border-destructive" : "border-border"}`}
                    placeholder="978.235.7033" 
                  />
                  {errors.phone && <p className="text-xs text-destructive mt-2 pl-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3 pl-1">Zip code *</label>
                  <input
                    type="text"
                    required
                    value={fields.zip_code} 
                    onChange={set("zip_code")} 
                    className={`w-full px-5 py-4 rounded-2xl border bg-secondary/30 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.zip_code ? "border-destructive" : "border-border"}`}
                    placeholder="01234" 
                  />
                  {errors.zip_code && <p className="text-xs text-destructive mt-2 pl-1">{errors.zip_code}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3 pl-1">How can we help? <span className="opacity-50 normal-case tracking-normal font-normal">(optional)</span></label>
                <textarea
                  rows={4}
                  value={fields.notes} 
                  onChange={set("notes")} 
                  className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/30 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  placeholder="Tell us about your home, desired frequency, and any special requests..." 
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-destructive/10 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-xs text-muted-foreground text-center md:text-left max-w-xs">
                  By clicking send, you agree to be contacted by CNA MAIDPRO regarding your cleaning request.
                </p>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full md:w-auto btn-primary px-10 py-5"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Request <Send className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Trust section on contact page */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-accent" />
              <span className="section-label text-primary">Fully Insured</span>
           </div>
           <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-accent" />
              <span className="section-label text-primary">Background Checked</span>
           </div>
           <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-accent" />
              <span className="section-label text-primary">5 Star Google Rating</span>
           </div>
        </div>
      </section>

      <Footer />
      <FloatingCallButton />
    </div>
  );
}
