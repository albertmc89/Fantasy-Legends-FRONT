import { useAuthState } from "react-firebase-hooks/auth";
import "./Footer.css";
import { auth } from "../../firebase";

const Footer = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  return (
    <>
      {user && (
        <footer className="footer">
          <img className="footer__logo" src="/img/logo.webp" alt="logo app" />
          <span>Albert Colubi 2023</span>
        </footer>
      )}
    </>
  );
};

export default Footer;
