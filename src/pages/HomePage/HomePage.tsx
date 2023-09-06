import { Navigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { auth, gitHubProvider } from "../../firebase";
import "./HomePage.css";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import PlayersListPage from "../PlayersListPage/PlayersListPage";

const HomePage = () => {
  const [user] = useAuthState(auth);

  const login = async () => {
    await signInWithPopup(auth, gitHubProvider);

    <Navigate to="/home" />;
  };

  return (
    <>
      {!user && (
        <section className="main-container">
          <div className="login-container">
            <div className="login-container__avatar">
              <img
                className="login-container__image"
                src="./img/logo-avatar.png"
                alt="imagen avatar traje"
              />
            </div>
            <div className="login-container__title-container">
              <h2 className="login-container__title">Welcome</h2>
              <p>Access with your Github account</p>
              <Button
                className="button black-login"
                text="Log in"
                actionOnClick={login}
              />
            </div>
          </div>
        </section>
      )}
      {user && <PlayersListPage />}
    </>
  );
};

export default HomePage;
