import { headConfig } from "@/utils";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";

const legalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": "https://www.barbizanicarvalholaw.com/#legalservice",
  name: "Bárbara Barbizani — Advocacia e Consultoria Jurídica",
  description:
    "Escritório de advocacia em Lisboa e no Barreiro especializado em consultoria jurídica local e clientes internacionais.",
  url: "https://www.barbizanicarvalholaw.com",
  telephone: "+351211956606",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Campo Grande 12, 2.º andar, escritório 16",
      addressLocality: "Lisboa",
      postalCode: "1700-092",
      addressCountry: "PT"
    },
    {
      "@type": "PostalAddress",
      streetAddress: "R. Miguel Bombarda 75",
      addressLocality: "Barreiro",
      postalCode: "2830-354",
      addressCountry: "PT"
    }
  ],
  areaServed: [
    "Lisboa",
    "Barreiro",
    "Margem Sul",
    "Moita",
    "Montijo",
    "Seixal",
    "Almada",
    "Península de Setúbal"
  ].map((name) => ({ "@type": "AdministrativeArea", name }))
};

const AppHead = (props) => {
  const router = useRouter();
  const t = useTranslations("metadata");
  const { pathname, locale } = router;
  const { title: titleTranslation } = headConfig[pathname] || {
    title: "notFoundTitle"
  };

  const { openGraph } = props;

  const title = t(titleTranslation);
  const description = t("description");

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={
          openGraph
            ? openGraph
            : {
                url: `https://www.barbizanicarvalholaw.com`,
                title,
                description,
                locale,
                images: [
                  {
                    url:
                      locale === "pt"
                        ? "/img/meta_pt.png"
                        : "/img/meta_en.png",
                    alt: title
                  }
                ]
              }
        }
        {...props}
      />
      <Head>
        <script
          type="application/ld+json"
          key="legalservice-jsonld"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(legalServiceJsonLd)
          }}
        />
      </Head>
    </>
  );
};

export default AppHead;
