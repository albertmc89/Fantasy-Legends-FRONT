import { Player } from "../../types";
import "./PlayerDetailPage.css";

interface PlayerDetailPageProps {
  player: Partial<Player>;
}

const PlayerDetailPage = ({
  player: {
    name,
    age,
    height,
    goals,
    country,
    position,
    games,
    image,
    isBought,
  },
}: PlayerDetailPageProps): React.ReactElement => {
  return (
    <>
      <div className="player-page">
        <h2 className="title">Player stats</h2>
      </div>
      <article className="player-detail">
        <img
          className="player__picture"
          src={image}
          alt={`Moment of a fooball game in which ${name} plays with his team`}
        />
        <h2 className="player__detail-name">{name}</h2>
        <div className="player__stats">
          <div className="player__stats-country">
            <span className="stat-detail">{country!.slice(0, 3)}</span>
            <div className="title-container">
              <span className="country-title">Country</span>
            </div>
          </div>
          <div className="player__stats-age">
            <span className="stat-detail">{age}</span>
            <div className="title-container">
              <span className="age-title">Age</span>
            </div>
          </div>
          <div className="player__stats-height">
            <span className="stat-detail">{height}</span>
            <div className="title-container">
              <span className="height-title">Height</span>
            </div>
          </div>
          <div className="player__stats-goals">
            <span className="stat-detail">{goals}</span>
            <div className="title-container">
              <span className="goals-title">Goals</span>
            </div>
          </div>
          <div className="player__stats-position">
            <span className="stat-detail">{position}</span>
            <div className="title-container">
              <span className="position-title">Position</span>
            </div>
          </div>
          <div className="player__stats-games">
            <span className="stat-detail">{games}</span>
            <div className="title-container">
              <span className="games-title">Games</span>
            </div>
          </div>
        </div>
        <span className="player__state">{isBought ? "bought" : "sold"}</span>
      </article>
    </>
  );
};

export default PlayerDetailPage;
