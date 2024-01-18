import Button from "@/components/Button";
import Card from "@/components/Card";
import Faqs from "@/components/Faqs";
import HeroSection from "@/components/HeroSection/HeroSection";
import Logo from "@/components/Logo";
import PublishedArticlesSection from "@/components/PublishedArticlesSection/PublishedArticlesSection";
import Section from "@/components/Section";
import Testimonials from "@/components/Testimonials/Testimonials";
import useTranslation from "@/hooks/useTranslation";
import { dm_sans, dm_serif, encode } from "@/styles/fonts";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import Animated from "@/components/Animated";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const t = useTranslations("pages");
  const [counterRef, counterInView] = useInView();

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
        <Animated type="slide">
          <Logo fill="#B19460" width={"auto"} height={100} />
        </Animated>

        <Animated type="slide-in-right" delay={200}>
          <h1 className="text-blue">Bárbara Barbizani</h1>
        </Animated>

        <Animated type="slide-in-left" delay={200}>
          <h2
            className={`${encode.className} mb-6 text-gold font-normal text-lg`}
          >
            {t("homepage.subtitle")}
          </h2>
        </Animated>

        <Animated
          type="fade"
          delay={500}
          config={{
            config: { tension: 150, friction: 60 }
          }}
        >
          <Button label="contact" variant />
        </Animated>
      </HeroSection>

      {/* About me */}
      <Section sectionClassName="flex flex-wrap lg:flex-nowrap gap-10">
        <div className="w-full lg:w-1/2 p-0 sm:p-4 justify-center items-center">
          <Animated type="slide-in-left">
            <h3 className="text-blue"> {t("homepage.about.subtitle")}</h3>
          </Animated>
          <Animated type="slide-in-left" delay={100}>
            <h4 className="text-4xl text-blue mt-3">
              {t("homepage.about.title")}
            </h4>
          </Animated>

          <Animated type="fade" delay={600}>
            <p className="my-7">{t("homepage.about.description")}</p>
          </Animated>

          <Animated type="fade" delay={800}>
            <div className="flex gap-10">
              {aboutExtraInfo.map(({ title, value }) => (
                <div className="text-blue" key={title} ref={counterRef}>
                  <p className={`${dm_serif.className}`}>{title}</p>
                  {counterInView && (
                    <CountUp start={0} end={value} duration={5}>
                      {({ countUpRef }) => (
                        <div className="flex">
                          <p
                            className={`${dm_serif.className} text-5xl`}
                            ref={countUpRef}
                          >
                            {value}
                          </p>
                          <span className={`${dm_serif.className} text-5xl`}>
                            +
                          </span>
                        </div>
                      )}
                    </CountUp>
                  )}
                </div>
              ))}
            </div>
          </Animated>
          <Animated type="fade" delay={1000}>
            <Link href="/about">
              <Button label={"see more"} variant className={"mt-8"} />
            </Link>
          </Animated>
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <div className="m-auto h-full mt-12">
            <Animated delay={500}>
              <Image
                src="/img/bb.jpg"
                alt="Barbara Barbizani"
                width={800}
                height={800}
                layout="responsive"
                objectFit="cover"
                className="shadow-2xl"
              />
            </Animated>
          </div>
        </div>
      </Section>

      {/* Practice Areas  */}
      <Section containerClassName="bg-blue text-white">
        <Animated>
          <h3 className="text-center text-4xl">
            {t("homepage.practice.title")}
          </h3>
        </Animated>
        <Animated delay={300}>
          <p
            className={`${dm_sans.className} text-center font-extralight mt-3 mb-12 max-w-4xl mx-auto`}
          >
            {t("homepage.practice.subtitle")}
          </p>
        </Animated>

        <div className="flex flex-wrap justify-center gap-10">
          {praticeAreas.map(({ title, description, imageUrl }, i) => (
            <Animated type="slide" delay={i * 100} key={title}>
              <Card
                title={title}
                description={description}
                imageUrl={imageUrl}
              />
            </Animated>
          ))}
        </div>
        <Animated type="fade">
          <Link href="/practice-areas">
            <Button label="see more" className="block mx-auto mt-10" />
          </Link>
        </Animated>
      </Section>

      {/* Testimonials  */}
      <Section>
        <Testimonials />
      </Section>

      {/* Hero */}
      <HeroSection className="bg-blue text-white py-20">
        <Animated>
          <h3 className="text-2xl md:text-4xl mb-4">
            {t("homepage.hero1.title")}
          </h3>
        </Animated>
        <Animated delay={200}>
          <p className="mb-10 max-w-5xl">{t("homepage.hero1.description")}</p>
        </Animated>
        <Animated delay={400}>
          <Link to="/contacts" href="/contacts">
            <Button label="contact" />
          </Link>
        </Animated>
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
          <Animated type="slide-in-left">
            <h3 className="text-blue">{t("homepage.contacts.subtitle")}</h3>
          </Animated>
          <Animated type="slide-in-left" delay={200}>
            <h4 className="text-4xl text-blue mt-3">
              {t("homepage.contacts.title")}
            </h4>
          </Animated>
          <Animated delay={300}>
            <p className="my-7">{t("homepage.contacts.description")}</p>
          </Animated>
          <Animated delay={400}>
            <Link href="/contacts">
              <Button label={"contact"} variant className={"mt-8"} />
            </Link>
          </Animated>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="max-w-md m-auto h-full mt-12">
            <Animated delay={300}>
              <Image
                src="/img/balance.jpg"
                alt="Barbara Barbizani"
                width={800}
                height={800}
                layout="responsive"
                objectFit="cover"
              />
            </Animated>
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
