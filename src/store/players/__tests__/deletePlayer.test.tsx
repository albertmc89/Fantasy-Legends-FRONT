import { playersMock } from "../../../mocks/playersMock";
import { PlayerState } from "../../types";
import { deletePlayerActionCreator, playersReducer } from "../playersSlice";

describe("Given a playersReducer reducer", () => {
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

  describe("When it receives a delete task action with a player", () => {
    test("Then it should return a new state without the player deleted", () => {
      const currentPlayersState: PlayerState = {
        players: playersMock,
      };

      const idToDelete = playersMock[0].id;

      const deletePlayerAction = deletePlayerActionCreator(idToDelete);

      const newPlayerState = playersReducer(
        currentPlayersState,
        deletePlayerAction,
      );

      expect(newPlayerState).not.toContain(playersMock[0]);
    });
  });
});
