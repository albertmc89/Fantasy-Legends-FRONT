import { Provider } from "react-redux";
import { store } from "../../store";
import PlayersListPage from "./PlayersListPage";
import { render, screen } from "@testing-library/react";

describe("Given a PlayersListPage page", () => {
  describe("When its rendered", () => {
    test("Then it should show a heading with the text 'Players'", () => {
      const headerText = "Players";

      render(
        <Provider store={store}>
          <PlayersListPage />
        </Provider>,
      );

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });
  });
});