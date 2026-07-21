import Animated from "@/components/Animated";
import TextReveal from "@/components/TextReveal";
import CategoryFilter, { ALL } from "@/components/Blog/CategoryFilter";
import PostCard from "@/components/Blog/PostCard";
import SearchBar from "@/components/Blog/SearchBar";
import HeroSection from "@/components/HeroSection/HeroSection";
import Section from "@/components/Section";
import { getAllPosts, getUsedCategories } from "@/lib/posts";
import { dm_sans } from "@/styles/fonts";
import { useTranslations } from "next-intl";
import React, { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, Flip, prefersMotion } from "@/lib/gsap";

function Blog({ posts, categories }) {
  const t = useTranslations("pages");
  const tCategories = useTranslations("components.blog.categories");
  const tFilter = useTranslations("components.blog.filter");
  const tBlog = useTranslations("components.blog");

  const [active, setActive] = useState(ALL);
  const [query, setQuery] = useState("");

  const gridRef = useRef(null);
  const flipState = useRef(null);
  const firstReveal = useRef(true);

  const filterOptions = useMemo(
    () => categories.map((key) => ({ key, label: tCategories(key) })),
    [categories, tCategories]
  );

  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = active === ALL || post.category === active;
      const matchesQuery =
        !normalizedQuery ||
        `${post.title} ${post.description}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [active, query, posts]);

  // Snapshot current card layout before a filter change so Flip can animate it.
  const captureFlip = () => {
    if (prefersMotion() && gridRef.current) {
      flipState.current = Flip.getState(gridRef.current.children);
    }
  };
  const handleCategory = (key) => {
    captureFlip();
    setActive(key);
  };
  const handleSearch = (value) => {
    captureFlip();
    setQuery(value);
  };

  useGSAP(
    () => {
      if (!prefersMotion() || !gridRef.current) {
        flipState.current = null;
        return;
      }

      const cards = gridRef.current.children;

      // Filter/search reflow: animate cards moving, entering and leaving.
      if (flipState.current) {
        Flip.from(flipState.current, {
          duration: 0.6,
          ease: "power3.out",
          absolute: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { opacity: 0, scale: 0.92 },
              { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
            ),
          onLeave: (els) =>
            gsap.to(els, { opacity: 0, scale: 0.92, duration: 0.3 })
        });
        flipState.current = null;
        return;
      }

      // Initial reveal: cards rise in batches as they scroll into view.
      if (firstReveal.current) {
        firstReveal.current = false;
        gsap.set(cards, { autoAlpha: 0, y: 24 });
        ScrollTrigger.batch(cards, {
          start: "top 85%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              overwrite: true
            })
        });
      }
    },
    { dependencies: [visiblePosts], scope: gridRef }
  );

  return (
    <main>
      <HeroSection
        imageSrc="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1740&auto=format&fit=crop"
        parallax
        overlayStyle={{ backgroundColor: "#1E2E45", opacity: 0.9 }}
        style={{ height: "350px" }}
      >
        <TextReveal as="h1" className="text-white mt-10">
          {t("blog.title")}
        </TextReveal>
      </HeroSection>

      <Section>
        <Animated type="slide-in-left">
          <h3 className="text-gold uppercase tracking-wider text-sm">
            {t("blog.subtitle")}
          </h3>
          <h2 className="text-blue text-3xl mt-3 max-w-3xl">
            {t("blog.intro")}
          </h2>
        </Animated>

        <Animated delay={100}>
          <div className="mt-12 flex flex-col gap-6">
            <SearchBar
              value={query}
              onChange={handleSearch}
              placeholder={tBlog("search")}
            />
            {filterOptions.length > 1 && (
              <CategoryFilter
                categories={filterOptions}
                active={active}
                onChange={handleCategory}
                allLabel={tFilter("all")}
              />
            )}
          </div>
        </Animated>

        {visiblePosts.length > 0 ? (
          <div
            ref={gridRef}
            className="flex flex-wrap justify-center gap-10 mt-12"
          >
            {visiblePosts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                image={post.image}
                date={post.date}
                categoryLabel={post.category ? tCategories(post.category) : ""}
                readingTime={post.readingTime}
                readingTimeLabel={tBlog("readingTime")}
              />
            ))}
          </div>
        ) : (
          <Animated type="fade">
            <p className={`text-center mt-16 text-gray-700 ${dm_sans.className}`}>
              {tBlog("empty")}
            </p>
          </Animated>
        )}
      </Section>
    </main>
  );
}

export default Blog;

export async function getStaticProps({ locale }) {
  return {
    props: {
      posts: getAllPosts(locale),
      categories: getUsedCategories(locale),
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
