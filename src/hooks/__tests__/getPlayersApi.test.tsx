import { renderHook } from "@testing-library/react";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import { Provider } from "react-redux";
import { setupStore } from "../../store";
import { errorHandlers } from "../../mocks/handlers";
import { PropsWithChildren } from "react";
import { playersMock } from "../../mocks/playersMock";
import usePlayersApi from "../usePlayersApi";
import { server } from "../../mocks/server";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  vi.clearAllMocks();
});

const user: Partial<User> = {
  getIdToken: vi.fn().mockResolvedValue("token"),
};

const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useIdToken = vi.fn().mockReturnValue([user]);
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
  const store = setupStore({ uiState: { isLoading: false } });

  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

describe("Given function getPlayer from usePlayersApi custom hook", () => {
  describe("When the function is called", () => {
    test("Then you will recieve a list of players", async () => {
      const { result } = renderHook(() => usePlayersApi(), { wrapper });
      const { getPlayers } = result.current;

      const players = await getPlayers();

      expect(players).toStrictEqual(playersMock);
    });
  });

  describe("When the function is called and can't get the data from the Api", () => {
    test("Then it should get an error 'Can't get any player'", async () => {
      server.resetHandlers(...errorHandlers);

      const expectedError = new Error("Can't get any player");
      const { result } = renderHook(() => usePlayersApi(), { wrapper });
      const { getPlayers } = result.current;

      const error = getPlayers();

      expect(error).rejects.toThrowError(expectedError);
    });
  });
});
