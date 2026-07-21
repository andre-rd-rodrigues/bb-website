import { IntlErrorCode, NextIntlClientProvider } from "next-intl";
import "@/styles/globals.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import Preloader from "@/components/Preloader";
import { dm_sans, dm_serif, ivy_presto } from "@/styles/fonts";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Analytics from "@/components/Analytics";
import { gsap, prefersMotion } from "@/lib/gsap";

function onError(error) {
  if (
    error.code === IntlErrorCode.MISSING_MESSAGE ||
    error.code === IntlErrorCode.ENVIRONMENT_FALLBACK
  ) {
    return;
  }
  console.error(error);
}

function getMessageFallback({ namespace, key }) {
  return namespace ? `${namespace}.${key}` : key;
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Cohesive cross-fade between pages.
  useEffect(() => {
    if (!prefersMotion()) return;

    const target = "#page-transition";
    const handleStart = () =>
      gsap.to(target, { autoAlpha: 0, duration: 0.2, ease: "power1.out" });
    const handleComplete = () =>
      gsap.fromTo(
        target,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.45, ease: "power2.out" }
      );

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);

  return (
    <>
      <style jsx global>{`
        :root {
          --font-serif: ${dm_serif.style.fontFamily};
          --font-sans: ${dm_sans.style.fontFamily};
          --font-heading: ${ivy_presto.style.fontFamily};
        }
      `}</style>
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
        onError={onError}
        getMessageFallback={getMessageFallback}
      >
        <Preloader />
        <Layout>
          <div id="page-transition">
            <Component {...pageProps} />
          </div>
        </Layout>
        <SpeedInsights />
        <Analytics />
      </NextIntlClientProvider>
    </>
  );
}
