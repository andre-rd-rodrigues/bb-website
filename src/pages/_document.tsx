import { Html, Head, Main, NextScript } from "next/document";

interface DocumentProps {
  locale?: string;
}

export default function Document({ locale }: DocumentProps) {
  return (
    <Html lang={locale ?? "en"}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
