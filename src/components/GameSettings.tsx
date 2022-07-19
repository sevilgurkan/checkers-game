import { useState, useRef } from "react";
import type { GameSettingsProps } from "../types";
import clsx from "clsx";

import { BG_COLORS, BORDER_COLORS } from "../constant";
import { useOutsideClick } from "../hooks";

export function GameSettings({
  showSettings,
  toggleGameSettingsMenu,
  playerColor,
  onColorChange,
}: GameSettingsProps) {
  const [volume, setVolume] = useState(50);
  const [selectedPlayer, setSelectedPlayer] = useState<number>(1);
  const [showColors, setShowColors] = useState(false);

  const settingsRef = useRef<HTMLDivElement>(null);

  const containerClass = showSettings
    ? "translate-x-0 opacity-100 visible"
    : "opacity-0 translate-x-[calc(100%_+_20px)] invisible";

  const handleVolumeChange = (e: any) => {
    setVolume(+e.target.value);
  };

  const handleColorMenu = (playerNumber: number) => {
    if (showColors && selectedPlayer === playerNumber) {
      setShowColors(false);
      return;
    }

    if (showColors && selectedPlayer !== playerNumber) {
      setSelectedPlayer(playerNumber);
      return;
    }

    setShowColors(true);
    setSelectedPlayer(playerNumber);
  };

  const getColorBtnClass = () => {
    const playerBgClass = playerColor[selectedPlayer];
    const index = BG_COLORS.indexOf(playerBgClass);
    const borderClass = BORDER_COLORS[index];

    return borderClass;
  };

  const renderColorElements = () => {
    return (
      <div className="mt-2 flex">
        {["You", "Opponent"].map((val, idx) => {
          const playerNumber = idx + 1; // 1 and 2
          return (
            <button
              key={val}
              className={clsx(
                "mr-2 flex items-center justify-center rounded-md border p-2 shadow-sm shadow-black",
                showColors && selectedPlayer === playerNumber
                  ? getColorBtnClass()
                  : "primary-border-color"
              )}
              onClick={() => handleColorMenu(playerNumber)}
            >
              {val}
              <span
                className={`ml-2 rounded-full p-2 ${playerColor[playerNumber]}`}
              />
            </button>
          );
        })}
      </div>
    );
  };

  useOutsideClick(settingsRef, () => {
    if (showSettings) {
      toggleGameSettingsMenu();
    }
  });

  return (
    <div
      ref={settingsRef}
      className={clsx(
        "primary-border-color absolute right-5 top-5 bottom-5 z-50 w-2/5 rounded-lg bg-[#171a1c] p-8 text-gray-400 shadow-md shadow-black transition-all duration-200",
        containerClass
      )}
    >
      <div className="">
        Volume:
        <input
          type="range"
          min="1"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
      {/* <Divider /> */}
      <div className="mt-4">
        Change Player Colors
        {renderColorElements()}
        {showColors && (
          <Colors
            showColors={showColors}
            onColorChange={onColorChange}
            selectedPlayer={selectedPlayer}
          />
        )}
      </div>
    </div>
  );
}

function Colors({
  showColors,
  onColorChange,
  selectedPlayer,
}: {
  showColors: boolean;
  onColorChange: (player: number, c: string) => void;
  selectedPlayer: number;
}) {
  return (
    <div
      className={clsx(
        "primary-border-color mt-2 flex flex-wrap border p-2 shadow-sm shadow-black transition-all",
        showColors ? "h-auto" : "h-0"
      )}
    >
      {BG_COLORS.map((color) => (
        <button
          key={color}
          className={`mr-2 mb-1 rounded-full p-3 ${color}`}
          onClick={() => onColorChange(selectedPlayer, color)}
        />
      ))}
    </div>
  );
}
