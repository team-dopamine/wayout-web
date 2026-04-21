import type { ReactNode } from 'react';
import useProblemSearch from '@/hooks/useProblemSearch';

export default function MainSearchBar() {
  const {
    searchKeyword,
    searchResults,
    isSearching,
    handleChangeKeyword,
    handleSelectSearchResult,
  } = useProblemSearch();

  const hasKeyword = searchKeyword.trim().length > 0;
  const hasResults = searchResults.length > 0;
  const dropdownClassName =
    'absolute z-20 mt-2 w-full rounded-lg border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-900';

  let dropdownContent: ReactNode = null;

  if (hasKeyword) {
    if (isSearching) {
      dropdownContent = (
        <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">검색 중...</div>
      );
    } else if (hasResults) {
      dropdownContent = (
        <ul>
          {searchResults.map((problem) => (
            <li key={problem.problemId}>
              <button
                type="button"
                onClick={() => handleSelectSearchResult(problem)}
                className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {problem.problemNo}
                </span>
                <span className="ml-2 text-sm text-slate-900 dark:text-white">{problem.title}</span>
              </button>
            </li>
          ))}
        </ul>
      );
    } else {
      dropdownContent = (
        <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
          검색 결과가 없습니다.
        </div>
      );
    }
  }

  return (
    <div className="group relative mx-auto w-full max-w-2xl">
      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-25 blur transition duration-200 group-hover:opacity-50" />

      <div className="relative flex items-center overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="pl-4 text-slate-400 dark:text-slate-500">
          <span className="material-symbols-outlined">search</span>
        </div>

        <input
          value={searchKeyword}
          onChange={handleChangeKeyword}
          className="w-full border-none bg-transparent px-4 py-4 text-lg text-slate-900 placeholder-slate-400 outline-none focus:ring-0 dark:text-white dark:placeholder-slate-500"
          placeholder="문제 제목 또는 번호를 검색하세요"
          type="text"
        />
      </div>

      {hasKeyword && dropdownContent && <div className={dropdownClassName}>{dropdownContent}</div>}
    </div>
  );
}
