import Animated from "@/components/Animated";
import TextReveal from "@/components/TextReveal";
import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection/HeroSection";
import IconContact from "@/components/IconContact";
import Section from "@/components/Section";
import useTranslation from "@/hooks/useTranslation";
import { useForm } from "@formspree/react";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import * as Form from "../../components/Form";

function Contacts() {
  const t = useTranslations("pages");
  const { getTranslationsArray } = useTranslation();
  const contacts = getTranslationsArray("pages.contacts.links");
  const formOptions = getTranslationsArray(
    "pages.contacts.form.subject.options"
  );

  // Form
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM || "");

  return (
    <main>
      <HeroSection
        imageSrc="/img/balance2.png"
        parallax
        overlayStyle={{ backgroundColor: "#1E2E45", opacity: 0.9 }}
        style={{
          height: "350px"
        }}
      >
        <TextReveal as="h1" className="text-white mt-10">
          {t("contacts.title")}
        </TextReveal>
      </HeroSection>

      <Section>
        <TextReveal as="h2" className="text-4xl text-blue tracking-wide">
          {t("contacts.formTitle")}
        </TextReveal>
        <Animated type="slide-up" delay={200}>
          <p className="my-6">{t("contacts.formDescription")}</p>
        </Animated>

        {/* Form */}
        {state.succeeded ? (
          <Animated type="scale-up" className="w-100 text-center py-8">
            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <Icon
                icon="lets-icons:check-fill"
                className="text-gold"
                fontSize={50}
              />
            </div>
            <p className="max-w-md mx-auto">{t("contacts.form.success")}</p>
          </Animated>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <Animated type="slide" className="flex gap-5 mb-5">
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
            </Animated>
            <Animated type="slide" delay={120} className="flex gap-5 mb-5">
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
            </Animated>
            <Animated type="slide" delay={240}>
              <Form.Textarea
                icon="mdi:pencil"
                label="Mensagem"
                placeholder={t("contacts.form.message")}
                required
                disabled={state.submitting}
              />
            </Animated>

            <Animated type="fade" delay={360} className="mt-8 text-center">
              {/*   <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={process.env.NEXT_PUBLIC_CAPTCHA}
                onChange={onReCAPTCHAChange}
              /> */}
              <Button
                label="fill form"
                icon="cil:send"
                type="submit"
                disabled={state.submitting}
                loading={state.submitting}
              />
            </Animated>
          </form>
        )}
      </Section>

      <Section sectionClassName="relative flex flex-wrap -mt-6">
        <div className="lg:w-1/2 w-full mb-10">
          <TextReveal as="h2" className="text-4xl text-blue tracking-wide">
            {t("contacts.title2")}
          </TextReveal>

          <Animated type="slide-up" delay={100}>
            <p className="my-7 lg:mr-6">{t("contacts.description")}</p>
          </Animated>

          <div className="flex flex-col items-start gap-4">
            {contacts.map(({ description, icon, href, city }, i) => (
              <Animated type="slide-in-left" key={i} delay={i * 200}>
                <IconContact
                  icon={icon}
                  contact={description}
                  city={city}
                  href={href}
                />
              </Animated>
            ))}
          </div>
        </div>

        <div className="w-full h-full lg:w-1/2 flex flex-col gap-4">
          <div className="relative w-full h-80">
            <Animated>
              <iframe
                title="Campo Grande 12, Lisboa"
                src="https://www.google.com/maps?q=Campo+Grande+12,+1700-092+Lisboa&output=embed"
                className="absolute top-0 left-0 w-full h-full border-none"
                loading="lazy"
                frameBorder="0"
                allowFullScreen={true}
                aria-hidden="false"
                tabIndex={0}
              />
            </Animated>
          </div>
          <div className="relative w-full h-80">
            <Animated delay={150}>
              <iframe
                title="R. Miguel Bombarda 75, Barreiro"
                src="https://www.google.com/maps?q=R.+Miguel+Bombarda+75,+2830-354+Barreiro&output=embed"
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
