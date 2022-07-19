import type { GameMenuProps } from "../types";
import { useAudioContext } from "../context/audio-context";
import clsx from "clsx";

export function GameMenu({
  playerColor,
  playerNumber,
  time,
  showSettings,
  onReset,
  toggleGameSettingsMenu,
}: GameMenuProps) {
  const { isMuted, toggleMute } = useAudioContext();

  return (
    <>
      {/* SIDE MENU */}
      <div
        className={clsx(
          "absolute top-0 bottom-0 -right-[64px] flex w-11 flex-col",
          showSettings && "pointer-events-none"
        )}
      >
        {/* Turn */}
        <div className="primary-border-color mb-2 flex flex-col items-center justify-center overflow-hidden rounded-md border py-1">
          <span className=" pb-2 text-sm text-gray-400">Turn</span>

          <span
            className={`rounded-full p-2 transition-colors duration-300 ${playerColor[playerNumber]}`}
          />
        </div>

        {/* Reset */}
        <button
          className="primary-border-color group mb-2 flex items-center justify-center rounded-md border py-1 transition-colors duration-700 hover:border-gray-400"
          onClick={onReset}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="pointer-events-none h-6 w-6 fill-gray-600 transition-transform duration-700 group-hover:rotate-180 group-hover:fill-gray-400"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17 12h3a8 8 0 1 0-2.46 5.772l.997 1.795z" />
          </svg>
        </button>

        {/* Sound Mute */}
        <button
          className="primary-border-color group mb-2 flex items-center justify-center rounded-md border py-1 transition-colors duration-300 hover:border-gray-400"
          onClick={toggleMute}
        >
          {isMuted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="pointer-events-none h-6 w-6 fill-gray-600 group-hover:fill-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="pointer-events-none h-6 w-6 fill-gray-600 group-hover:fill-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Game Settings */}
        <button
          className="primary-border-color group flex cursor-pointer items-center justify-center rounded-md border py-1 transition-colors duration-300 hover:border-gray-400"
          onClick={toggleGameSettingsMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 group-hover:stroke-[#9ca3af]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#4b5563"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

        {/* Game Time */}
        <div className="primary-border-color mt-auto flex cursor-pointer flex-col items-center justify-center rounded-md border py-1 transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#4b5563"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="my-1 text-white">{time}</span>
        </div>
      </div>
    </>
  );
}
