import { headConfig } from "@/utils";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

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
                    locale === "pt" ? "/img/meta_pt.png" : "/img/meta_en.png",
                  alt: title
                }
              ]
            }
      }
      {...props}
    />
  );
};

export default AppHead;
