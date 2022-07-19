import type { GameAnimationProps } from '../types';

export function GameAnimation({
  startAnimation,
  isGameOver
}: GameAnimationProps): JSX.Element {
  return ((startAnimation || isGameOver) && (
    <div className="absolute left-0 top-0 right-0 -z-10 h-full w-full overflow-hidden border-none">
      <div className="absolute bottom-0 -left-[50%] -z-10 h-1/5 w-[150%] translate-x-0 rotate-45 animate-checkers_board rounded-lg bg-gradient-to-r from-yellow-500 to-pink-500 motion-reduce:hidden motion-reduce:animate-none"></div>
      {/* <div className="absolute top-0 right-0 -z-10 animate-wiggle rounded-lg bg-red-600"></div> */}
    </div>
  )) as JSX.Element;
}
