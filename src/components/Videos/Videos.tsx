import ReactPlayer from "react-player";
import { useUser } from "../../context/user";
import styles from "./Videos.module.scss";

export const Videos = () => {
  const { videos, handleRemoveVideo } = useUser();

  return (
    <div className={styles.grid} data-testid="grid">
      {videos?.map((video) => {
        return (
          <div key={video?.url}>
            <ReactPlayer url={video.url} width="100%" controls />

            <div className={styles.actions}>
              <button
                className={styles.removeButton}
                onClick={() => handleRemoveVideo(video)}
              >
                Excluir
              </button>
              <button className={styles.downloadButton}>Acessar vídeo</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
