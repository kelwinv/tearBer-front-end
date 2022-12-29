import Head from "next/head";
import { HomePage } from "../components/pages/HomePage";

export default function Home() {
  return (
    <>
      <Head>
        <title>cha de cozinha</title>
        <meta name="description" content="cha de cozinha" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
}
