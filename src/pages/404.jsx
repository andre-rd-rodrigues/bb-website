import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";

function NotFoundPage() {
  const t = useTranslations();
  const router = useRouter();

  return (
    <main
      style={{ height: "50vh" }}
      className="text-center flex flex-col items-center justify-center"
    >
      {/*   <h1 className={`${barlow.className} text-blue text-7xl`}>
        {t("pages.notFound.title")}
      </h1>
      <h2 className={`${barlow.className} text-blue text-2xl my-3`}>
        {t("pages.notFound.subtitle")}
      </h2>
      <p className="mb-7">{t("pages.notFound.description")}</p>
      <Button
        label={t("common.buttons.goBack")}
        onClick={() => router.back()}
      /> */}
    </main>
  );
}

export default NotFoundPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
