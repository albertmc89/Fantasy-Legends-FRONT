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
          <li>
            <NavLink className="navigation-link" to="/add-player">
              Add player
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
