import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import HomePage from "./Homepage";
import { Suspense } from "react";

describe("Given a HomePage page", () => {
  describe("When it's rendered", () => {
    test("Then it should show the text 'Welcome'", () => {
      const headerText = "Welcome";

      render(
        <BrowserRouter>
          <Suspense>
            <HomePage />
          </Suspense>
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show a button 'Login'", () => {
      const expectedText = "Login";

      render(
        <BrowserRouter>
          <Suspense>
            <HomePage />
          </Suspense>
        </BrowserRouter>,
      );

      const button = screen.getByRole("button", { name: expectedText });
      expect(button).toBeInTheDocument();
    });
  });
});
