import React from "react";
import { ITrueGuessInfoProps } from "./types";
import { Button } from "antd";
import { showModal } from "../../../../utils/modal";

export default function Index({ activeGame }: ITrueGuessInfoProps) {
  console.log(activeGame);

  const handleClick = () => {
    showModal({
      customComponentName: "startNewGameModal",
      closable: false,
    });
  };

  return (
    <div className="flex flex-col p-4 gap-y-6">
      <h2 className="text-red-600 text-2xl text-center font-bold">
        Game over right answer was:
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
        Restart Game
      </Button>
    </div>
  );
}
