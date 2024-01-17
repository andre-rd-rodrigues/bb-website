import React from "react";
import Section from "../Section";
import useTranslation from "@/hooks/useTranslation";
import { useTranslations } from "next-intl";
import ArticleCard from "./ArticleCard";
import Link from "next/link";
import Button from "../Button";

function PublishedArticlesSection({ articles, seeMore }) {
  const t = useTranslations("components");

  return (
    <Section>
      <div className="relative text-center mb-7">
        <h3 className="text-blue">{t("articles.subtitle")}</h3>
        <h4 className="text-4xl text-blue mt-3">{t("articles.title")}</h4>
      </div>
      <div className="block w-full mt-16 mx-auto">
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
      {seeMore && (
        <Link href="/about#see-more">
          <Button label="see more" className="block mx-auto mt-12" />
        </Link>
      )}
    </Section>
  );
}

export default PublishedArticlesSection;
