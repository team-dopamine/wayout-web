import { useNavigate } from 'react-router-dom';
import type { ProblemSearch } from '@/apis/problems/problems.type';

type Props = {
  results: ProblemSearch[];
  onSelect: (problem: ProblemSearch) => void;
};

export default function ProblemSearchList({ results, onSelect }: Props) {
  const navigate = useNavigate();

  if (results.length === 0) return null;

  const handleClick = (problem: ProblemSearch) => {
    onSelect(problem);
    navigate(`/problems/${problem.platform}/${problem.problemNo}`);
  };

  return (
    <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
      {results.map((result) => (
        <li
          key={result.problemId}
          onClick={() => handleClick(result)}
          className="cursor-pointer border-b border-gray-100 px-4 py-3 last:border-b-0 hover:bg-gray-50"
        >
          <div className="text-sm font-medium text-gray-900">
            {result.problemNo}. {result.title}
          </div>

          {'platform' in result && result.platform ? (
            <div className="mt-1 text-xs text-gray-500">{result.platform}</div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
