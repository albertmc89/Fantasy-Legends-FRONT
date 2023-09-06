import { Provider } from "react-redux";
import HomePage from "./HomePage";
import { store } from "../../store";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

describe("Given a HomePage page", () => {
  describe("When it's rendered", () => {
    test("Then it should show the text 'Welcome'", () => {
      const headerText = "Welcome";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </Provider>,
      );

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show a button 'Log in'", () => {
      const expectedText = "Log in";

      render(
        <Provider store={store}>
          <HomePage />
        </Provider>,
      );

      const button = screen.getByRole("button", { name: expectedText });
      expect(button).toBeInTheDocument();
    });
  });
});
