import type { GameInfoProps } from '../types';
import clsx from 'clsx';

export function GameInfo({ info }: GameInfoProps) {
  const { errorMessage, draggingKey, currentKey } = info;

  return (
    <div className="absolute -top-20 right-0 flex h-20 w-full items-center">
      {errorMessage && (
        <div
          key={errorMessage}
          className={clsx(
            'flex items-center rounded-lg border border-yellow-600 p-2 opacity-0 transition-all duration-200',
            errorMessage && 'opacity-100'
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" h-6 w-6 fill-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="pl-1 text-sm text-yellow-500">{errorMessage}</p>
        </div>
      )}

      <div className="primary-border-color ml-auto flex rounded-md border p-2">
        <div className="flex w-14 flex-col items-center justify-center">
          <span className="text-gray-500">From</span>
          {!draggingKey && <span className="invisible text-sm">000</span>}
          {draggingKey && (
            <span className="text-sm text-gray-200">{draggingKey}</span>
          )}
        </div>
        <div className="flex w-14 flex-col items-center justify-center">
          <span className="text-gray-500">To</span>

          {!currentKey && <span className="invisible text-sm">000</span>}
          {currentKey && (
            <span className="text-sm text-gray-200">{currentKey}</span>
          )}
        </div>
      </div>
    </div>
  );
}
