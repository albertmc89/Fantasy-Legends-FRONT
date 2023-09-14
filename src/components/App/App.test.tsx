import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
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

  describe("When the user clicks on the login button", () => {
    test("Then the login function should be called", async () => {
      const buttonText = "Login";
      const homeRoute = paths.homepage;

      const authStateHookMock: Partial<AuthStateHook> = [null as null];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[homeRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
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

  describe("When the user is not logged in and it is not loading", () => {
    test("Then it should show 'Welcome' inside a heading", async () => {
      const authStateHookMock: Partial<AuthStateHook> = [undefined, undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[paths.players]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const heading = await screen.findByRole("heading", {
        name: "Welcome",
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user is logged in", () => {
    test("Then it should show a page with the text 'Players' inside a heading", async () => {
      const headingText = "Players";
      const route = "/home";

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const useIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(useIdTokenHookMock);

      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const heading = await screen.findByRole("heading", {
        name: headingText,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user is in a incorrect path and clicks on the 'Back to home' button", () => {
    test("Then it should show 'Welcome' inside a heading", async () => {
      const buttonText = "Back to home";
      const playersRoute = "/play";
      const headingText = "Welcome";

      render(
        <MemoryRouter initialEntries={[playersRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const button = await screen.findByRole("link", { name: buttonText });
      await userEvent.click(button);

      waitFor(() => {
        const heading = screen.getByRole("heading", {
          name: headingText,
        });

        expect(heading).toBeInTheDocument();
      });
    });
  });
});
