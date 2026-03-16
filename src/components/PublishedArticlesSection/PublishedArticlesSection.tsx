import React from "react";
import Section from "../Section";
import { useTranslations } from "next-intl";
import ArticleCard from "./ArticleCard";
import Link from "next/link";
import Button from "../Button";
import Animated from "../Animated";

export interface Article {
  imageUrl: string;
  title: string;
  description: string;
  href: string;
}

interface PublishedArticlesSectionProps {
  articles: Article[];
  seeMore?: boolean;
}

function PublishedArticlesSection({
  articles,
  seeMore
}: PublishedArticlesSectionProps) {
  const t = useTranslations("components");

  return (
    <Section containerClassName="" sectionClassName="">
      <div className="relative text-center mb-7">
        <Animated type="slide-in-left" className="">
          <h3 className="text-blue">{t("articles.subtitle")}</h3>
        </Animated>

        <Animated type="slide-in-right" className="">
          <h4 className="text-4xl text-blue mt-3">{t("articles.title")}</h4>
        </Animated>
      </div>
      <div className="block w-full mt-16 mx-auto">
        {articles.map(({ imageUrl, title, description, href }, i) => (
          <Animated delay={i * 100} key={title} className="">
            <ArticleCard
              imageUrl={imageUrl}
              title={title}
              description={description}
              href={href}
            />
          </Animated>
        ))}
      </div>
      {seeMore && (
        <Animated className="">
          <Link href="/about#see-more">
            <Button
              label="see more"
              className="block mx-auto mt-12"
              variant={false}
              disabled={false}
              loading={false}
              onClick={undefined}
            />
          </Link>
        </Animated>
      )}
    </Section>
  );
}

export default PublishedArticlesSection;
