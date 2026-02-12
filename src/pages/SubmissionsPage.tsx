import React, { useMemo, useState } from 'react';
import SubmissionTable, { Submission } from '@/components/submissions/SubmissionTable';
import Pagination from '@/components/common/Pagination';

// Mock Data
const mockSubmissions: Submission[] = Array.from({ length: 100 }, (_, i) => ({
  id: `492${100 - i}`,
  time: `${i + 1} mins ago`,
  user: i % 2 === 0 ? 'AlgoMaster99' : 'CodeRunner',
  problem: '1001. A+B Problem',
  language: 'C++17',
  performance: { time: '12 ms', memory: '4.2 MB' },
}));

export default function SubmissionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(mockSubmissions.length / itemsPerPage);

  // 페이지 범위 안전장치(데이터 길이 변경 시 대비)
  const safePage = Math.min(Math.max(currentPage, 1), totalPages || 1);

  const { indexOfFirstItem, indexOfLastItem, currentItems } = useMemo(() => {
    const indexOfLast = safePage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;

    return {
      indexOfFirstItem: indexOfFirst,
      indexOfLastItem: indexOfLast,
      currentItems: mockSubmissions.slice(indexOfFirst, indexOfLast),
    };
  }, [safePage, itemsPerPage]);

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
              <p className="text-sm text-slate-700 dark:text-slate-400">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, mockSubmissions.length)}
                </span>{' '}
                of <span className="font-medium">{mockSubmissions.length}</span> results
              </p>

              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
