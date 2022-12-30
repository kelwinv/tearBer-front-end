import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../../styles/ItemPage/index.module.css";

function ItemPageComponent() {
  const { query } = useRouter();

  const myLoader = ({ src }: { src: string }) => {
    return src;
  };
  return (
    <main className={styles.main_container}>
      <div className={styles.top_plant_icon}>
        <Image
          loader={myLoader}
          src="/svgs/plant_v2.svg"
          alt="background"
          width={225}
          height={225}
        />
      </div>
      <section className={styles.main_section}>
        <header className={styles.header_container}>
          <h1>
            Ola, <strong>{String(query?.name_id).split("_")[0]}</strong>
          </h1>
        </header>
        <section className={styles.image_section}>
          <Image
            loader={myLoader}
            src="https://random.imagecdn.app/500/500"
            alt="background"
            width={500}
            height={500}
          />
          <p>NOME DO PRODUTO</p>
        </section>
        <span className={styles.hearts_division}>
          <i></i>
          <div className={styles.hearts}>
            <Image alt="" src={"/svgs/heart.svg"} width={24} height={24} />
            <Image alt="" src={"/svgs/heart.svg"} width={32} height={32} />
            <Image alt="" src={"/svgs/heart.svg"} width={24} height={24} />
          </div>
          <i></i>
        </span>
        <div className={styles.button_container}>
          <button>confirmar</button>
        </div>
      </section>
      <footer>
      </footer>
    </main>
  );
}

export { ItemPageComponent };
