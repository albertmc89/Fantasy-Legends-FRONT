import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerState } from "../types";
import { Player } from "../../types";

const initialPlayersState: PlayerState = {
  players: [],
};

const playersSlice = createSlice({
  name: "players",
  initialState: initialPlayersState,
  reducers: {
    loadPlayers: (
      currentPlayersState,
      action: PayloadAction<Player[]>,
    ): PlayerState => ({
      ...currentPlayersState,
      players: action.payload,
    }),
    deletePlayer: (
      currentPlayersState,
      action: PayloadAction<string>,
    ): PlayerState => ({
      ...currentPlayersState,
      players: currentPlayersState.players.filter(
        (player) => player.id !== action.payload,
      ),
    }),
    addPlayer: (
      currentPlayersState,
      action: PayloadAction<Player>,
    ): PlayerState => ({
      players: [...currentPlayersState.players, action.payload],
    }),
    loadSelectedPlayer: (
      currentPlayersState: PlayerState,
      action: PayloadAction<Player>,
    ): PlayerState => ({
      ...currentPlayersState,
      selectedPlayer: action.payload,
    }),
    togglePlayer: (
      currentPlayersState,
      action: PayloadAction<string>,
    ): PlayerState => ({
      players: currentPlayersState.players.map((player) =>
        player.id === action.payload
          ? { ...player, isBought: !player.isBought }
          : { ...player },
      ),
    }),
  },
});

export const playersReducer = playersSlice.reducer;
export const {
  loadPlayers: loadPlayersActionCreator,
  deletePlayer: deletePlayerActionCreator,
  addPlayer: addPlayerActionCreator,
  loadSelectedPlayer: loadSelectedPlayerActionCreator,
  togglePlayer: togglePlayerActionCreator,
} = playersSlice.actions;
