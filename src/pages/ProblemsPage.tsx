import { useMemo, useState } from 'react';
import ProblemTable from '../components/problems/ProblemTable';
import { MOCK_PROBLEMS } from '@/components/problems/problems.mock';

export default function ProblemsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // 검색 필터링 로직
  const filteredRows = useMemo(() => {
    return MOCK_PROBLEMS.filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm),
    );
  }, [searchTerm]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <main className="relative flex flex-grow flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-6">
          {/* 타이틀 영역 */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">문제 둘러보기</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              다양한 알고리즘 문제를 해결하고 실력을 쌓아보세요.
            </p>
          </div>

          {/* 메인 카드 영역 */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {/* 검색바 섹션 */}
            <div className="flex justify-center border-b border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="relative w-full max-w-2xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="문제 제목 또는 ID로 검색하세요..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 leading-5 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 sm:text-sm"
                />
              </div>
            </div>

            {/* 테이블 컴포넌트 호출 */}
            <ProblemTable problems={filteredRows} />

            {/* 하단 푸터 영역 */}
            <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                총{' '}
                <span className="font-medium text-slate-900 dark:text-white">
                  {filteredRows.length}
                </span>
                개의 결과
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
