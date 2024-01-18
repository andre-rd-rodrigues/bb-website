import Animated from "@/components/Animated";
import Button from "@/components/Button";
import Card from "@/components/Card";
import HeroSection from "@/components/HeroSection/HeroSection";
import Section from "@/components/Section";
import Testimonials from "@/components/Testimonials/Testimonials";
import useTranslation from "@/hooks/useTranslation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

function PracticeAreas() {
  const t = useTranslations("pages");

  const { getTranslationsArray } = useTranslation();

  const services = getTranslationsArray("components.practiceAreas").reduce(
    (acc, currentValue) => {
      currentValue.type.toLowerCase() === "citizens"
        ? acc.citizens.push(currentValue)
        : acc.companies.push(currentValue);
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
          height: "350px"
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
                key={title}
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
          <p className="mb-10 max-w-5xl">{t("homepage.hero1.description")}</p>
        </Animated>

        <Animated delay={300}>
          <Link to="/contacts" href="/contacts">
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
