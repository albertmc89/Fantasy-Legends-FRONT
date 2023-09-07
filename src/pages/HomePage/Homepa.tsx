import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { auth, gitHubProvider } from "../../firebase";
import "./Homepa.css";
import { signInWithPopup } from "firebase/auth";

const HomePage = () => {
  const navigate = useNavigate();

  const login = async () => {
    await signInWithPopup(auth, gitHubProvider);
    navigate("/players");
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <div className="login-container__avatar">
          <img
            className="login-container__image"
            src="./img/logo-avatar.png"
            alt="grey suit avatar logo"
          />
        </div>
        <div className="login-container__title-container">
          <h2 className="login-container__title">Welcome</h2>
          <span>Access with your Github account</span>
          <Button
            className="button button--solid"
            text="Log in"
            actionOnClick={login}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
