import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/layout";

import "../styles/globals.css";
// import '../styles/bookform.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1,maximum-scale=1"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
