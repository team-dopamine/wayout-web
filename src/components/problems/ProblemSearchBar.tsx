import type { ReactNode } from 'react';
import ProblemSearchList from '@/components/problems/ProblemSearchList';
import type { ProblemSearch } from '@/apis/problems/problems.type';

interface ProblemSearchBarProps {
  searchKeyword: string;
  isSearching: boolean;
  searchResults: ProblemSearch[];
  onChangeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  onSelectSearchResult: (selectedProblem: ProblemSearch) => void;
}

export default function ProblemSearchBar({
  searchKeyword,
  isSearching,
  searchResults,
  onChangeKeyword,
  onReset,
  onSelectSearchResult,
}: ProblemSearchBarProps) {
  const hasKeyword = searchKeyword.trim().length > 0;
  const hasResults = searchResults.length > 0;

  const dropdownClassName =
    'absolute z-30 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800';

  let dropdownContent: ReactNode = null;

  if (hasKeyword) {
    if (isSearching) {
      dropdownContent = (
        <div className="flex items-center gap-2 px-4 py-4 text-sm text-slate-500">
          <span className="material-symbols-outlined animate-spin text-base">
            progress_activity
          </span>
          검색 중...
        </div>
      );
    } else if (hasResults) {
      dropdownContent = (
        <ProblemSearchList results={searchResults} onSelect={onSelectSearchResult} />
      );
    } else {
      dropdownContent = (
        <div className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">
          검색 결과가 없습니다.
        </div>
      );
    }
  }

  return (
    <div className="relative w-full">
      <div className="group relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 transition-colors group-focus-within:text-blue-500">
          search
        </span>

        <input
          type="text"
          value={searchKeyword}
          onChange={onChangeKeyword}
          placeholder="문제 제목 또는 번호를 검색하세요"
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-12 pr-16 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200 dark:focus:border-blue-400 dark:focus:bg-slate-900"
        />

        {hasKeyword && (
          <button
            type="button"
            onClick={onReset}
            className="absolute inset-y-0 right-4 flex items-center text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            초기화
          </button>
        )}
      </div>

      {hasKeyword && dropdownContent && <div className={dropdownClassName}>{dropdownContent}</div>}
    </div>
  );
}
