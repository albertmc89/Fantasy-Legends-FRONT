import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = (): React.ReactElement => {
  return (
    <>
      <nav className="navigation">
        <ul className="navigation__list">
          <li>
            <NavLink className="navigation-link" to="/players">
              Players
            </NavLink>
          </li>
          <li className="navigation__add">
            <NavLink className="navigation-link" to="/addplayer">
              Add player
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
