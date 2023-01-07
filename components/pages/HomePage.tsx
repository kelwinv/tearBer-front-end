import Image from "next/image";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import styles from "../../styles/HomePage/index.module.css";
import { Api } from "../../services/api";
import { HeartAnimation } from "../HeartAnimation";
import { LoadingServer } from "./LoadingServer";

function HomePage() {
  const [name, setName] = useState("");
  const [isEmptyName, setIsEmptyName] = useState(false);
  const [nameAlreadyExiste, setNameAlreadyExiste] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingServer, setIsLoadingServer] = useState(true);
  const isInitialMount = useRef(true);

  const router = useRouter();

  useEffect(() => {
    if (isEmptyName && name) {
      setIsEmptyName(false);
    }
    setNameAlreadyExiste(false);
  }, [name, isEmptyName]);

  async function handleFormName(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formatted_name = name.trim();
      if (isLoading) return;
      if (!formatted_name) {
        setIsEmptyName(true);
        return;
      }

      setIsEmptyName(false);
      setIsLoading((oldState) => !oldState);
      const { data } = await Api.post("/guest/create", {
        name: formatted_name,
      });

      if (data.status === 409) {
        setNameAlreadyExiste(true);
        setIsLoading(false);
      }
      console.log(data);

      if (data._id) {
        router.push(`/item/${data._id}`);
      }
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  }

  const testeServer = useCallback(async () => {
    try {
      const response = await Api.get("/ping");
      console.log(response);
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

  // if (isLoadingServer) return <LoadingServer />;

  return (
    <main className={styles.main_container}>
      <div className={styles.smoke_top_left_container}>
        <Image src="/images/smoke.png" alt="" width={300} height={300} />
      </div>
      <div className={styles.smoke2}>
        <Image src="/images/smoke.png" alt="" width={300} height={300} />
      </div>
      <form className={styles.form_content} onSubmit={handleFormName}>
        <div
          className={`${styles.input_container} ${
            isEmptyName ? styles.isEmpty : ""
          }`}
        >
          <input
            type="text"
            placeholder="NOME E SOBRENOME"
            className={nameAlreadyExiste ? styles.nameAlreadyExiste : ""}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {nameAlreadyExiste && (
            <p>
              O nome ja está em sendo usado por outro convidado tente colocar o
              sobrenome
            </p>
          )}
        </div>
        <div className={styles.button_container}>
          <button
            className={`
          ${isLoading ? styles.button_is_loading : styles.button}
          ${isEmptyName ? styles.isEmpty : ""}
          `}
            type="submit"
          >
            {!isLoading && <p>confirmar</p>}
            <HeartAnimation hasHidden={!isLoading} />
          </button>
        </div>
      </form>
      <div className={styles.sheet_left}>
        <Image src="/images/sheets.png" alt="" width={200} height={200} />
      </div>
      <div className={styles.bottom_flowers_container}>
        <div
          className={(styles.plants_bottom_right_side_sheet, styles.sheets_1)}
        >
          <Image src="/images/sheets.png" alt="" width={200} height={200} />
        </div>
        <div className={styles.plants_bottom_right_side}>
          <Image src="/svgs/plant_v1.svg" alt="" width={300} height={300} />
        </div>
        <div
          className={(styles.plants_bottom_right_side_sheet, styles.sheets_2)}
        >
          <Image src="/images/sheets.png" alt="" width={200} height={200} />
        </div>
      </div>
    </main>
  );
}

export { HomePage };
