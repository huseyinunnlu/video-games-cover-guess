import { useEffect } from "react";
import "./index.css";
import { showModal } from "./utils/modal";
import GameCover from "./components/GameCover";
import { useGameContext } from "./contexts/GameContext";
import GameControls from "./components/GameControls";
import Stats from "./components/Stats";

function App() {
  const { activeGame } = useGameContext();

  const openStartGameModal = () => {
    showModal({
      customComponentName: "startNewGameModal",
      closable: false,
    });
  };

  useEffect(() => {
    window.setTimeout(() => {
      openStartGameModal();
    }, 100);
  }, []);

  if (activeGame) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col max-w-[400px] w-full ">
          <GameCover />
          <GameControls />
          <Stats />
        </div>
      </div>
    );
  }
}

export default App;
