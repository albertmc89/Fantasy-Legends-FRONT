import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

describe("Given a App component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a 'logo ball with blue and yellor colors'", () => {
      const imageAltText = "logo ball with blue and yellor colors";

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const imageElement = screen.getByAltText(imageAltText);

      expect(imageElement).toBeInTheDocument();
    });
  });
});
