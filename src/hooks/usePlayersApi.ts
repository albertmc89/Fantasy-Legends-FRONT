import { useCallback } from "react";
import axios from "axios";
import { ApiPlayers, Player } from "../types";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const usePlayersApi = () => {
  const [user] = useIdToken(auth);

  const apiUrl = import.meta.env.VITE_API_PLAYERS_URL;

  const getPlayers = useCallback(async (): Promise<Player[]> => {
    try {
      const token = await user?.getIdToken();

      const { data: apiPlayers } = await axios.get<ApiPlayers>(
        `${apiUrl}players`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const apiPlayersList = apiPlayers.players;

      const players = apiPlayersList.map<Player>(
        ({
          _id,
          name,
          image,
          position,
          games,
          age,
          country,
          goals,
          height,
          isBought,
          user,
        }) => ({
          id: _id,
          name,
          image,
          age,
          country,
          position,
          games,
          height,
          goals,
          isBought,
          user,
        }),
      );

      return players;
    } catch {
      throw new Error("Can't get any player");
    }
  }, [apiUrl, user]);

  return { getPlayers };
};

export default usePlayersApi;
