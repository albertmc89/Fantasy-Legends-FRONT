import { NavLink } from "react-router-dom";
import usePlayersApi from "../../hooks/usePlayersApi";
import { useAppDispatch } from "../../store";
import { deletePlayerActionCreator } from "../../store/players/playersSlice";
import { Player } from "../../types";
import Button from "../Button/Button";
import "./PlayerCard.css";
import paths from "../../paths/paths";

interface PlayerCardProps {
  player: Partial<Player>;
  playerPosition: number;
}

const PlayerCard = ({
  player: { name, age, country, image, isBought, id },
  playerPosition,
}: PlayerCardProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { deletePlayerApi } = usePlayersApi();

  const deletePlayer = async () => {
    await deletePlayerApi(id!);

    dispatch(deletePlayerActionCreator(id!));
  };

  return (
    <article className="player">
      <div className="player__superior-container">
        <div className="player__button">
          <Button
            text=""
            actionOnClick={deletePlayer}
            className="button--circle"
          >
            <img
              src="/img/DeleteForever.svg"
              aria-label="delete logo vector"
              className="delete-logo"
              width={30}
              height={30}
            />
          </Button>
        </div>
        <img
          className="player__picture"
          src={image}
          alt={`Moment of a fooball game in which ${name} plays with his team`}
          loading={playerPosition > 2 ? "lazy" : "eager"}
        />
      </div>
      <div className="player__content">
        <div className="player__data-container">
          <h2 className="player__name">{name}</h2>
          <ul className="player__data-list">
            <li className="player__data-detail">
              <span className="player__data-label"></span>
              {country}
            </li>
            <li className="player__data">
              <span className="player__data-label"></span>
              {age}yrs
            </li>
          </ul>
        </div>
        <div className="button-container">
          <Button
            className={isBought ? "bought" : "sold"}
            text={isBought ? "bought" : "sold"}
            actionOnClick={() => {}}
          />
          <NavLink
            className="button button--solid"
            to={`${paths.players}/${id}`}
          >
            View stats
          </NavLink>
        </div>
      </div>
    </article>
  );
};

export default PlayerCard;
