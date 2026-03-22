export const TABS = ['all', 'correct', 'incorrect'] as const;
export type TabKey = (typeof TABS)[number];

export const CONTRIBUTION_TYPES = ['Correct Code', 'Incorrect Code', 'Generator'] as const;
export type ContributionType = (typeof CONTRIBUTION_TYPES)[number];

export type Contribution = {
  codeId: string;
  problemName: string;
  language: string;
  type: ContributionType;
  submittedAt: string;
};

const typePillClass: Record<ContributionType, string> = {
  'Correct Code': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Incorrect Code': 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
  Generator: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
};

const TAB_LABEL: Record<TabKey, string> = {
  all: '사용자의 반례 찾기 기록',
  correct: '사용자가 기여한 정답',
  incorrect: '사용자가 기여한 오답 코드',
};

type Props = {
  activeTab: TabKey;
  setActiveTab: (v: TabKey) => void;
  contributions: Contribution[];
};

export default function ContributionsSection({ activeTab, setActiveTab, contributions }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-800/70 dark:shadow-none">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-white/70 p-6 dark:border-slate-700 dark:bg-slate-800/20">
        {TABS.map((key) => {
          const isActive = activeTab === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={
                isActive
                  ? 'rounded-full border border-blue-600 bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm'
                  : 'rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100'
              }
            >
              {TAB_LABEL[key]}
            </button>
          );
        })}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="border-b border-slate-200 bg-slate-50/90 dark:border-slate-700 dark:bg-slate-800/80">
            <tr>
              {['ID', '문제', '언어', '상태', '제출 시각'].map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {contributions.map((row) => (
              <tr key={row.codeId} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50">
                <td className="text-primary px-6 py-4 text-sm font-medium">{row.codeId}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">
                  {row.problemName}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {row.language}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={[
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
                      typePillClass[row.type],
                    ].join(' ')}
                  >
                    {row.type}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-sm text-slate-600 dark:text-slate-400">
                  {row.submittedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
