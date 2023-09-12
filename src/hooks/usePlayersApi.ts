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
import { showFeedBack } from "../components/FeedBack/showFeedBack";

const usePlayersApi = () => {
  const [user] = useIdToken(auth);
  const dispatch = useDispatch();

  const apiUrl = import.meta.env.VITE_API_PLAYERS_URL;

  const getPlayers = useCallback(async (): Promise<Player[]> => {
    dispatch(startLoadingActionCreator());
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
        ({ _id, ...apiPlayersList }) => ({
          id: _id,
          ...apiPlayersList,
        }),
      );
      dispatch(stopLoadingActionCreator());

      showFeedBack("Players succesfully loaded", true);
      return players;
    } catch {
      dispatch(stopLoadingActionCreator());

      showFeedBack("Error players not loaded", false);
      throw new Error("Can't get any player");
    }
  }, [apiUrl, user, dispatch]);

  return { getPlayers };
};

export default usePlayersApi;
