import { Link } from 'react-router-dom';
import { Submission } from './SubmissionTable';

interface SubmissionRowProps {
  data: Submission;
}

const SubmissionRow = ({ data }: SubmissionRowProps) => {
  return (
    <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
      {/* 제출번호 */}
      {/* 제출번호 */}
      <td className="whitespace-nowrap py-4 pl-10 pr-6 text-sm">
        <Link
          to={`/submission/${data.id}`}
          className="inline-block font-medium text-blue-600 hover:text-blue-500 hover:underline"
        >
          {data.id}
        </Link>
        <div className="text-xs text-slate-400">{data.time}</div>
      </td>

      {/* 유저 */}
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium dark:text-white">
        <Link
          to={`/profile/${data.user}`}
          className="block max-w-[180px] truncate text-left hover:text-blue-600 hover:underline dark:hover:text-blue-400"
          title={data.user}
        >
          {data.user}
        </Link>
      </td>

      {/* 문제 */}

      {/* 언어 */}
      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
        <span className="block max-w-[120px] truncate" title={data.language}>
          {data.language}
        </span>
      </td>

      {/* 성능 */}
      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex flex-col">
          <span>{data.performance.time}</span>
          <span className="text-xs text-slate-400">{data.performance.memory}</span>
        </div>
      </td>
    </tr>
  );
};

export default SubmissionRow;
