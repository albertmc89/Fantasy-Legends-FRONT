import { useAppSelector } from "../../store";
import "./PlayersList.css";

const PlayersList = (): React.ReactElement => {
  const players = useAppSelector((state) => state.playersState.players);

  return (
    <ul className="players-list">
      {players.map((player) => (
        <li key={player.id}>
          <h2>{player.name}</h2>
        </li>
      ))}
    </ul>
  );
};

export default PlayersList;
