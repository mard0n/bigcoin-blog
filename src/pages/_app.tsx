import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextIntlProvider } from "next-intl";

function MyApp({ Component, pageProps }: AppProps) {
  console.log('pageProps', pageProps);
  
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <div dir={pageProps.locale === 'ar' ? 'rtl' : 'ltr'}>
        <Component {...pageProps} />
      </div>
    </NextIntlProvider>
  );
}

export default MyApp;
