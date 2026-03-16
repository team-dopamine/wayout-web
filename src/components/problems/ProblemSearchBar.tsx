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
    'absolute z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500 shadow-md';

  let dropdownContent = null;

  if (hasKeyword) {
    if (isSearching) {
      dropdownContent = <div className={dropdownClassName}>검색 중...</div>;
    } else if (hasResults) {
      dropdownContent = (
        <ProblemSearchList results={searchResults} onSelect={onSelectSearchResult} />
      );
    } else {
      dropdownContent = <div className={dropdownClassName}>검색 결과가 없습니다.</div>;
    }
  }

  return (
    <div className="relative mx-auto mt-8 w-full max-w-5xl px-4">
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400">
          search
        </span>

        <input
          value={searchKeyword}
          onChange={onChangeKeyword}
          placeholder="문제 제목 또는 번호를 검색하세요"
          className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-14 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-gray-300"
        />

        {hasKeyword && (
          <button
            type="button"
            onClick={onReset}
            className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-400 hover:text-gray-600"
          >
            초기화
          </button>
        )}
      </div>

      {hasKeyword && <div className="relative">{dropdownContent}</div>}
    </div>
  );
}
