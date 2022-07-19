import type { MoveDirection, PlayerNumber, GameOverResult } from "../types";
import { BOARD_LETTERS, ERROR_MESSAGES, BOARD_NUMBERS } from "../constant";
import { GameObject } from "../entity/GameObject";
import { log } from "./common";
import { GameBoard } from "../types";

const addition = (x: number, y: number): number => x + y;
const subtraction = (x: number, y: number): number => x - y;

/**
 * @param {Map<string, number>} gameBoard checkerBoard
 * @param {Number} playerNumber number of the current player
 * @param {String} fromKey dragging element key
 * @param {String} destinationKey key of the field to drop
 */
export function checkPieces(
  gameBoard: GameBoard,
  playerNumber: number,
  fromKey: string,
  destinationKey: string
) {
  // in the handleDragEnter function, we check if the user has taken
  // the correct step, and if it is the wrong step, we block it.
  //
  // checkPieces function works in handleDrop function and
  // handleDrop first checks errorMessage variable from handleDragEnter,
  // if wrong step is taken then errorMessage is true and if errorMessage
  // is true in handleDrop function it exits with early return.
  //
  // so we don't need to check if it's the right step here.
  // if it came to the line where checkPieces will work,
  // the steps were taken correctly.

  // cancel checks if 1 step to empty square
  if (isOneStepMoveLeftRight(fromKey, destinationKey)) {
    return;
  }

  // left, right, up, down
  const direction = getMoveDirection(fromKey, destinationKey) as MoveDirection;
  const key = getKeyPassedOver(destinationKey, direction);

  const gameObj = gameBoard.get(fromKey)!;
  const objectPassedOver = gameBoard.get(key);

  if (!objectPassedOver || gameObj.value === objectPassedOver.value) {
    return false;
  }

  return {
    keyToBeDeleted: key,
    deletedObj: objectPassedOver,
  };
}

export function highlightPossibleMoves(
  gameBoard: GameBoard,
  fromKey: string,
  playerNumber: PlayerNumber
) {
  const gameObj = gameBoard.get(fromKey);

  if (gameObj instanceof GameObject && gameObj.isChecker) {
    const possibleMoves = getCheckerMoves(gameBoard, fromKey, playerNumber);

    return possibleMoves;
  }

  const letter = toLetter(fromKey);
  const value = toInteger(toValue(fromKey));
  const letterIndex = toLetterIndex(letter);
  const previousLetter = toLeftLetter(letterIndex);
  const nextLetter = toRightLetter(letterIndex);
  const operation = toArithmeticOperation(playerNumber);

  let upKey;
  let leftKey;
  let rightKey;

  // (null == undefined) is true, will catch both null and undefined
  if (!(previousLetter == null)) leftKey = toKey(previousLetter, value);
  if (!(nextLetter == null)) rightKey = toKey(nextLetter, value);

  const oprVal = operation(value, 1);
  const _value = oprVal > 8 ? 8 : oprVal < 1 ? 1 : oprVal;

  upKey = toKey(letter, _value);

  const resultKeys = getValidKeysInThreeDirections(
    gameBoard,
    fromKey,
    playerNumber,
    [upKey, leftKey, rightKey]
  ) as string[];

  return resultKeys;
}

function getValidKeysInThreeDirections(
  gameBoard: GameBoard,
  fromKey: string,
  playerNumber: number,
  directionKeys: Array<string | undefined>
) {
  // order: up, left, right
  const [upKey, leftKey, rightKey] = directionKeys;

  let oneMoreLeftKeyEntity;
  let oneMoreRightKeyEntity;
  let oneMoreUpKeyEntity;

  // [upkey, leftkey, rightkey]
  // if one of the keys is undefined, "toOneMore.." function will return undefined
  // findDifferentKeys function will handle this
  const oneMoreLeftKey = toOneMoreLeftRightUpKey(leftKey, "left");
  const oneMoreRightKey = toOneMoreLeftRightUpKey(rightKey, "right");
  const oneMoreUpKey = toOneMoreLeftRightUpKey(upKey, playerNumber);

  const diffKeys = findDifferentKeys(
    gameBoard,
    [leftKey, rightKey, upKey],
    playerNumber
  );

  const keys = [];
  for (let i = 0; i < diffKeys.length; i++) {
    const key = diffKeys[i] as string;
    const entity = gameBoard.get(key);

    if (!key) {
      continue;
    }

    // if its empty add to keys and switch to the next loop
    if (!entity) {
      keys.push(key);
      continue;
    }

    if (oneMoreLeftKey) oneMoreLeftKeyEntity = gameBoard.get(oneMoreLeftKey);
    if (oneMoreRightKey) oneMoreRightKeyEntity = gameBoard.get(oneMoreRightKey);
    if (oneMoreUpKey) oneMoreUpKeyEntity = gameBoard.get(oneMoreUpKey);

    const keyDirection = isLeftRightUpKey(fromKey, key);

    // left
    if (keyDirection === -1 && !oneMoreLeftKeyEntity) {
      keys.push(oneMoreLeftKey);
    }
    // right
    else if (keyDirection === 1 && !oneMoreRightKeyEntity) {
      keys.push(oneMoreRightKey);
    }
    // up
    else if (keyDirection === 0 && !oneMoreUpKeyEntity) {
      keys.push(oneMoreUpKey);
    }
  }

  return keys;
}

function findDifferentKeys(
  gameBoard: GameBoard,
  directionKeys: Array<string | undefined>,
  playerNumber: number
) {
  const diffKeys = [];

  for (let i = 0; i < directionKeys.length; i++) {
    const key = directionKeys[i];
    let entity;

    if (typeof key === "string") entity = gameBoard.get(key);

    if (
      !entity ||
      (entity instanceof GameObject && entity.value !== playerNumber)
    ) {
      diffKeys.push(key);
    }
  }

  return diffKeys;
}

export function getOpponentNumber(playerNumber: number) {
  if (playerNumber !== 1 && playerNumber !== 2) {
    throw new Error(`There is no player with this number ${playerNumber}`);
  }

  return playerNumber === 1 ? 2 : 1;
}

export function itsChecker(destinationKey: string, playerNumber: number) {
  const destinationValue = toInteger(toValue(destinationKey));

  if (
    (playerNumber === 1 && destinationValue === 8) ||
    (playerNumber === 2 && destinationValue === 1)
  ) {
    return true;
  }

  return false;
}

export function isGameOver(
  piecesPlayerOne: number,
  piecesPlayerTwo: number
): GameOverResult {
  // The winner is the number one player.
  if (piecesPlayerOne > 0 && piecesPlayerTwo === 0) return 1;
  // The winner is the number two player.
  if (piecesPlayerTwo > 0 && piecesPlayerOne === 0) return 2;
  // The game is draw
  if (piecesPlayerOne === 1 && piecesPlayerTwo === 1) return 0;

  return false;
}

export function totalCheckers(
  gameBoard: GameBoard,
  playerNumber: PlayerNumber
) {
  let checkers = 0;

  for (const [_, gameObj] of gameBoard) {
    if (gameObj && gameObj.value === playerNumber && gameObj.isChecker) {
      checkers++;
    }
  }

  return checkers;
}

function getCheckerMoves(
  gameBoard: GameBoard,
  fromKey: string,
  n: PlayerNumber
) {
  const leftKeys = emptyKeysOnDirection(gameBoard, fromKey, "left", n);
  const rightKeys = emptyKeysOnDirection(gameBoard, fromKey, "right", n);
  const upKeys = emptyKeysOnDirection(gameBoard, fromKey, "up", n);
  const downKeys = emptyKeysOnDirection(gameBoard, fromKey, "down", n);

  return [leftKeys, rightKeys, upKeys, downKeys].flat();
}

function emptyKeysOnDirection(
  gameBoard: GameBoard,
  fromKey: string,
  direction: MoveDirection,
  playerNumber: PlayerNumber
) {
  const toDirectionKey = directionHandler(direction);

  let currentKey = fromKey;
  let emptyKeys: string[] = [];
  let done;

  while (!done) {
    const key = toDirectionKey(currentKey);
    const gameObj = gameBoard.get(key);

    if (!isCorrrectKey(key)) {
      done = true;
    }
    // if gameObj is true, this is not empty square
    // if the key is not correct, the key is out of the game board
    if (!done && gameObj) {
      const keyBehindGameObject = toDirectionKey(key);
      const behindGameObj = gameBoard.get(keyBehindGameObject);

      // if the key behind the game object is empty
      // can destroy the opponent's piece
      if (!behindGameObj && gameObj.value !== playerNumber) {
        emptyKeys.push(keyBehindGameObject);
      }

      done = true;
    } else {
      currentKey = key;
      emptyKeys.push(key);
    }
  }

  return emptyKeys;
}

function isOneStepMoveLeftRight(fromKey: string, destinationKey: string) {
  const fromKeyLetter = toLetter(fromKey);
  const fromLetterIndex = toLetterIndex(fromKeyLetter);
  const fromKeyValue = toInteger(toValue(fromKey));

  const destinationKeyLetter = toLetter(destinationKey);
  const destinationLetterIndex = toLetterIndex(destinationKeyLetter);
  const destinationKeyValue = toInteger(toValue(destinationKey));

  const direction = isLeftRightUpKey(fromKey, destinationKey);

  if (direction === 1 || direction == -1) {
    if (Math.abs(fromLetterIndex - destinationLetterIndex) === 1) {
      // left or right
      // its greater than 1 or lesser than 1
      return true;
    }
  }

  // up
  if (Math.abs(fromKeyValue - destinationKeyValue) === 1) {
    return true;
  }

  return false;
}

function isLeftRightUpKey(fromKey: string, destinationKey: string) {
  const fromLetter = toLetter(fromKey);
  const fromLetterIndex = toLetterIndex(fromLetter);

  const destinationLetter = toLetter(destinationKey);
  const destinationLetterIndex = toLetterIndex(destinationLetter);

  if (destinationLetterIndex < fromLetterIndex) return -1; // left
  if (destinationLetterIndex > fromLetterIndex) return 1; // right
  // destinationIndex === fromIndex
  return 0; // up
}

function isCorrrectKey(key: string) {
  // key: a_5 = true
  // key: undefined_4 = false
  // key: c_11 = false
  // key: afd = false
  const splittedKey = key.split("_");
  if (splittedKey.length < 2) return false;

  const letter = splittedKey[0];
  if (letter.length > 1 || !BOARD_LETTERS.includes(letter)) return false;

  const number = splittedKey[1];
  if (number.length > 1 || !BOARD_NUMBERS.includes(number)) return false;

  return true;
}

function toKey(letter: string, index: number | string) {
  return `${letter}_${index}`;
}

function toValue(key: string) {
  return key.split("_")[1];
}

function toLetter(key: string) {
  return key.split("_")[0];
}

function toInteger(val: string) {
  return +val;
}

function toLetterIndex(letter: string) {
  return BOARD_LETTERS.indexOf(letter);
}

function toIndexLetter(index: number) {
  return BOARD_LETTERS[index];
}

function toLeftLetter(currentLetterIndex: number) {
  return BOARD_LETTERS[currentLetterIndex - 1];
}

function toRightLetter(currentLetterIndex: number) {
  return BOARD_LETTERS[currentLetterIndex + 1];
}

function toLeftKey(key: string) {
  const value = toValue(key);
  const letter = toLetter(key);
  const index = toLetterIndex(letter);
  const leftLetter = toLeftLetter(index);

  return toKey(leftLetter, value);
}
function toUpKey(key: string) {
  const value = toInteger(toValue(key));
  const letter = toLetter(key);

  return toKey(letter, value + 1);
}
function toDownKey(key: string) {
  const value = toInteger(toValue(key));
  const letter = toLetter(key);

  return toKey(letter, value - 1);
}

function toRightKey(key: string) {
  const value = toValue(key);
  const letter = toLetter(key);
  const index = toLetterIndex(letter);
  const rightLetter = toRightLetter(index);

  return toKey(rightLetter, value);
}

function directionHandler(direction: MoveDirection) {
  const directions = {
    left: toLeftKey,
    up: toUpKey,
    right: toRightKey,
    down: toDownKey,
  };

  return directions[direction];
}

function toArithmeticOperation(playerNumberOrDirection: number | string) {
  if (playerNumberOrDirection === 1 || playerNumberOrDirection === "right") {
    return addition;
  }

  if (playerNumberOrDirection === 2 || playerNumberOrDirection === "left") {
    return subtraction;
  }

  throw new Error(
    `No operation with this direction name or player number: ${playerNumberOrDirection}`
  );
}

function getMoveDirection(fromKey: string, destinationKey: string) {
  const fromValue = toValue(fromKey);
  const destValue = toValue(destinationKey);

  const fromLetter = toLetter(fromKey);
  const destLetter = toLetter(destinationKey);

  // moves horizontally
  if (fromValue === destValue) {
    const fromLetterIndex = toLetterIndex(fromLetter);
    const destLetterIndex = toLetterIndex(destLetter);

    // moves horizontally to the left
    if (destLetterIndex < fromLetterIndex) {
      return "left";
    }

    // moves horizontally to the right
    if (destLetterIndex > fromLetterIndex) {
      return "right";
    }
  }

  // moves vertically
  if (fromLetter === destLetter) {
    // moves vertically to the up
    if (destValue > fromValue) {
      return "up";
    }

    // moves vertically to the down
    if (destValue < fromValue) {
      return "down";
    }
  }

  return false;
}

function getKeyPassedOver(key: string, direction: MoveDirection) {
  switch (direction) {
    case "up":
      return toDownKey(key);
    case "right":
      return toLeftKey(key);
    case "down":
      return toUpKey(key);
    case "left":
      return toRightKey(key);
    default:
      throw new Error(`There is no case with this direction: ${direction}`);
  }
}

function toOneMoreLeftRightUpKey(
  key: string | undefined,
  playerNumberOrDirection: number | string
) {
  // if key is undefined, user on letter "a" or letter "h",
  // left side of the "a" will be undefined
  // right side of the "h" will be undefined
  if (!key) return;

  const operation = toArithmeticOperation(playerNumberOrDirection);

  const value = toInteger(toValue(key));
  const letter = toLetter(key);

  if (playerNumberOrDirection === 1 || playerNumberOrDirection === 2) {
    return toKey(letter, operation(value, 1));
  }

  const index = toLetterIndex(letter);
  const prevOrNextLetter = toIndexLetter(operation(index, 1));

  return toKey(prevOrNextLetter, value);
}
