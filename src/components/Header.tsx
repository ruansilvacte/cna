import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowRight, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useServices } from "@/hooks/useServices";
import logo from "@/assets/logo-cna.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Work For Us", href: "/careers" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const { data: services = [] } = useServices();

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 180);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

    const PRIMARY_SERVICES = [
    {
      id: "regular",
      title: "Regular Cleaning",
      description: "Keep your home consistently clean, organized and comfortable.",
      slug: "regular-cleaning",
      image: "/images/clean-floor.png"
    },
    {
      id: "deep",
      title: "Deep Cleaning",
      description: "A detailed home refresh designed for spaces requiring extra attention.",
      slug: "deep-cleaning",
      image: "/images/clean-table.png"
    },
    {
      id: "move-in-out",
      title: "Move In / Move Out Cleaning",
      description: "Stress free cleaning solutions for new beginnings and smooth transitions.",
      slug: "move-in-move-out-cleaning",
      image: "/images/clean-bathroom.png"
    }
  ];

  return (
    <>
      {/* Main Header */}
      <motion.header
        className={`w-full fixed z-50 transition-all duration-400 top-0 ${
          scrolled ? "shadow-lg" : ""
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className={`w-full transition-all duration-400 bg-white ${
            scrolled
              ? "shadow-sm border-b border-border/60"
              : "border-b border-border/60"
          }`}
        >
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "py-2.5" : "py-3"}`}>
              
              {/* Logo */}
              <Link to="/" className="flex items-center flex-shrink-0">
                <img
                  fetchPriority="high"
                  src={logo}
                  alt="CNA MAIDPRO"
                  className={`w-auto object-contain transition-all duration-300 ${scrolled ? "h-11 md:h-13" : "h-12 md:h-15"}`}
                  style={{ height: scrolled ? "44px" : "52px" }}
                />
              </Link>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center justify-center flex-1 gap-1 xl:gap-2 mx-6">
                {navLinks.map((link) => (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={link.hasDropdown ? handleMouseEnter : undefined}
                    onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
                    ref={link.hasDropdown ? dropdownRef : undefined}
                  >
                    <Link
                      to={link.href}
                      className={`px-4 py-2 text-[0.78rem] font-600 tracking-wide transition-colors duration-200 relative flex items-center gap-1 rounded-full ${
                        isActive(link.href)
                          ? "text-primary bg-primary/5"
                          : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                      }`}
                      style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
                    >
                      {link.label}
                      {link.hasDropdown && (
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 opacity-60 ${servicesOpen ? "rotate-180" : ""}`} />
                      )}
                    </Link>

                    {/* Services Dropdown */}
                    {link.hasDropdown && (
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-3xl shadow-[0_20px_80px_-15px_hsl(211_80%_28%/0.18),0_0_0_1px_hsl(var(--border)/0.8)] p-6 min-w-[580px]"
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.97 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="flex items-center justify-between mb-5">
                              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary/50">Our Cleaning Services</p>
                              <Link
                                to="/services"
                                className="text-[0.7rem] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 hover:gap-2.5 transition-all"
                              >
                                View All Services <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                            <div className="flex flex-col gap-2">
                              {PRIMARY_SERVICES.map((s) => (
                                <Link
                                  key={s.id}
                                  to={`/services/${s.slug}`}
                                  className="w-full text-left p-3 rounded-2xl hover:bg-secondary/50 transition-all duration-300 group flex items-center gap-4 border border-transparent hover:border-border/40"
                                >
                                  {s.image && (
                                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-secondary shadow-sm relative group-hover:scale-105 transition-transform">
                                      <img loading="lazy" src={s.image} alt={s.title} className="w-full h-full object-cover" />
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <span className="block text-sm font-bold text-primary group-hover:text-accent transition-colors leading-none mb-1">
                                      {s.title}
                                    </span>
                                    <p className="text-[0.7rem] text-muted-foreground leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                                      {s.description}
                                    </p>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-primary/0 group-hover:text-primary/100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                </Link>
                              ))}
                            </div>
                            <div className="mt-6 pt-5 border-t border-border/60">
                              <Link 
                                to="/quote" 
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white text-[0.75rem] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all"
                              >
                                Get a Free Quote <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Actions */}
              <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                <a
                  href="tel:9782357033"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-bold transition-all duration-300 hover:shadow-md"
                  style={{
                    borderColor: "hsl(var(--cna-sage))",
                    color: "hsl(var(--cna-sage-dark))",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Now
                </a>
                <Link
                  to="/quote"
                  className="btn-sage text-[0.75rem]"
                >
                  Free Quote
                </Link>
              </div>

              {/* Mobile Controls */}
              <div className="lg:hidden flex items-center gap-2">
                <a
                  href="tel:9782357033"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-white"
                  style={{ background: "hsl(var(--cna-sage))" }}
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </a>
                <button
                  className="p-2.5 rounded-xl text-primary hover:bg-primary/8 transition-colors"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Menu"
                >
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="lg:hidden bg-white border-t border-border fixed inset-x-0 shadow-2xl overflow-y-auto"
              style={{ top: scrolled ? "64px" : "64px", maxHeight: "calc(100vh - 64px)" }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="px-6 py-8 flex flex-col gap-0.5">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-4 text-lg font-bold border-b border-border/40 ${
                        isActive(link.href) ? "text-primary" : "text-foreground/70"
                      }`}
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {link.label}
                    </Link>
                    {link.hasDropdown && PRIMARY_SERVICES.length > 0 && (
                      <div className="py-2 pl-4 space-y-1">
                        {PRIMARY_SERVICES.map((s) => (
                          <Link
                            key={s.id}
                            to={`/services/${s.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-border">
                  <a
                    href="tel:9782357033"
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-base font-bold border-2"
                    style={{ borderColor: "hsl(var(--cna-sage))", color: "hsl(var(--cna-sage-dark))" }}
                  >
                    <Phone className="w-5 h-5" />
                    978.235.7033
                  </a>
                  <Link
                    to="/quote"
                    onClick={() => setMobileOpen(false)}
                    className="w-full flex items-center justify-center px-6 py-4 rounded-2xl text-base font-bold text-white"
                    style={{ background: "hsl(var(--cna-navy))" }}
                  >
                    Get a Free Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
