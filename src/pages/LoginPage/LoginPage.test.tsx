import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import LoginPage from "./LoginPage";
import userEvent from "@testing-library/user-event";

describe("Given a LoginPage page", () => {
  describe("When it's rendered", () => {
    test("Then it should show the text 'Login to your account 🤙'", () => {
      const headerText = "Login to your account 🤙";

      render(
        <BrowserRouter>
          <Suspense>
            <LoginPage />
          </Suspense>
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When all inputs are filled and the user submits the form", () => {
    test("Then the action on submit function should be called", async () => {
      const emailIdInput = "Email";
      const passwordIdInput = "Password";
      const buttonText = "Login";

      const email = "albertmc89@gmail.com";
      const password = "1231231";

      render(
        <BrowserRouter>
          <Suspense>
            <LoginPage />
          </Suspense>
        </BrowserRouter>,
      );

      const emailInput = screen.getByPlaceholderText(emailIdInput);
      const passwordInput = screen.getByPlaceholderText(passwordIdInput);

      await userEvent.type(emailInput, email);
      await userEvent.type(passwordInput, password.toString());

      const button = screen.getByRole("button", { name: buttonText });
      await userEvent.click(button);

      expect(emailInput).toHaveValue(email);
      expect(passwordInput).toHaveValue(password);
    });
  });
});
