import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Heart, Sparkles, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { toast } from "@/hooks/use-toast";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const AMOUNTS = [100, 200, 350, 500];

export default function GiftCard() {
  const [amount, setAmount] = useState(200);
  const [form, setForm] = useState({
    senderName: "",
    senderEmail: "",
    recipientName: "",
    recipientEmail: "",
    message: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.senderName || !form.recipientName || !form.senderEmail) {
      toast({ title: "Please fill in the required fields." });
      return;
    }
    const body = encodeURIComponent(
      `Gift Card Request%0A%0AAmount: $${amount}%0AFrom: ${form.senderName} (${form.senderEmail})%0ATo: ${form.recipientName} (${form.recipientEmail})%0AMessage: ${form.message}`
    );
    window.location.href = `mailto:cnamaidprobos@gmail.com?subject=Gift Card Request&body=${body}`;
    toast({ title: "Thank you!", description: "We'll reach out to finalize your gift card." });
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--cna-cream))" }}>
      <SeoHead slug="/gift-card" fallbackTitle="Gift a Clean Home | CNA MAIDPRO Gift Cards" />
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-16 px-6 md:px-10 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
          style={{ background: "hsl(var(--cna-sage))", transform: "translate(30%, -20%)" }}
        />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "hsl(var(--cna-sage-pale))" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4" style={{ color: "hsl(var(--cna-sage-dark))" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(var(--cna-sage-dark))" }}>
              The gift of time
            </span>
          </motion.div>
          <motion.h1
            className="heading-display mb-6"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            Give a{" "}
            <em className="italic font-normal" style={{ color: "hsl(var(--cna-sage-dark))" }}>
              clean home
            </em>
            .
          </motion.h1>
          <motion.p
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "hsl(var(--cna-gray-mid))" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            A CNA MAIDPRO gift card is the most thoughtful way to support a new parent,
            a friend moving in, or anyone who deserves a little more time and a little less chaos.
          </motion.p>
        </div>
      </section>

      {/* Card preview + form */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Visual card */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <div
              className="relative aspect-[3/4] rounded-[2rem] p-10 flex flex-col justify-between text-white overflow-hidden shadow-2xl"
              style={{ background: "var(--gradient-dark)" }}
            >
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, hsl(var(--cna-sage) / 0.25) 0%, transparent 70%)",
                  transform: "translate(30%, -30%)",
                }}
              />
              <div className="relative z-10">
                <Gift className="w-10 h-10 mb-6" style={{ color: "hsl(var(--cna-sage-light))" }} />
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(var(--cna-sage-light))" }}>
                  CNA MAIDPRO · Boston
                </p>
                <p className="mt-3 text-5xl font-light" style={{ fontFamily: "var(--font-heading)" }}>
                  ${amount}
                </p>
              </div>
              <div className="relative z-10">
                <p className="text-sm opacity-80 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                  For: {form.recipientName || "A loved one"}
                </p>
                <p className="text-xs opacity-60">
                  From: {form.senderName || "Someone who cares"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-12 border shadow-sm"
            style={{ borderColor: "hsl(var(--cna-gray))" }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="section-label mb-3">Choose an amount</p>
            <div className="grid grid-cols-4 gap-3 mb-8">
              {AMOUNTS.map((a) => (
                <button
                  type="button"
                  key={a}
                  onClick={() => setAmount(a)}
                  className="py-3 rounded-xl border-2 text-sm font-bold transition-all"
                  style={{
                    background: amount === a ? "hsl(var(--cna-navy))" : "white",
                    color: amount === a ? "white" : "hsl(var(--cna-navy))",
                    borderColor: amount === a ? "hsl(var(--cna-navy))" : "hsl(var(--cna-gray))",
                  }}
                >
                  ${a}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: "hsl(var(--cna-navy))" }}>
                  Your Name *
                </label>
                <input
                  required
                  value={form.senderName}
                  onChange={(e) => setForm({ ...form, senderName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2"
                  style={{ borderColor: "hsl(var(--cna-gray))" }}
                  maxLength={80}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: "hsl(var(--cna-navy))" }}>
                  Your Email *
                </label>
                <input
                  required
                  type="email"
                  value={form.senderEmail}
                  onChange={(e) => setForm({ ...form, senderEmail: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border bg-white"
                  style={{ borderColor: "hsl(var(--cna-gray))" }}
                  maxLength={120}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: "hsl(var(--cna-navy))" }}>
                  Recipient Name *
                </label>
                <input
                  required
                  value={form.recipientName}
                  onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border bg-white"
                  style={{ borderColor: "hsl(var(--cna-gray))" }}
                  maxLength={80}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: "hsl(var(--cna-navy))" }}>
                  Recipient Email
                </label>
                <input
                  type="email"
                  value={form.recipientEmail}
                  onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border bg-white"
                  style={{ borderColor: "hsl(var(--cna-gray))" }}
                  maxLength={120}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: "hsl(var(--cna-navy))" }}>
                  Personal Message
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border bg-white resize-none"
                  style={{ borderColor: "hsl(var(--cna-gray))" }}
                  maxLength={400}
                  placeholder="Add a sweet note (optional)…"
                />
              </div>
            </div>

            <button type="submit" className="btn-sage mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Request Gift Card
            </button>
            <p className="mt-4 text-xs flex items-center gap-2" style={{ color: "hsl(var(--cna-gray-mid))" }}>
              <Heart className="w-3 h-3" style={{ color: "hsl(var(--cna-sage-dark))" }} />
              Our team will reach out within one business day to confirm and process payment.
            </p>
          </motion.form>
        </div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
