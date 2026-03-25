export default function ProblemHeader() {
  const baseThStyle =
    'px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-center';

  return (
    <thead className="border-b border-slate-200 bg-slate-50/90 dark:border-slate-700 dark:bg-slate-800/80">
      <tr>
        <th className={baseThStyle}>문제 번호</th>
        <th className={baseThStyle}>제목</th>
        <th className={baseThStyle}>총 반례 찾기 횟수</th>
        <th className={baseThStyle}>반례 찾은 횟수</th>
      </tr>
    </thead>
  );
}
