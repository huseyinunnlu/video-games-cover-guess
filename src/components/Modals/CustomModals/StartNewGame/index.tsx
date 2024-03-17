import { Alert, Button, Collapse, CollapseProps, Segmented } from "antd";
import { useGameContext } from "../../../../contexts/GameContext";
import { CloseOutlined, EditFilled } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { hideModal } from "../../../../utils/modal";

function GameOptions() {
  const { gameOptions, setGameOptions } = useGameContext();
  const [activeEditItem, setActiveEditItem] = useState<string>();

  const formattedGameOptions = useMemo(() => {
    return [
      {
        key: "guessLimit",
        label: "Guess Limit",
        value: gameOptions.guessLimit,

        options: [
          {
            label: "Easy (6)",
            value: 6,
          },
          {
            label: "Medium (4)",
            value: 4,
          },
          {
            label: "Hard (3)",
            value: 3,
          },
        ],
      },
      {
        key: "guessTime",
        label: "Guess Time",
        value: gameOptions.guessTime,
        formattedValue:
          gameOptions.guessTime === 0
            ? "Infinite"
            : `${gameOptions.guessTime} min`,
        options: [
          {
            label: "Easy (Infinite)",
            value: 0,
          },
          {
            label: "Medium (5 min)",
            value: 5,
          },
          {
            label: "Hard (3 min)",
            value: 3,
          },
        ],
      },
    ];
  }, [gameOptions]);

  const toggleEdit = (type: "show" | "hide", key: string) => {
    setActiveEditItem(type === "show" ? key : "");
  };

  const handleSegmentClicked = (key: string, value: number) => {
    setGameOptions({
      ...gameOptions,
      [key]: value,
    });

    toggleEdit("hide", key);
  };

  return (
    <ul className="w-full flex flex-col gap-y-4 py-4">
      {formattedGameOptions.map((option) => (
        <li className="flex justify-between items-center" key={option.key}>
          <span>{option.label}</span>
          <div className="flex items-center gap-x-3">
            {activeEditItem !== option.key ? (
              <span>{option.formattedValue || option.value}</span>
            ) : (
              <Segmented
                defaultValue={option.value}
                options={option.options}
                onChange={(value) => handleSegmentClicked(option.key, value)}
              />
            )}

            <Button.Group>
              {option.key === activeEditItem ? (
                <>
                  <Button
                    type="primary"
                    danger
                    icon={<CloseOutlined />}
                    className="flex items-center"
                    onClick={() => toggleEdit("hide", option.key)}
                  />
                </>
              ) : (
                <Button
                  type="primary"
                  icon={<EditFilled />}
                  className="flex items-center"
                  onClick={() => toggleEdit("show", option.key)}
                />
              )}
            </Button.Group>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Index(props: any) {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Game Options",
      children: <GameOptions />,
      style: { padding: "0px !important" },
    },
  ];

  const [toggleGameStarting, setToggleGameStarting] = useState<boolean>(false);
  const { init } = useGameContext();

  const handleStartGame = () => {
    setToggleGameStarting(!toggleGameStarting);

    window.setTimeout(() => {
      init();
      hideModal();
    });
  };

  return (
    <div className="flex flex-col w-full">
      {toggleGameStarting ? (
        <Alert
          description="Game starting in 3 seconds."
          type="success"
          showIcon
          closable={false}
        />
      ) : (
        <>
          <div className="my-10 text-center">
            <Button type="primary" size="large" onClick={handleStartGame}>
              Start New Game
            </Button>
          </div>
          <Collapse
            expandIconPosition="end"
            //ghost={true}
            size="large"
            bordered={false}
            items={items}
            defaultActiveKey={["1"]}
          />
        </>
      )}
    </div>
  );
}

export default Index;
