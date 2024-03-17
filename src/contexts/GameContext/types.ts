import { ReactNode } from "react";

export interface IGameOptions {
  guessLimit: number;
  guessTime: number;
}

export interface IGameContextProps {
  children: ReactNode;
}

export interface IGameItem {
  id: string;
  name: string;
  coverImg: string;
}

export interface IGameContext {
  gameOptions: IGameOptions;
  setGameOptions: (options: IGameOptions) => void;
  init: () => void;
  queue: string[];
  setQueue: (queue: string[]) => void;
  activeGame: IGameItem;
  setActiveGame: (activeGame: IGameItem) => void;
  activeGameIndex: number;
  setActiveGameIndex: (activeGame: number) => void;
  openedSections: number[];
  setOpenedSections: (openedSections: number[]) => void;
  guessedGameId: string;
  setGuessedGameId: (guessedGameId: string) => void;
  handleGuess: () => void;
  skipCount: number;
  setSkipCount: (skipCount: number) => void;
  remainingTime: number;
  setRemainingTime: (remainingTime: number) => void;
  toggleTimer: (type: "start" | "stop") => void;
}
