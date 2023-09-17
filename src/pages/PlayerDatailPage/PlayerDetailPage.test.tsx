import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { BrowserRouter } from "react-router-dom";
import PlayerDetailPage from "./PlayerDetailPage";
import { playersMock } from "../../mocks/playersMock";

describe("Given a PlayerDetailPage", () => {
  describe("When it's rendered", () => {
    test("Then it should show 'Player stats' as heading", () => {
      const expectedHeadingText = "Player stats";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <PlayerDetailPage player={playersMock[0]} />
          </Provider>
        </BrowserRouter>,
      );

      const textHeading = screen.getByRole("heading", {
        name: expectedHeadingText,
      });

      expect(textHeading).toBeInTheDocument();
    });

    test("It should show a text with 'bought' inside if the player state is true", () => {
      const headingText = "bought";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <PlayerDetailPage player={playersMock[0]} />
          </Provider>
        </BrowserRouter>,
      );

      const heading = screen.getByText(headingText);

      expect(heading).toBeInTheDocument();
    });

    test("It should show a text with 'bought' inside if the player state is false", () => {
      const headingText = "sold";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <PlayerDetailPage player={playersMock[1]} />
          </Provider>
        </BrowserRouter>,
      );

      const heading = screen.getByText(headingText);

      expect(heading).toBeInTheDocument();
    });
  });
});
