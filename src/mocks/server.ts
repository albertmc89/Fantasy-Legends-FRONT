import { setupServer } from "msw/node";
import { handlers } from "../hooks/handlers";

export const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers(...handlers));

afterAll(() => server.close());
