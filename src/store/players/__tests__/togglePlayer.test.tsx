import { playersMock } from "../../../mocks/playersMock";
import { PlayerState } from "../../types";
import { playersReducer, togglePlayerActionCreator } from "../playersSlice";

describe("Given a players slice", () => {
  describe("When it receives a state with a player and a togglePlayer action with id '64fb2a9470bf0a89283a4a88'", () => {
    test("Then it should return a new state with the property 'isBought' of the player with id '64fb2a9470bf0a89283a4a88' to false", () => {
      const currentPlayersState: PlayerState = {
        players: playersMock,
      };

      const idToToggle = "64fb2a9470bf0a89283a4a88";

      const toggleIsBoughtAction = togglePlayerActionCreator(idToToggle);
      const newPlayersState = playersReducer(
        currentPlayersState,
        toggleIsBoughtAction,
      );

      const toggledPlayer = newPlayersState.players.find(
        (players) => players.id === idToToggle,
      );

      expect(toggledPlayer).toHaveProperty("isBought", false);
    });
  });
});
