import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { Auth, User, signInWithPopup, signOut } from "firebase/auth";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../store";
import paths from "../../paths/paths";
import App from "./App";

beforeEach(() => {
  vi.clearAllMocks();
});

const user: Partial<User> = {
  getIdToken: vi.fn().mockResolvedValue("token"),
};

vi.mock("firebase/auth", async () => {
  const actual: Auth = await vi.importActual("firebase/auth");
  return {
    ...actual,
    signInWithPopup: vi.fn(),
    signOut: vi.fn(),
  };
});

const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useIdToken = vi.fn().mockReturnValue([user]);
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

describe("Given a App component", () => {
  describe("When the user is not logged in", () => {
    test("Then it should show 'Welcome' inside a heading", async () => {
      const headingText = "Welcome";

      const authStateHookMock: Partial<AuthStateHook> = [undefined];

      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>,
      );

      const heading = await screen.findByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When it's rendered and user is logged", () => {
    test("Then it should show a page with the text 'Players' inside a heading", async () => {
      const headingText = "Players";
      const buttonText = "Log out";
      const route = paths.players;

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
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

    describe("When the user clicks on the login button", () => {
      test("Then the login function should be called", async () => {
        const buttonText = "Login";
        const homeRoute = paths.homepage;

        const authStateHookMock: Partial<AuthStateHook> = [null as null];
        auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={[homeRoute]}>
              <App />
            </MemoryRouter>
          </Provider>,
        );

        const loginButton = screen.getByRole("button", { name: buttonText });
        await userEvent.click(loginButton);

        expect(signInWithPopup).toHaveBeenCalled();
      });
    });

    describe("When the user clicks on the logout button", () => {
      test("Then it should show 'Welcome' inside a heading", async () => {
        const buttonText = "Log out";
        const playersRoute = "/players";

        const authStateHookMock: Partial<AuthStateHook> = [user as User];
        auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

        render(
          <MemoryRouter initialEntries={[playersRoute]}>
            <Provider store={store}>
              <App />
            </Provider>
          </MemoryRouter>,
        );

        const logoutButton = screen.getByRole("button", { name: buttonText });
        await userEvent.click(logoutButton);

        expect(signOut).toHaveBeenCalled();
      });
    });
  });
});
