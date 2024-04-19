import React from "react";
import Container from "./Container";
import FooterSection from "./Footer/FooterSection";
import { useTranslations } from "next-intl";
import useTranslation from "@/hooks/useTranslation";
import Logo from "./Logo";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { SOCIAL_MEDIA } from "@/constants";

function Footer() {
  const t = useTranslations("components");
  const { getTranslationsArray } = useTranslation();
  const footerLinks = getTranslationsArray("components.footer.links");

  return (
    <footer className="bg-blue">
      <Container className="py-7">
        {/* Logo */}
        <Link href="/">
          <Logo fill="white" width={50} height={50} className="mx-auto" />
        </Link>

        <hr className="my-6 border-gray-400 mx-auto opacity-50" />

        {/* Description & Social Media */}
        <div className="md:flex md:justify-between ">
          <div className="mb-6 md:mb-0 sm:max-w-52">
            <p className="text-white text-sm">{t("footer.description")}</p>
            <div className="flex gap-4 mt-3 justify-center sm:justify-start">
              {SOCIAL_MEDIA.map(({ icon, href }) => (
                <Link href={href} key={href} target="_blank">
                  <Icon color="white" icon={icon} fontSize={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap gap-5 justify-between sm:justify-normal">
            {footerLinks.map(({ name, href, subLinks }, i) => (
              <FooterSection
                key={i}
                title={name}
                subLinks={subLinks}
                sectionHref={href}
              />
            ))}
          </div>
        </div>

        <hr className="my-6 border-gray-400 mx-auto opacity-50" />

        {/* Copyright */}
        <div className="text-center">
          <span className="text-sm font-light text-gray-400">
            © 2024{" "}
            <a
              href="https://andrerodrigo.com"
              className="text-sm text-white hover:underline"
              target="_blank"
            >
              André Rodrigo
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0"></div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
