import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import Errorpage from "./ErrorPage";

describe("Given a ErrorPage page", () => {
  describe("When it's rendered", () => {
    test("Then it should show the text 'Page not found'", () => {
      const headerText = "Page not found";

      render(
        <BrowserRouter>
          <Suspense>
            <Errorpage />
          </Suspense>
        </BrowserRouter>,
      );

      const heading = screen.getByText(headerText);

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show a button 'Back to home'", () => {
      const expectedText = "Back to home";

      render(
        <BrowserRouter>
          <Suspense>
            <Errorpage />
          </Suspense>
        </BrowserRouter>,
      );

      const button = screen.getByRole("button", { name: expectedText });
      expect(button).toBeInTheDocument();
    });
  });
});
