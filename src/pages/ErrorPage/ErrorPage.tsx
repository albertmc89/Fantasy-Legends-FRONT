import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./ErrorPage.css";
import paths from "../../paths/paths";
import { lazy } from "react";

export const ErrorPagePreview = lazy(() => import("./ErrorPage"));

const ErrorPage = () => {
  const navigate = useNavigate();

  const backHome = () => {
    navigate(paths.players);
  };

  return (
    <>
      <div className="error-container">
        <article className="error">
          <span className="error__number">404</span>
          <span className="error__title">Page not found</span>
        </article>
        <Button
          text="Back to home"
          className="button--solid"
          actionOnClick={backHome}
        />
      </div>
    </>
  );
};

export default ErrorPage;
