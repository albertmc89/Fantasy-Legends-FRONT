import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import { Auth, User, signInWithPopup, signOut } from "firebase/auth";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { setupStore, store } from "../../store";
import paths from "../../paths/paths";
import App from "./App";
import { playersMock } from "../../mocks/playersMock";

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
    test("Then it should show 'Create your account 🤙' inside a heading", async () => {
      const headingText = "Create your account 🤙";

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
      const buttonText = "the github black and white logo";
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

      const loginButton = screen.getByAltText(buttonText);
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
    test("Then it should show 'Create your account 🤙' inside a heading", async () => {
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
        name: "Create your account 🤙",
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
    test("Then it should show 'Create your account 🤙' inside a heading", async () => {
      const buttonText = "Back to home";
      const playersRoute = "/play";
      const headingText = "Create your account 🤙";

      const authStateHookMock: Partial<AuthStateHook> = [undefined, undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[playersRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const button = await screen.findByRole("link", { name: buttonText });
      await userEvent.click(button);

      const heading = await screen.findByRole("heading", {
        name: headingText,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When its rendered and the user clicks the add button with the form correctly filled in", () => {
    const nameInputLabelText = "Name:";
    const ageInputLabelText = "Age:";
    const countryInputLabelText = "Country:";
    const heightInputLabelText = "Height(cm):";
    const goalsInputLabelText = "Goals:";
    const gamesInputLabelText = "Games:";
    const positionInputLabelText = "Position:";
    const imageInputLabelText = "Image:";

    test("Then it should show the new player added on the list", async () => {
      const buttonText = "Add";

      const nameText = "Leo Messi";
      const ageNumber = 36;
      const countryText = "Argentina";
      const heightNumber = 169;
      const goalsNumber = 818;
      const gamesNumber = 1038;
      const positionText = "ST";
      const imageText =
        "https://cdn.discordapp.com/attachments/1149732795334266962/1149735198225858581/Lionel-Messi.webp";

      const store = setupStore({ playersState: { players: playersMock } });

      const playersRoute = paths.addplayer;
      const headingText = "Leo Messi";

      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue("token"),
      };
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue([user]);
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[playersRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const nameInput = screen.getByLabelText(nameInputLabelText);
      const ageInput = screen.getByLabelText(ageInputLabelText);
      const countryInput = screen.getByLabelText(countryInputLabelText);
      const heightInput = screen.getByLabelText(heightInputLabelText);
      const goalsInput = screen.getByLabelText(goalsInputLabelText);
      const gamesInput = screen.getByLabelText(gamesInputLabelText);
      const positionInput = screen.getByLabelText(positionInputLabelText);
      const imageInput = screen.getByLabelText(imageInputLabelText);

      await userEvent.type(nameInput, nameText);
      await userEvent.type(ageInput, ageNumber.toString());
      await userEvent.selectOptions(countryInput, countryText);
      await userEvent.type(heightInput, heightNumber.toString());
      await userEvent.type(goalsInput, goalsNumber.toString());
      await userEvent.type(gamesInput, gamesNumber.toString());
      await userEvent.selectOptions(positionInput, positionText);
      await userEvent.type(imageInput, imageText);

      const submitButton = await screen.findByRole("button", {
        name: buttonText,
      });
      await userEvent.click(submitButton);

      await waitFor(async () => {
        const heading = await screen.findByRole("heading", {
          name: headingText,
        });

        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("When the user clicks on view stats link", () => {
    test("Then it should navigate to detail page and show 'Player stats' inside a heading", async () => {
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const useIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(useIdTokenHookMock);

      const store = setupStore({ playersState: { players: playersMock } });
      const path = "/players";
      const pathDetail = "/players/64fb2a9470bf0a89283a4a88";
      const linkText = "View stats";
      const playerText = "Leo Messi";

      render(
        <MemoryRouter initialEntries={[path, pathDetail]} initialIndex={0}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const detailLink = await screen.findAllByRole("link", {
        name: linkText,
      });

      await userEvent.click(detailLink[0]);

      const heading = await screen.findByRole("heading", {
        name: playerText,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user clicks on button with text 'bought'", () => {
    test("Then it should toggle to 'sold'", async () => {
      const path = "/players";
      const pathDetail = "/players/64fb2a9470bf0a89283a4a88";

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const useIdTokenHookMock: Partial<IdTokenHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue(useIdTokenHookMock);

      const store = setupStore({ playersState: { players: playersMock } });
      const buttonText = "bought";
      const toggledButtonText = "sold";

      render(
        <MemoryRouter initialEntries={[path, pathDetail]} initialIndex={0}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const buttonToToggle = await screen.findAllByRole("button", {
        name: buttonText,
      });

      await userEvent.click(buttonToToggle[0]);

      const buttonToggled = await screen.findAllByRole("button", {
        name: toggledButtonText,
      });

      expect(buttonToggled[0]).toBeInTheDocument();
    });
  });

  describe("When the user clicks on the sign up google button", () => {
    test("Then the login function should be called", async () => {
      const buttonText = "the google color logo";
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

      const loginButton = screen.getByAltText(buttonText);
      await userEvent.click(loginButton);

      expect(signInWithPopup).toHaveBeenCalled();
    });
  });

  describe("When the user clicks on the Login link", () => {
    test("Then it should show 'Login to your account 🤙' inside a heading", async () => {
      const linkText = "Login";
      const playersRoute = paths.homepage;
      const headingText = "Login to your account 🤙";

      const authStateHookMock: Partial<AuthStateHook> = [
        undefined as undefined,
      ];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[playersRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const loginLink = await screen.findByRole("link", { name: linkText });
      await userEvent.click(loginLink);

      const heading = await screen.findByRole("heading", {
        name: headingText,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user clicks on the Login button", () => {
    test("Then it should show 'Players' inside a heading", async () => {
      const playersRoute = paths.login;
      const headingText = "Players";

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[playersRoute]}>
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

  describe("When all inputs are filled and the user submits the form", () => {
    test("Then the action on submit function should be called", async () => {
      const emailIdInput = "Email";
      const passwordIdInput = "Password";
      const buttonText = "Login";
      const playersRoute = paths.login;

      const authStateHookMock: Partial<AuthStateHook> = [
        undefined as undefined,
      ];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const email = "albertmc89@gmail.com";
      const password = "1231231";

      render(
        <MemoryRouter initialEntries={[playersRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
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
