import { playersMock } from "../../../mocks/playersMock";
import { PlayerState } from "../../types";
import { loadPlayersActionCreator, playersReducer } from "../playersSlice";

describe("Given a playersReducer reducer", () => {
  describe("When it receives a load players action with two players 'Leo Messi' and 'Thierry Henry'", () => {
    test("Then it should return a new state with the two received players", () => {
      const currentPlayerState: PlayerState = {
        players: [],
      };
      const players = playersMock;

      const loadRobotsAction = loadPlayersActionCreator(players);

      const newPlayerState = playersReducer(
        currentPlayerState,
        loadRobotsAction,
      );

      expect(newPlayerState).toHaveProperty("players", players);
    });
  });
});
