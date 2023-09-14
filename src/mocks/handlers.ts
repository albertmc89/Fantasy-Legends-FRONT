import { rest } from "msw";
import { apiMockPlayers } from "./playersMock";

export const handlers = [
  rest.get(
    `${import.meta.env.VITE_API_PLAYERS_URL}players`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ players: apiMockPlayers }));
    },
  ),
  rest.delete(
    `${import.meta.env.VITE_API_PLAYERS_URL}players/${apiMockPlayers[0]._id}`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ message: "Player succesfully deleted" }),
      );
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
    `${import.meta.env.VITE_API_PLAYERS_URL}players/${apiMockPlayers[0]._id}`,
    (_req, res, ctx) => {
      return res(ctx.status(404, "Couldn't delete player"));
    },
  ),
];
