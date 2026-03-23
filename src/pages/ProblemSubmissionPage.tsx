import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import SubmissionTable from '@/components/submissions/SubmissionTable';
import Pagination from '@/components/common/Pagination';
import { getProblemSubmissions } from '@/apis/submissions/submissions';
import type { SubmissionTableItem } from '@/types/submissions.ui.type';
import { mapSubmissionToTableItem } from '@/utils/submission.mapper';

/** 각 문제에 대한 사용자 제출 현황 페이지 */
export default function ProblemSubmissionsPage() {
  const { problemId } = useParams<{ problemId: string }>();

  const numericProblemId = useMemo(() => {
    if (!problemId) return null;

    const parsedProblemId = Number(problemId);
    return Number.isInteger(parsedProblemId) ? parsedProblemId : null;
  }, [problemId]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const [submissions, setSubmissions] = useState<SubmissionTableItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (numericProblemId === null) return;

    const validatedProblemId = numericProblemId;

    async function fetchSubmissions() {
      try {
        setIsLoading(true);

        const data = await getProblemSubmissions({
          problemId: validatedProblemId,
          page: page - 1,
          size: itemsPerPage,
        });

        setSubmissions(data.content.map(mapSubmissionToTableItem));
        setTotalItems(data.totalElements);
      } catch (error) {
        console.error('문제별 제출 목록 조회 실패:', error);
        setSubmissions([]);
        setTotalItems(0);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubmissions();
  }, [page, numericProblemId]);

  if (numericProblemId === null) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="border-t border-slate-200 dark:border-slate-700">
        {isLoading ? (
          <div className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
            제출 목록을 불러오는 중입니다...
          </div>
        ) : (
          <>
            <SubmissionTable submissions={submissions} mode="platform" />

            <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800 sm:px-6">
              <div className="hidden sm:flex sm:justify-end">
                <Pagination
                  currentPage={page}
                  totalPages={Math.max(totalPages, 1)}
                  onChange={setPage}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
