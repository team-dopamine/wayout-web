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
            className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-gray-50"
          >
            <span className="text-sm text-gray-500">{problem.problemNo}</span>
            <span className="text-sm text-gray-800">{problem.title}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
