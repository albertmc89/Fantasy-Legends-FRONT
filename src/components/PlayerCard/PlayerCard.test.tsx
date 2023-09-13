import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { playersMock } from "../../mocks/playersMock";
import PlayerCard from "./PlayerCard";
import { setupStore, store } from "../../store";

describe("Given a PlayerCard component", () => {
  describe("When it's rendered", () => {
    test("Then it should show an image with the alternate text 'Moment of a fooball game in which Leo Messi plays with his team'", () => {
      const alternateImageText =
        "Moment of a fooball game in which Leo Messi plays with his team";
      const store = setupStore({ playersState: { players: playersMock } });
      const leoMessi = playersMock[0];
      const playerPosition = 3;

      render(
        <BrowserRouter>
          <Provider store={store}>
            <PlayerCard player={leoMessi} playerPosition={playerPosition} />
          </Provider>
        </BrowserRouter>,
      );

      const userImage = screen.getByAltText(alternateImageText);

      expect(userImage).toBeInTheDocument();
    });
  });

  test("Then it should show the heading text 'Leo Messi'", () => {
    const headingText = "Leo Messi";
    const store = setupStore({ playersState: { players: playersMock } });
    const leoMessi = playersMock[0];
    const playerPosition = 3;

    render(
      <BrowserRouter>
        <Provider store={store}>
          <PlayerCard player={leoMessi} playerPosition={playerPosition} />
        </Provider>
      </BrowserRouter>,
    );

    const heading = screen.getByRole("heading", { name: headingText });

    expect(heading).toBeInTheDocument();
  });

  test("It should show a button with the text 'sold' inside", () => {
    const buttonText = "sold";
    const playerPosition = 1;

    render(
      <BrowserRouter>
        <Provider store={store}>
          <PlayerCard
            player={playersMock[playerPosition]}
            playerPosition={playerPosition}
          />
        </Provider>
      </BrowserRouter>,
    );

    const button = screen.getByRole("button", { name: buttonText });

    expect(button).toBeInTheDocument();
  });
});
