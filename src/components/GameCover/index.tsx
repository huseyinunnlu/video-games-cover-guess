import { useGameContext } from "../../contexts/GameContext";
import { formatSecondsToMinutesSeconds } from "../../utils/helpers";

function Index() {
  const { activeGame, openedSections, gameOptions, remainingTime } =
    useGameContext();

  return (
    <div className="flex flex-col gap-y-8">
      {gameOptions.guessTime !== 0 && (
        <div className="flex text-white text-4xl text-center justify-center items-center gap-x-4">
          <span>Time Left:</span>
          <span>{formatSecondsToMinutesSeconds(remainingTime)}</span>
        </div>
      )}
      <div className="w-[400px] h-[600px] bg-white relative border-4 border-indigo-500 shadow-indigo-600 shadow-2xl rounded-md">
        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-3 grid-rows-4">
          {Array.from({ length: 12 }).map((item, index) => (
            <div
              key={index}
              data-index={index}
              className={
                !openedSections.includes(index)
                  ? "inset-0 bg-white bg-opacity-50 backdrop-blur-md"
                  : ""
              }
            ></div>
          ))}
        </div>

        <img
          src={activeGame?.coverImg}
          alt={activeGame?.coverImg}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default Index;
