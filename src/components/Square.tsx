import type { SquareProps } from "../types";
import { memo } from "react";
import clsx from "clsx";

import { GameObject } from "../entity/GameObject";

import { CHECKER_COLOR } from "../constant";

const Square = ({
  dataKey,
  possibleMoveKeys,
  gameObject,
  playerColor,
  playerNumber,
}: SquareProps) => {
  const isPossibleMoveKey = possibleMoveKeys.includes(dataKey);

  const isGameObject = gameObject instanceof GameObject;

  const isChecker = isGameObject && gameObject.isChecker;

  return isGameObject ? (
    <div
      draggable={false}
      className={clsx(
        "z-10 flex cursor-default items-center justify-center border-none outline-none transition-transform duration-200 hover:bg-opacity-50"
      )}
    >
      <span
        data-key={dataKey}
        draggable={isGameObject && gameObject.value === playerNumber}
        className={clsx(
          "absolute h-[60px] w-[60px] cursor-grab rounded-full border-none outline-none",
          playerColor[gameObject.value]
        )}
      >
        {isChecker && (
          <span
            className={clsx(
              "absolute left-0 top-0 right-0 bottom-0 w-full animate-spin-slow rounded-full",
              CHECKER_COLOR[playerColor[gameObject.value]]
            )}
          />
        )}
      </span>
    </div>
  ) : (
    <div
      className="flex h-full w-full items-center justify-center"
      data-key={dataKey}
    >
      {isPossibleMoveKey && (
        <span className="pointer-events-none rounded-full bg-slate-300 p-2" />
      )}
    </div>
  );
};

export const MemoizedSquare = memo(Square);
