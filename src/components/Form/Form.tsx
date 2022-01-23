import { useState } from "react";
import { useUser } from "../../context/user";
import styles from "./Form.module.scss";

export const Form = () => {
  const [url, setUrl] = useState("");
  const { handleAddVideo, user } = useUser();

  return (
    <div className={styles.content}>
      <input
        id="url"
        type="text"
        placeholder="Digite a url"
        onChange={(e) => setUrl(e?.target?.value)}
        value={url}
      />
      <button
        onClick={() => {
          handleAddVideo({ googleId: user?.googleId, url });
          setUrl("");
        }}
      >
        Buscar
      </button>
    </div>
  );
};
