import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useServices } from "@/hooks/useServices";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fallbackServices = [
  {
    id: "1",
    slug: "regular-cleaning",
    title: "Regular Cleaning",
    image: "/images/regular-cleaning.jpg",
    description: "Consistent, reliable cleaning that keeps your Boston home feeling fresh, welcoming, and healthy every day.",
  },
  {
    id: "2",
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    image: "/images/deep-cleaning.jpg",
    description: "A complete home refresh, like giving your space a spa day. Every corner, every surface, every forgotten detail.",
  },
  {
    id: "3",
    slug: "move-in-out",
    title: "Move In / Move Out",
    image: "/images/move-in.jpg",
    description: "A stress free transition. Whether arriving or departing, we ensure your Boston home is immaculate and ready.",
  },
];

const isExcludedService = (s: { slug?: string; title?: string }) => {
  const v = `${s.slug ?? ""} ${s.title ?? ""}`.toLowerCase();
  return v.includes("airbnb") || v.includes("short") || v.includes("turnover") || v.includes("rental");
};

export default function ServicesPreviewSection() {
  const navigate = useNavigate();
  const { data: dbServices } = useServices();
  const sourceServices = dbServices?.length ? dbServices : fallbackServices;
  const services = sourceServices.filter((s) => !isExcludedService(s)).slice(0, 3);

  return (
    <section
      className="w-full py-24 md:py-32 px-6 md:px-10 relative overflow-hidden"
      style={{ background: "hsl(var(--cna-sage-pale))" }}
    >
      {/* Background watermark */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 text-[16rem] font-bold leading-none select-none pointer-events-none hidden xl:block"
        style={{
          fontFamily: "var(--font-heading)",
          color: "hsl(var(--cna-sage) / 0.05)",
          transform: "translateY(-50%) translateX(-12%)",
        }}
      >
        HOME
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="section-label mb-4">Our Services in Boston</p>
            <h2
              className="heading-display"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
            >
              Tailored for every{" "}
              <em className="italic font-normal" style={{ color: "hsl(var(--cna-sage-dark))" }}>
                corner of your life.
              </em>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            <button
              id="services-view-all"
              onClick={() => navigate("/services")}
              className="btn-outline group"
            >
              All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Services — editorial asymmetric bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5">
          {/* Featured large card — spans 5 cols on lg */}
          {services[0] && (
            <motion.div
              className="lg:col-span-5 group relative rounded-3xl overflow-hidden cursor-pointer"
              style={{ aspectRatio: "3/4" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease }}
              onClick={() => navigate(`/services/${services[0].slug}`)}
            >
              <img
                loading="eager"
                decoding="async"
                src={services[0].image}
                alt={services[0].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                style={{ background: "linear-gradient(180deg, transparent 35%, hsl(218 55% 10% / 0.85) 80%, hsl(218 55% 10% / 0.97) 100%)" }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.22em] mb-2" style={{ color: "hsl(var(--cna-sage-light))" }}>
                  Boston, MA
                </span>
                <h3 className="text-white font-bold text-2xl leading-tight mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  {services[0].title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-xs">{services[0].description}</p>
                <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Right column — 7 cols, stacked */}
          <div className="lg:col-span-7 grid grid-rows-2 gap-4 md:gap-5">
            {/* Top row — 2 medium cards */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              {services.slice(1, 3).map((service, i) => (
                <motion.div
                  key={service.id}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer"
                  style={{ aspectRatio: "4/3" }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: (i + 1) * 0.1, ease }}
                  onClick={() => navigate(`/services/${service.slug}`)}
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, transparent 30%, hsl(218 55% 10% / 0.88) 100%)" }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-lg leading-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      {service.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/70 text-xs font-bold uppercase tracking-wider group-hover:gap-2.5 transition-all">
                      <span>Learn more</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom card — wide */}
            {services[3] && (
              <motion.div
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.3, ease }}
                onClick={() => navigate(`/services/${services[3].slug}`)}
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={services[3].image}
                  alt={services[3].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(120deg, hsl(218 55% 10% / 0.80) 0%, hsl(148 40% 15% / 0.40) 100%)" }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-7 md:flex-row md:items-end md:justify-between">
                  <div>
                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.22em] mb-2 block" style={{ color: "hsl(var(--cna-sage-light))" }}>
                      Featured Service
                    </span>
                    <h3 className="text-white font-bold text-xl leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                      {services[3].title}
                    </h3>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            id="services-cta-quote"
            onClick={() => navigate("/quote")}
            className="btn-primary group mr-4"
          >
            Get a Free Estimate
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            id="services-cta-all"
            onClick={() => navigate("/services")}
            className="btn-outline"
          >
            View Full Service List
          </button>
        </motion.div>
      </div>
    </section>
  );
}
