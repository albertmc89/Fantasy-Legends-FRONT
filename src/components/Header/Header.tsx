import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import paths from "../../paths/paths";

const Header = (): React.ReactElement => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);

    navigate(paths.homepage);
  };

  return (
    <header className="header">
      <div className="title-container">
        <img
          src="./img/logo.webp"
          alt="logo ball with blue and yellor colors"
          width={45}
          height={45}
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
