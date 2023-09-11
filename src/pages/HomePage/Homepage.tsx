import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { auth, gitHubProvider } from "../../firebase";
import "./Homepage.css";
import { signInWithPopup } from "firebase/auth";
import paths from "../../paths/paths";
import { useAuthState } from "react-firebase-hooks/auth";

const HomePage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  if (user) {
    return <Navigate to={paths.players} />;
  }

  const login = async () => {
    await signInWithPopup(auth, gitHubProvider);

    navigate(paths.players);
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
            className="button button--solid"
            text="Log in"
            actionOnClick={login}
          />
        </div>
      </article>
    </div>
  );
};

export default HomePage;
