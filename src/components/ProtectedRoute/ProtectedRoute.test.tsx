import { store } from "../../store";
import { render, screen } from "@testing-library/react";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

describe("Given a ProtectedRoute component", () => {
  describe("When the user is logged in", () => {
    test("Then it should show 'Players' inside a heading", () => {
      const user: Partial<User> = {
        displayName: "Albert",
      };
      const authStateHookMock: Partial<AuthStateHook> = [user as User];

      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const headingText = "Players";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <ProtectedRoute>
              <div>
                <h1>Players</h1>
              </div>
            </ProtectedRoute>
          </Provider>
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });
});
