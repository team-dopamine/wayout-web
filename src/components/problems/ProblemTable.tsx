import ProblemHeader from './ProblemHeader';
import ProblemRow from './ProblemRow';
import type { Problem } from '@/apis/problems/problems.type';

type Props = {
  problems: Problem[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export default function ProblemTable({
  problems,
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  onPageChange,
}: Props) {
  const getVisiblePages = (): (number | '...')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index);
    }

    const pages: (number | '...')[] = [];
    const firstPage = 0;
    const lastPage = totalPages - 1;

    pages.push(firstPage);

    if (currentPage > 2) {
      pages.push('...');
    }

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(lastPage - 1, currentPage + 1);

    for (let page = startPage; page <= endPage; page += 1) {
      pages.push(page);
    }

    if (currentPage < lastPage - 2) {
      pages.push('...');
    }

    pages.push(lastPage);

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed">
          <ProblemHeader />
          <tbody>
            {problems.length > 0 ? (
              problems.map((problem) => <ProblemRow key={problem.problemId} problem={problem} />)
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                  표시할 문제가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end border-t border-gray-200 px-6 py-4">
        <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="flex h-10 w-10 items-center justify-center text-gray-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300"
            aria-label="Previous page"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>

          {visiblePages.map((page, index) =>
            page === '...' ? (
              <span
                key={`ellipsis-${index}`}
                className="border-l border-gray-200 px-4 py-2 text-gray-400"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`border-l border-gray-200 px-4 py-2 transition-colors ${
                  currentPage === page
                    ? 'bg-blue-50 font-medium text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page + 1}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={totalPages === 0 || currentPage === totalPages - 1}
            className="flex h-10 w-10 items-center justify-center border-l border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300"
            aria-label="Next page"
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
