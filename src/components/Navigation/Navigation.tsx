import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = (): React.ReactElement => {
  return (
    <nav className="navigation">
      <ul className="navigation-list">
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
  );
};

export default Navigation;
