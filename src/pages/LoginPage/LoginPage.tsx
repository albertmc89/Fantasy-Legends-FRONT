import { NavLink, Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import paths from "../../paths/paths";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import "./LoginPage.css";
import Button from "../../components/Button/Button";
import { showFeedback } from "../../components/FeedBack/showFeedBack";

const LoginPage = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  if (user) {
    return <Navigate to={paths.players} />;
  }

  const loginEmailPassword = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      showFeedback(
        "The email or password is incorrect or the user doesn't exist",
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
        <h2 className="login-container__subtitle">Login to your account 🤙</h2>
        <form className="form-container" onSubmit={submitRegister}>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            id="email"
            required
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={loginPassword}
            required
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          <Button
            className="button--opacity"
            text="Login"
            actionOnClick={loginEmailPassword}
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
              <NavLink
                className="form-link"
                title="Sign up"
                to={paths.homepage}
              >
                Sign up
              </NavLink>
            </div>
          </div>
        </form>
      </article>
    </div>
  );
};

export default LoginPage;
