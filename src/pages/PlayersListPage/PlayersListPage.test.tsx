import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { setupStore, store } from "../../store";
import PlayersListPage from "./PlayersListPage";
import userEvent from "@testing-library/user-event";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { playersMock } from "../../mocks/playersMock";

describe("Given a PlayersListPage page", () => {
  describe("When its rendered", () => {
    test("Then it should show a heading with the text 'Players'", () => {
      const headerText = "Players";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <PlayersListPage />
          </BrowserRouter>
        </Provider>,
      );

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When its rendered and the user clicks the delete button inside the player with id '1'", () => {
    test("Then it not should show the heading the text 'Leo Messi'", async () => {
      const headingText = "Leo Messi";
      const buttonAriaLabel = "delete logo vector";
      const store = setupStore({ playersState: { players: playersMock } });

      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue("token"),
      };
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue([user]);
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <Provider store={store}>
          <PlayersListPage />
        </Provider>,
      );

      const heading = await screen.findByRole("heading", { name: headingText });

      const deleteButton = await screen.findAllByLabelText(buttonAriaLabel);
      await userEvent.click(deleteButton[0]);

      expect(heading).not.toBeInTheDocument();
    });
  });
});
