import { NavLink, useLocation } from "react-router-dom";
import "./Navigation.css";
import paths from "../../paths/paths";

const Navigation = (): React.ReactElement => {
  const { pathname } = useLocation();

  return (
    <>
      <nav className="navigation">
        <ul className="navigation__list">
          <li>
            <NavLink
              className={
                pathname === paths.players
                  ? "navigation-list__active"
                  : "navigation-list__inactive"
              }
              to="/players"
            >
              Players
            </NavLink>
          </li>
          <li className="navigation__add">
            <NavLink
              className={
                pathname === paths.addplayer
                  ? "navigation-list__active"
                  : "navigation-list__inactive"
              }
              to="/add-player"
            >
              Add player
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
