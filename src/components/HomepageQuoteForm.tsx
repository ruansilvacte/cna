import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Send, Phone, CheckCircle, ArrowRight, User, Mail, MessageSquare } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const serviceOptions = [
  "Regular Cleaning",
  "Deep Cleaning",
  "Move In / Move Out",
];

export default function HomepageQuoteForm() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission — in production, connect to Supabase or email service
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    navigate("/thank-you");
  };

  return (
    <section
      className="w-full py-24 md:py-32 px-6 md:px-10 relative overflow-hidden"
      style={{ background: "hsl(var(--brand-blush))" }}
    >
      {/* Background decoration */}
      <div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="lg:sticky lg:top-32"
          >
            <p className="section-label text-accent mb-5">Get a Free Estimate</p>
            <h2
              className="heading-display text-primary mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Ready for your{" "}
              <em className="italic" style={{ color: "hsl(var(--accent))" }}>
                best clean ever?
              </em>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-10">
              Tell us about your home and we'll provide a personalized, no-obligation quote within 24 hours. No commitment required.
            </p>

            {/* Checklist */}
            <div className="space-y-4 mb-10">
              {[
                "Free, no-obligation estimate",
                "Response within 24 hours",
                "Customized to your exact needs",
                "Flexible scheduling",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "hsl(var(--accent))" }} />
                  <span className="text-sm font-semibold text-foreground/80">{item}</span>
                </div>
              ))}
            </div>

            {/* Phone CTA */}
            <div className="flex items-center gap-4 p-5 rounded-2xl border border-border/60 bg-white">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-0.5">Prefer to call?</p>
                <a
                  href="tel:9782357033"
                  className="text-xl font-bold text-primary hover:text-accent transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  978.235.7033
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[var(--shadow-card)] border border-border/40">
              <h3
                className="text-xl font-bold text-primary mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Request Your Free Quote
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Phone row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-border bg-secondary/30 text-sm font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-border bg-secondary/30 text-sm font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-border bg-secondary/30 text-sm font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Service selector */}
                <div className="relative">
                  <select
                    value={form.service}
                    onChange={(e) => set("service", e.target.value)}
                    required
                    className="w-full px-4 py-3.5 rounded-2xl border border-border bg-secondary/30 text-sm font-medium text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all cursor-pointer"
                  >
                    <option value="" disabled>Select a service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <textarea
                    rows={4}
                    placeholder="Tell us about your home (size, special needs, frequency...)"
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-border bg-secondary/30 text-sm font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary justify-center py-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send My Request
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </button>

                <p className="text-center text-xs text-muted-foreground leading-relaxed">
                  No commitment required. We'll reach out within 24 hours.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
