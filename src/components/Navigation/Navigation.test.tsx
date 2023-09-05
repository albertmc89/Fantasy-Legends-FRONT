import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import { render, screen } from "@testing-library/react";

describe("Given a Navigation component", () => {
  describe("When it's rendered", () => {
    test("Then it should show the links 'Home' and 'Add player'", () => {
      const navHome = "Home";
      const navCreate = "Add player";

      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>,
      );

      const navLinkHome = screen.getByRole("link", { name: navHome });
      const navLinkCreate = screen.getByRole("link", { name: navCreate });

      expect(navLinkHome).toBeInTheDocument();
      expect(navLinkCreate).toBeInTheDocument();
    });
  });
});
