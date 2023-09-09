export interface ApiPlayer {
  _id: string;
  name: string;
  country: string;
  age: number;
  height: number;
  goals: number;
  games: number;
  position: string;
  image: string;
  isBought: boolean;
}

export interface ApiPlayers {
  players: ApiPlayer[];
}

export interface Player extends Omit<ApiPlayer, "_id"> {
  id: string;
}
