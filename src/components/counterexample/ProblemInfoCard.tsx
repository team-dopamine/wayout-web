/**반례 찾기 - 문제 정보 카드 */
type Props = {
  problemId: string;
  title: string;
  badgeText?: string;
};

export default function ProblemInfoCard({ problemId, title, badgeText }: Props) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h1 className="flex items-center text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        <span className="mr-3 font-mono text-lg text-blue-500">{problemId}</span>
        {title}
      </h1>

      {badgeText ? (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
          {badgeText}
        </span>
      ) : null}
    </div>
  );
}
