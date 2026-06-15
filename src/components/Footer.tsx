import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-cna.png";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/cnamaidpro/",
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/cnamaidpro",
    icon: <Facebook className="w-5 h-5" />,
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  return (
    <footer className="w-full border-t" style={{ background: "hsl(var(--cna-navy))", borderColor: "rgba(255,255,255,0.08)" }}>
      <motion.div
        className="max-w-7xl mx-auto px-6 sm:px-8 py-16 md:py-24"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & About */}
          <motion.div variants={fadeUp} className="space-y-6">
            <Link to="/" className="inline-block">
              <img loading="lazy" decoding="async" src={logo} alt="CNA MAIDPRO" className="h-20 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.60)", fontFamily: "var(--font-body)" }}>
              Professional residential cleaning services that bring comfort, peace of mind and more quality time to Boston families.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeUp} className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-body)", letterSpacing: "0.2em" }}>
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Regular Cleaning", href: "/services/regular-cleaning" },
                { label: "Deep Cleaning", href: "/services/deep-cleaning" },
                { label: "Move In / Move Out", href: "/services/move-in-out" },
                { label: "View All Services", href: "/services" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-2.5 hover:text-white transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--cna-sage))" }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp} className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-body)", letterSpacing: "0.2em" }}>
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "About Us", href: "/about" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "Work For Us", href: "/careers" },
                { label: "Blog", href: "/blog" },
                { label: "FAQ", href: "/faq" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-2.5 hover:text-white transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--cna-sage))" }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp} className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-body)", letterSpacing: "0.2em" }}>
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--cna-sage) / 0.18)" }}>
                  <Phone className="w-4 h-4" style={{ color: "hsl(var(--cna-sage-light))" }} />
                </div>
                <a href="tel:9782357033" className="hover:text-white transition-colors duration-200 font-bold text-white">
                  978.235.7033
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--cna-sage) / 0.18)" }}>
                  <Mail className="w-4 h-4" style={{ color: "hsl(var(--cna-sage-light))" }} />
                </div>
                <a href="mailto:cnamaidprobos@gmail.com" className="hover:text-white transition-colors duration-200" style={{ color: "rgba(255,255,255,0.65)" }}>
                  cnamaidprobos@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "hsl(var(--cna-sage) / 0.18)" }}>
                  <MapPin className="w-4 h-4" style={{ color: "hsl(var(--cna-sage-light))" }} />
                </div>
                <div>
                  <span className="block font-semibold text-white">Boston, Massachusetts</span>
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>Mon to Fri, 9:00 AM to 5:00 PM</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider & Copyright */}
        <motion.div
          variants={fadeUp}
          className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.40)" }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span>© {new Date().getFullYear()} CNA MAIDPRO. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <Link to="/terms-of-service" className="hover:text-white transition-colors duration-200 underline underline-offset-4">
                TERMS OF SERVICE
              </Link>
              <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200 underline underline-offset-4">
                PRIVACY POLICY
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.24em] font-bold">
            <span className="text-white/60">Trust</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--cna-sage))" }} />
            <span className="text-white/60">Quality</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--cna-sage))" }} />
            <span className="text-white/60">Boston, MA</span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
