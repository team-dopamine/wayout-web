import { useEffect, useMemo, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import SubmissionTable from '@/components/submissions/SubmissionTable';
import Pagination from '@/components/common/Pagination';
import { getProblemSubmissions } from '@/apis/submissions/submissions';
import type { SubmissionTableItem } from '@/types/submissions.ui.type';
import { mapSubmissionToTableItem } from '@/utils/submission.mapper';

const ITEMS_PER_PAGE = 8;

export default function ProblemSubmissionsPage() {
  const [searchParams] = useSearchParams();
  const queryProblemId = searchParams.get('id');

  const numericProblemId = useMemo(() => {
    const parsed = Number(queryProblemId);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
  }, [queryProblemId]);

  const [page, setPage] = useState(1);
  const [submissions, setSubmissions] = useState<SubmissionTableItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  useEffect(() => {
    if (!numericProblemId) return;

    let isIgnore = false;

    async function fetchSubmissions() {
      try {
        setIsLoading(true);
        const data = await getProblemSubmissions({
          problemId: numericProblemId as number,
          page: page - 1, // 서버에서 page 기본: 0
          size: ITEMS_PER_PAGE,
        });

        if (!isIgnore) {
          setSubmissions(data.content.map(mapSubmissionToTableItem));
          setTotalItems(data.totalElements);
        }
      } catch (error) {
        console.error('문제별 제출 목록 조회 실패:', error);
        if (!isIgnore) {
          setSubmissions([]);
          setTotalItems(0);
        }
      } finally {
        if (!isIgnore) setIsLoading(false);
      }
    }

    fetchSubmissions();

    return () => {
      isIgnore = true;
    };
  }, [page, numericProblemId]);

  if (!numericProblemId) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="border-t border-slate-200 dark:border-slate-700">
        {isLoading ? (
          <div className="flex min-h-[400px] items-center justify-center text-sm text-slate-500">
            제출 목록을 불러오는 중입니다...
          </div>
        ) : (
          <>
            <SubmissionTable submissions={submissions} mode="platform" />

            <footer className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800 sm:px-6">
              <div className="flex justify-end">
                <Pagination
                  currentPage={page}
                  totalPages={Math.max(totalPages, 1)}
                  onChange={setPage}
                />
              </div>
            </footer>
          </>
        )}
      </div>
    </section>
  );
}
