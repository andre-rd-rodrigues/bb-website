import Animated from "@/components/Animated";
import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection/HeroSection";
import IconContact from "@/components/IconContact";
import Section from "@/components/Section";
import useTranslation from "@/hooks/useTranslation";
import { useForm } from "@formspree/react";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import type { GetStaticProps } from "next";
import React from "react";
import * as Form from "@/components/Form";

interface ContactLink {
  description: string;
  icon: string;
  href: string;
}

function Contacts() {
  const t = useTranslations("pages");
  const { getTranslationsArray } = useTranslation();
  const contacts = getTranslationsArray("pages.contacts.links") as ContactLink[];
  const formOptions = getTranslationsArray(
    "pages.contacts.form.subject.options"
  ) as string[];

  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM ?? "");

  return (
    <main>
      <HeroSection
        imageSrc="/img/balance2.png"
        overlayStyle={{ backgroundColor: "#1E2E45", opacity: 0.9 }}
        style={{
          height: "350px"
        }}
      >
        <Animated type="slide-in-right" className="">
          <h1 className="text-white mt-10">{t("contacts.title")}</h1>
        </Animated>
      </HeroSection>

      <Section containerClassName="" sectionClassName="">
        <Animated type="slide-in-left" className="">
          <h2 className="text-4xl text-blue tracking-wide">
            {t("contacts.formTitle")}
          </h2>
        </Animated>
        <Animated delay={200} className="">
          <p className="my-6">{t("contacts.formDescription")}</p>
        </Animated>

        <Animated delay={400} className="">
          {state.succeeded ? (
            <Animated type="slide-in-left" className="w-100 text-center">
              <Icon
                icon="lets-icons:check-fill"
                className="text-emerald-400 m-auto"
                fontSize={90}
              />

              <p>{t("contacts.form.success")}</p>
            </Animated>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="flex gap-5 mb-5">
                <Form.Input
                  icon="mdi:user"
                  label="Nome"
                  placeholder={t("contacts.form.name")}
                  required
                  disabled={state.submitting}
                />
                <Form.Input
                  icon="ic:baseline-email"
                  label="Email"
                  type="email"
                  placeholder={t("contacts.form.email")}
                  required
                  disabled={state.submitting}
                />
              </div>
              <div className="flex gap-5 mb-5">
                <Form.Input
                  icon="ic:round-phone"
                  label="Telefone"
                  type="tel"
                  placeholder={t("contacts.form.phone")}
                  disabled={state.submitting}
                />
                <Form.Select
                  icon="mingcute:information-fill"
                  label="Assunto"
                  placeholder={t("contacts.form.subject.title")}
                  options={formOptions}
                  required
                  disabled={state.submitting}
                />
              </div>
              <Form.Textarea
                icon="mdi:pencil"
                label="Mensagem"
                placeholder={t("contacts.form.message")}
                required
                disabled={state.submitting}
              />

              <div className="mt-8 text-center">
                <Button
                  label="fill form"
                  className=""
                  disabled={state.submitting}
                  loading={state.submitting}
                  variant={false}
                  onClick={undefined}
                />
              </div>
            </form>
          )}
        </Animated>
      </Section>

      <Section
        containerClassName=""
        sectionClassName="relative flex flex-wrap -mt-6"
      >
        <div className="lg:w-1/2 w-full mb-10">
          <Animated type="slide-in-left" className="">
            <h2 className="text-4xl text-blue tracking-wide">
              {t("contacts.title2")}
            </h2>
          </Animated>

          <Animated delay={100} className="">
            <p className="my-7 lg:mr-6">{t("contacts.description")}</p>
          </Animated>

          <div className="flex flex-col items-start gap-4">
            {contacts.map(({ description, icon, href }, i) => (
              <Animated
                type="slide-in-left"
                key={i}
                delay={i * 200}
                className=""
              >
                <IconContact icon={icon} contact={description} href={href} />
              </Animated>
            ))}
          </div>
        </div>

        <div className="w-full h-full lg:w-1/2">
          <div className="relative w-full h-96">
            <Animated className="">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3115.4294338611166!2d-9.083387187316363!3d38.661997760439924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd193669959ed2a7%3A0xb3a89a56fecdcdaf!2sR.%20%C3%81lvaro%20Velho%202%2C%202830-335%20Barreiro!5e0!3m2!1sen!2spt!4v1705504066004!5m2!1sen!2spt"
                className="absolute top-0 left-0 w-full h-full border-none"
                loading="lazy"
                frameBorder="0"
                allowFullScreen={true}
                aria-hidden="false"
                tabIndex={0}
              />
            </Animated>
          </div>
        </div>
      </Section>
    </main>
  );
}

export default Contacts;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const messages = (
    await import(`../../messages/${locale ?? "en"}.json`)
  ).default;
  return {
    props: { messages }
  };
};
