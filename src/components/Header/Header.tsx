import Button from "../Button/Button";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <div className="title-container">
        <img
          src="./img/logo.png"
          alt="logo ball with blue and yellor colors"
          width={45}
          height={45}
        />
      </div>
      <Navigation />
      <Button
        className="button red-button"
        text="Log out"
        actionOnClick={() => {}}
      />
    </header>
  );
};

export default Header;
