import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import Button from "../Button/Button";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = (): React.ReactElement => {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <header className="header">
      <div className="title-container">
        <img
          src="/img/logo.webp"
          alt="logo ball with blue and yellor colors"
          width={50}
          height={50}
        />
      </div>
      <Navigation />
      <Button
        className="button--solid-red"
        text="Log out"
        actionOnClick={logout}
      />
    </header>
  );
};

export default Header;
