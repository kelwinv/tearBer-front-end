import { HeartAnimation } from "../HeartAnimation";
import styles from "../../styles/LoadingServer/index.module.css";

function LoadingServer() {
  return (
    <main className={styles.main}>
      <h1>Servidor carregando...</h1>
      <HeartAnimation />
    </main>
  );
}

export { LoadingServer };
