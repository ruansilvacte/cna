import { motion } from "framer-motion";
import { Clock, Search, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

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

  return (
    <section className="w-full py-20 md:py-28 px-5 md:px-10 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* ── Filter bar (editorial style) ── */}
        <motion.div
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-16 md:mb-20 pb-6 border-b"
          style={{ borderColor: "hsl(var(--brand-blue) / 0.15)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-center gap-4">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.35em]"
              style={{ color: "hsl(var(--brand-pink))" }}
            >
              Browse
            </span>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[13px] font-medium pb-1 border-b-2 transition-all duration-300 ${
                    activeCategory === cat
                      ? "border-current"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  style={
                    activeCategory === cat
                      ? { color: "hsl(var(--brand-blue))" }
                      : undefined
                  }
                >
                  {cat}
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
              className="w-full pl-6 pr-2 py-2 text-[13px] bg-transparent border-b border-border focus:outline-none focus:border-current transition-colors"
              style={{ color: "hsl(var(--brand-blue))" }}
            />
          </div>
        </motion.div>

        {/* ── Featured Editorial Banner ── */}
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
                <div
                  className="absolute inset-0 z-10 mix-blend-multiply opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                  style={{ background: "hsl(var(--brand-blue))" }}
                />
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full aspect-[16/11] object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <span
                  className="absolute top-5 left-5 z-20 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] backdrop-blur"
                  style={{
                    background: "hsl(var(--background) / 0.9)",
                    color: "hsl(var(--brand-blue))",
                  }}
                >
                  ★ Editor's Pick
                </span>
              </div>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-7xl md:text-8xl font-extralight leading-none"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "hsl(var(--brand-pink))",
                    }}
                  >
                    01
                  </span>
                  <div className="flex flex-col text-[10px] uppercase tracking-[0.3em]">
                    <span style={{ color: "hsl(var(--brand-blue))" }}>{featured.category}</span>
                    <span className="text-muted-foreground mt-1">{featured.date}</span>
                  </div>
                </div>
                <h3
                  className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.05] tracking-tight mb-5"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "hsl(var(--brand-blue))",
                  }}
                >
                  {featured.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground line-clamp-3 mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between pt-5 border-t" style={{ borderColor: "hsl(var(--brand-blue) / 0.15)" }}>
                  <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    <Clock className="w-3 h-3" /> {featured.readTime}
                  </span>
                  <span
                    className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
                    style={{ color: "hsl(var(--brand-pink))" }}
                  >
                    Read <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* ── Editorial List (no cards) ── */}
        <div className="flex flex-col">
          {listPosts.map((post, i) => {
            const num = String(i + (showFeatured ? 2 : 1)).padStart(2, "0");
            const flip = i % 2 === 1;
            return (
              <motion.article
                key={post.slug}
                className="group cursor-pointer py-10 md:py-14 border-t"
                style={{ borderColor: "hsl(var(--brand-blue) / 0.12)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
                onClick={() => goToPost(post.slug)}
              >
                <div className={`grid lg:grid-cols-12 gap-6 lg:gap-12 items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  {/* Number + meta */}
                  <div className="lg:col-span-2">
                    <div
                      className="text-5xl md:text-6xl font-extralight leading-none transition-colors duration-500"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "hsl(var(--brand-blue) / 0.25)",
                      }}
                    >
                      {num}
                    </div>
                    <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      {post.date}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-6">
                    <span
                      className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.3em]"
                      style={{ color: "hsl(var(--brand-pink))" }}
                    >
                      {post.category}
                    </span>
                    <h3
                      className="text-2xl md:text-4xl font-light leading-[1.1] tracking-tight mb-3 transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "hsl(var(--brand-blue))",
                      }}
                    >
                      <span className="bg-[length:0%_1px] bg-no-repeat bg-bottom group-hover:bg-[length:100%_1px] transition-[background-size] duration-700" style={{ backgroundImage: "linear-gradient(hsl(var(--brand-pink)), hsl(var(--brand-pink)))" }}>
                        {post.title}
                      </span>
                    </h3>
                    <p className="text-[14px] md:text-[15px] leading-relaxed text-muted-foreground line-clamp-2 max-w-2xl">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-5 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 font-semibold group-hover:gap-3 transition-all"
                        style={{ color: "hsl(var(--brand-pink))" }}
                      >
                        Read article <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="lg:col-span-4 overflow-hidden rounded-2xl relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full aspect-[5/4] object-cover transition-transform duration-[1100ms] group-hover:scale-110"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 mix-blend-multiply opacity-0 group-hover:opacity-25 transition-opacity duration-700"
                      style={{ background: "hsl(var(--brand-pink))" }}
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ── Empty ── */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              No articles found. Try a different search or category.
            </p>
          </div>
        )}

        {/* ── CTA (brand palette) ── */}
        <motion.div
          className="mt-24 md:mt-32 rounded-[2.5rem] overflow-hidden relative"
          style={{ background: "var(--gradient-blue)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30 blur-3xl"
            style={{ background: "hsl(var(--brand-pink))" }}
          />
          <div className="relative p-10 md:p-20 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span
                className="text-[10px] font-bold uppercase tracking-[0.4em]"
                style={{ color: "hsl(var(--brand-pink-soft))" }}
              >
                Beyond the journal
              </span>
              <h3
                className="mt-4 text-3xl md:text-5xl font-light leading-[1.05] text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ready for a home that{" "}
                <em className="italic" style={{ color: "hsl(var(--brand-pink))" }}>
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
                style={{
                  background: "hsl(var(--brand-pink))",
                  color: "hsl(var(--brand-blue))",
                }}
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
