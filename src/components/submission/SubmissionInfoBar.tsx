import type { MySolutionDetailResponse } from '@/apis/solutions/solutions.type';
import { formatSubmissionDate } from '@/utils/formatSubmissionDate';

interface SubmissionInfoBarProps {
  data: MySolutionDetailResponse;
}

function formatLanguage(language: string) {
  const normalized = language.toUpperCase();
  if (normalized === 'JAVA') return 'Java';
  if (normalized === 'CPP' || normalized === 'C++') return 'C++';
  if (normalized === 'PYTHON') return 'Python';
  return language;
}

export default function SubmissionInfoBar({ data }: SubmissionInfoBarProps) {
  const formattedDate = formatSubmissionDate(data.contributionDate);

  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-xl border border-slate-200 bg-white px-6 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-slate-400 dark:text-slate-500">
          ID
        </span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{data.id}</span>
      </div>

      <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-slate-400 dark:text-slate-500">
          Problem ID
        </span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {data.problemId}
        </span>
      </div>

      <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-slate-400 dark:text-slate-500">
          문제 번호
        </span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {data.problemNo}
        </span>
      </div>

      <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-slate-400 dark:text-slate-500">
          제목
        </span>
        <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
          {data.title}
        </span>
      </div>

      <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-slate-400 dark:text-slate-500">
          언어
        </span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {formatLanguage(data.language)}
        </span>
      </div>

      <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

      <div className="flex flex-col">
        <span
          className={`mt-1 inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            data.isOpen
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-300'
              : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200'
          }`}
        >
          {data.isOpen ? '공개' : '비공개'}
        </span>
      </div>

      <div className="ml-auto flex flex-col items-end">
        <span className="text-xs italic text-slate-400 dark:text-slate-500">{formattedDate}</span>
      </div>
    </div>
  );
}
