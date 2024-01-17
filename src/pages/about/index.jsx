import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection/HeroSection";
import PublishedArticlesSection from "@/components/PublishedArticlesSection/PublishedArticlesSection";
import Section from "@/components/Section";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function About() {
  const t = useTranslations("pages");

  return (
    <main>
      <HeroSection
        imageSrc={"/img/balance2.png"}
        overlayStyle={{ backgroundColor: "#1E2E45", opacity: 0.9 }}
        style={{
          height: "350px"
        }}
      >
        <h1 className="text-white mt-10">{t("about.title")}</h1>
      </HeroSection>

      <Section sectionClassName="relative flex flex-wrap">
        <div className="md:w-1/2 sm:p-4 flex justify-center items-center">
          <h2 className="text-4xl text-blue tracking-wide">
            {t("about.title2")}
          </h2>
        </div>
        <div className="md:w-1/2 w-full">
          <div className="max-w-md m-auto h-full mt-12">
            <Image
              src="https://images.unsplash.com/photo-1555776097-f21af260de55?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Barbara Barbizani"
              width={800}
              height={800}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
        <p className="mt-12">{t("about.description")}</p>
      </Section>

      {/* Hero */}
      <HeroSection className="bg-blue text-white py-20">
        <h3 className="text-2xl md:text-4xl mb-4">{t("about.hero.title")}</h3>
        <p className="mb-10 max-w-5xl">{t("about.hero.description")}</p>
        <Link to="/praticeAreas" href="practiceAreas">
          <Button label="pratice areas" />
        </Link>
      </HeroSection>

      {/* Articles */}
      <PublishedArticlesSection />
    </main>
  );
}

export default About;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
