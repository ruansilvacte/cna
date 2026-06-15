import { motion } from "framer-motion";
import { Clock, Search, ArrowUpRight, Sparkles, Home, PawPrint } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const CATEGORY_VISUALS: Record<string, { short: string; icon: typeof Sparkles; tint: string }> = {
  "Benefits of Hiring Professional Cleaning Services": {
    short: "Why Professional Cleaning",
    icon: Sparkles,
    tint: "hsl(var(--cna-sage-pale))",
  },
  "Organization and Home Routine Guides": {
    short: "Home Routines & Organization",
    icon: Home,
    tint: "hsl(var(--cna-beige))",
  },
  "Cleaning Tips for Families with Children and Pets": {
    short: "Families, Kids & Pets",
    icon: PawPrint,
    tint: "hsl(var(--cna-sage-pale))",
  },
};

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { posts, categories } = useBlogPosts();

  const filtered = posts.filter((post) => {
    const matchCategory = activeCategory === "All" || post.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const goToPost = (slug: string) => navigate(`/blog/${slug}`);
  const showFeatured = activeCategory === "All" && !searchQuery && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const listPosts = showFeatured ? filtered.slice(1) : filtered;

  const visualCategories = categories.filter((c) => c !== "All");

  const labelFor = (c: string) => CATEGORY_VISUALS[c]?.short ?? c;

  return (
    <section className="w-full py-20 md:py-28 px-5 md:px-10" style={{ background: "hsl(var(--cna-cream))" }}>
      <div className="max-w-7xl mx-auto">

        {/* ── Visual Categories ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-20 md:mb-24"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] mb-3" style={{ color: "hsl(var(--cna-sage-dark))" }}>
                Browse by Topic
              </p>
              <h2 className="heading-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
                Three reading lanes.
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 md:gap-5">
            {visualCategories.map((cat) => {
              const meta = CATEGORY_VISUALS[cat];
              const Icon = meta?.icon ?? Sparkles;
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(active ? "All" : cat)}
                  className="text-left p-6 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    background: active ? "hsl(var(--cna-navy))" : meta?.tint ?? "white",
                    color: active ? "white" : "hsl(var(--cna-navy))",
                    borderColor: active ? "hsl(var(--cna-navy))" : "hsl(var(--cna-gray))",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: active ? "rgba(255,255,255,0.12)" : "white",
                      color: active ? "white" : "hsl(var(--cna-sage-dark))",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-base font-bold leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                    {labelFor(cat)}
                  </p>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Filter bar ── */}
        <motion.div
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-16 md:mb-20 pb-6 border-b"
          style={{ borderColor: "hsl(var(--cna-navy) / 0.12)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: "hsl(var(--cna-sage-dark))" }}>
              Filter
            </span>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[13px] font-medium pb-1 border-b-2 transition-all duration-300 ${
                    activeCategory === cat ? "border-current" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  style={activeCategory === cat ? { color: "hsl(var(--cna-navy))" } : undefined}
                >
                  {labelFor(cat)}
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search the journal…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-2 py-2 text-[13px] bg-transparent border-b focus:outline-none transition-colors"
              style={{ color: "hsl(var(--cna-navy))", borderColor: "hsl(var(--cna-navy) / 0.2)" }}
              maxLength={120}
            />
          </div>
        </motion.div>

        {/* ── Featured Article ── */}
        {featured && (
          <motion.article
            className="mb-24 md:mb-32 cursor-pointer group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            onClick={() => goToPost(featured.slug)}
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end">
              <div className="lg:col-span-7 relative overflow-hidden rounded-[2rem]">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full aspect-[16/11] object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <span
                  className="absolute top-5 left-5 z-20 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] backdrop-blur"
                  style={{ background: "white", color: "hsl(var(--cna-navy))" }}
                >
                  ★ Editor's Pick
                </span>
              </div>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-7xl md:text-8xl font-extralight leading-none"
                    style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--cna-sage) / 0.55)" }}
                  >
                    01
                  </span>
                  <div className="flex flex-col text-[10px] uppercase tracking-[0.3em]">
                    <span style={{ color: "hsl(var(--cna-sage-dark))" }}>{labelFor(featured.category)}</span>
                    <span className="text-muted-foreground mt-1">{featured.date}</span>
                  </div>
                </div>
                <h3
                  className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.05] tracking-tight mb-5"
                  style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--cna-navy))" }}
                >
                  {featured.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground line-clamp-3 mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between pt-5 border-t" style={{ borderColor: "hsl(var(--cna-navy) / 0.15)" }}>
                  <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    <Clock className="w-3 h-3" /> {featured.readTime}
                  </span>
                  <span
                    className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
                    style={{ color: "hsl(var(--cna-sage-dark))" }}
                  >
                    Read <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* ── Editorial List ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ borderColor: "hsl(var(--cna-gray))" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
              onClick={() => goToPost(post.slug)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-[1100ms] group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-7 md:p-8">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] mb-4">
                  <span className="font-bold" style={{ color: "hsl(var(--cna-sage-dark))" }}>
                    {labelFor(post.category)}
                  </span>
                  <span className="text-muted-foreground">{post.date}</span>
                </div>
                <h3
                  className="text-xl md:text-2xl font-light leading-tight mb-3"
                  style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--cna-navy))" }}
                >
                  {post.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-muted-foreground line-clamp-3 mb-5">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "hsl(var(--cna-navy) / 0.1)" }}>
                  <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.2em] group-hover:gap-2 transition-all"
                    style={{ color: "hsl(var(--cna-sage-dark))" }}
                  >
                    Read <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── Empty ── */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              No articles found. Try a different search or category.
            </p>
          </div>
        )}

        {/* ── CTA ── */}
        <motion.div
          className="mt-24 md:mt-32 rounded-[2.5rem] overflow-hidden relative"
          style={{ background: "var(--gradient-dark, hsl(var(--cna-navy)))" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30 blur-3xl"
            style={{ background: "hsl(var(--cna-sage))" }}
          />
          <div className="relative p-10 md:p-20 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: "hsl(var(--cna-sage-light))" }}>
                Beyond the journal
              </span>
              <h3
                className="mt-4 text-3xl md:text-5xl font-light leading-[1.05] text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ready for a home that{" "}
                <em className="italic" style={{ color: "hsl(var(--cna-sage-light))" }}>
                  reads
                </em>{" "}
                this clean?
              </h3>
            </div>
            <div className="flex flex-col items-start md:items-end gap-4">
              <p className="text-white/70 text-sm md:text-base max-w-sm md:text-right leading-relaxed">
                Book a free, no obligation quote and let our team take it from here.
              </p>
              <a
                href="tel:9782357033"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[12px] font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:scale-105"
                style={{ background: "hsl(var(--cna-sage))", color: "hsl(var(--cna-navy))" }}
              >
                Call 978.235.7033 <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
