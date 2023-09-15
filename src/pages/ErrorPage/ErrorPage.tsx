import "./ErrorPage.css";
import paths from "../../paths/paths";
import { lazy } from "react";
import { NavLink } from "react-router-dom";

export const ErrorPagePreview = lazy(() => import("./ErrorPage"));

const ErrorPage = () => {
  return (
    <div className="error-container">
      <article className="error">
        <span className="error__number">404</span>
        <span className="error__title">Page not found</span>
      </article>
      <NavLink to={paths.homepage} className="button button--solid">
        Back to home
      </NavLink>
    </div>
  );
};

export default ErrorPage;
