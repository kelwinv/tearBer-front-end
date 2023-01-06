import Head from "next/head";
import { HomePage } from "../components/pages/HomePage";
import { useCallback, useEffect, useRef, useState } from "react";
import { Api } from "../services/api";
import { LoadingServer } from "../components/pages/LoadingServer";

export default function Home() {
  const [isLoadingServer, setIsLoadingServer] = useState(true);
  const isInitialMount = useRef(true);

  const testeServer = useCallback(async () => {
    try {
      const response = await Api.get("/ping");
      setIsLoadingServer(false);
    } catch (error) {
      setIsLoadingServer(true);
      setTimeout(() => testeServer(), 5000);
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    testeServer();
  }, [testeServer]);

  return (
    <>
      <Head>
        <title>cha de cozinha</title>
      </Head>
      {isLoadingServer ? <LoadingServer /> : <HomePage />}
    </>
  );
}
