import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store";
import PlayersListPage from "./PlayersListPage";

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

  test("Then it should show a heading with the text 'THERE IS NO PLAYERS ON THE LIST, CLICK ADD TO START ADDING PLAYERS'", () => {
    const content = `THERE IS NO PLAYERS ON THE LIST, CLICK ADD TO START ADDING PLAYERS`;

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlayersListPage />
        </BrowserRouter>
      </Provider>,
    );

    const heading = screen.getByText(content);

    expect(heading).toBeInTheDocument();
  });
});
