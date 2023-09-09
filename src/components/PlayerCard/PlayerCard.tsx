import { Player } from "../../types";
import Button from "../Button/Button";
import "./PlayerCard.css";

interface PlayerCardProps {
  player: Partial<Player>;
}

const PlayerCard = ({
  player: { name, age, country, image, isBought },
}: PlayerCardProps): React.ReactElement => {
  return (
    <article className="player">
      <img
        className="player__picture"
        src={image}
        alt={`Moment of a fooball game in which ${name} plays with his team`}
      />
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
          <Button
            className="button button--solid"
            text="View stats"
            actionOnClick={() => {}}
          />
        </div>
      </div>
    </article>
  );
};

export default PlayerCard;
