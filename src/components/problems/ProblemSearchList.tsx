import type { ProblemSearch } from '@/apis/problems/problems.type';

interface ProblemSearchListProps {
  results: ProblemSearch[];
  onSelect: (selectedProblem: ProblemSearch) => void;
}

export default function ProblemSearchList({ results, onSelect }: ProblemSearchListProps) {
  return (
    <ul className="py-2">
      {results.map((problem) => (
        <li key={problem.problemId}>
          <button
            type="button"
            onClick={() => onSelect(problem)}
            className="group flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/40"
          >
            <span className="shrink-0 text-xs font-bold text-blue-500 dark:text-blue-400">
              {problem.problemNo}
            </span>

            <span className="truncate text-sm font-medium text-slate-700 group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-400">
              {problem.title}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
