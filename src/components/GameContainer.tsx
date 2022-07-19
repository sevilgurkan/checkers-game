import React, { useState, useRef, useEffect } from "react";
import type {
  Info,
  PlayerColor,
  GameResult,
  GameContainerProps,
} from "../types";
import { useLocalStorage } from "../hooks";

import { GameInfo } from "./GameInfo";
import { Game } from "./Game";
import { GameMenu } from "./GameMenu";
import { GameSettings } from "./GameSettings";
import { GameStatus } from "./GameStatus";
import { GameOver } from "./GameOver";
import { GameAnimation } from "./GameAnimation";

export function GameContainer({ resetGame }: GameContainerProps): JSX.Element {
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [time, setTime] = useState(0);
  const [gameSettingsOpen, setGameSettingsOpen] = useState<boolean>(false);

  const [playerColor, setPlayerColor] = useLocalStorage<PlayerColor>(
    "player-color",
    {
      1: "bg-purple-600",
      2: "bg-green-600",
    }
  );

  const [info, setInfo] = useState<Info>({
    errorMessage: "",
    draggingKey: "",
    currentKey: "",
  });

  const [activePlayerNumber, setActivePlayerNumber] = useState(1);

  const timerRef = useRef<NodeJS.Timer | null>(null);

  const toggleGameSettingsMenu = () => {
    setGameSettingsOpen(!gameSettingsOpen);
  };

  const handlePlayerNumberChange = (playerNumber: number) => {
    setActivePlayerNumber(playerNumber);
  };

  const handleInfo = (info: Info) => {
    setInfo(info);
  };

  const handlePlayerColor = (playerNumber: number, color: string) => {
    const otherPlayer = playerNumber === 1 ? 2 : 1;

    // if selected color is same with another player color, cancel it
    if (color === playerColor[otherPlayer]) {
      return;
    }

    setPlayerColor((prev) => ({
      ...prev,
      [playerNumber]: color,
    }));
  };

  const handlePlayAgain = () => {
    resetGame();
  };

  const handleGameOver = (result: GameResult) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = null;

    setGameOver(true);

    setGameResult(result);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(timerRef.current!);
    };
  }, []);

  return (
    <Container>
      <GameStatus status={!gameOver}>
        <GameInfo info={info} />
        <Game
          gameSettingsOpen={gameSettingsOpen}
          playerColor={playerColor}
          onPlayerChange={handlePlayerNumberChange}
          onInfo={handleInfo}
          onGameOver={handleGameOver}
        />
        <GameMenu
          playerColor={playerColor}
          playerNumber={activePlayerNumber}
          time={time}
          showSettings={gameSettingsOpen}
          onReset={resetGame}
          toggleGameSettingsMenu={toggleGameSettingsMenu}
        />
        <GameSettings
          showSettings={gameSettingsOpen}
          toggleGameSettingsMenu={toggleGameSettingsMenu}
          playerColor={playerColor}
          onColorChange={handlePlayerColor}
        />
      </GameStatus>

      <GameStatus status={gameOver}>
        <GameOver
          gameResult={gameResult!}
          playerColor={playerColor}
          onPlayAgain={handlePlayAgain}
        />
      </GameStatus>

      <GameAnimation startAnimation={info.errorMessage} isGameOver={gameOver} />
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="z-20 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center">
      <div className="relative">{children}</div>
    </div>
  );
}
