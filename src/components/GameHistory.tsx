import type { GameHistoryProps } from '../types';

export function GameHistory({ showHistory }: GameHistoryProps) {
  return (
    <div className="absolute right-5 top-5 bottom-5 z-50 w-1/5 rounded-lg bg-[#171a1c] p-6 shadow-sm shadow-black">
      <div className="text-gray-500">History</div>
    </div>
  );
}
