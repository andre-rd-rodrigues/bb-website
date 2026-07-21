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
    "Escritório de advocacia no Barreiro especializado em consultoria jurídica local e clientes internacionais.",
  url: "https://www.barbizanicarvalholaw.com",
  telephone: "+351211956606",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Álvaro Velho, 2D",
    addressLocality: "Barreiro",
    postalCode: "2830-327",
    addressCountry: "PT"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "38.661998",
    longitude: "-9.083387"
  },
  areaServed: [
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
