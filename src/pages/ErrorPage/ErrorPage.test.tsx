import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import userEvent from "@testing-library/user-event";
import Errorpage from "./ErrorPage";
import paths from "../../paths/paths";

const user: Partial<User> = {
  getIdToken: vi.fn().mockResolvedValue("token"),
};

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

  describe("When the user clicks on the 'Back to home' button", () => {
    test("Then it should show 'Players' inside a heading", async () => {
      const buttonText = "Back to home";
      const playersRoute = paths.players;
      const headingText = "Players";

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[playersRoute]}>
          <Provider store={store}>
            <Errorpage />
          </Provider>
        </MemoryRouter>,
      );

      const logoutButton = screen.getByRole("button", { name: buttonText });
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
