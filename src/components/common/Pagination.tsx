import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onChange,
  className = '',
}: PaginationProps) {
  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <nav className={`isolate inline-flex -space-x-px rounded-md shadow-sm ${className}`}>
      <PageButton
        icon="chevron_left"
        isFirst
        disabled={currentPage === 1}
        onClick={() => onChange(Math.max(currentPage - 1, 1))}
      />

      {paginationRange.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`dot-${index}`}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-300 dark:text-slate-400 dark:ring-slate-700"
            >
              ...
            </span>
          );
        }

        return (
          <PageNumber
            key={`page-${page}`}
            num={page}
            active={currentPage === page}
            onClick={() => onChange(page)}
          />
        );
      })}

      <PageButton
        icon="chevron_right"
        isLast
        disabled={currentPage === totalPages}
        onClick={() => onChange(Math.min(currentPage + 1, totalPages))}
      />
    </nav>
  );
}

function getPaginationRange(currentPage: number, totalPages: number) {
  const delta = 1;
  const range: (number | string)[] = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l !== undefined) {
      if (typeof i === 'number' && i - l === 2) rangeWithDots.push(l + 1);
      else if (typeof i === 'number' && i - l !== 1) rangeWithDots.push('...');
    }
    rangeWithDots.push(i);
    if (typeof i === 'number') l = i;
  }

  return rangeWithDots as (number | '...')[];
}

interface PageNumberProps {
  num: number;
  active?: boolean;
  onClick: () => void;
}

function PageNumber({ num, active, onClick }: PageNumberProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-slate-300 transition-colors dark:ring-slate-700 ${
        active
          ? 'z-10 bg-blue-600 text-white ring-blue-600'
          : 'text-slate-900 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700'
      }`}
    >
      {num}
    </button>
  );
}

interface PageButtonProps {
  icon: string;
  isFirst?: boolean;
  isLast?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

function PageButton({ icon, isFirst, isLast, disabled, onClick }: PageButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 dark:ring-slate-700 dark:hover:bg-slate-700 ${
        isFirst ? 'rounded-l-md' : ''
      } ${isLast ? 'rounded-r-md' : ''} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
    </button>
  );
}
