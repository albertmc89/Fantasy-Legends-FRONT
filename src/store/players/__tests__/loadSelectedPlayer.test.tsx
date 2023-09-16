import { playerCreatedApiMock } from "../../../mocks/playersMock";
import { PlayerState } from "../../types";
import {
  loadSelectedPlayerActionCreator,
  playersReducer,
} from "../playersSlice";

describe("Given a players slice", () => {
  describe("When it receives a loadSelectedPlayer action", () => {
    test("Then it should return a new state with the selected player", () => {
      const currentPlayersState: PlayerState = { players: [] };
      const loadSelectedPlayerAction =
        loadSelectedPlayerActionCreator(playerCreatedApiMock);

      const newPlayerState = playersReducer(
        currentPlayersState,
        loadSelectedPlayerAction,
      );

      expect(newPlayerState.selectedPlayer).toStrictEqual(playerCreatedApiMock);
    });
  });
});
