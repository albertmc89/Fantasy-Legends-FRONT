import { useEffect } from "react";
import { playersMock } from "../../mocks/playersMock";
import { useAppDispatch } from "../../store";
import { loadPlayersActionCreator } from "../../store/Players/playersSlice";
import "./PlayersListPage.css";
import PlayersList from "../../components/PlayersList/PlayersList";

const PlayersListPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPlayersActionCreator(playersMock));
  }, [dispatch]);

  return (
    <>
      <h2 className="players-title">Players</h2>
      <PlayersList />
    </>
  );
};

export default PlayersListPage;
