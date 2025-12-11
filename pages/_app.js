import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* ✅ FAVICON */}
        <link
          rel="icon"
          type="image/svg+xml"
          href="/images/VerdictifyVECTOR.svg"
        />

        {/* ✅ APP TITLE */}
        <title>Verdictify</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}
