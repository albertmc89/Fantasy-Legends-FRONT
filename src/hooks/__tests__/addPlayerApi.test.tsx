import { User } from "firebase/auth";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import usePlayersApi from "../usePlayersApi";
import { renderHook } from "@testing-library/react";
import { apiMockPlayers, playerCreatedMock } from "../../mocks/playersMock";
import { setupStore } from "../../store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { server } from "../../mocks/server";
import { errorHandlers } from "../../mocks/handlers";
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

describe("Given function addPlayerApi from usePlayersApi custom hook", () => {
  describe("When the function is called", () => {
    test("Then it should add the player to the database", async () => {
      const { result } = renderHook(() => usePlayersApi(), { wrapper });
      const { addPlayerApi } = result.current;

      const newPlayer = await addPlayerApi(playerCreatedMock);

      expect(newPlayer).toStrictEqual(apiMockPlayers);
    });
  });

  describe("When the function is called and couldn't add player to the database", () => {
    test("Then it should get an error 'Couldn't add player'", async () => {
      const expectedError = new Error("Couldn't add player");
      server.resetHandlers(...errorHandlers);

      const { result } = renderHook(() => usePlayersApi(), { wrapper });
      const { addPlayerApi } = result.current;

      const error = addPlayerApi(playerCreatedMock);

      expect(error).rejects.toThrowError(expectedError);
    });
  });

  describe("When the function is called and there is no user logged in", () => {
    test("Then it should get an error", async () => {
      const authStateHookMock: Partial<AuthStateHook> = [undefined, undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      const idTokenHookMock: Partial<IdTokenHook> = [undefined];
      auth.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);
      const expectedError = new Error("Couldn't add player");
      server.resetHandlers(...errorHandlers);

      const { result } = renderHook(() => usePlayersApi(), {
        wrapper,
      });
      const { addPlayerApi } = result.current;

      const error = addPlayerApi(playerCreatedMock);

      expect(error).rejects.toThrowError(expectedError);
    });
  });
});
