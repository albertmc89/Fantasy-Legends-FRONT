import { playerCreatedApiMock, playersMock } from "../../../mocks/playersMock";
import { PlayerState } from "../../types";
import { addPlayerActionCreator, playersReducer } from "../playersSlice";

describe("Given a playersReducer reducer", () => {
  describe("When it receives a state with one user and addPlayer action", () => {
    test("Then it should return a new state with the player with id 11 added", () => {
      const currentPlayersState: PlayerState = {
        players: playersMock,
      };

      const addPlayerAction = addPlayerActionCreator(playerCreatedApiMock);

      const newUserState = playersReducer(currentPlayersState, addPlayerAction);

      expect(newUserState.players).toContain(playerCreatedApiMock);
      expect(newUserState.players).toHaveLength(
        currentPlayersState.players.length + 1,
      );
    });
  });
});
