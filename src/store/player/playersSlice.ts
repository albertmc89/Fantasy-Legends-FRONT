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
  },
});

export const playersReducer = playersSlice.reducer;
export const { loadPlayers: loadPlayersActionCreator } = playersSlice.actions;
