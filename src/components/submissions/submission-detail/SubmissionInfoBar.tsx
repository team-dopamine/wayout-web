import type { SubmissionDetailResponse } from '@/apis/submissions/submissions.type';
import { formatSubmissionDate } from '@/utils/formatSubmissionDate';

interface SubmissionInfoBarProps {
  data: SubmissionDetailResponse;
}

export default function SubmissionInfoBar({ data }: SubmissionInfoBarProps) {
  const formattedDate = formatSubmissionDate(data.createdAt);
  const executionTime = Number(data.executionTime);
  const safeExecutionTime = Number.isFinite(executionTime) ? executionTime.toFixed(1) : '0.0';

  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-xl border border-slate-200 bg-white px-6 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* 플랫폼 */}
      <div className="flex items-center space-x-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-slate-400 dark:text-slate-500">
            플랫폼
          </span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {data.platform}
          </span>
        </div>
      </div>

      <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

      {/* 실행시간 */}
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-slate-400 dark:text-slate-500">
          실행시간
        </span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {safeExecutionTime} ms
        </span>
      </div>

      <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

      {/* 생성된 반례 개수 */}
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-slate-400 dark:text-slate-500">
          생성된 반례 개수
        </span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {data.totalTestcaseCount ?? 0}
        </span>
      </div>

      <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

      {/* 찾은 반례 개수 */}
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-slate-400 dark:text-slate-500">
          찾은 반례 개수
        </span>
        <span className="text-sm font-semibold text-red-500">{data.counterExampleCount ?? 0}</span>
      </div>

      {/* 제출시간 (우측 정렬) */}
      <div className="ml-auto flex flex-col items-end">
        <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-slate-400 dark:text-slate-500">
          제출시간
        </span>
        <span className="text-xs italic text-slate-400 dark:text-slate-500">{formattedDate}</span>
      </div>
    </div>
  );
}
