import Button from "../../components/Button/Button";
import "./ErrorPage.css";

const Errorpage = () => {
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
          actionOnClick={() => {}}
        />
      </div>
    </>
  );
};

export default Errorpage;
