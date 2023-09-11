import { rest } from "msw";
import { apiMockPlayers } from "./playersMock";

export const handlers = [
  rest.get(
    `${import.meta.env.VITE_API_PLAYERS_URL}players`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ players: apiMockPlayers }));
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
];
