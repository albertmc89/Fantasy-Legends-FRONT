import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import userEvent from "@testing-library/user-event";
import Homepage from "./Homepage";

describe("Given a HomePage page", () => {
  describe("When it's rendered", () => {
    test("Then it should show the text 'Create your account 🤙'", () => {
      const headerText = "Create your account 🤙";

      render(
        <BrowserRouter>
          <Suspense>
            <Homepage />
          </Suspense>
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show a button 'Sign up'", () => {
      const btnAltText = "the github black and white logo";

      render(
        <BrowserRouter>
          <Suspense>
            <Homepage />
          </Suspense>
        </BrowserRouter>,
      );

      const btnGithub = screen.getByAltText(btnAltText);

      expect(btnGithub).toBeInTheDocument();
    });

    test("Then it should show a button 'Sign up with Google'", () => {
      const btnAltText = "the google color logo";

      render(
        <BrowserRouter>
          <Suspense>
            <Homepage />
          </Suspense>
        </BrowserRouter>,
      );

      const btnGoogle = screen.getByAltText(btnAltText);

      expect(btnGoogle).toBeInTheDocument();
    });
  });

  describe("When all inputs are filled and the user submits the form", () => {
    test("Then the action on submit function should be called", async () => {
      const emailIdInput = "Email";
      const passwordIdInput = "Password";
      const buttonText = "Sign up";

      const email = "albertmc89@gmail.com";
      const password = "1231231";

      render(
        <BrowserRouter>
          <Suspense>
            <Homepage />
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
