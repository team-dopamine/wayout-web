const HEADERS = ['ID / Time', '사용자', '문제', '언어', '수행'];

const SubmissionHeader = () => (
  <thead className="bg-slate-50/50 dark:bg-slate-800/50">
    <tr>
      {HEADERS.map((label) => (
        <th
          key={label}
          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400"
        >
          {label}
        </th>
      ))}
      <th className="px-6 py-3" />
    </tr>
  </thead>
);

export default SubmissionHeader;
