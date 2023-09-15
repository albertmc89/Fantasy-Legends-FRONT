import NewPlayerForm from "../../components/NewPlayerForm/NewPlayerForm";
import "./NewPlayerPage.css";

const NewPlayerPage = () => {
  const onSubmitPlayer = () => {};

  return (
    <div className="addplayer">
      <h2 className="title">Add player</h2>
      <NewPlayerForm onSubmitPlayer={onSubmitPlayer} />
    </div>
  );
};

export default NewPlayerPage;
