import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import NewPlayerForm from "./NewPlayerForm";
import { store } from "../../store";
import userEvent from "@testing-library/user-event";

describe("Given a NewPlayerForm component", () => {
  const nameInputLabelText = "Name:";
  const ageInputLabelText = "Age:";
  const countryInputLabelText = "Country:";
  const heightInputLabelText = "Height(cm):";
  const goalsInputLabelText = "Goals:";
  const gamesInputLabelText = "Games:";
  const positionInputLabelText = "Position:";
  const imageInputLabelText = "Image:";

  describe("When it's rendered", () => {
    test("Then it should show a 'Name:', 'Age:', 'Country:', 'Height(cm):', 'Goals:', 'Games:', 'Position:, 'Image:' fields", () => {
      render(
        <Provider store={store}>
          <NewPlayerForm />
        </Provider>,
      );

      const nameInput = screen.getByLabelText(nameInputLabelText);
      const ageInput = screen.getByLabelText(ageInputLabelText);
      const countryInput = screen.getByLabelText(countryInputLabelText);
      const heightInput = screen.getByLabelText(heightInputLabelText);
      const goalsInput = screen.getByLabelText(goalsInputLabelText);
      const gamesInput = screen.getByLabelText(gamesInputLabelText);
      const positionInput = screen.getByLabelText(positionInputLabelText);
      const imageInput = screen.getByLabelText(imageInputLabelText);

      expect(nameInput).toBeInTheDocument();
      expect(ageInput).toBeInTheDocument();
      expect(countryInput).toBeInTheDocument();
      expect(heightInput).toBeInTheDocument();
      expect(goalsInput).toBeInTheDocument();
      expect(gamesInput).toBeInTheDocument();
      expect(positionInput).toBeInTheDocument();
      expect(imageInput).toBeInTheDocument();
    });
  });

  describe("When user writes 'Leo Messi', '36', 'Argentina', '169','818','1038', 'ST' ,'https://cdn.discordapp.com/attachments/1149732795334266962/1149735198225858581/Lionel-Messi.webp'", () => {
    test("Then it should show 'Leo Messi', '36', 'Argentina', '169','818','1038', 'ST' ,'https://cdn.discordapp.com/attachments/1149732795334266962/1149735198225858581/Lionel-Messi.webp'", async () => {
      const nameText = "Leo Messi";
      const ageNumber = 36;
      const countryText = "Argentina";
      const heightNumber = 169;
      const goalsNumber = 818;
      const gamesNumber = 1038;
      const positionText = "ST";
      const imageText =
        "https://cdn.discordapp.com/attachments/1149732795334266962/1149735198225858581/Lionel-Messi.webp";

      render(
        <Provider store={store}>
          <NewPlayerForm />
        </Provider>,
      );

      const nameInput = screen.getByLabelText(nameInputLabelText);
      const ageInput = screen.getByLabelText(ageInputLabelText);
      const countryInput = screen.getByLabelText(countryInputLabelText);
      const heightInput = screen.getByLabelText(heightInputLabelText);
      const goalsInput = screen.getByLabelText(goalsInputLabelText);
      const gamesInput = screen.getByLabelText(gamesInputLabelText);
      const positionInput = screen.getByLabelText(positionInputLabelText);
      const imageInput = screen.getByLabelText(imageInputLabelText);

      await userEvent.type(nameInput, nameText);
      await userEvent.type(ageInput, ageNumber.toString());
      await userEvent.selectOptions(countryInput, countryText);
      await userEvent.type(heightInput, heightNumber.toString());
      await userEvent.type(goalsInput, goalsNumber.toString());
      await userEvent.type(gamesInput, gamesNumber.toString());
      await userEvent.selectOptions(positionInput, positionText);
      await userEvent.type(imageInput, imageText);

      expect(nameInput).toHaveValue(nameText);
      expect(ageInput).toHaveValue(ageNumber);
      expect(countryInput).toHaveValue(countryText);
      expect(heightInput).toHaveValue(heightNumber);
      expect(goalsInput).toHaveValue(goalsNumber);
      expect(gamesInput).toHaveValue(gamesNumber);
      expect(positionInput).toHaveValue(positionText);
      expect(imageInput).toHaveValue(imageText);
    });
  });
});
