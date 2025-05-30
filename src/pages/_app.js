import { NextIntlClientProvider } from "next-intl";
import "@/styles/globals.scss";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { dm_sans, dm_serif } from "@/styles/fonts";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Analytics from "@/components/Analytics";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        :root {
          --font-serif: ${dm_serif.style.fontFamily};
          --font-sans: ${dm_sans.style.fontFamily};
        }
      `}</style>
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <SpeedInsights />
        <Analytics />
      </NextIntlClientProvider>
    </>
  );
}
