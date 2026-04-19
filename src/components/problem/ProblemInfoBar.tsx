import { ProblemDetail } from '@/apis/problems/problems.type';

interface ProblemInfoBarProps {
  data: ProblemDetail;
}

export default function ProblemInfoBar({ data }: ProblemInfoBarProps) {
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

      {/* 총 제출 수 */}
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-slate-400 dark:text-slate-500">
          해당 문제에 대한 제출 수
        </span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {data.totalSubmissions ?? 0}
        </span>
      </div>

      <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

      {/* 찾은 반례 수 */}
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-slate-400 dark:text-slate-500">
          해당 문제에 대해 찾은 반례 수
        </span>
        <span className="text-sm font-semibold text-red-500">{data.foundSubmissions ?? 0}</span>
      </div>
    </div>
  );
}
