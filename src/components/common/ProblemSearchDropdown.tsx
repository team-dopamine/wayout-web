import type { ProblemSearch } from '@/apis/problems/problems.type';

interface ProblemSearchDropdownProps {
  results: ProblemSearch[];
  isLoading: boolean;
  isOpen: boolean;
  onSelect: (problem: ProblemSearch) => void;
  className?: string;
}

export default function ProblemSearchDropdown({
  results,
  isLoading,
  isOpen,
  onSelect,
  className = '',
}: ProblemSearchDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className={className}>
      {isLoading ? (
        <div className="px-4 py-3 text-sm text-gray-500">검색 중...</div>
      ) : results.length === 0 ? (
        <div className="px-4 py-3 text-sm text-gray-500">검색 결과가 없습니다.</div>
      ) : (
        <ul>
          {results.map((problem) => (
            <li key={problem.problemId}>
              <button
                type="button"
                onClick={() => onSelect(problem)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50"
              >
                {problem.problemNo}. {problem.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
