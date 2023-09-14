import { User } from "firebase/auth";
import auth, { AuthStateHook, IdTokenHook } from "react-firebase-hooks/auth";
import usePlayersApi from "../usePlayersApi";
import { renderHook } from "@testing-library/react";
import { idPlayerMock } from "../../mocks/playersMock";
import { setupStore } from "../../store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { errorHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";

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

  return <Provider store={store}>{children}</Provider>;
};

describe("Given function deletePlayerApi from usePlayersApi custom hook", () => {
  describe("When the function is called", () => {
    test("Then it should delete the player with the id from database", async () => {
      const expectedMessage = "Player succesfully deleted";

      const { result } = renderHook(() => usePlayersApi(), { wrapper });
      const { deletePlayerApi } = result.current;

      const message = await deletePlayerApi(idPlayerMock);

      expect(message).toStrictEqual({ message: expectedMessage });
    });
  });

  describe("When the function is called and couldn't delete player from the Api", () => {
    test("Then it should get an error 'Couldn't delete player'", async () => {
      server.resetHandlers(...errorHandlers);

      const expectedError = new Error("Couldn't delete player");
      const { result } = renderHook(() => usePlayersApi(), { wrapper });
      const { deletePlayerApi } = result.current;

      const error = deletePlayerApi(idPlayerMock);

      expect(error).rejects.toThrowError(expectedError);
    });
  });

  describe("When the function is called and there is no user logged in", () => {
    test("Then it should get an error", async () => {
      server.resetHandlers(...errorHandlers);
      const authStateHookMock: Partial<AuthStateHook> = [undefined, undefined];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      const idTokenHookMock: Partial<IdTokenHook> = [undefined];
      auth.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);
      const expectedError = new Error("Couldn't delete player");

      const { result } = renderHook(() => usePlayersApi(), {
        wrapper,
      });
      const { deletePlayerApi } = result.current;

      const error = deletePlayerApi("");

      expect(error).rejects.toThrowError(expectedError);
    });
  });
});
