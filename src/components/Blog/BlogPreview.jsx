import Animated from "@/components/Animated";
import Button from "@/components/Button";
import PostCard from "@/components/Blog/PostCard";
import Section from "@/components/Section";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

function BlogPreview({ posts }) {
  const t = useTranslations("pages.homepage.blog");
  const tCategories = useTranslations("components.blog.categories");
  const tBlog = useTranslations("components.blog");

  if (!posts || posts.length === 0) {
    return null;
  }

  const previewPosts = posts.slice(0, 2);

  return (
    <Section containerClassName="bg-blue text-white">
      <div className="relative text-center mb-7">
        <Animated type="slide-in-left">
          <h3 className="text-white">{t("subtitle")}</h3>
        </Animated>
        <Animated type="slide-in-right">
          <h4 className="text-4xl text-white mt-3">{t("title")}</h4>
        </Animated>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-16">
        {previewPosts.map((post, i) => (
          <Animated type="slide" delay={i * 100} key={post.slug}>
            <PostCard
              slug={post.slug}
              title={post.title}
              description={post.description}
              image={post.image}
              date={post.date}
              categoryLabel={post.category ? tCategories(post.category) : ""}
              readingTime={post.readingTime}
              readingTimeLabel={tBlog("readingTime")}
            />
          </Animated>
        ))}
      </div>

      <Animated>
        <Link href="/blog">
          <Button label="see more" className="block mx-auto mt-12" />
        </Link>
      </Animated>
    </Section>
  );
}

export default BlogPreview;
