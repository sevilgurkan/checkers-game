import clsx from 'clsx';
import { ROW_AND_COL_LENGTH } from '../constant';

/**
 * here i use "closures" to keep the number of rows in memory of the function
 * closures and calculate the background color of the column corresponding
 * to this row.
 */
const calculateRowColMod2 = () => {
  let row = 0;
  let rowIterator = 0;

  return function (index: number) {
    if (rowIterator > 7) {
      row++;
      rowIterator = 0;
    }

    rowIterator++;

    return (index + row) % 2 === 0;
  };
};

export const getHighlightedCol = calculateRowColMod2();

export function generateClasses(
  index: number,
  isDragOverToCurrentElement: boolean
) {
  const isRemainderOne = (index + 1) % ROW_AND_COL_LENGTH === 1;
  const isHighlightedCol = getHighlightedCol(index);

  // relative flex h-[80px] w-[80px] basis-[12.5%] items-center justify-center text-gray-500
  return clsx(
    'relative flex h-[86px] w-[14px] basis-[12.5%] items-center justify-center text-gray-500',
    isRemainderOne && 'col-number',
    index > 55 && 'col-char',
    isHighlightedCol ? 'bg-[#22282a] bg-opacity-100' : 'bg-[#171a1c]',
    isDragOverToCurrentElement && 'border rounded-md border-gray-300'
  );
}

export function getDataColumnNumber(key: string) {
  const data = {
    a_1: 1,
    a_2: 2,
    a_3: 3,
    a_4: 4,
    a_5: 5,
    a_6: 6,
    a_7: 7,
    a_8: 8
  } as any;

  return data[key];
}

export function getDataColumnChar(key: string) {
  const data = {
    a_1: 'a',
    b_1: 'b',
    c_1: 'c',
    d_1: 'd',
    e_1: 'e',
    f_1: 'f',
    g_1: 'g',
    h_1: 'h'
  } as any;

  return data[key];
}
