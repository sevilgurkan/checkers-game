import type { GameOverProps, PlayerColor, Winner } from "../types";

import { CHECKER_COLOR } from "../constant";

export function GameOver({
  gameResult,
  playerColor,
  onPlayAgain,
}: GameOverProps): JSX.Element {
  let element: JSX.Element | undefined;

  if (typeof gameResult === "string") {
    element = <DrawResult onPlayAgain={onPlayAgain} />;
  }

  if (typeof gameResult === "object") {
    element = (
      <WinnerResult
        onPlayAgain={onPlayAgain}
        playerColor={playerColor}
        result={gameResult}
      />
    );
  }

  return (
    <div className="primary-border-color z-50 m-[2px] flex h-[642px] w-[1024px] border bg-[#171a1c] text-white">
      {element}
    </div>
  );
}

function DrawResult({ onPlayAgain }: { onPlayAgain: () => void }) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-5xl text-transparent">
        Draw
      </h1>
      <button
        className="mx-auto mt-9 block rounded-full border border-gray-500 px-6 py-2 text-gray-500 hover:text-gray-300"
        onClick={onPlayAgain}
      >
        Play Again
      </button>
    </div>
  );
}

function WinnerResult({
  onPlayAgain,
  playerColor,
  result,
}: {
  onPlayAgain: () => void;
  playerColor: PlayerColor;
  result: Winner;
}) {
  const checkerPieces = result.checkers;
  const remainingPieces = result.remainingPieces - checkerPieces;
  const destroyedPieces = 16 - (checkerPieces + remainingPieces);

  const renderPieces = (pieces: number, isChecker: boolean = false) => {
    return Array.from({ length: pieces }).map((_, idx: number) => (
      <span
        key={idx.toString()}
        className={`h-5 w-5 rounded-full ${
          isChecker
            ? CHECKER_COLOR[playerColor[result.player]]
            : playerColor[result.player]
        }`}
      />
    ));
  };

  return (
    <>
      {/* Left */}
      <div className="flex basis-1/2 flex-col items-center justify-center space-y-4">
        <div className="text-center text-2xl">Winner</div>
        <div className="flex items-center justify-center">
          <span
            className={`rounded-full p-12 ${playerColor[result.player]}`}
          ></span>
        </div>
        <div className="py-4 text-center">{result.winner}</div>
        <button
          className="mx-auto block rounded-full border border-gray-500 px-6 py-2 text-gray-500"
          onClick={onPlayAgain}
        >
          Play Again
        </button>
      </div>

      {/* Right */}
      <div className="flex basis-1/2 flex-col justify-center">
        {/* Remaining Checkers */}
        {checkerPieces !== 0 && (
          <div className="mb-2 space-y-2">
            <div>
              Remaining Checkers{" "}
              <span className="text-sm text-gray-500">{`(${checkerPieces})`}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {renderPieces(checkerPieces, true)}
            </div>
          </div>
        )}
        {/* Remaining pieces */}
        {remainingPieces !== 0 && (
          <div className="mb-2 space-y-2">
            <div>
              Remaining Pieces{" "}
              <span className="text-sm text-gray-500">{`(${remainingPieces})`}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {renderPieces(remainingPieces)}
            </div>
          </div>
        )}
        {/* Destroyed pieces */}
        {destroyedPieces !== 0 && (
          <div className="space-y-2">
            <div>
              Destroyed Pieces{" "}
              <span className="text-sm text-gray-500">{`(${destroyedPieces})`}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {renderPieces(destroyedPieces)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
