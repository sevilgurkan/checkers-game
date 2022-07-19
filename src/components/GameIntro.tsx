import type { GameIntroProps } from '../types';

export function GameIntro({ onGameStart }: GameIntroProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center py-10">
      <h1 className="bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-center text-5xl text-transparent">
        Turkish Checkers Game
      </h1>
      <div className="mt-16 flex items-center justify-center">
        <div className="relative flex h-full w-full items-center justify-center">
          <button
            className="start-button relative h-40 w-40 rounded-full border border-[#73848c26] bg-[#171a1c] text-[#4a4c4b] shadow-sm shadow-black transition-all duration-300 hover:border-white hover:text-white hover:shadow-white"
            onClick={onGameStart}
          >
            START GAME
          </button>
        </div>
      </div>
    </div>
  );
}
