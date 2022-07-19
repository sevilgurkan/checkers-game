import { GameObject } from './entity/GameObject';

export type GameBoard = Map<string, GameObject | null>;
export type PlayerColor = { [key: string]: string };
export type Moves = { [key: string]: number };
export type GameOverResult = PlayerNumber | Draw | false;
export type Draw = 0;
export type PlayerNumber = 1 | 2;
export type MoveDirection = 'left' | 'up' | 'right' | 'down';
export type GameResult = string | Winner;
export type Winner = {
  player: PlayerNumber;
  winner: string;
  checkers: number;
  remainingPieces: number;
};

export type Info = {
  errorMessage: string;
  currentKey: string;
  draggingKey: string;
};

export type GameProps = {
  gameSettingsOpen: boolean;
  playerColor: PlayerColor;
  onPlayerChange: (playerNumber: number) => void;
  onInfo: (info: Info) => void;
  onGameOver: (result: GameResult) => void;
};

export type GameContainerProps = {
  resetGame: () => void;
};

export type GameInfoProps = {
  info: {
    errorMessage: string;
    draggingKey: string;
    currentKey: string;
  };
};

export type GameSettingsProps = {
  showSettings: boolean;
  playerColor: PlayerColor;
  toggleGameSettingsMenu: () => void;
  onColorChange: (playerNumber: number, color: string) => void;
};

export type GameIntroProps = {
  onGameStart: () => void;
};

export type GameMenuProps = {
  playerColor: PlayerColor;
  playerNumber: number;
  time: number;
  showSettings: boolean;
  onReset: () => void;
  toggleGameSettingsMenu: () => void;
};

export type GameAnimationProps = {
  startAnimation: string | boolean;
  isGameOver: boolean;
};

export type GameOverProps = {
  gameResult: GameResult;
  playerColor: PlayerColor;
  onPlayAgain: () => void;
};

export type GameHistoryProps = {
  showHistory: boolean;
};

export type SquareProps = {
  dataKey: string;
  possibleMoveKeys: Array<string>;
  gameObject: GameObject | null;
  playerColor: { [key: string]: string };
  playerNumber: number;
};

export interface AudioContext {
  isMuted: boolean;
  toggleMute: () => void;
}
