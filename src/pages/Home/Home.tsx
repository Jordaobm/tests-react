import { Form } from "../../components/Form/Form";
import { Header } from "../../components/Header/Header";
import { Videos } from "../../components/Videos/Videos";
import { useUser } from "../../context/user";
import styles from "./Home.module.scss";

export function Home() {
  const { user } = useUser();

  return (
    <div className={styles.container} data-testid="container">
      <Header />

      {user?.googleId ? (
        <Form />
      ) : (
        <div className={styles.notLogged}>
          <h3>Você precisa estar logado para procurar vídeos</h3>
        </div>
      )}

      <Videos />
    </div>
  );
}
