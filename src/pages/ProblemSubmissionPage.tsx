import { useMemo, useState } from 'react';
import SubmissionTable, { Submission } from '@/components/submissions/SubmissionTable';
import Pagination from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

/** 각 문제에 대한 사용자 제출 현황을 표시하는 임시 페이지 컴포넌트 */
export default function ProblemSubmissionsPage() {
  // TODO: 추후 API 연동 시 problemId 기반으로 fetch해서 대체
  const submissions: Submission[] = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: `492${100 - i}`,
        time: `${i + 1} mins ago`,
        user: i % 2 === 0 ? 'AlgoMaster99' : 'CodeRunner',
        problem: '1001. A+B Problem',
        language: 'C++17',
        performance: { time: '12 ms', memory: '4.2 MB' },
      })),
    [],
  );

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const { totalPages, currentItems, indexOfFirstItem, indexOfLastItem, totalItems, currentPage } =
    usePagination(submissions, page, itemsPerPage);

  // safePage 보정된 currentPage가 훅에서 나와서 page state도 맞춰주고 싶으면 여기서 동기화 가능
  // 다만 지금은 submissions 길이 고정이라 생략해도 무방

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="px-4 py-6 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">제출 현황</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          해당 문제에 대한 제출 목록은 추후 API 연동 후 표시됩니다
        </p>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700">
        <SubmissionTable submissions={currentItems} />

        <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <p className="text-sm text-slate-700 dark:text-slate-400">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLastItem, totalItems)}</span> of{' '}
              <span className="font-medium">{totalItems}</span> results
            </p>

            <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setPage} />
          </div>
        </div>
      </div>
    </section>
  );
}
