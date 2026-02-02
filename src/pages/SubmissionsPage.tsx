import React, { useState } from 'react';
import SubmissionTable, { Submission } from '@/components/submissions/SubmissionTable';

// Mock Data
const mockSubmissions: Submission[] = Array.from({ length: 100 }, (_, i) => ({
  id: `492${100 - i}`,
  time: `${i + 1} mins ago`,
  user: i % 2 === 0 ? 'AlgoMaster99' : 'CodeRunner',
  problem: '1001. A+B Problem',
  language: 'C++17',
  performance: { time: '12 ms', memory: '4.2 MB' },
}));

const SubmissionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(mockSubmissions.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockSubmissions.slice(indexOfFirstItem, indexOfLastItem);

  const getPaginationRange = () => {
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
        if (typeof i === 'number' && i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (typeof i === 'number' && i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      if (typeof i === 'number') l = i;
    }
    return rangeWithDots;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-white">
      <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            모든 제출
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            커뮤니티의 시도들을 실시간으로 보여주는 피드
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <SubmissionTable submissions={currentItems} />
          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-700 dark:text-slate-400">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, mockSubmissions.length)}
                  </span>{' '}
                  of <span className="font-medium">{mockSubmissions.length}</span> results
                </p>
              </div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                <PageButton
                  icon="chevron_left"
                  isFirst
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                      key={index}
                      num={page as number}
                      active={currentPage === page}
                      onClick={() => setCurrentPage(page as number)}
                    />
                  );
                })}
                <PageButton
                  icon="chevron_right"
                  isLast
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                />
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// 페이지네이션 보조 컴포넌트
interface PageNumberProps {
  num: number;
  active?: boolean;
  onClick: () => void;
}

const PageNumber = ({ num, active, onClick }: PageNumberProps) => (
  <button
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

// 2. PageButton 컴포넌트
interface PageButtonProps {
  icon: string;
  isFirst?: boolean;
  isLast?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const PageButton = ({ icon, isFirst, isLast, disabled, onClick }: PageButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`relative inline-flex items-center px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 dark:ring-slate-700 dark:hover:bg-slate-700 ${
      isFirst ? 'rounded-l-md' : ''
    } ${isLast ? 'rounded-r-md' : ''} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
  >
    <span className="material-symbols-outlined text-xl">{icon}</span>
  </button>
);

export default SubmissionsPage;
