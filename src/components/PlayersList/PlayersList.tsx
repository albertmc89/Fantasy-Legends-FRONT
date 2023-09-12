import { useAppSelector } from "../../store";
import PlayerCard from "../PlayerCard/PlayerCard";
import "./PlayersList.css";

const PlayersList = (): React.ReactElement => {
  const players = useAppSelector((state) => state.playersState.players);

  return (
    <ul className="players-list">
      {players.map((player, playerPosition) => (
        <li key={player.id}>
          <PlayerCard player={player} playerPosition={playerPosition} />
        </li>
      ))}
    </ul>
  );
};

export default PlayersList;
