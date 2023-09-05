import "./Header.css";

const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <div className="title-container">
        <img
          src="./img/logo.png"
          alt="logo ball with blue and yellor colors"
          width={44}
          height={44}
        />
      </div>
    </header>
  );
};

export default Header;
