import { motion } from "framer-motion";
import { ShieldCheck, Star, Users, Award, Clock, CheckCircle } from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, label: "Fully Insured", value: "100%" },
  { icon: Star, label: "Google Rating", value: "5.0 ★" },
  { icon: Users, label: "Boston Families", value: "500+" },
  { icon: Award, label: "Years of Experience", value: "10+" },
  { icon: Clock, label: "Satisfaction Guarantee", value: "24hr" },
  { icon: CheckCircle, label: "Background Checked", value: "All Staff" },
];

export default function TrustBar() {
  const repeated = [...trustItems, ...trustItems];

  return (
    <div
      className="w-full py-4 border-y overflow-hidden"
      style={{
        background: "hsl(var(--cna-sage-pale))",
        borderColor: "hsl(var(--cna-sage-light) / 0.25)",
      }}
    >
      <div className="marquee-container">
        <div className="flex animate-marquee gap-0">
          {repeated.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="trustbar-item flex-shrink-0 px-8 md:px-12 border-r"
                style={{ borderColor: "hsl(var(--cna-sage-light) / 0.35)" }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--cna-sage-dark))" }} />
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-sm font-bold"
                      style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--cna-navy))" }}
                    >
                      {item.value}
                    </span>
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em]" style={{ color: "hsl(var(--cna-navy) / 0.50)" }}>
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
