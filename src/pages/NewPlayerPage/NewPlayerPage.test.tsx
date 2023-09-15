import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import NewPlayerPage from "./NewPlayerPage";
import { BrowserRouter } from "react-router-dom";

describe("Given a NewPlayerPage", () => {
  describe("When it's rendered", () => {
    test("Then it should show 'Add player' as heading", () => {
      const expectedHeadingText = "Add player";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <NewPlayerPage />
          </Provider>
        </BrowserRouter>,
      );

      const textHeading = screen.getByRole("heading", {
        name: expectedHeadingText,
      });

      expect(textHeading).toBeInTheDocument();
    });
  });
});
