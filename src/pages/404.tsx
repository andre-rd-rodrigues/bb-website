import Button from "@/components/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";
import type { GetStaticPropsContext } from "next";

function NotFoundPage() {
  const t = useTranslations();
  const router = useRouter();

  return (
    <main
      style={{ height: "50vh" }}
      className="text-center flex flex-col items-center justify-center"
    >
      <h1 className={`text-blue text-7xl`}>{t("pages.notFound.title")}</h1>
      <h2 className={`text-blue text-2xl my-3`}>
        {t("pages.notFound.subtitle")}
      </h2>
      <p className="mb-7">{t("pages.notFound.description")}</p>
      <Button label="go back" onClick={() => router.back()} />
    </main>
  );
}

export default NotFoundPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale ?? "en"}.json`)).default
    }
  };
}
