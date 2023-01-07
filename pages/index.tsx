import Head from "next/head";
import { HomePage } from "../components/pages/HomePage";
import { useCallback, useEffect, useRef, useState } from "react";
import { Api } from "../services/api";
import { LoadingServer } from "../components/pages/LoadingServer";

export default function Home() {
  return (
    <>
      <Head>
        <title>cha de cozinha</title>
      </Head>
      <HomePage />
    </>
  );
}
