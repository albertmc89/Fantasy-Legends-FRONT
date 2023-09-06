import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Header = (): React.ReactElement => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

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
        actionOnClick={logout}
      />
    </header>
  );
};

export default Header;
