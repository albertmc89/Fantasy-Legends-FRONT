import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("Given a Header component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a 'logo ball with blue and yellor colors'", () => {
      const imageAltText = "logo ball with blue and yellor colors";

      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
      );

      const imageElement = screen.getByAltText(imageAltText);

      expect(imageElement).toBeInTheDocument();
    });
  });
});
