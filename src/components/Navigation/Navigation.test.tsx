import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";

describe("Given a Navigation component", () => {
  describe("When it's rendered", () => {
    test("Then it should show the links 'Players' and 'Add player'", () => {
      const navHome = "Players";
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
