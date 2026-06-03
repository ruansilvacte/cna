import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logoAsset from "@/assets/wehome-logo.png.asset.json";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/wehomecleaning/",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=100090796463473",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
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
    <footer className="w-full bg-white text-primary">
      <motion.div
        className="max-w-7xl mx-auto px-6 sm:px-8 py-16"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Logo & About */}
          <motion.div variants={fadeUp} className="space-y-4">
            <img loading="lazy" decoding="async" src={logoAsset.url} alt="WeHome Cleaning" className="h-28 w-auto" />
            <p className="text-primary/70 text-sm leading-relaxed max-w-xs">
              Premium residential cleaning designed to keep your home consistently clean, comfortable, and well maintained.
            </p>
            <p className="text-accent text-xs font-bold uppercase tracking-[0.25em]">
              Details Matter
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-primary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>


          {/* Services */}
          <motion.div variants={fadeUp} className="space-y-4">
            <h4 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
              Services
            </h4>
            <ul className="space-y-2 text-sm text-primary/75">
              {[
                { label: "Recurring Cleaning", href: "/services/recurring-cleaning" },
                { label: "Deep Cleaning", href: "/services/deep-cleaning" },
                { label: "Move-In / Move-Out", href: "/services/move-in-cleaning" },
                { label: "Airbnb & Short-Term", href: "/services/airbnb-cleaning" },
                { label: "Commercial Cleaning", href: "/services/commercial-cleaning" },
                { label: "Post-Construction", href: "/services/post-construction-cleaning" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="hover:text-accent transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp} className="space-y-4">
            <h4 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
              Company
            </h4>
            <ul className="space-y-2 text-sm text-primary/75">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "FAQ", href: "/faq" },
                { label: "Service Areas", href: "/service-areas" },
                { label: "Blog", href: "/blog" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="hover:text-accent transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp} className="space-y-4">
            <h4 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-primary/75">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:+18135202535" className="hover:text-accent transition-colors duration-200">
                  +1 813-520-2535
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:+18559333313" className="hover:text-accent transition-colors duration-200">
                  +1 855-933-3313 · Scheduling
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:wehomecleaning@gmail.com" className="hover:text-accent transition-colors duration-200">
                  wehomecleaning@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span>Mon to Fri, 9:00 AM to 5:00 PM</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider & Copyright */}
        <motion.div
          variants={fadeUp}
          className="mt-12 pt-8 border-t border-primary/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary/60"
        >
          <span>© {new Date().getFullYear()} WeHome Cleaning. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/terms-of-service" className="hover:text-accent transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/privacy-policy" className="hover:text-accent transition-colors duration-200">
              Privacy Policy
            </Link>
            <span className="uppercase tracking-[0.2em] text-accent">Details Matter</span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
