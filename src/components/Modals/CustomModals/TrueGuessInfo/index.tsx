import { ITrueGuessInfoProps } from "./types";
import { Button } from "antd";
import { hideModal } from "../../../../utils/modal";
import { useGameContext } from "../../../../contexts/GameContext";

export default function Index({ activeGame }: ITrueGuessInfoProps) {
  const { toggleTimer } = useGameContext();

  const handleClick = async () => {
    hideModal();
    toggleTimer("start");
  };

  return (
    <div className="flex flex-col p-4 gap-y-6">
      <h2 className="text-green-600 text-2xl text-center font-bold">
        Well Done!
      </h2>
      <div className="mx-auto w-[300px] h-[450px] border-4 border-indigo-500 shadow-indigo-600 shadow-2xl rounded-md">
        <img
          src={activeGame?.coverImg}
          alt={activeGame?.id}
          className="w-full h-full"
        />
      </div>
      <Button
        className="mt-4"
        size="large"
        type="primary"
        onClick={handleClick}
      >
        Next Game
      </Button>
    </div>
  );
}
