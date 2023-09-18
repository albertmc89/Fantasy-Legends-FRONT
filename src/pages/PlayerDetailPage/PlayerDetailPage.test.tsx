import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import PlayerDetailPage from "./PlayerDetailPage";
import paths from "../../paths/paths";
import { mySelectedPlayerMock } from "../../mocks/playersMock";

describe("Given a PlayerDetailPage", () => {
  describe("When it's rendered", () => {
    test("Then it should show 'Player stats' as heading", () => {
      const expectedHeadingText = "Player stats";
      const path = `${paths.players}/${mySelectedPlayerMock.id}`;

      render(
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route
              path={path}
              element={
                <Provider store={store}>
                  <PlayerDetailPage />
                </Provider>
              }
            ></Route>
          </Routes>
        </MemoryRouter>,
      );

      const textHeading = screen.getByRole("heading", {
        name: expectedHeadingText,
      });

      expect(textHeading).toBeInTheDocument();
    });

    test("It should show a text with 'bought' inside if the player state is false", () => {
      const headingText = "sold";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <PlayerDetailPage />
          </Provider>
        </BrowserRouter>,
      );

      const heading = screen.getByText(headingText);

      expect(heading).toBeInTheDocument();
    });
  });
});
