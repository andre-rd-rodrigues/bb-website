import Animated from "@/components/Animated";
import CategoryFilter, { ALL } from "@/components/Blog/CategoryFilter";
import SearchBar from "@/components/Blog/SearchBar";
import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection/HeroSection";
import ServiceSection from "@/components/PracticeAreas/ServiceSection";
import Section from "@/components/Section";
import TextReveal from "@/components/TextReveal";
import Testimonials from "@/components/Testimonials/Testimonials";
import useTranslation from "@/hooks/useTranslation";
import {
  filterPracticeAreas,
  getPracticeAreaSlug,
  normalizeType
} from "@/lib/practiceAreas";
import { dm_sans } from "@/styles/fonts";
import { Flip, gsap, prefersMotion } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { gaAttrs } from "@/lib/analytics";
import React, { useMemo, useRef, useState } from "react";

function PracticeAreas() {
  const t = useTranslations("pages");
  const tFilter = useTranslations("components.practiceAreasFilter");
  const tSearch = useTranslations("components.practiceAreasSearch");

  const { getTranslationsArray } = useTranslation();
  const services = useMemo(
    () => getTranslationsArray("components.practiceAreas"),
    [getTranslationsArray]
  );

  const [active, setActive] = useState(ALL);
  const [query, setQuery] = useState("");

  const listRef = useRef(null);
  const flipState = useRef(null);

  const filterOptions = useMemo(
    () => [
      { key: "citizens", label: tFilter("citizens") },
      { key: "companies", label: tFilter("companies") }
    ],
    [tFilter]
  );

  const visibleServices = useMemo(
    () => filterPracticeAreas(services, { query, type: active }),
    [services, query, active]
  );

  // First visible item of each audience carries the footer anchor
  // (/practice-areas#citizens | #companies) so those links land in place.
  const anchorSlugs = useMemo(() => {
    const firstOfType = {};
    visibleServices.forEach((service) => {
      const key = normalizeType(service.type);
      if (!firstOfType[key]) {
        firstOfType[key] = getPracticeAreaSlug(service);
      }
    });
    return firstOfType;
  }, [visibleServices]);

  // Snapshot current layout before a filter change so Flip can animate reflow.
  const captureFlip = () => {
    if (prefersMotion() && listRef.current) {
      flipState.current = Flip.getState(listRef.current.children);
    }
  };
  const handleCategory = (key) => {
    captureFlip();
    setActive(key);
  };
  const handleSearch = (value) => {
    captureFlip();
    setQuery(value);
  };

  // Filter/search reflow: move survivors, fade entering/leaving rows.
  useGSAP(
    () => {
      if (!prefersMotion() || !listRef.current || !flipState.current) {
        flipState.current = null;
        return;
      }

      Flip.from(flipState.current, {
        duration: 0.6,
        ease: "power3.out",
        absolute: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          ),
        onLeave: (els) => gsap.to(els, { opacity: 0, y: 24, duration: 0.3 })
      });
      flipState.current = null;
    },
    { dependencies: [visibleServices], scope: listRef }
  );

  return (
    <main>
      <HeroSection
        imageSrc="/img/balance2.png"
        parallax
        overlayStyle={{ backgroundColor: "#1E2E45", opacity: 0.9 }}
        style={{ height: "350px" }}
      >
        <TextReveal as="h1" className="text-white mt-10">
          {t("practiceAreas.title")}
        </TextReveal>
      </HeroSection>

      <Section>
        <Animated type="slide-in-left">
          <h3 className="text-gold uppercase tracking-wider text-sm">
            {t("practiceAreas.subtitle")}
          </h3>
          <h2 className="text-blue text-3xl mt-3 max-w-3xl">
            {t("practiceAreas.intro")}
          </h2>
        </Animated>

        <Animated delay={100}>
          <div className="mt-12 flex flex-col gap-6">
            <SearchBar
              value={query}
              onChange={handleSearch}
              placeholder={tSearch("placeholder")}
              label={tSearch("label")}
            />
            <CategoryFilter
              categories={filterOptions}
              active={active}
              onChange={handleCategory}
              allLabel={tFilter("all")}
              className="justify-start"
            />
          </div>
        </Animated>

        {visibleServices.length > 0 ? (
          <div ref={listRef} className="mt-16 flex flex-col gap-20 lg:gap-28">
            {visibleServices.map((service, i) => {
              const slug = getPracticeAreaSlug(service);
              const typeKey = normalizeType(service.type);
              const anchorId = anchorSlugs[typeKey] === slug ? typeKey : null;
              const typeLabel =
                typeKey === "companies"
                  ? tFilter("companies")
                  : tFilter("citizens");

              return (
                <React.Fragment key={slug}>
                  {anchorId && (
                    <span
                      id={anchorId}
                      className="block scroll-mt-28"
                      aria-hidden="true"
                    />
                  )}
                  <ServiceSection
                    slug={slug}
                    title={service.title}
                    description={service.description}
                    imageUrl={service.imageUrl}
                    typeLabel={typeLabel}
                    imagePosition={i % 2 === 0 ? "right" : "left"}
                  />
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <Animated type="fade">
            <p className={`text-center mt-16 text-gray-700 ${dm_sans.className}`}>
              {tSearch("empty")}
            </p>
          </Animated>
        )}
      </Section>

      <HeroSection className="bg-blue text-white py-20">
        <Animated>
          <h3 className="text-2xl md:text-4xl mb-4 text-white">
            {t("homepage.hero1.title")}
          </h3>
        </Animated>
        <Animated type="slide-up" delay={200}>
          <p className="mb-10 max-w-5xl text-left sm:text-left">
            {t("homepage.hero1.description")}
          </p>
        </Animated>

        <Animated delay={300}>
          <Link
            href="/contacts"
            {...gaAttrs("cta_click", {
              cta: "contact",
              location: "practice_areas_page"
            })}
          >
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
