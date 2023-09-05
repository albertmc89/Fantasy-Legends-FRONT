import { NavLink } from "react-router-dom";
import "./Navigation.css";
import Button from "../Button/Button";

const Navigation = (): React.ReactElement => {
  return (
    <>
      <nav className="navigation">
        <ul className="navigation__list">
          <li>
            <NavLink className="navigation-link" to="/home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="navigation-link" to="/add-player">
              Add player
            </NavLink>
          </li>
        </ul>
      </nav>
      <Button
        className="button red-button"
        text="Log out"
        actionOnClick={() => {}}
      />
    </>
  );
};

export default Navigation;
