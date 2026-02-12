import { useNavigate } from 'react-router-dom';
import { Submission } from './SubmissionTable';

interface SubmissionRowProps {
  data: Submission;
}

const SubmissionRow = ({ data }: SubmissionRowProps) => {
  const navigate = useNavigate();
  const goTo = (path: string) => () => navigate(path);

  return (
    <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
      {/* 제출번호 */}
      <td className="whitespace-nowrap px-6 py-4 text-sm">
        <button
          type="button"
          onClick={goTo(`/submission/${data.id}`)}
          className="inline-block cursor-pointer font-medium text-blue-600 hover:text-blue-500 hover:underline"
        >
          {data.id}
        </button>
        <div className="text-xs text-slate-400">{data.time}</div>
      </td>

      {/* 유저 */}
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium dark:text-white">
        <button
          type="button"
          onClick={goTo(`/profile/${data.user}`)}
          className="block max-w-[180px] cursor-pointer truncate text-left hover:text-blue-600 hover:underline dark:hover:text-blue-400"
          title={data.user}
        >
          {data.user}
        </button>
      </td>

      {/* 문제 */}
      <td className="px-6 py-4">
        <div
          className="max-w-full truncate text-sm font-medium dark:text-white"
          title={data.problem}
        >
          {data.problem}
        </div>
      </td>

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
