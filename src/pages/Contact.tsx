import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { Phone, Mail, Instagram, Clock, MapPin, Facebook, Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  zip_code: z.string().trim().min(3, "Zip code is required").max(20),
  square_footage: z.string().trim().max(50).optional(),
  notes: z.string().trim().max(1000).optional(),
});
type QuoteFields = z.infer<typeof quoteSchema>;
type FieldErrors = Partial<Record<keyof QuoteFields, string>>;

const contactCards = [
  {
    icon: Phone,
    label: "Call / WhatsApp",
    value: "+1 (813) 520-2535",
    href: "tel:+18135202535",
  },
  {
    icon: Mail,
    label: "Email",
    value: "wehomecleaning@gmail.com",
    href: "mailto:wehomecleaning@gmail.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@wehomecleaning",
    href: "https://www.instagram.com/wehomecleaning/",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon–Fri · 9:00 AM, 5:00 PM",
  },
  {
    icon: MapPin,
    label: "Service Areas",
    value: "Massachusetts · Charlotte · Huntersville · Waxhaw",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "Follow us on Facebook",
    href: "https://www.facebook.com/profile.php?id=100090796463473",
  },
];

export default function Contact() {
  const [fields, setFields] = useState<QuoteFields>({
    name: "", email: "", phone: "", zip_code: "", square_footage: "", notes: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
      square_footage: parsed.data.square_footage || null,
      notes: parsed.data.notes || null,
    });
    if (error) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or call us directly.");
      return;
    }
    setStatus("success");
    setFields({ name: "", email: "", phone: "", zip_code: "", square_footage: "", notes: "" });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border bg-white text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";
  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/contact" fallbackTitle="Contact, WeHome Cleaning" />
      <Header />

      <section className="pt-36 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.span
            className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Contact
          </motion.span>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mt-4 max-w-4xl"
            style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--primary))" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Let's talk about your home.
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-base md:text-lg mt-6 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Reach out for a personalized quote, ask a question, or schedule your first cleaning. Our team responds within one business day.
          </motion.p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="h-full p-7 rounded-2xl border border-border bg-card hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "var(--gradient-pink)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
                </div>
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {card.label}
                </p>
                <p
                  className="text-lg font-semibold"
                  style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--primary))" }}
                >
                  {card.value}
                </p>
              </motion.div>
            );
            return card.href ? (
              <a key={card.label} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <div key={card.label}>{inner}</div>
            );
          })}
        </div>
      </section>

      <section id="quote-form" className="px-6 py-24" style={{ background: "hsl(var(--primary))" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center text-white mb-12">
            <motion.span
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-[0.3em] opacity-70"
            >
              Free Quote
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-5xl font-bold mt-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Request your free quote
            </motion.h2>
            <p className="opacity-80 mt-4 max-w-2xl mx-auto">
              Tell us about your space and we'll build a custom plan that fits your lifestyle. We respond within one business day.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl"
          >
            {status === "success" ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-5" style={{ background: "var(--gradient-pink)" }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: "hsl(var(--primary))" }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--primary))" }}>
                  Quote request received!
                </h3>
                <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                  Thank you! Our team will reach out within one business day with your personalized estimate.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-semibold underline underline-offset-4"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">Full name *</label>
                  <input type="text" value={fields.name} onChange={set("name")} className={`${inputClass} ${errors.name ? "border-destructive" : "border-border"}`} placeholder="Jane Doe" />
                  {errors.name && <p className="text-xs text-destructive mt-1.5">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">Email *</label>
                  <input type="email" value={fields.email} onChange={set("email")} className={`${inputClass} ${errors.email ? "border-destructive" : "border-border"}`} placeholder="you@email.com" />
                  {errors.email && <p className="text-xs text-destructive mt-1.5">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">Phone *</label>
                  <input type="tel" value={fields.phone} onChange={set("phone")} className={`${inputClass} ${errors.phone ? "border-destructive" : "border-border"}`} placeholder="(813) 520-2535" />
                  {errors.phone && <p className="text-xs text-destructive mt-1.5">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">Zip code *</label>
                  <input type="text" value={fields.zip_code} onChange={set("zip_code")} className={`${inputClass} ${errors.zip_code ? "border-destructive" : "border-border"}`} placeholder="02118" />
                  {errors.zip_code && <p className="text-xs text-destructive mt-1.5">{errors.zip_code}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">Square footage <span className="opacity-50 normal-case tracking-normal font-normal">(optional)</span></label>
                  <input type="text" value={fields.square_footage} onChange={set("square_footage")} className={`${inputClass} border-border`} placeholder="e.g. 1,800 sq ft" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">Tell us about your space <span className="opacity-50 normal-case tracking-normal font-normal">(optional)</span></label>
                  <textarea rows={4} value={fields.notes} onChange={set("notes")} className={`${inputClass} border-border resize-none`} placeholder="Bedrooms, bathrooms, frequency, any special requests..." />
                </div>

                {status === "error" && (
                  <div className="md:col-span-2 flex items-center gap-2 p-4 rounded-xl bg-destructive/10 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-muted-foreground">By submitting, you agree to be contacted about your quote request.</p>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold tracking-[0.1em] text-white transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0"
                    style={{ background: "hsl(var(--primary))" }}
                  >
                    {status === "loading" ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : (
                      <>Request Free Quote <Send className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
