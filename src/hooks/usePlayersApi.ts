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

const usePlayersApi = () => {
  const [user] = useIdToken(auth);
  const dispatch = useDispatch();

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

      showFeedback("Error players not loaded");
      throw new Error("Can't get any player");
    }
  }, [apiUrl, user, dispatch]);

  return { getPlayers };
};

export default usePlayersApi;
