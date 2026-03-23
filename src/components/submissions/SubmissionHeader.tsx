import type { SubmissionTableMode } from '../../types/submissions.ui.type';

interface SubmissionHeaderProps {
  mode?: SubmissionTableMode;
}

export default function SubmissionHeader({ mode = 'problem' }: SubmissionHeaderProps) {
  return (
    <thead className="border-b border-slate-200 bg-slate-50/90 dark:border-slate-700 dark:bg-slate-800/80">
      <tr>
        <th className="py-3 pl-20 pr-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
          ID / 날짜
        </th>

        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
          사용자
        </th>

        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
          {mode === 'platform' ? '플랫폼' : '문제'}
        </th>

        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
          언어
        </th>

        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
          실행시간
        </th>
      </tr>
    </thead>
  );
}
