import NewPlayerForm from "../../components/NewPlayerForm/NewPlayerForm";
import "./NewPlayerPage.css";

const NewPlayerPage = () => {
  return (
    <>
      <div className="addplayer">
        <h2 className="title">Add player</h2>
        <NewPlayerForm />
      </div>
    </>
  );
};

export default NewPlayerPage;
