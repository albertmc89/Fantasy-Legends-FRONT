import { User } from "firebase/auth";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import usePlayersApi from "../usePlayersApi";
import { renderHook } from "@testing-library/react";
import { mySelectedPlayerMock, playersMock } from "../../mocks/playersMock";
import { setupStore } from "../../store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { server } from "../../mocks/server";
import { errorHandlers } from "../../mocks/handlers";

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
  const store = setupStore({
    playersState: { players: playersMock },
  });

  return <Provider store={store}>{children}</Provider>;
};

describe("Given function loadSelectedPlayerApi from usePlayersApi custom hook", () => {
  const id = "64fb2a9470bf0a89283a4a88";

  describe("When the function is called with the id '1'", () => {
    test("Then it should load from database the selected player 'Leo Messi'", async () => {
      const { result } = renderHook(() => usePlayersApi(), {
        wrapper,
      });
      const { loadSelectedPlayerApi } = result.current;

      const selectedPlayer = await loadSelectedPlayerApi(id);

      expect(selectedPlayer).toStrictEqual(mySelectedPlayerMock);
    });
  });

  describe("When the function is called with the id '1' and couldn't load player from the Api", () => {
    test("Then it should get an error 'Couldn't load the player'", async () => {
      server.resetHandlers(...errorHandlers);
      const error = new Error("Couldn't load the player");

      const { result } = renderHook(() => usePlayersApi(), { wrapper });
      const { loadSelectedPlayerApi } = result.current;

      const selectedPlayer = loadSelectedPlayerApi(id);

      expect(selectedPlayer).rejects.toThrowError(error);
    });
  });

  describe("When the function is called and there is no user logged in", () => {
    test("Then it should get an error", async () => {
      server.resetHandlers(...errorHandlers);
      const authStateHookMock: Partial<AuthStateHook> = [undefined, undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      const idTokenHookMock: Partial<IdTokenHook> = [undefined];
      auth.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);
      const expectedError = new Error("Couldn't load the player");

      const { result } = renderHook(() => usePlayersApi(), {
        wrapper,
      });
      const { loadSelectedPlayerApi } = result.current;

      const error = loadSelectedPlayerApi("");

      expect(error).rejects.toThrowError(expectedError);
    });
  });
});
