import { useCallback } from "react";
import axios from "axios";
import { ApiPlayers, Player } from "../types";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
} from "../store/ui/uiSlice";
import { showFeedback } from "../components/FeedBack/showFeedBack";
import paths from "../paths/paths";
import { useNavigate } from "react-router-dom";

const usePlayersApi = () => {
  const [user] = useIdToken(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_PLAYERS_URL;

  const getPlayers = useCallback(async () => {
    dispatch(startLoadingActionCreator());
    try {
      if (user) {
        const token = await user.getIdToken();

        const { data: apiPlayers } = await axios.get<ApiPlayers>(
          `${apiUrl}players`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const apiPlayersList = apiPlayers.players;

        const players = apiPlayersList.map<Player>(
          ({ _id, ...apiPlayersList }) => ({
            ...apiPlayersList,
            id: _id,
          }),
        );
        dispatch(stopLoadingActionCreator());

        return players;
      }
    } catch {
      dispatch(stopLoadingActionCreator());

      showFeedback("Error players not loaded", "error");
      throw new Error("Can't get any player");
    }
  }, [apiUrl, user, dispatch]);

  const deletePlayerApi = useCallback(
    async (id: string) => {
      try {
        dispatch(startLoadingActionCreator());
        if (!user) {
          throw Error();
        }

        const token = await user.getIdToken();

        const { data } = await axios.delete<string>(`${apiUrl}players/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(stopLoadingActionCreator());

        showFeedback("Player successfully deleted", "success");
        return data;
      } catch (error: unknown) {
        showFeedback("Couldn't delete player", "error");
        throw new Error("Couldn't delete player");
      }
    },
    [apiUrl, user, dispatch],
  );

  const addPlayerApi = useCallback(
    async (newPlayer: Omit<Player, "id" | "user">) => {
      try {
        if (!user) {
          throw Error();
        }

        const token = await user.getIdToken();

        const { data } = await axios.post<Player>(
          `${apiUrl}players`,
          newPlayer,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        showFeedback("Player successfully added", "success");
        return data;
      } catch (error: unknown) {
        showFeedback("Couldn't add player", "error");
        throw new Error("Couldn't add player");
      }
    },
    [apiUrl, user],
  );

  const loadSelectedPlayerApi = useCallback(
    async (id: string) => {
      try {
        if (!user) {
          throw Error();
        }

        const token = await user.getIdToken();
        const { data: playerDetail } = await axios.get(
          `${apiUrl}players/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const player = {
          ...playerDetail.player,
          id: playerDetail.player._id,
        };
        delete player._id;

        return player;
      } catch (error: unknown) {
        showFeedback("Couldn't load the player", "error");
        navigate(paths.players);
        throw new Error("Couldn't load the player");
      }
    },
    [apiUrl, user, navigate],
  );

  const modifyPlayerApi = useCallback(
    async (id: string, isBought: boolean) => {
      try {
        if (!user) {
          throw Error();
        }

        const token = await user.getIdToken();

        const { data: playerDetail } = await axios.patch(
          `${apiUrl}players/${id}`,
          { isBought },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const player = {
          ...playerDetail.player,
          id: playerDetail.player._id,
        };
        delete player._id;

        return player;
      } catch (error: unknown) {
        showFeedback("Couldn't modify player", "error");
        throw new Error("Couldn't modify the player");
      }
    },
    [apiUrl, user],
  );

  return {
    getPlayers,
    deletePlayerApi,
    addPlayerApi,
    loadSelectedPlayerApi,
    modifyPlayerApi,
  };
};

export default usePlayersApi;
