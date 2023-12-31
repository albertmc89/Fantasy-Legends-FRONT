import { lazy, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadSelectedPlayerActionCreator } from "../../store/players/playersSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useParams } from "react-router-dom";
import usePlayersApi from "../../hooks/usePlayersApi";
import "./PlayerDetailPage.css";

export const PlayerDetailPagePreview = lazy(() => import("./PlayerDetailPage"));

const PlayerDetailPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const selectedPlayer = useAppSelector(
    (state) => state.playersState.selectedPlayer,
  );
  const { loadSelectedPlayerApi } = usePlayersApi();
  const [user] = useAuthState(auth);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (user && id) {
        const selectedPlayerApi = await loadSelectedPlayerApi(id);

        dispatch(loadSelectedPlayerActionCreator(selectedPlayerApi));

        document.title = `Fantasy Legends | ${selectedPlayer?.name} detail`;
      }
    })();
  }, [dispatch, loadSelectedPlayerApi, user, id, selectedPlayer?.name]);

  return (
    <div className="player-page">
      <h2 className="title">Player stats</h2>
      <article className="player-detail">
        <img
          className="player__picture"
          src={selectedPlayer?.image}
          alt={`Moment of a fooball game in which ${selectedPlayer?.name} plays with his team`}
        />
        <h2 className="player__detail-name">{selectedPlayer?.name}</h2>
        <ul className="player__stats">
          <li className="player__stats-content">
            <span className="stat-detail">
              {selectedPlayer?.country!.slice(0, 3)}
            </span>
            <div className="heading-container">
              <span className="content-title">Country</span>
            </div>
          </li>
          <li className="player__stats-content">
            <span className="stat-detail">{selectedPlayer?.age}</span>
            <div className="heading-container">
              <span className="content-title">Age</span>
            </div>
          </li>
          <li className="player__stats-content">
            <span className="stat-detail">{selectedPlayer?.height}</span>
            <div className="heading-container">
              <span className="content-title">Height</span>
            </div>
          </li>
          <li className="player__stats-content">
            <span className="stat-detail">{selectedPlayer?.goals}</span>
            <div className="heading-container">
              <span className="content-title">Goals</span>
            </div>
          </li>
          <li className="player__stats-content">
            <span className="stat-detail">{selectedPlayer?.position}</span>
            <div className="heading-container">
              <span className="content-title">Position</span>
            </div>
          </li>
          <li className="player__stats-content">
            <span className="stat-detail">{selectedPlayer?.games}</span>
            <div className="heading-container">
              <span className="content-title">Games</span>
            </div>
          </li>
        </ul>
        <span className={selectedPlayer?.isBought ? "isbought" : "issold"}>
          {selectedPlayer?.isBought ? "bought" : "sold"}
        </span>
      </article>
    </div>
  );
};

export default PlayerDetailPage;
