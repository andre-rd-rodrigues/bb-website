import { headConfig } from "@/utils";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

const AppHead = (props) => {
  const router = useRouter();
  const t = useTranslations();
  const { pathname, locale } = router;
  const { title: titleTranslation } = headConfig[pathname] || {
    title: "notFoundTitle"
  };

  const { openGraph } = props;

  const title = t(`common.metadata.${titleTranslation}`);
  const description = t("common.metadata.description");

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={
        openGraph
          ? openGraph
          : {
              url: `https://www.EXAMPLE.com`,
              title,
              description,
              locale,
              images: [
                {
                  url:
                    locale === "pt"
                      ? "https://i.postimg.cc/Fs4jGHxq/meta-pt.png"
                      : "https://i.postimg.cc/yxbC1bn3/meta-en.png",
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
