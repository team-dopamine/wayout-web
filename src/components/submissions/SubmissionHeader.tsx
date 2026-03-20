const HEADERS = ['ID / 날짜', '사용자', '언어', '실행시간'];

const SubmissionHeader = () => (
  <thead className="bg-slate-50/50 dark:bg-slate-800/50">
    <tr>
      {HEADERS.map((label, idx) => (
        <th
          key={label}
          className={`py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 ${
            idx === 0 ? 'pl-10 pr-6' : 'px-6'
          }`}
        >
          {label}
        </th>
      ))}
      <th className="px-6 py-3" />
    </tr>
  </thead>
);

export default SubmissionHeader;
