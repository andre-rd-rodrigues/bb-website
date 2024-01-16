import React from "react";
import Section from "../Section";
import useTranslation from "@/hooks/useTranslation";
import { useTranslations } from "next-intl";
import ArticleCard from "./ArticleCard";

function PublishedArticlesSection() {
  const t = useTranslations("components");
  const { getTranslationsArray } = useTranslation();
  const articles = getTranslationsArray("components.articles.articles");

  return (
    <Section>
      <div className="relative text-center mb-10">
        <h3 className="text-blue">{t("articles.subtitle")}</h3>
        <h4 className="text-4xl text-blue mt-3">{t("articles.title")}</h4>
      </div>
      <div className="flex flex-wrap justify-center lg:justify-between">
        {articles.map(({ imageUrl, title, description, href }) => (
          <ArticleCard
            key={title}
            imageUrl={imageUrl}
            title={title}
            description={description}
            href={href}
          />
        ))}
      </div>
    </Section>
  );
}

export default PublishedArticlesSection;
