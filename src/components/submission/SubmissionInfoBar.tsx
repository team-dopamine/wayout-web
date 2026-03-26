import type { SubmissionDetailResponse } from '@/apis/submissions/submissions.type';

interface SubmissionInfoBarProps {
  data: SubmissionDetailResponse;
}

export default function SubmissionInfoBar({ data }: SubmissionInfoBarProps) {
  // 날짜 포맷팅
  const formattedDate = new Date(data.createdAt).toLocaleString();

  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-xl border border-slate-200 bg-white px-6 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* 문제번호 & 플랫폼 */}
      <div className="flex items-center space-x-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-slate-400 dark:text-slate-500">
            문제번호
          </span>
          <span className="font-mono text-sm font-medium text-slate-700 dark:text-slate-200">
            {data.problemNo}
          </span>
        </div>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

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
          {Number(data.executionTime).toFixed(1)} ms
        </span>
      </div>

      <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

      {/* [추가] 총 제출 수 */}
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-slate-400 dark:text-slate-500">
          총 제출
        </span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {data.totalSubmissions ?? 0}
        </span>
      </div>

      <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

      {/* [추가] 찾은 반례 수 */}
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-slate-400 dark:text-slate-500">
          찾은 반례
        </span>
        <span className="text-sm font-semibold text-red-500">{data.foundSubmissions ?? 0}</span>
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
