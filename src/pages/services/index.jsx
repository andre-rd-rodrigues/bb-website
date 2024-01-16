import Button from "@/components/Button";
import Card from "@/components/Card";
import HeroSection from "@/components/HeroSection/HeroSection";
import Section from "@/components/Section";
import Testimonials from "@/components/Testimonials/Testimonials";
import useTranslation from "@/hooks/useTranslation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

function Services() {
  const t = useTranslations("pages");

  const { getTranslationsArray } = useTranslation();

  const services = getTranslationsArray("pages.services.areas").reduce(
    (acc, currentValue) => {
      currentValue.type === "citizens"
        ? acc.citizens.push(currentValue)
        : acc.company.push(currentValue);
      return acc;
    },
    { citizens: [], company: [] }
  );

  return (
    <main>
      <HeroSection
        imageSrc="/img/balance2.png"
        overlayStyle={{ backgroundColor: "#1E2E45", opacity: 0.9 }}
        style={{
          height: "350px"
        }}
      >
        <h1 className="text-white mt-10">{t("services.title")}</h1>
      </HeroSection>

      <Section>
        <h2 className="text-blue text-3xl">{t("services.citizens")}</h2>
        <div className="flex gap-10 flex-wrap mt-5">
          {services.citizens.map(({ title, description, imageUrl }) => (
            <Card
              title={title}
              description={description}
              imageUrl={imageUrl}
              key={title}
            />
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-blue text-3xl">{t("services.companies")}</h2>
        <div className="flex gap-10 flex-wrap mt-5">
          {services.company.map(({ title, description, imageUrl }) => (
            <Card
              title={title}
              description={description}
              imageUrl={imageUrl}
              key={title}
            />
          ))}
        </div>
      </Section>

      <HeroSection className="bg-blue text-white py-20">
        <h3 className="text-2xl md:text-4xl mb-4">
          {t("homepage.hero1.title")}
        </h3>
        <p className="mb-10 max-w-5xl">{t("homepage.hero1.description")}</p>
        <Link to="/contacts" href="/contacts">
          <Button label="contact" />
        </Link>
      </HeroSection>

      <Section>
        <Testimonials />
      </Section>
    </main>
  );
}

export default Services;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}