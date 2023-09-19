import { lazy, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadPlayersActionCreator } from "../../store/players/playersSlice";
import PlayersList from "../../components/PlayersList/PlayersList";
import usePlayersApi from "../../hooks/usePlayersApi";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../components/Loading/Loading";
import "./PlayersListPage.css";
import paths from "../../paths/paths";
import { NavLink } from "react-router-dom";

export const PlayersListPagePreview = lazy(() => import("./PlayersListPage"));

const PlayersListPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { getPlayers } = usePlayersApi();
  const [user, isLoadingAuth] = useAuthState(auth);
  const isLoadingUi = useAppSelector((state) => state.uiState.isLoading);
  const players = useAppSelector((state) => state.playersState.players);

  const hasPlayers = players.length === 0;

  useEffect(() => {
    document.title = "Fantasy Legends | Players";

    if (user) {
      (async () => {
        const players = await getPlayers();

        dispatch(loadPlayersActionCreator(players!));
      })();
    }
  }, [dispatch, getPlayers, user]);

  return (
    <>
      {hasPlayers && !isLoadingAuth && !isLoadingUi ? (
        <>
          <div className="players-page">
            <h2 className="players-title">Players</h2>
            <div className="empty-container">
              <span className="empty-content" aria-label="content">
                THERE IS NO PLAYERS ON THE LIST, CLICK ADD TO START ADDING
                PLAYERS
              </span>
              <NavLink to={paths.homepage} className="button button--solid">
                Add
              </NavLink>
            </div>
          </div>
        </>
      ) : (
        <div className="players-page">
          <h2 className="players-title">Players</h2>
          {isLoadingUi ? <Loading /> : <PlayersList />}
        </div>
      )}
    </>
  );
};

export default PlayersListPage;
