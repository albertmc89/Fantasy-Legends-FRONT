import NewPlayerForm from "../../components/NewPlayerForm/NewPlayerForm";
import { useAppDispatch } from "../../store";
import { addPlayerActionCreator } from "../../store/players/playersSlice";
import { Player } from "../../types";
import usePlayersApi from "../../hooks/usePlayersApi";
import "./NewPlayerPage.css";
import { useNavigate } from "react-router-dom";
import paths from "../../paths/paths";
import { useEffect } from "react";

const NewPlayerPage = () => {
  const dispatch = useAppDispatch();
  const { addPlayerApi } = usePlayersApi();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Fantasy Legends | Add a new player";
  }, []);

  const onSubmitPlayer = async (newplayer: Omit<Player, "id" | "user">) => {
    const player = await addPlayerApi(newplayer);

    dispatch(addPlayerActionCreator(player));

    navigate(paths.players);
  };

  return (
    <div className="addplayer">
      <h2 className="title">Add player</h2>
      <NewPlayerForm onSubmitPlayer={onSubmitPlayer} />
    </div>
  );
};

export default NewPlayerPage;
