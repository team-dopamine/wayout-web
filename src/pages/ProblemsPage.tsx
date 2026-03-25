import { useEffect, useState } from 'react';
import useProblemSearch from '@/hooks/useProblemSearch';
import { getProblem } from '@/apis/problems/problems';
import type { Problem } from '@/apis/problems/problems.type';
import ProblemTable from '@/components/problems/ProblemTable';
import ProblemSearchBar from '@/components/problems/ProblemSearchBar';

const PAGE_SIZE = 8;

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // API 서버 기준 페이지 (0부터 시작)
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const {
    searchKeyword,
    searchResults,
    isSearching,
    handleChangeKeyword,
    handleSelectSearchResult,
    handleResetKeyword,
  } = useProblemSearch();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setIsLoading(true);

        const data = await getProblem(page, PAGE_SIZE);

        setProblems(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('문제 목록 조회 실패:', error);
        setProblems([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblems();
  }, [page]);

  const handleReset = () => {
    handleResetKeyword();
    setPage(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">문제 목록</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            풀고 싶은 문제를 검색하고 도전해 보세요.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800/50">
          <div className="border-b border-slate-100 p-6 dark:border-slate-800">
            <ProblemSearchBar
              searchKeyword={searchKeyword}
              isSearching={isSearching}
              searchResults={searchResults}
              onChangeKeyword={handleChangeKeyword}
              onReset={handleReset}
              onSelectSearchResult={handleSelectSearchResult}
            />
          </div>

          <ProblemTable
            isLoading={isLoading}
            problems={problems}
            totalPages={totalPages}
            currentPage={page + 1}
            onPageChange={(p) => setPage(p - 1)}
          />
        </div>
      </main>
    </div>
  );
}
