import { Button, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useGameContext } from "../../contexts/GameContext";
import gamesArray from "../../games.json";

export default function Index() {
  const sectionIndex: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const {
    openedSections,
    setOpenedSections,
    guessedGameId,
    setGuessedGameId,
    handleGuess,
    skipCount,
    setSkipCount,
  } = useGameContext();
  const [isHolding, setIsHolding] = useState(false);

  const gameList = useMemo(
    () => gamesArray.map((game) => ({ label: game.name, value: game.id })),
    []
  );

  const handleSkip = () => {
    const availableSections = sectionIndex.filter(
      (section) => !openedSections.includes(section)
    );
    const availableSectionCount = availableSections.length || 0;

    setSkipCount(skipCount + 1);

    const randomIndex = Math.floor(Math.random() * availableSectionCount);

    setOpenedSections([...openedSections, availableSections[randomIndex]]);
  };

  const handleMouseDown = () => {
    setIsHolding(true);
  };

  const handleMouseUp = () => {
    setIsHolding(false);
  };

  const handleSearch = (input: string, option: any) =>
    option.label?.toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    let timeout: any;

    if (isHolding) {
      timeout = window.setTimeout(() => {
        setIsHolding(false);
        handleSkip();
      }, 1500);
    } else {
      clearTimeout(timeout);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isHolding]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mt-6 w-full gap-y-4">
        <Select
          showSearch
          size="large"
          filterOption={handleSearch}
          placeholder="Select game"
          value={guessedGameId}
          onChange={(value) => {
            setGuessedGameId(value);
          }}
          options={gameList}
        />
        <div className="flex justify-between">
          <div></div>
          <Button.Group size="large">
            <Button
              className={`before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:bg-black/15 ${
                isHolding
                  ? "before:w-full before:transition-[width] before:duration-[1500ms]"
                  : "before:w-0"
              }`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              {isHolding ? "Keep Holding" : "Skip"}
            </Button>
            <Button type="primary" onClick={handleGuess}>
              Guess
            </Button>
          </Button.Group>
        </div>
      </div>
    </div>
  );
}
