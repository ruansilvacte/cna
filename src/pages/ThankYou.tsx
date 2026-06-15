import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, ArrowRight, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead slug="/thank-you" fallbackTitle="Thank You | CNA MAIDPRO" />
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-24 md:py-32">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease }}
            className="mb-8 flex items-center justify-center"
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: "hsl(var(--accent)/0.12)" }}
            >
              <CheckCircle className="w-12 h-12" style={{ color: "hsl(var(--accent))" }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <p className="section-label text-accent mb-4">Request Received</p>
            <h1
              className="heading-display text-primary mb-5"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
            >
              Thank You for Reaching Out!
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Your request has been successfully received. Our team will review your information and reach out to you within <strong className="text-foreground">24 hours</strong> with your personalized quote.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-12">
              While you wait, feel free to explore our services or call us directly for immediate assistance.
            </p>

            {/* Phone CTA */}
            <div
              className="flex items-center justify-center gap-4 p-6 rounded-2xl mb-10 border border-border/60"
              style={{ background: "hsl(var(--primary)/0.04)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "hsl(var(--primary)/0.1)" }}
              >
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-0.5">Prefer to talk now?</p>
                <a
                  href="tel:9782357033"
                  className="text-2xl font-bold text-primary hover:text-accent transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  978.235.7033
                </a>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/" className="btn-primary group">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
              <Link to="/services" className="btn-outline group">
                Explore Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
