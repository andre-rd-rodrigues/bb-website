import Image from "next/image";
import { Inter } from "next/font/google";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import HeroSection from "@/components/HeroSection/HeroSection";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { dm_sans, dm_serif, encode } from "@/styles/fonts";
import Section from "@/components/Section";
import Card from "@/components/Card";
import useTranslation from "@/hooks/useTranslation";
import Link from "next/link";
import Testimonials from "@/components/Testimonials/Testimonials";
import PublishedArticlesSection from "@/components/PublishedArticlesSection/PublishedArticlesSection";
import Faqs from "@/components/Faqs";

export default function Home() {
  const t = useTranslations("pages");

  const { getTranslationsArray } = useTranslation();

  const praticeAreas = getTranslationsArray("components.practiceAreas").slice(
    0,
    6
  );
  const aboutExtraInfo = getTranslationsArray("pages.homepage.about.extraInfo");
  const articles = getTranslationsArray("components.articles.articles").slice(
    0,
    2
  );

  return (
    <main>
      <HeroSection
        imageSrc="/img/panteao.jpg"
        overlayStyle={{
          backgroundColor: "#E8E9E1",
          opacity: 0.7
        }}
        style={{
          height: "600px"
        }}
      >
        <Logo fill="#B19460" width={"auto"} height={100} />
        <h1 className="text-blue">Bárbara Barbizani</h1>
        <h2
          className={`${encode.className} mb-6 text-gold font-normal text-lg`}
        >
          {t("homepage.subtitle")}
        </h2>
        <Button label="contact" variant />
      </HeroSection>

      {/* About me */}
      <Section sectionClassName="flex flex-wrap lg:flex-nowrap gap-10">
        <div className="w-full lg:w-1/2 p-0 sm:p-4 justify-center items-center">
          <h3 className="text-blue"> {t("homepage.about.subtitle")}</h3>
          <h4 className="text-4xl text-blue mt-3">
            {t("homepage.about.title")}
          </h4>
          <p className="my-7">{t("homepage.about.description")}</p>
          <div className="flex gap-10">
            {aboutExtraInfo.map(({ title, value }) => (
              <div className="text-blue" key={title}>
                <p className={`${dm_serif.className}`}>{title}</p>
                <p className={`${dm_serif.className} text-5xl`}>{value}</p>
              </div>
            ))}
          </div>
          <Link href="/about">
            <Button label={"see more"} variant className={"mt-8"} />
          </Link>
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <div className="m-auto h-full mt-12">
            <Image
              src="/img/bb.jpg"
              alt="Barbara Barbizani"
              width={800}
              height={800}
              layout="responsive"
              objectFit="cover"
              className="shadow-2xl"
            />
          </div>
        </div>
      </Section>

      {/* Practice Areas  */}
      <Section containerClassName="bg-blue text-white">
        <h3 className="text-center text-4xl">{t("homepage.practice.title")}</h3>
        <p
          className={`${dm_sans.className} text-center font-extralight mt-3 mb-12 max-w-4xl mx-auto`}
        >
          {t("homepage.practice.subtitle")}
        </p>
        <div className="flex flex-wrap justify-center gap-10">
          {praticeAreas.map(({ title, description, imageUrl }) => (
            <Card
              title={title}
              description={description}
              imageUrl={imageUrl}
              key={title}
            />
          ))}
        </div>
        <Link href="/practice-areas">
          <Button label="see more" className="block mx-auto mt-10" />
        </Link>
      </Section>

      {/* Testimonials  */}
      <Section>
        <Testimonials />
      </Section>

      {/* Hero */}
      <HeroSection className="bg-blue text-white py-20">
        <h3 className="text-2xl md:text-4xl mb-4">
          {t("homepage.hero1.title")}
        </h3>
        <p className="mb-10 max-w-5xl">{t("homepage.hero1.description")}</p>
        <Link to="/contacts" href="/contacts">
          <Button label="contact" />
        </Link>
      </HeroSection>

      {/* Published Articles */}
      <PublishedArticlesSection articles={articles} seeMore />

      {/* FAQS */}
      <Section containerClassName="bg-blue">
        <Faqs />
      </Section>

      {/* Contacts */}
      <Section sectionClassName="flex flex-wrap">
        <div className="w-full md:w-1/2 p-0 sm:p-4 flex flex-col justify-center ">
          <h3 className="text-blue">{t("homepage.contacts.subtitle")}</h3>
          <h4 className="text-4xl text-blue mt-3">
            {t("homepage.contacts.title")}
          </h4>
          <p className="my-7">{t("homepage.contacts.description")}</p>
          <Link href="/contacts">
            <Button label={"contact"} variant className={"mt-8"} />
          </Link>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="max-w-md m-auto h-full mt-12">
            <Image
              src="/img/balance.jpg"
              alt="Barbara Barbizani"
              width={800}
              height={800}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
      </Section>
    </main>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
