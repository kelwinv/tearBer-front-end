import Image from "next/image";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "../../styles/HomePage/index.module.css";
import { Api } from "../../services/api";
import { HeartAnimation } from "../HeartAnimation";

function HomePage() {
  const [name, setName] = useState("");
  const [isEmptyName, setIsEmptyName] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isEmptyName && name) {
      setIsEmptyName(false);
    }
  }, [name, isEmptyName]);

  async function handleFormName(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!name) {
      setIsEmptyName(true);
      return;
    }

    setIsEmptyName(false);
    setIsLoading((oldState) => !oldState);
    const response = await Api.post("/guest/create", { name });
    console.log(response);
  }

  return (
    <main className={styles.main_container}>
      <div className={styles.smoke_top_left_container}>
        <Image src="/images/smoke.png" alt="" width={300} height={300} />
      </div>
      <div className={styles.smoke2}>
        <Image src="/images/smoke.png" alt="" width={300} height={300} />
      </div>
      <form className={styles.form_content}>
        <div
          className={`${styles.input_container} ${
            isEmptyName ? styles.isEmpty : ""
          }`}
        >
          <input
            type="text"
            placeholder="DIGITE SEU NOME"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className={styles.button_container}>
          <button
            className={`
          ${isLoading ? styles.button_is_loading : styles.button}
          ${isEmptyName ? styles.isEmpty : ""}
          `}
            onClick={handleFormName}
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
