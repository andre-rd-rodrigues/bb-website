import Animated from "@/components/Animated";
import Button from "@/components/Button";
import Card from "@/components/Card";
import HeroSection from "@/components/HeroSection/HeroSection";
import Section from "@/components/Section";
import Testimonials from "@/components/Testimonials/Testimonials";
import useTranslation from "@/hooks/useTranslation";
import { useTranslations } from "next-intl";
import type { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";

interface PracticeAreaItem {
  title: string;
  description: string;
  imageUrl: string;
  type: string;
  showPreview?: boolean;
}

interface GroupedServices {
  citizens: PracticeAreaItem[];
  companies: PracticeAreaItem[];
}

function PracticeAreas() {
  const t = useTranslations("pages");
  const { getTranslationsArray } = useTranslation();

  const services = getTranslationsArray("components.practiceAreas").reduce(
    (acc: GroupedServices, currentValue: unknown) => {
      const item = currentValue as PracticeAreaItem;
      if (item?.type?.toLowerCase() === "citizens") {
        acc.citizens.push(item);
      } else {
        acc.companies.push(item);
      }
      return acc;
    },
    { citizens: [], companies: [] }
  );

  return (
    <main>
      <HeroSection
        imageSrc="/img/balance2.png"
        overlayStyle={{ backgroundColor: "#1E2E45", opacity: 0.9 }}
        style={{
          height: "350px",
        }}
      >
        <Animated>
          <h1 className="text-white mt-10">{t("practiceAreas.title")}</h1>
        </Animated>
      </HeroSection>

      <span id="citizens" />
      <Section>
        <Animated type="slide-in-left">
          <h2 className="text-blue text-3xl">{t("practiceAreas.citizens")}:</h2>
        </Animated>
        <div className="flex gap-10 flex-wrap mt-12">
          {services.citizens.map(({ title, description, imageUrl }, i) => (
            <Animated delay={i * 100} key={title} type="slide">
              <Card
                title={title}
                description={description}
                imageUrl={imageUrl}
              />
            </Animated>
          ))}
        </div>
      </Section>

      <span id="companies" />
      <Section>
        <Animated type="slide-in-left">
          <h2 className="text-blue text-3xl">
            {t("practiceAreas.companies")}:
          </h2>
        </Animated>
        <div className="flex gap-10 flex-wrap mt-12">
          {services.companies.map(({ title, description, imageUrl }, i) => (
            <Animated delay={i * 100} key={title} type="slide">
              <Card
                title={title}
                description={description}
                imageUrl={imageUrl}
              />
            </Animated>
          ))}
        </div>
      </Section>

      <HeroSection className="bg-blue text-white py-20">
        <Animated>
          <h3 className="text-2xl md:text-4xl mb-4">
            {t("homepage.hero1.title")}
          </h3>
        </Animated>
        <Animated delay={200}>
          <p className="mb-10 max-w-5xl text-left sm:text-left">
            {t("homepage.hero1.description")}
          </p>
        </Animated>

        <Animated delay={300}>
          <Link href="/contacts">
            <Button label="contact" />
          </Link>
        </Animated>
      </HeroSection>

      <Section>
        <Testimonials />
      </Section>
    </main>
  );
}

export default PracticeAreas;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const messages = (
    await import(`../../messages/${locale ?? "en"}.json`)
  ).default;
  return {
    props: { messages },
  };
};
