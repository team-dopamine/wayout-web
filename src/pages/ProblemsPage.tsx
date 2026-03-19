import { useEffect, useState } from 'react';
import ProblemTable from '@/components/problems/ProblemTable';
import ProblemSearchBar from '@/components/problems/ProblemSearchBar';
import { getProblem } from '@/apis/problems/problems';
import type { Problem } from '@/apis/problems/problems.type';
import useProblemSearch from '@/hooks/useProblemSearch';

const PAGE_SIZE = 8;

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

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
        setTotalElements(data.totalElements);
      } catch (error) {
        console.error('문제 목록 조회 실패:', error);
        setProblems([]);
        setTotalPages(0);
        setTotalElements(0);
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
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6">
      <ProblemSearchBar
        searchKeyword={searchKeyword}
        isSearching={isSearching}
        searchResults={searchResults}
        onChangeKeyword={handleChangeKeyword}
        onReset={handleReset}
        onSelectSearchResult={handleSelectSearchResult}
      />

      {isLoading ? (
        <div className="py-10 text-center text-sm text-gray-500">
          문제 목록을 불러오는 중입니다...
        </div>
      ) : (
        <ProblemTable
          problems={problems}
          currentPage={page}
          totalPages={totalPages}
          totalElements={totalElements}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
