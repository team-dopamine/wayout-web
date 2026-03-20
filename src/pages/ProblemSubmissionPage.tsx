import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SubmissionTable, { Submission } from '@/components/submissions/SubmissionTable';
import Pagination from '@/components/common/Pagination';
import { getProblemSubmissionsApi } from '@/apis/submissions/getProblemSubmissionsApi';
import { getTimeAgo } from '@/utils/time';

/** 각 문제에 대한 사용자 제출 현황 페이지 */
export default function ProblemSubmissionsPage() {
  const { problemId } = useParams<{ problemId: string }>();

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (!problemId) return;

    async function fetchSubmissions() {
      try {
        const data = await getProblemSubmissionsApi({
          problemId: Number(problemId),
          page: page - 1,
          size: itemsPerPage,
        });
        const mapped: Submission[] = data.content.map((item) => ({
          id: String(item.id),
          time: getTimeAgo(item.createdAt),
          user: item.nickname,
          language: item.language,
          performance: {
            time: `${item.executionTime.toFixed(1)} ms`,
            memory: '-',
          },
        }));

        setSubmissions(mapped);
        setTotalItems(data.totalElements);
      } catch (error) {
        console.error(error);
        setSubmissions([]);
        setTotalItems(0);
      }
    }

    fetchSubmissions();
  }, [page, problemId]);

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="px-4 py-6 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">제출 현황</h2>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700">
        <SubmissionTable submissions={submissions} />

        <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <p className="text-sm text-slate-700 dark:text-slate-400">
              Showing{' '}
              <span className="font-medium">
                {totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1}
              </span>{' '}
              to <span className="font-medium">{Math.min(page * itemsPerPage, totalItems)}</span> of{' '}
              <span className="font-medium">{totalItems}</span> results
            </p>

            <Pagination
              currentPage={page}
              totalPages={Math.max(totalPages, 1)}
              onChange={setPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
