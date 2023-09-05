import Button from "../../components/Button/Button";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
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
              actionOnClick={() => {}}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
