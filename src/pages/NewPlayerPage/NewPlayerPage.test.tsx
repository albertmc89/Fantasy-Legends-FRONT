import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import NewPlayerPage from "./NewPlayerPage";

describe("Given a NewPlayerPage", () => {
  describe("When it's rendered", () => {
    test("Then it should show 'Add player' as heading", () => {
      const expectedHeadingText = "Add player";

      render(
        <Provider store={store}>
          <NewPlayerPage />
        </Provider>,
      );

      const textHeading = screen.getByRole("heading", {
        name: expectedHeadingText,
      });

      expect(textHeading).toBeInTheDocument();
    });
  });
});
