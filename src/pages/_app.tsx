import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextIntlProvider } from "next-intl";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  console.log("pageProps", pageProps);

  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="preload"
          href="/fonts/SF-Pro-Display-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/SF-Pro-Display-Semibold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/SF-Pro-Display-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <div dir={pageProps.locale === "ar" ? "rtl" : "ltr"}>
        <Component {...pageProps} />
      </div>
    </NextIntlProvider>
  );
}

export default MyApp;
