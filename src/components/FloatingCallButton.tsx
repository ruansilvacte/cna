import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function FloatingCallButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="floating-cta">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-[0_8px_48px_-8px_hsl(211_80%_28%/0.24)] border border-border/50 overflow-hidden w-64"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border/40"
              style={{ background: "hsl(var(--primary))" }}
            >
              <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-heading)" }}>Contact CNA MAIDPRO</p>
              <p className="text-white/60 text-xs mt-0.5">We're here to help</p>
            </div>

            {/* Options */}
            <div className="p-3 space-y-2">
              <a
                href="tel:9782357033"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Call Us</p>
                  <p className="text-xs text-muted-foreground">978.235.7033</p>
                </div>
              </a>

              <Link
                to="/quote"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent/5 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-accent/10 group-hover:bg-accent group-hover:text-white transition-colors text-accent">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Free Quote</p>
                  <p className="text-xs text-muted-foreground">Online estimate</p>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle FAB */}
      <motion.button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.5)] hover:shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.6)] transition-all duration-300 hover:-translate-y-0.5"
        style={{ background: expanded ? "hsl(215 28% 17%)" : "hsl(var(--primary))" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contact options"
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="phone"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Phone className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
