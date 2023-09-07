import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../store";

vi.mock("firebase/auth");

const user: Partial<User> = { displayName: "Amigo" };
const authStateHookMock: Partial<AuthStateHook> = [user as User];

describe("Given a App component", () => {
  describe("When the user is not logged in", () => {
    test("Then it should show 'Welcome' inside a heading", () => {
      const headingText = "Welcome";

      const authStateHookMock: Partial<AuthStateHook> = [undefined];

      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When it's rendered and user is logged", () => {
    test("Then it should show a page with the text 'Players' inside a heading", async () => {
      const headingText = "Players";
      const buttonText = "Log in";

      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>,
      );

      const loginButton = screen.getByRole("button", {
        name: buttonText,
      });
      await userEvent.click(loginButton);

      waitFor(() => {
        const heading = screen.getByRole("heading", {
          name: headingText,
        });

        expect(heading).toBeInTheDocument();
      });
    });

    describe("When the button 'Log out' is clicked", () => {
      test("Then it should show a page with a 'Welcome' inside a heading", async () => {
        const headingText = "Welcome";
        const buttonText = "Log out";

        auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

        render(
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>,
        );

        const logoutButton = screen.getByRole("button", {
          name: buttonText,
        });
        await userEvent.click(logoutButton);

        waitFor(() => {
          const heading = screen.getByRole("heading", {
            name: headingText,
          });

          expect(heading).toBeInTheDocument();
        });
      });
    });
  });
});
