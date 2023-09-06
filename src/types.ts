export interface ApiPlayer {
  id: string;
  name: string;
  country: string;
  age: number;
  height: number;
  goals: number;
  games: number;
  position: string;
  image: string;
  isBought: boolean;
  user: string;
}

export interface ApiPlayer {
  players: ApiPlayer[];
}
export interface Player extends Omit<ApiPlayer, "_id"> {
  id: string;
}
