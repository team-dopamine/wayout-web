import { Link } from 'react-router-dom';
import type { Problem } from '@/apis/problems/problems.type';

type Props = {
  problem: Problem;
};

export default function ProblemRow({ problem }: Props) {
  const platform = problem.platform?.toLowerCase();
  const problemPath = `/problems/${platform}/${problem.problemNo}?id=${problem.problemId}`;
  // 제목 길이에 따른 정렬 결정 (20자 이하면 중앙, 넘으면 왼쪽)
  const isShortTitle = problem.title.length <= 20;
  const titleAlignment = isShortTitle ? 'text-center' : 'text-left';
  const centerTdStyle = 'whitespace-nowrap px-6 py-6 align-middle text-center';

  return (
    <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
      <td className={centerTdStyle}>
        <Link
          to={problemPath}
          state={{ problemNo: problem.problemNo, problemTitle: problem.title }}
          className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
        >
          {problem.problemNo}
        </Link>
      </td>
      {/* 제목: 길이에 따라 동적 정렬 */}
      <td className={`px-6 py-6 align-middle ${titleAlignment}`}>
        <Link
          to={problemPath}
          className={`inline-block text-base font-medium text-slate-900 transition-colors hover:text-blue-600 hover:underline dark:text-white dark:hover:text-blue-400 ${
            isShortTitle ? 'max-w-xs text-center' : 'text-left'
          }`}
          state={{ problemNo: problem.problemNo, problemTitle: problem.title }}
        >
          {problem.title}
        </Link>
      </td>

      <td className={`${centerTdStyle} text-sm text-slate-500 dark:text-slate-400`}>
        <span className="font-medium">{problem.totalSubmissions?.toLocaleString() ?? '-'}</span>
      </td>

      <td className={`${centerTdStyle} text-sm text-slate-500 dark:text-slate-400`}>
        <span className="font-medium text-slate-700 dark:text-slate-300">
          {problem.foundSubmissions?.toLocaleString() ?? '-'}
        </span>
      </td>
    </tr>
  );
}
