import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useHomeContent } from "@/hooks/useHomeContent";

import serviceAirbnb from "@/assets/service-airbnb.jpg";
import serviceResidential from "@/assets/service-residential.jpg";
import serviceCommercial from "@/assets/service-commercial.jpg";
import serviceDeepCleaning from "@/assets/service-deep-cleaning.jpg";
import servicePostConstruction from "@/assets/service-post-construction.jpg";
import servicePlatform from "@/assets/service-platform.jpg";

const services = [
  {
    title: "Airbnb / Short Term Rental Cleaning",
    key: "airbnb",
    href: "/services/airbnb-short-term-rental",
    defaultPitch: "Guest ready turnovers that protect your 5 star rating and Superhost status.",
    defaultCta: "Learn more",
    badge: "MOST BOOKED",
    image: serviceAirbnb,
    items: [
      "Guest ready turnovers, every checkout",
      "Detail-obsessed staging for 5 star reviews",
      "Fresh linens, restocked essentials, perfect presentation",
      "Same crew, same checklist, same standard",
      "Built to protect your rating and Superhost status",
    ],
    note: "Trusted by hosts and property managers",
  },
  {
    title: "Residential Cleaning",
    key: "residential",
    href: "/services/residential-cleaning",
    defaultPitch: "A pristine home you'll genuinely love coming back to, every single time.",
    defaultCta: "Learn more",
    image: serviceResidential,
    items: [
      "Full home clean across every room you actually use",
      "Weekly, biweekly, monthly, or one-time when you need it",
      "Surfaces sanitized, floors detailed, dust removed for real",
      "Calm, organized spaces that feel genuinely fresh",
      "Same trusted team, no rotating strangers",
    ],
    note: "Made for busy families and professionals",
  },
  {
    title: "Commercial Cleaning",
    key: "commercial",
    href: "/services/commercial-cleaning",
    defaultPitch: "Spotless offices and storefronts that quietly elevate your brand.",
    defaultCta: "Learn more",
    image: serviceCommercial,
    items: [
      "Offices, clinics and storefronts kept presentation-ready",
      "After-hours scheduling so your day never stops",
      "Sanitized high-touch points, restrooms and break areas",
      "Clean spaces that quietly reinforce your brand",
      "Reliable recurring service, no chasing, no surprises",
    ],
    note: "Built for businesses that care about first impressions",
  },
  {
    title: "Deep Cleaning",
    key: "deep",
    href: "/services/deep-cleaning",
    defaultPitch: "Top to bottom reset that genuinely changes how your space feels.",
    defaultCta: "Learn more",
    image: serviceDeepCleaning,
    items: [
      "Top to bottom reset that reaches every overlooked corner",
      "Baseboards, vents, grout, behind appliances, all in",
      "Deep sanitization that genuinely changes how your home feels",
      "The perfect first clean before going on a recurring plan",
      "Restores a true 'just moved in' standard",
    ],
    note: "When 'a quick clean' just won't cut it",
  },
  {
    title: "Post Construction Cleaning",
    key: "post_construction",
    href: "/services/post-construction-cleaning",
    defaultPitch: "Move in ready handover after every renovation, final walkthrough quality.",
    defaultCta: "Learn more",
    image: servicePostConstruction,
    items: [
      "Construction dust and debris fully removed, not just wiped",
      "Detailed post-reno cleaning across every surface",
      "Polished finishes, spotless windows, ready to show feel",
      "Move in ready handover for owners or buyers",
      "Final walkthrough quality, every single time",
    ],
    note: "Loved by builders, investors and homeowners",
  },
  {
    title: "Platform Integrations",
    key: "platform",
    href: "/quote",
    defaultPitch: "One trusted partner connected across Turno, Nextdoor and your hosting tools.",
    defaultCta: "Get a quote",
    image: servicePlatform,
    items: [
      "Connected with Turno for automated turnover scheduling",
      "Verified presence on Nextdoor and local directories",
      "Smooth handoffs across hosting and management platforms",
      "Smart workflows that keep your calendar protected",
      "One trusted partner across all your tools",
    ],
    note: "Plug into the platforms you already use",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function ServiceChecklistCards() {
  const { data: content } = useHomeContent();
  const eyebrow = content?.home_services_eyebrow || "Our Services";
  const titleA = content?.home_services_title_part1 || "Curated cleaning for";
  const titleB = content?.home_services_title_part2 || "every kind of home.";

  return (
    <section className="w-full py-20 md:py-28 px-5 md:px-10 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-5 text-accent"
            >
              {eyebrow}
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight font-light max-w-2xl"
              style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--primary))" }}
            >
              {titleA}{" "}
              <em className="italic font-normal text-accent">
                {titleB}
              </em>
            </h2>
          </motion.div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-70"
            style={{ color: "hsl(var(--primary))" }}
          >
            View all services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((service, i) => {
            const pitch = content?.[`home_card_pitch_${service.key}`] || service.defaultPitch;
            const ctaLabel = content?.[`home_card_cta_${service.key}`] || service.defaultCta;
            return (
              <motion.div
                key={i}
                variants={cardAnim}
                className="group relative bg-card rounded-3xl border transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-1"
                style={{
                  borderColor: "hsl(var(--border))",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <div className="relative w-full h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 30%, hsl(var(--primary) / 0.85) 100%)",
                    }}
                  />
                  {service.badge && (
                    <span
                      className="absolute top-4 right-4 text-[9px] font-semibold tracking-[0.2em] px-3 py-1.5 rounded-full text-white"
                      style={{ background: "var(--gradient-green)" }}
                    >
                      {service.badge}
                    </span>
                  )}
                  <div className="absolute bottom-4 left-5 right-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <p className="text-white text-sm leading-snug mb-3">{pitch}</p>
                    <Link
                      to={service.href}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white text-foreground"
                    >
                      {ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <h3
                    className="text-xl font-normal mb-4 leading-snug"
                    style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--primary))" }}
                  >
                    {service.title}
                  </h3>

                  <div className="w-full text-left space-y-2.5 mb-5">
                    {service.items.slice(0, 4).map((item, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent"
                        />
                        <span className="text-sm leading-snug" style={{ color: "hsl(var(--muted-foreground))" }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p
                    className="text-xs italic mt-auto pt-4 border-t w-full text-accent"
                    style={{
                      borderColor: "hsl(var(--border))",
                    }}
                  >
                    {service.note}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
