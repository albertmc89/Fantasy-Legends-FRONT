import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { playersMock } from "../../mocks/playersMock";
import PlayerCard from "./PlayerCard";
import { store } from "../../store";

describe("Given a PlayerCard component", () => {
  const playerPosition = 0;
  const playerBPosition = 1;

  describe("When it's rendered", () => {
    test("Then it should show an image with the alternate text 'Moment of a fooball game in which Leo Messi plays with his team'", () => {
      const alternateImageText =
        "Moment of a fooball game in which Leo Messi plays with his team";

      render(
        <Provider store={store}>
          <PlayerCard
            player={playersMock[playerPosition]}
            playerPosition={playerPosition}
          />
        </Provider>,
      );

      const userImage = screen.getByAltText(alternateImageText);

      expect(userImage).toBeInTheDocument();
    });

    test("Then it should show the heading text 'Leo Messi'", () => {
      const headingText = "Leo Messi";

      render(
        <Provider store={store}>
          <PlayerCard
            player={playersMock[playerPosition]}
            playerPosition={playerPosition}
          />
        </Provider>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When it is rendered", () => {
    test("It should show a button with the text 'bought' inside", () => {
      const buttonText = "bought";

      render(
        <BrowserRouter>
          <PlayerCard
            player={playersMock[playerPosition]}
            playerPosition={playerPosition}
          />
        </BrowserRouter>,
      );

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });

    test("It should show a button with the text 'sold' inside", () => {
      const buttonText = "sold";

      render(
        <BrowserRouter>
          <PlayerCard
            player={playersMock[playerBPosition]}
            playerPosition={playerBPosition}
          />
        </BrowserRouter>,
      );

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });
  });
});
