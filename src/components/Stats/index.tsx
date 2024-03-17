import { useGameContext } from "../../contexts/GameContext";

export default function Index() {
  const { gameOptions, skipCount } = useGameContext();

  return (
    <div className="mt-6 text-white flex flex-col">
      <div className="flex items-center justify-between">
        <span>Guess Limit:</span>
        <div className="flex">
          {Array.from({ length: gameOptions?.guessLimit }).map(
            (item, index) => (
              <img
                key={index}
                src={
                  index + 1 <= skipCount
                    ? "/emptyhearth.webp"
                    : "/fullheart.webp"
                }
                alt="full-heart"
                className="w-6 h-6"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
