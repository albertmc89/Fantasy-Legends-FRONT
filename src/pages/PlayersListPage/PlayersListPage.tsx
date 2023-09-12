import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadPlayersActionCreator } from "../../store/players/playersSlice";
import "./PlayersListPage.css";
import PlayersList from "../../components/PlayersList/PlayersList";
import usePlayersApi from "../../hooks/usePlayersApi";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../components/Loading/Loading";

const PlayersListPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { getPlayers } = usePlayersApi();
  const [user] = useAuthState(auth);
  const isLoading = useAppSelector((state) => state.uiState.isLoading);

  useEffect(() => {
    (async () => {
      if (user) {
        const players = await getPlayers();

        dispatch(loadPlayersActionCreator(players));
      }
    })();
  }, [dispatch, getPlayers, user]);

  return (
    <>
      <div className="players-page">
        <h2 className="players-title">Players</h2>
        {isLoading ? <Loading /> : <PlayersList />}
      </div>
    </>
  );
};

export default PlayersListPage;
