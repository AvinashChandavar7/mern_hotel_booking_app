/* eslint-disable react-refresh/only-export-components */
import { memo, useCallback } from 'react';

export type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ page, pages, onPageChange }: PaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const memoizedOnPageChange = useCallback((number: number) => {
    onPageChange(number);
  }, [onPageChange]);

  return (
    <div className="flex items-center justify-center">
      <ul className="flex items-center justify-center w-full gap-2 rounded-md border-slate-300">
        {pageNumbers.map((number, index) => (
          <li key={index} onClick={() => memoizedOnPageChange(number)}
            className={`px-4 py-2 cursor-pointer font-bold rounded-md border border-blue-500 ${page === number ? "bg-blue-500 text-white" : ""}`}>
            <button>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(Pagination);


















// /* eslint-disable react-refresh/only-export-components */
// import { memo } from 'react';

// export type PaginationProps = {
//   page: number;
//   pages: number;
//   onPageChange: (page: number) => void;
// }

// function Pagination({ page, pages, onPageChange }: PaginationProps) {
//   const pageNumbers = [];

//   for (let i = 1; i <= pages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="flex items-center justify-center">
//       <ul className="flex items-center justify-center w-full gap-2 rounded-md border-slate-300">
//         {pageNumbers.map((number) => (
//           <li key={number} className={`px-4 py-2 cursor-pointer font-bold rounded-md border border-blue-500 ${page === number ? "bg-blue-500 text-white" : ""}`}>
//             <button onClick={() => onPageChange(number)}>
//               {number}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default memo(Pagination);
