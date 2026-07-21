import Animated from "@/components/Animated";
import TextReveal from "@/components/TextReveal";
import styles from "@/components/Blog/blog-content.module.scss";
import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection/HeroSection";
import Section from "@/components/Section";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { dm_sans } from "@/styles/fonts";
import { NextSeo } from "next-seo";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersMotion } from "@/lib/gsap";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Thin gold reading-progress bar. Rendered through a portal to <body> so it
 * escapes the ScrollSmoother content transform and stays truly fixed.
 */
function ReadingProgress({ targetRef }) {
  const barRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useGSAP(
    () => {
      if (!prefersMotion() || !barRef.current || !targetRef.current) return;
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: targetRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });
    },
    { dependencies: [mounted] }
  );

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div className="pointer-events-none fixed top-0 left-0 z-[60] h-1 w-full bg-transparent">
      <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-gold" />
    </div>,
    document.body
  );
}

function BlogPost({ post }) {
  const { locale } = useRouter();
  const tCategories = useTranslations("components.blog.categories");
  const tBlog = useTranslations("components.blog");

  const articleRef = useRef(null);

  // Progressive reveal of markdown blocks as the reader scrolls.
  useGSAP(
    () => {
      if (!prefersMotion() || !articleRef.current) return;
      const blocks = articleRef.current.children;
      if (!blocks.length) return;
      gsap.set(blocks, { autoAlpha: 0, y: 20 });
      ScrollTrigger.batch(blocks, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            overwrite: true
          })
      });
    },
    { scope: articleRef, dependencies: [post.slug] }
  );

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString(
        locale === "en" ? "en-GB" : "pt-PT",
        { day: "2-digit", month: "long", year: "numeric" }
      )
    : "";

  const SITE_URL = "https://www.barbizanicarvalholaw.com";
  const articleUrl = `${SITE_URL}${locale === "pt" ? "" : `/${locale}`}/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    ...(post.image ? { image: [post.image] } : {}),
    ...(post.date ? { datePublished: post.date, dateModified: post.date } : {}),
    author: { "@type": "Person", name: post.author || "Bárbara Barbizani" },
    publisher: {
      "@type": "LegalService",
      name: "Bárbara Barbizani — Advocacia e Consultoria Jurídica",
      "@id": `${SITE_URL}/#legalservice`
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    url: articleUrl,
    inLanguage: locale
  };

  return (
    <main>
      <NextSeo
        title={`${post.title} - Bárbara Barbizani`}
        description={post.description}
        openGraph={{
          type: "article",
          title: post.title,
          description: post.description,
          locale,
          url: articleUrl,
          images: post.image ? [{ url: post.image, alt: post.title }] : []
        }}
      />

      <Head>
        <script
          type="application/ld+json"
          key="blogposting-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      </Head>

      <ReadingProgress targetRef={articleRef} />

      <HeroSection
        imageSrc={post.image}
        parallax
        overlayStyle={{ backgroundColor: "#1E2E45", opacity: 0.85 }}
        style={{ height: "420px" }}
      >
        {post.category && (
          <Animated>
            <span
              className={`inline-block bg-gold text-white text-xs tracking-wider uppercase px-3 py-1 mb-5 ${dm_sans.className}`}
            >
              {tCategories(post.category)}
            </span>
          </Animated>
        )}
        <TextReveal
          as="h1"
          delay={150}
          className="text-white max-w-4xl mx-auto"
        >
          {post.title}
        </TextReveal>
        <Animated delay={450}>
          <div
            className={`flex items-center justify-center gap-3 text-white/80 text-sm mt-6 ${dm_sans.className}`}
          >
            {formattedDate && <span>{formattedDate}</span>}
            {formattedDate && post.readingTime && (
              <span aria-hidden="true">&middot;</span>
            )}
            {post.readingTime && (
              <span>
                {post.readingTime} {tBlog("readingTime")}
              </span>
            )}
          </div>
        </Animated>
      </HeroSection>

      <Section>
        <article ref={articleRef} className={`max-w-3xl mx-auto ${styles.content}`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        <Animated className="max-w-3xl mx-auto mt-16">
          <Link href="/blog">
            <Button label="back to blog" variant />
          </Link>
        </Animated>
      </Section>
    </main>
  );
}

export default BlogPost;

export async function getStaticPaths({ locales }) {
  const paths = [];

  (locales || ["pt"]).forEach((locale) => {
    getPostSlugs(locale).forEach((slug) => {
      paths.push({ params: { slug }, locale });
    });
  });

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params, locale }) {
  const post = getPostBySlug(locale, params.slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
