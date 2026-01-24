import { Link } from 'react-router-dom';
import { Problem } from './ProblemTable';

const ProblemRow = ({ problem }: { problem: Problem }) => (
  <tr className="group transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/40">
    {/* ID 클릭 시 이동 */}
    <td className="whitespace-nowrap px-6 py-4 font-mono text-sm">
      <Link
        to={`/problems/${problem.id}`}
        className="text-gray-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
      >
        {problem.id}
      </Link>
    </td>

    {/* 제목 클릭 시 이동 */}
    <td className="whitespace-nowrap px-6 py-4">
      <Link
        to={`/problems/${problem.id}`}
        className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400"
      >
        {problem.title}
      </Link>
    </td>

    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
      <div className="flex items-center">{problem.createdBy.name}</div>
    </td>
    <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-gray-500 dark:text-slate-400">
      {problem.totalSubmissions}
    </td>
    <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-gray-500 dark:text-slate-400">
      {problem.breaksFound}
    </td>
  </tr>
);

export default ProblemRow;
