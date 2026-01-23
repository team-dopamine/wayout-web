const HEADERS = ['번호', '제목', '사용자', '총 반례 찾기 횟수', '반례 찾은 횟수'];

const ProblemHeader = () => (
  <thead className="bg-gray-50 dark:bg-slate-800/80">
    <tr>
      {HEADERS.map((label) => (
        <th
          key={label}
          className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400"
        >
          {label}
        </th>
      ))}
    </tr>
  </thead>
);

export default ProblemHeader;
