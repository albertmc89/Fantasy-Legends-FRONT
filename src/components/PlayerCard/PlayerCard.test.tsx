import { Provider } from "react-redux";
import { playersMock } from "../../mocks/playersMock";
import PlayerCard from "./PlayerCard";
import { store } from "../../store";
import { render, screen } from "@testing-library/react";

describe("Given a PlayerCard component", () => {
  describe("When it's rendered", () => {
    test("Then it should show an image with the alternate text 'Close-up of Leo Messi'", () => {
      const alternateImageText = "Close-up of Leo Messi";

      render(
        <Provider store={store}>
          <PlayerCard player={playersMock[0]} />
        </Provider>,
      );

      const userImage = screen.getByAltText(alternateImageText);

      expect(userImage).toBeInTheDocument();
    });

    test("Then it should show the heading text 'Leo Messi'", () => {
      const headingText = "Leo Messi";

      render(
        <Provider store={store}>
          <PlayerCard player={playersMock[0]} />
        </Provider>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });
});
