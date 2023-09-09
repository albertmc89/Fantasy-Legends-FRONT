import { Player } from "../types";

export const playersMock: Player[] = [
  {
    id: "1",
    name: "Leo Messi",
    country: "Argentina",
    age: 36,
    height: 169,
    goals: 818,
    games: 1038,
    position: "ST",
    image:
      "https://cdn.discordapp.com/attachments/1149732795334266962/1149735198225858581/Lionel-Messi.webp",
    isBought: true,
  },
  {
    id: "2",
    name: "Thierry Henry",
    country: "France",
    age: 42,
    height: 188,
    goals: 416,
    games: 922,
    position: "ST",
    image:
      "https://cdn.discordapp.com/attachments/1149732795334266962/1149733956523147324/thierry-henry.webp",
    isBought: false,
  },
];
