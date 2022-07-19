import { GameObject } from './entity/GameObject';

export const ROW_AND_COL_LENGTH = 8;

// Ordered board letters and numbers
export const BOARD_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const BOARD_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8'];

export const ERROR_MESSAGES = {
  backwards: 'You cannot move to backwards',
  diagonally: 'You cannot move diagonally',
  onestep: 'You cannot go more than one step',
  onpiece: 'You cannot move on piece',
  behindownpiece: 'You cannot get behind your own piece.'
};

// Drop sound
export const audioUrl = '/src/assets/audio/mixkit-martial-arts-punch-2052.wav';

/**
 *   Initial Board
 *
 *   0 0 0 0 0 0 0 0
 *   1 1 1 1 1 1 1 1
 *   1 1 1 1 1 1 1 1
 *   0 0 0 0 0 0 0 0
 *   0 0 0 0 0 0 0 0
 *   2 2 2 2 2 2 2 2
 *   2 2 2 2 2 2 2 2
 *   0 0 0 0 0 0 0 0
 */

export const INITIAL_BOARD_MAP = [
  // 8
  ['a_8', null],
  ['b_8', null],
  ['c_8', null],
  ['d_8', null],
  ['e_8', null],
  ['f_8', null],
  ['g_8', null],
  ['h_8', null],
  // 7
  ['a_7', null],
  ['b_7', null],
  ['c_7', null],
  ['d_7', null],
  ['e_7', null],
  ['f_7', null],
  ['g_7', null],
  ['h_7', null],
  // 6
  ['a_6', null],
  ['b_6', null],
  ['c_6', null],
  ['d_6', null],
  ['e_6', null],
  ['f_6', null],
  ['g_6', null],
  ['h_6', null],
  // 5
  ['a_5', null],
  ['b_5', null],
  ['c_5', null],
  ['d_5', null],
  ['e_5', null],
  ['f_5', null],
  ['g_5', null],
  ['h_5', null],
  // 4
  ['a_4', null],
  ['b_4', null],
  ['c_4', null],
  ['d_4', null],
  ['e_4', null],
  ['f_4', null],
  ['g_4', null],
  ['h_4', null],
  // 3
  ['a_3', null],
  ['b_3', null],
  ['c_3', null],
  ['d_3', null],
  ['e_3', null],
  ['f_3', null],
  ['g_3', null],
  ['h_3', null],
  // 2
  ['a_2', null],
  ['b_2', null],
  ['c_2', null],
  ['d_2', null],
  ['e_2', null],
  ['f_2', null],
  ['g_2', null],
  ['h_2', null],
  // 1
  ['a_1', null],
  ['b_1', null],
  ['c_1', null],
  ['d_1', null],
  ['e_1', null],
  ['f_1', null],
  ['g_1', null],
  ['h_1', null]
] as const;

export function initalizeBoard() {
  const map = new Map<string, GameObject | null>(INITIAL_BOARD_MAP);
  const cells = makeInitialBoard();

  for (const [key, value] of cells) {
    map.set(key, value);
  }

  return map;
}

// export const initialBoard = initalizeBoard();

// ----- utilities -----

function makeInitialBoard() {
  return [
    // Player 1
    ['a_2', new GameObject(1)],
    ['b_2', new GameObject(1)],
    ['c_2', new GameObject(1)],
    ['d_2', new GameObject(1)],
    ['e_2', new GameObject(1)],
    ['f_2', new GameObject(1)],
    ['g_2', new GameObject(1)],
    ['h_2', new GameObject(1)],
    // Player 1
    ['a_3', new GameObject(1)],
    ['b_3', new GameObject(1)],
    ['c_3', new GameObject(1)],
    ['d_3', new GameObject(1)],
    ['e_3', new GameObject(1)],
    ['f_3', new GameObject(1)],
    ['g_3', new GameObject(1)],
    ['h_3', new GameObject(1)],
    // Player 2
    ['a_6', new GameObject(2)],
    ['b_6', new GameObject(2)],
    ['c_6', new GameObject(2)],
    ['d_6', new GameObject(2)],
    ['e_6', new GameObject(2)],
    ['f_6', new GameObject(2)],
    ['g_6', new GameObject(2)],
    ['h_6', new GameObject(2)],
    // Player 2
    ['a_7', new GameObject(2)],
    ['b_7', new GameObject(2)],
    ['c_7', new GameObject(2)],
    ['d_7', new GameObject(2)],
    ['e_7', new GameObject(2)],
    ['f_7', new GameObject(2)],
    ['g_7', new GameObject(2)],
    ['h_7', new GameObject(2)]
  ] as const;
}

/**
 * TAILWIND CONSTANTS
 */

export const BG_COLORS = [
  'bg-yellow-600',
  'bg-red-600',
  'bg-blue-600',
  'bg-green-600',
  'bg-orange-600',
  'bg-amber-600',
  'bg-lime-600',
  'bg-purple-600',
  'bg-teal-600',
  'bg-cyan-600',
  'bg-sky-600',
  'bg-indigo-400',
  'bg-violet-600',
  'bg-fuchsia-600',
  'bg-pink-600',
  'bg-rose-600'
];

export const CHECKER_COLOR: {
  [key: string]: string;
} = {
  'bg-yellow-600': 'bg-gradient-to-tr from-yellow-300 to-yellow-800',
  'bg-red-600': 'bg-gradient-to-tr from-red-300 to-red-800',
  'bg-blue-600': 'bg-gradient-to-tr from-blue-300 to-blue-800',
  'bg-green-600': 'bg-gradient-to-tr from-green-300 to-green-800',
  'bg-orange-600': 'bg-gradient-to-tr from-orange-300 to-orange-800',
  'bg-purple-600': 'bg-gradient-to-tr from-purple-300 to-purple-800',
  'bg-amber-600': 'bg-gradient-to-tr from-amber-300 to-amber-800',
  'bg-lime-600': 'bg-gradient-to-tr from-lime-300 to-lime-800',
  'bg-teal-600': 'bg-gradient-to-tr from-teal-300 to-teal-800',
  'bg-cyan-600': 'bg-gradient-to-tr from-cyan-300 to-cyan-800',
  'bg-sky-600': 'bg-gradient-to-tr from-sky-300 to-sky-800',
  'bg-indigo-400': 'bg-gradient-to-tr from-indigo-300 to-indigo-800',
  'bg-violet-600': 'bg-gradient-to-tr from-violet-300 to-violet-800',
  'bg-fuchsia-600': 'bg-gradient-to-tr from-fuchsia-300 to-fuchsia-800',
  'bg-pink-600': 'bg-gradient-to-tr from-pink-300 to-pink-800',
  'bg-rose-600': 'bg-gradient-to-tr from-rose-300 to-rose-800'
};

export const BORDER_COLORS = [
  'border-yellow-600',
  'border-red-600',
  'border-blue-600',
  'border-green-600',
  'border-orange-600',
  'border-amber-600',
  'border-lime-600',
  'border-purple-600',
  'border-teal-600',
  'border-cyan-600',
  'border-sky-600',
  'border-indigo-400',
  'border-violet-600',
  'border-fuchsia-600',
  'border-pink-600',
  'border-rose-600'
];
