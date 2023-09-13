import { playersMock } from "../../../mocks/playersMock";
import { PlayerState } from "../../types";
import {
  deletePlayerActionCreator,
  loadPlayersActionCreator,
  playersReducer,
} from "../playersSlice";

describe("Given a playersReducer reducer", () => {
  describe("When it receives a load players action with two players 'Leo Messi' and 'Thierry Henry'", () => {
    test("Then it should return a new state with the two received players", () => {
      const currentPlayerState: PlayerState = {
        players: [],
      };
      const players = playersMock;

      const loadPlayersAction = loadPlayersActionCreator(players);

      const newPlayerState = playersReducer(
        currentPlayerState,
        loadPlayersAction,
      );

      expect(newPlayerState).toHaveProperty("players", players);
    });
  });

  describe("When it receives a state with two players and delete player action with the id 2", () => {
    test("Then it should return a new state without the player with id 2", () => {
      const currentPlayersState: PlayerState = {
        players: [],
      };

      const playerToDelete = currentPlayersState.players.find(
        ({ id }) => id !== playerToDeleteId,
      );
      const playerToDeleteId = "2";
      const deletePlayerAction = deletePlayerActionCreator(playerToDeleteId);

      const newPlayerState = playersReducer(
        currentPlayersState,
        deletePlayerAction,
      );

      expect(newPlayerState.players).not.toContain(playerToDelete);
    });
  });
});
