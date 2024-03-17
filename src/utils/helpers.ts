import { IGameItem } from "./../contexts/GameContext/types";
export const shuffleArray = (array: IGameItem[]): string[] => {
  const arrayIds = array.map((item) => item.id);

  for (let i = arrayIds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayIds[i], arrayIds[j]] = [arrayIds[j], arrayIds[i]];
  }

  return arrayIds;
};

export const formatSecondsToMinutesSeconds = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${(remainingSeconds < 10 ? "0" : "") + remainingSeconds}`;
};
