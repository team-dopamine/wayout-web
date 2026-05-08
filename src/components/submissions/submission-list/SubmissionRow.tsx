import { Link } from 'react-router-dom';
import type { SubmissionTableItem, SubmissionTableMode } from '@/types/submissions.ui.type';

interface SubmissionRowProps {
  data: SubmissionTableItem;
  mode?: SubmissionTableMode;
}

export default function SubmissionRow({ data, mode = 'problem' }: SubmissionRowProps) {
  const summaryLabel = mode === 'platform' ? data.platform : data.problem;
  const isLinkDisabled = !data.open;
  const executionTimeLabel = data.executionTime;

  const summaryClassName =
    mode === 'platform'
      ? 'text-sm font-medium text-slate-500 dark:text-slate-400'
      : 'text-sm font-semibold text-slate-900 dark:text-white';

  return (
    <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
      <td className="py-5 pl-20 pr-4 align-middle">
        {isLinkDisabled ? (
          // 비활성 상태
          <span className="block text-sm font-semibold text-slate-400 dark:text-slate-500">
            {data.id}
          </span>
        ) : (
          // 활성 상태
          <Link
            to={`/submission/${data.platform}/${data.problemNo}?id=${data.id}`}
            className="block text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
            state={{ title: data.problem }}
          >
            {data.id}
          </Link>
        )}

        {/* 날짜 레이블 */}
        <div className="mt-1 text-sm text-slate-400 dark:text-slate-500">{data.dateLabel}</div>
      </td>

      {/* 사용자 */}
      <td className="px-4 py-5 align-middle text-sm text-slate-500 dark:text-slate-400">
        {data.user}
      </td>

      {/* 문제 or 플랫폼 */}
      <td className="px-4 py-5 align-middle">
        <div className={`truncate ${summaryClassName}`} title={summaryLabel}>
          {summaryLabel}
        </div>
      </td>

      {/* 언어 */}
      <td className="px-4 py-5 align-middle text-sm text-slate-500 dark:text-slate-400">
        {data.language}
      </td>

      {/* 실행시간 */}
      <td className="px-4 py-5 align-middle">
        <div className="flex flex-col text-sm text-slate-500 dark:text-slate-400">
          <span>{executionTimeLabel}</span>
        </div>
      </td>
    </tr>
  );
}
