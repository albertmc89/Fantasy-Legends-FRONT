import { NavLink, Navigate } from "react-router-dom";
import { auth, gitHubProvider, googleProvider } from "../../firebase";
import {
  browserPopupRedirectResolver,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import paths from "../../paths/paths";
import { useAuthState } from "react-firebase-hooks/auth";
import { lazy, useState } from "react";
import "./Homepage.css";
import Button from "../../components/Button/Button";
import { showFeedback } from "../../components/FeedBack/showFeedBack";

export const HomepagePreview = lazy(() => import("./Homepage"));

const Homepage = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  if (user) {
    return <Navigate to={paths.players} />;
  }

  const loginGithub = async () => {
    await signInWithPopup(auth, gitHubProvider, browserPopupRedirectResolver);
  };

  const loginGoogle = async () => {
    await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
  };

  const registerEmailPassword = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
      );
      showFeedback("The user has been created succesfully", "success");
    } catch (error) {
      showFeedback(
        "The user couldn't be created or the user already exists",
        "error",
      );
      throw new Error("Can't create the user");
    }
  };

  const submitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <h1 className="login-container__title">Fantasy Legends</h1>
      <article className="login-container">
        <h2 className="login-container__subtitle">Create your account 🤙</h2>
        <div className="login-container__title-container">
          <Button
            className="button--large"
            text="Sign up with Github"
            actionOnClick={loginGithub}
          >
            <img
              src="/img/github.svg"
              alt="the github black and white logo"
              width={20}
              height={20}
            />
          </Button>
        </div>
        <div className="login-container__title-container">
          <div className="divider">
            <div className="divider-line"></div>
            Or
            <div className="divider-line"></div>
          </div>
          <Button
            className="button--large"
            text="Sign up with Google"
            actionOnClick={loginGoogle}
          >
            <img
              src="/img/google.svg"
              alt="the google color logo"
              width={20}
              height={20}
            />
          </Button>
        </div>
        <form className="form-container" onSubmit={submitRegister}>
          <input
            type="email"
            placeholder="Email"
            value={registerEmail}
            id="email"
            required
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={registerPassword}
            required
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <Button
            className="button--opacity"
            text="Sign up"
            actionOnClick={registerEmailPassword}
          />
          <div className="form__actions">
            <div className="form__row">
              <span>Did you forget your password? </span>
              <NavLink
                className="form-link--reset"
                title="Reset Password"
                to={"/forgot-password"}
              >
                Reset Password
              </NavLink>
            </div>
            <div className="form__signup">
              <NavLink className="form-link" title="Login" to={"/login"}>
                Login
              </NavLink>
            </div>
          </div>
        </form>
      </article>
    </div>
  );
};

export default Homepage;
