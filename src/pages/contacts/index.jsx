import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection/HeroSection";
import IconContact from "@/components/IconContact";
import Section from "@/components/Section";
import useTranslation from "@/hooks/useTranslation";
import { useTranslations } from "next-intl";
import React from "react";

function Contacts() {
  const t = useTranslations("pages");
  const { getTranslationsArray } = useTranslation();
  const contacts = getTranslationsArray("pages.contacts.links");

  return (
    <main>
      <HeroSection
        imageSrc="/img/balance2.png"
        overlayStyle={{ backgroundColor: "#1E2E45", opacity: 0.9 }}
        style={{
          height: "350px"
        }}
      >
        <h1 className="text-white mt-10">{t("contacts.title")}</h1>
      </HeroSection>

      <Section>
        <h2 className="text-4xl text-blue tracking-wide">
          {t("contacts.formTitle")}
        </h2>
        <p className="my-6">{t("contacts.formDescription")}</p>
        <Button label="fill form" className="block mx-auto" />
      </Section>

      <Section sectionClassName="relative flex flex-wrap -mt-6">
        <div className="lg:w-1/2 w-full mb-10">
          <h2 className="text-4xl text-blue tracking-wide">
            {t("contacts.title2")}
          </h2>
          <p className="my-7 lg:mr-6">{t("contacts.description")}</p>

          <div className="flex flex-col items-start gap-4">
            {contacts.map(({ description, icon, href }, i) => (
              <IconContact
                icon={icon}
                contact={description}
                key={i}
                href={href}
              />
            ))}
          </div>
        </div>

        <div className="w-full h-full lg:w-1/2">
          <div className="relative w-full h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3115.4294338611166!2d-9.083387187316363!3d38.661997760439924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd193669959ed2a7%3A0xb3a89a56fecdcdaf!2sR.%20%C3%81lvaro%20Velho%202%2C%202830-335%20Barreiro!5e0!3m2!1sen!2spt!4v1705504066004!5m2!1sen!2spt"
              className="absolute top-0 left-0 w-full h-full border-none"
              loading="lazy"
              frameborder="0"
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
            />
          </div>
        </div>
      </Section>
    </main>
  );
}

export default Contacts;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
