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
      <td className="whitespace-nowrap px-6 py-4 text-sm">
        <div
          onClick={goTo(`/submission/${data.id}`)}
          className="w-fit cursor-pointer font-medium text-blue-600 hover:text-blue-500 hover:underline"
        >
          {data.id}
        </div>
        <div className="text-xs text-slate-400">{data.time}</div>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium dark:text-white">
        <span
          onClick={goTo(`/profile/${data.user}`)}
          className="cursor-pointer hover:text-blue-600 hover:underline dark:hover:text-blue-400"
        >
          {data.user}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text-sm font-medium dark:text-white">{data.problem}</div>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
        {data.language}
      </td>
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
