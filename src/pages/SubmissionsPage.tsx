import { useEffect, useState } from 'react';
import SubmissionTable from '@/components/submissions/SubmissionTable';
import Pagination from '@/components/common/Pagination';
import { getSubmissions } from '@/apis/submissions/submissions';
import type { SubmissionTableItem } from '@/types/submissions.ui.type';
import { mapSubmissionToTableItem } from '@/utils/submission.mapper';

export default function SubmissionsPage() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const [submissions, setSubmissions] = useState<SubmissionTableItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    let ignore = false;

    async function fetchSubmissions() {
      try {
        setIsLoading(true);

        const data = await getSubmissions(page - 1, itemsPerPage);

        if (ignore) return;

        setSubmissions(data.content.map(mapSubmissionToTableItem));
        setTotalItems(data.totalElements);
      } catch (error) {
        if (ignore) return;

        console.error(error);
        setSubmissions([]);
        setTotalItems(0);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchSubmissions();

    return () => {
      ignore = true;
    };
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">제출 현황</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            사용자들의 제출 기록을 실시간으로 확인할 수 있습니다.
          </p>
        </div>

        <section className="mx-auto mt-6 w-full max-w-[1000px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="border-t border-slate-200 dark:border-slate-700">
            {isLoading ? (
              <div className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                제출 목록을 불러오는 중입니다...
              </div>
            ) : (
              <>
                <SubmissionTable submissions={submissions} mode="problem" />

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
      </main>
    </div>
  );
}
