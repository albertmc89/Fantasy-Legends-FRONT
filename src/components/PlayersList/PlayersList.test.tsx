import { Provider } from "react-redux";
import { playersMock } from "../../mocks/playersMock";
import { setupStore } from "../../store";
import PlayersList from "./PlayersList";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Given a PlayersList component", () => {
  describe("When it's rendered 'Leo Messi', 'Thierry Henry'", () => {
    test("Then it should show the names 'Leo Messi', 'Thierry Henry' as heading", () => {
      const store = setupStore({ playersState: { players: playersMock } });

      render(
        <BrowserRouter>
          <Provider store={store}>
            <PlayersList />
          </Provider>
        </BrowserRouter>,
      );

      playersMock.forEach((player) => {
        const expectedHeading = screen.getByRole("heading", {
          name: player.name,
        });

        expect(expectedHeading).toBeInTheDocument();
      });
    });
  });
});
