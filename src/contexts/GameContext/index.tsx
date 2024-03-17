import { createContext, useContext, useEffect, useState } from "react";
import {
  IGameContext,
  IGameContextProps,
  IGameItem,
  IGameOptions,
} from "./types.ts";
import { shuffleArray } from "../../utils/helpers.ts";
import gamesArray from "../../games.json";
import { showModal } from "../../utils/modal.ts";
import { useInterval } from "../../hooks/useInterval.tsx";

const Context = createContext({});

function Index({ children }: IGameContextProps) {
  const [gameOptions, setGameOptions] = useState<IGameOptions>({
    guessLimit: 6,
    guessTime: 0,
  });

  const [queue, setQueue] = useState<string[]>([]);
  const [activeGame, setActiveGame] = useState<IGameItem>();
  const [activeGameIndex, setActiveGameIndex] = useState<number>();
  const [openedSections, setOpenedSections] = useState<number[]>([]);
  const [guessedGameId, setGuessedGameId] = useState<string | null>(null);
  const [skipCount, setSkipCount] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const [delay, setDelay] = useState<number | null>(null);

  useInterval(() => {
    const newRemainingTime = remainingTime - 1;
    if (remainingTime === 0) {
      showModal({
        customComponentName: "falseGuessInfoModal",
        closable: false,
        customComponentProps: {
          activeGame,
        },
      });
      toggleTimer("stop");
    } else {
      setRemainingTime(newRemainingTime);
    }
  }, delay);

  const toggleTimer = (type: "start" | "stop") => {
    if (gameOptions.guessTime === 0) {
      return;
    }

    if (type === "start") {
      setRemainingTime(gameOptions.guessTime * 60);
    }

    setDelay(type === "start" ? 1000 : null);
  };

  const generateGameQueue = () => {
    const shuffledGameIds = shuffleArray(gamesArray);
    setQueue(shuffledGameIds);

    return shuffledGameIds;
  };

  const init = () => {
    generateGameQueue();
    setActiveGameIndex(0);
    setSkipCount(0);
    setGuessedGameId(null);
    setOpenedSections([]);
    toggleTimer("start");
  };

  const changeToNextGame = () => {
    setSkipCount(0);
    setGuessedGameId(null);
    setActiveGameIndex((activeGameIndex) => (activeGameIndex || 0) + 1);
    setOpenedSections([]);
  };

  const handleGuess = () => {
    if (!guessedGameId) {
      return;
    }

    if (guessedGameId === activeGame?.id) {
      showModal({
        customComponentName: "trueGuessInfoModal",
        closable: false,
        customComponentProps: {
          activeGame,
        },
      });
      changeToNextGame();
      toggleTimer("stop");
    } else {
      setSkipCount(skipCount + 1);
      setGuessedGameId(null);
    }
  };

  useEffect(() => {
    const selectedGame = gamesArray.find(
      (game) => game.id === queue[activeGameIndex || 0]
    );
    setActiveGame(selectedGame);
  }, [activeGameIndex, queue]);

  useEffect(() => {
    if (skipCount === gameOptions?.guessLimit) {
      showModal({
        customComponentName: "falseGuessInfoModal",
        closable: false,
        customComponentProps: {
          activeGame,
        },
      });
      toggleTimer("stop");
    }
  }, [skipCount]);

  const contextValue = {
    gameOptions,
    setGameOptions,
    init,
    queue,
    setQueue,
    activeGame,
    setActiveGame,
    activeGameIndex,
    setActiveGameIndex,
    openedSections,
    setOpenedSections,
    guessedGameId,
    setGuessedGameId,
    handleGuess,
    skipCount,
    setSkipCount,
    remainingTime,
    setRemainingTime,
    toggleTimer,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export const useGameContext = () => useContext(Context) as IGameContext;
export default Index;
