import { rest } from "msw";
import {
  apiMockPlayers,
  idPlayerMock,
  selectedPlayerMock,
} from "./playersMock";

export const handlers = [
  rest.get(
    `${import.meta.env.VITE_API_PLAYERS_URL}players`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ players: apiMockPlayers }));
    },
  ),
  rest.delete(
    `${import.meta.env.VITE_API_PLAYERS_URL}players/${selectedPlayerMock._id}`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ message: "Player succesfully deleted" }),
      );
    },
  ),
  rest.post(
    `${import.meta.env.VITE_API_PLAYERS_URL}players`,
    (_req, res, ctx) => {
      return res(ctx.status(201), ctx.json(apiMockPlayers));
    },
  ),
  rest.get(
    `${import.meta.env.VITE_API_PLAYERS_URL}players/${idPlayerMock}`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ player: selectedPlayerMock }));
    },
  ),
];

export const errorHandlers = [
  rest.get(
    `${import.meta.env.VITE_API_PLAYERS_URL}players`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Can't get any player"));
    },
  ),
  rest.delete(
    `${import.meta.env.VITE_API_PLAYERS_URL}players/${selectedPlayerMock._id}`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Couldn't delete player"));
    },
  ),
  rest.post(
    `${import.meta.env.VITE_API_PLAYERS_URL}players`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Couldn't add player"));
    },
  ),
  rest.get(
    `${import.meta.env.VITE_API_PLAYERS_URL}players/${idPlayerMock}`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Couldn't load the player"));
    },
  ),
];
