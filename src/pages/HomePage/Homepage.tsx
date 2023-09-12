import { Navigate } from "react-router-dom";
import { auth, gitHubProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import paths from "../../paths/paths";
import { useAuthState } from "react-firebase-hooks/auth";
import { lazy } from "react";
import "./Homepage.css";
import Button from "../../components/Button/Button";

export const HomepagePreview = lazy(() => import("./Homepage"));

const Homepage = () => {
  const [user] = useAuthState(auth);

  if (user) {
    return <Navigate to={paths.players} />;
  }

  const login = async () => {
    await signInWithPopup(auth, gitHubProvider);
  };

  return (
    <div className="container">
      <article className="login-container">
        <div className="login-container__avatar">
          <img
            className="login-container__image"
            src="./img/logo-avatar.webp"
            alt="grey suit avatar logo"
          />
        </div>
        <div className="login-container__title-container">
          <h2 className="login-container__title">Welcome</h2>
          <span className="login-container__subtitle">
            Access with your Github account
          </span>
          <Button
            className="button--opacity"
            text="Login"
            actionOnClick={login}
          />
        </div>
      </article>
    </div>
  );
};

export default Homepage;
