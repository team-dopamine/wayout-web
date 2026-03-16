import { Problem } from '@/apis/problems/problems.type';
import { Link } from 'react-router-dom';

type Props = {
  problem: Problem;
};

export default function ProblemRow({ problem }: Props) {
  return (
    <tr className="border-b border-gray-100 bg-white transition-colors hover:bg-gray-50">
      <td className="whitespace-nowrap px-6 py-6 text-sm font-medium text-gray-500">
        <Link
          to={`/problems/${problem.platform}/${problem.problemNo}`}
          className="transition-colors hover:text-blue-600"
        >
          {problem.problemNo}
        </Link>
      </td>

      <td className="px-6 py-6">
        <Link
          to={`/problems/${problem.platform}/${problem.problemNo}`}
          className="block text-base font-normal text-gray-900 transition-colors hover:text-blue-600"
        >
          {problem.title}
        </Link>
      </td>

      <td className="whitespace-nowrap px-6 py-6 text-sm text-gray-600">
        {problem.totalSubmissions?.toLocaleString() ?? '-'}
      </td>

      <td className="whitespace-nowrap px-6 py-6 text-sm text-gray-600">
        {problem.foundSubmissions?.toLocaleString() ?? '-'}
      </td>
    </tr>
  );
}
