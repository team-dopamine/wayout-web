import { Problem } from '@/apis/problems/problems.type';
import { Link } from 'react-router-dom';

const ProblemRow = ({ problems }: { problems: Problem }) => (
  <tr className="group transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/40">
    {/* ID 클릭 시 이동 */}
    <td className="whitespace-nowrap px-6 py-4 font-mono text-sm">
      <Link
        to={`/problems/${problems.problemId}`}
        className="text-gray-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
      >
        {problems.problemId}
      </Link>
    </td>

    {/* 제목 클릭 시 이동 */}
    <td className="whitespace-nowrap px-6 py-4">
      <Link
        to={`/problems/${problems.problemId}`}
        className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400"
      >
        {problems.title}
      </Link>
    </td>

    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
      <div className="flex items-center">{problems.totalSubmissions}</div>
    </td>
    <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-gray-500 dark:text-slate-400">
      {problems.foundSubmissions}
    </td>
  </tr>
);

export default ProblemRow;
