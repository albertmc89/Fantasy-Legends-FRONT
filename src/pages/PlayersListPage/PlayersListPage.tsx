import { lazy, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadPlayersActionCreator } from "../../store/players/playersSlice";
import PlayersList from "../../components/PlayersList/PlayersList";
import usePlayersApi from "../../hooks/usePlayersApi";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../components/Loading/Loading";
import "./PlayersListPage.css";
import Button from "../../components/Button/Button";

export const PlayersListPagePreview = lazy(() => import("./PlayersListPage"));

const PlayersListPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { getPlayers } = usePlayersApi();
  const [user] = useAuthState(auth);
  const isLoading = useAppSelector((state) => state.uiState.isLoading);
  const players = useAppSelector((state) => state.playersState.players);

  useEffect(() => {
    (async () => {
      if (user) {
        const players = await getPlayers();

        dispatch(loadPlayersActionCreator(players));
      }
    })();
  }, [dispatch, getPlayers, user]);

  const hasPlayers = players.length > 0;

  return (
    <>
      {hasPlayers ? (
        <div className="players-page">
          <h2 className="players-title">Players</h2>
          {isLoading ? <Loading /> : <PlayersList />}
        </div>
      ) : (
        <>
          <h2 className="players-title">Players</h2>
          <div className="empty-container">
            <span className="empty-content" aria-label="content">
              THERE IS NO PLAYERS ON THE LIST, CLICK ADD TO START ADDING PLAYERS
            </span>
            <Button
              className="button--solid"
              text="Add"
              actionOnClick={() => {}}
            />
          </div>
        </>
      )}
    </>
  );
};

export default PlayersListPage;
