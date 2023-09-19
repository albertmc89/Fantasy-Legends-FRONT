import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";

vi.mock("firebase/auth");

const user: Partial<User> = {};

const authStateHookMock: Partial<AuthStateHook> = [user as User];

auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

describe("Given a Footer component", () => {
  describe("When is rendered", () => {
    test("Then it should show the text 'Albert Colubi 2023'", () => {
      const footerText = "Albert Colubi 2023";

      render(
        <BrowserRouter>
          <Footer />
        </BrowserRouter>,
      );

      const spanElement = screen.getByText(footerText);

      expect(spanElement).toBeInTheDocument();
    });

    test("Then it should the image with the añternative text 'logo app' ", () => {
      const altImageText = "logo app";

      render(
        <BrowserRouter>
          <Footer />
        </BrowserRouter>,
      );

      const altImage = screen.getByAltText(altImageText);

      expect(altImage).toBeInTheDocument();
    });
  });
});
