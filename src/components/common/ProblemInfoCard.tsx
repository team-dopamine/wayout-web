/** 문제 정보와 관련 기능 탭을 함께 표시하는 상단 카드 공통 컴포넌트 */
type ProblemInfoTabKey = 'find' | 'status' | 'contribute' | 'correct';

type ProblemInfoTab = {
  key: ProblemInfoTabKey;
  label: string;
};

type Props = {
  problemId: string;
  title: string;
  badgeText?: string;
  tabs?: ProblemInfoTab[];
  activeTab?: ProblemInfoTabKey;
  onTabChange?: (key: ProblemInfoTabKey) => void;
  className?: string;
};

const DEFAULT_TABS: ProblemInfoTab[] = [
  { key: 'find', label: 'Find Counter-example' },
  { key: 'status', label: 'Submission Status' },
  { key: 'contribute', label: 'Contribute' },
  { key: 'correct', label: 'Correct Code' },
];

export default function ProblemInfoCard({
  problemId,
  title,
  badgeText,
  tabs = DEFAULT_TABS,
  activeTab = 'find',
  onTabChange,
  className,
}: Props) {
  const showTabs = Boolean(tabs?.length);

  return (
    <div
      className={[
        'flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm',
        'dark:border-slate-700 dark:bg-slate-800',
        className ?? '',
      ].join(' ')}
    >
      <h1 className="flex items-center text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        <span className="mr-3 font-mono text-lg text-blue-500">{problemId}</span>
        {title}
      </h1>

      {showTabs ? (
        <div className="flex items-center rounded-lg bg-slate-100 p-1 dark:bg-slate-700/40">
          {tabs.map((t) => {
            const isActive = t.key === activeTab;

            return (
              <button
                key={t.key}
                type="button"
                onClick={() => onTabChange?.(t.key)}
                className={[
                  'rounded-md px-4 py-1.5 text-sm transition-all',
                  isActive
                    ? 'bg-white font-semibold text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-300'
                    : 'font-medium text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-100',
                ].join(' ')}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      ) : badgeText ? (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
          {badgeText}
        </span>
      ) : null}
    </div>
  );
}
