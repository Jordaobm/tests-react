import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";
import google from "../../assets/google.png";
import youtube from "../../assets/youtube.png";
import { useUser } from "../../context/user";
import styles from "./Header.module.scss";

export function Header() {
  const { user, handleSignIn, handleSignOut } = useUser();

  return (
    <header>
      <div className={styles.links}>
        <Link to="/">
          <p className={styles.link}>
            <img src={youtube} className={styles.logo} alt="Logo" />
          </p>
        </Link>
      </div>

      {user?.googleId ? (
        <button
          className={styles.loggedButton}
          onClick={() => handleSignOut()}
          data-testid="loggedButton"
        >
          <p>{user?.name}</p>
        </button>
      ) : (
        <>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_ID || ""}
            render={({ onClick }) => (
              <button
                className={styles.googleButton}
                onClick={onClick}
                data-testid="googleButton"
              >
                <div>
                  <img src={google} alt="" />
                </div>
                <p>Entrar com o Google</p>
              </button>
            )}
            buttonText="Login"
            onSuccess={(data: any) => {
              handleSignIn(data?.profileObj);
            }}
            cookiePolicy={"single_host_origin"}
          />
        </>
      )}
    </header>
  );
}
