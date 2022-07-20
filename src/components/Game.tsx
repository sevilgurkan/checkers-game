import { useState, useRef, useEffect } from 'react';
import type { GameBoard, GameProps, PlayerNumber, Winner } from '../types';

// hooks
import { useAudio } from '../hooks';

// constants
import { initalizeBoard, audioUrl } from '../constant';

// entitiy
import { GameObject } from '../entity/GameObject';

// board utils
import {
  generateClasses,
  getDataColumnNumber,
  getDataColumnChar
} from '../utils/board';

// game utils
import {
  highlightPossibleMoves,
  checkPieces,
  getOpponentNumber,
  itsChecker,
  isGameOver,
  totalCheckers
} from '../utils/game';

// components
import { MemoizedSquare as Square } from './Square';

export function Game({
  gameSettingsOpen,
  playerColor,
  onPlayerChange,
  onInfo,
  onGameOver
}: GameProps) {
  const [gameBoard, setGameBoard] = useState<GameBoard>(() => initalizeBoard());

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isDropped, setIsDropped] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingKey, setDraggingKey] = useState<string>('');

  const [currentKey, setCurrentKey] = useState<string>('');
  const [playerNumber, setPlayerNumber] = useState<PlayerNumber>(1);
  const [possibleMoveKeys, setPossibleMoveKeys] = useState<string[]>([]);

  const [playerOnePieces, setPlayerOnePieces] = useState<number>(16);
  const [playerTwoPieces, setPlayerTwoPieces] = useState<number>(16);

  const draggingItem = useRef<HTMLDivElement | null>(null);
  const dragOverItem = useRef<HTMLDivElement | null>(null);

  const { play: dropAudioPlay, pause: dropAudioPause } = useAudio(audioUrl, {
    volume: 1,
    playBackRate: 1
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dropAudioPause();

    draggingItem.current = e.target as HTMLDivElement;
    draggingItem.current.parentElement?.classList.add('drag-start');

    const key = draggingItem.current.dataset.key as string;

    const _possibleMoveKeys = highlightPossibleMoves(
      gameBoard,
      key,
      playerNumber
    );

    setPossibleMoveKeys(_possibleMoveKeys);

    setIsDragging(true);
    setIsDropped(false);

    setDraggingKey(key);

    const _draggingItem = draggingItem.current;

    // if he drags and drops it on itself
    setTimeout(() => {
      const elementDisplay = _draggingItem.style.display;
      _draggingItem.style.display = elementDisplay === 'none' ? 'flex' : 'none';
    }, 0);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!draggingItem.current) return;

    dragOverItem.current = e.target as HTMLDivElement;

    const fromKey = draggingItem.current.dataset.key;
    const destinationKey = dragOverItem.current.dataset.key;

    if (!destinationKey || !fromKey) return;

    if (!possibleMoveKeys.includes(destinationKey)) {
      setErrorMessage('You cannot play outside of the specified moves.');
      return;
    }

    setCurrentKey(destinationKey);
    setErrorMessage('');

    dragOverItem.current.classList.add('drag-primary-hover');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    dropAudioPlay();
    setCurrentKey('');
    setDraggingKey('');
    setIsDropped(true);

    setPossibleMoveKeys([]);
    setIsDragging(false);

    if (!dragOverItem.current || !draggingItem.current) return;

    dragOverItem.current.classList.remove('drag-primary-hover');
    draggingItem.current.style.display = 'flex';
    draggingItem.current.parentElement?.classList.remove('drag-start');

    setErrorMessage('');
    // we updated the error message above to falsy empty string.
    // and below, we said early return if the error message is true.
    // this may sound confusing if you are not familiar with the react.
    // react will update this errorMessage state
    // but here we will access the updated data in the next render
    // therefore, even if we set this data to false above, it can be true below.
    if (errorMessage) return;

    const fromKey = draggingItem.current.dataset.key;
    const destinationKey = dragOverItem.current.dataset.key;

    // as a possibility, if one of the element keys is not defined
    // then cancel it
    if (!fromKey || !destinationKey) {
      return;
    }

    // check if there are pieces to destroy
    const checkPiecesResult = checkPieces(gameBoard, fromKey, destinationKey);

    const copiedGameBoard = new Map(gameBoard);

    const draggingGameObject = copiedGameBoard.get(fromKey) as GameObject;
    draggingGameObject.saveMove(fromKey);

    copiedGameBoard.set(fromKey, null);
    copiedGameBoard.set(destinationKey, draggingGameObject);

    let p1_pieces = playerOnePieces;
    let p2_pieces = playerTwoPieces;
    // burayı düzelt
    if (checkPiecesResult) {
      const { keyToBeDeleted, deletedObj } = checkPiecesResult;

      deletedObj.destroySelf();

      copiedGameBoard.set(keyToBeDeleted, null);

      if (deletedObj.value === 1) {
        setPlayerOnePieces(playerOnePieces - 1);
        p1_pieces--;
      } else if (deletedObj.value === 2) {
        setPlayerTwoPieces(playerTwoPieces - 1);
        p2_pieces--;
      }
    }

    // check it is a checker stone after then check moves
    if (itsChecker(destinationKey, playerNumber)) {
      draggingGameObject.raiseToCheckers();
    }

    const resultNumber = isGameOver(p1_pieces, p2_pieces);

    // if its a not an integer, it is false, the game is not over
    if (Number.isInteger(resultNumber)) {
      let result;
      if (resultNumber === 0) {
        result = 'Draw';
      } else {
        const checkers = totalCheckers(gameBoard, resultNumber as PlayerNumber);
        const isNumberOne = resultNumber === 1;

        result = {
          player: isNumberOne ? 1 : 2,
          winner: isNumberOne ? 'Player One' : 'Player Two',
          checkers,
          remainingPieces: isNumberOne ? p1_pieces : p2_pieces
        } as Winner;
      }

      onGameOver(result);

      return;
    }

    draggingItem.current = null;
    dragOverItem.current = null;

    const nextPlayerNumber = getOpponentNumber(playerNumber);
    setPlayerNumber(nextPlayerNumber);

    setGameBoard(copiedGameBoard);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (
    e: React.DragEvent<HTMLDivElement> & { target: Element }
  ) => {
    e.target.classList.remove('drag-primary-hover');
  };

  const renderBoard = () => {
    const board = [];

    let index = 0;
    for (const [key, entity] of gameBoard) {
      const isDragOverToCurrentElement = key === currentKey && isDragging;

      const element = (
        <div
          draggable={false}
          key={key}
          data-column-number={getDataColumnNumber(key)}
          data-column-char={getDataColumnChar(key)}
          className={generateClasses(index, isDragOverToCurrentElement)}
        >
          {/* Square is memoized. it is only recreated when props change. */}
          <Square
            dataKey={key}
            possibleMoveKeys={possibleMoveKeys}
            gameObject={entity}
            playerColor={playerColor}
            playerNumber={playerNumber}
          />
        </div>
      );

      index++;
      board.push(element);
    }

    return board;
  };

  useEffect(() => {
    let p1_pieces = 0;
    let p2_pieces = 0;
    for (let [key, gameObj] of gameBoard) {
      if (gameObj) {
        if (gameObj.value === 1) p1_pieces++;
        else if (gameObj.value === 2) p2_pieces++;
      }
    }

    setPlayerOnePieces(p1_pieces);
    setPlayerTwoPieces(p2_pieces);
  }, []);

  useEffect(() => {
    onPlayerChange(playerNumber);
  }, [playerNumber]);

  useEffect(() => {
    onInfo({ errorMessage, currentKey, draggingKey });
  }, [errorMessage, currentKey, draggingKey]);

  return (
    <div
      className="primary-border-color z-50 flex flex-wrap border shadow-lg"
      draggable={false}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {renderBoard()}
      {gameSettingsOpen && (
        <div className="board-backdrop absolute top-0 left-0 right-0 bottom-0 z-50 w-full backdrop-blur" />
      )}
    </div>
  );
}
