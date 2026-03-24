import ProblemHeader from './ProblemHeader';
import ProblemRow from './ProblemRow';
import type { Problem } from '@/apis/problems/problems.type';
import Pagination from '@/components/common/Pagination';

type Props = {
  isLoading: boolean;
  problems: Problem[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function ProblemTable({
  isLoading,
  problems,
  totalPages,
  currentPage,
  onPageChange,
}: Props) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={4} className="py-20 text-center text-sm text-slate-500">
            <span className="material-symbols-outlined animate-spin text-4xl text-blue-500">
              progress_activity
            </span>
          </td>
        </tr>
      );
    }

    if (problems.length === 0) {
      return (
        <tr>
          <td colSpan={4}>
            <div className="flex min-h-[400px] w-full flex-col items-center justify-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800/50">
                <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">
                  upcoming
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">등록된 문제가 없습니다.</p>
            </div>
          </td>
        </tr>
      );
    }
    return problems.map((problem) => <ProblemRow key={problem.problemId} problem={problem} />);
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed divide-y divide-slate-200 dark:divide-slate-700">
          <ProblemHeader />
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-700/50 dark:bg-transparent">
            {renderContent()}
          </tbody>
        </table>
      </div>

      {!isLoading && totalPages > 0 && (
        <div className="border-t border-slate-200 bg-slate-50/50 px-4 py-4 dark:border-slate-700 dark:bg-slate-800/50 sm:px-6">
          <div className="flex items-center justify-end">
            <Pagination currentPage={currentPage} totalPages={totalPages} onChange={onPageChange} />
          </div>
        </div>
      )}
    </div>
  );
}
