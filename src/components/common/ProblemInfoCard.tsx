/** 문제 정보와 관련 기능 탭을 함께 표시하는 상단 카드 공통 컴포넌트 */
import type { ReactNode } from 'react';

type ProblemInfoTabKey = 'find' | 'status' | 'contribute' | 'submission';

type ProblemInfoTab = {
  key: ProblemInfoTabKey;
  label: string;
};

type Props = {
  id: string | null;
  problemNo: string;
  title: string;
  badgeText?: string;
  tabs?: ProblemInfoTab[];
  activeTab?: ProblemInfoTabKey;
  onTabChange?: (key: ProblemInfoTabKey) => void;
  rightContent?: ReactNode;
  className?: string;
};

const DEFAULT_TABS: ProblemInfoTab[] = [
  { key: 'find', label: '반례 찾기' },
  { key: 'status', label: '제출 현황' },
  { key: 'contribute', label: '기여하기' },
];

export default function ProblemInfoCard({
  id,
  problemNo,
  title,
  badgeText,
  tabs = DEFAULT_TABS,
  activeTab = 'find',
  onTabChange,
  rightContent,
  className = '',
}: Props) {
  const showTabs = Boolean(tabs?.length);
  const shouldRenderRight = Boolean(rightContent) || activeTab !== 'submission';

  const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm',
        'dark:border-slate-700 dark:bg-slate-800',
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <h1 className="flex items-center text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          <span className="mr-3 font-mono text-lg text-blue-500">{problemNo}</span>
          {title || '문제를 불러오는 중...'}
        </h1>
      </div>

      {shouldRenderRight && (
        <div className="flex items-center gap-4">
          {rightContent ? (
            rightContent
          ) : showTabs ? (
            <nav
              className="flex items-center rounded-lg bg-slate-100 p-1 dark:bg-slate-700/40"
              aria-label="Problem tabs"
            >
              {tabs.map((t) => {
                const isActive = t.key === activeTab;

                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => (id ? onTabChange?.(t.key) : alert('데이터 로딩 중입니다.'))}
                    className={cn(
                      'rounded-md px-4 py-1.5 text-sm transition-all duration-200',
                      isActive
                        ? 'bg-white font-semibold text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-300'
                        : 'font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-100',
                    )}
                  >
                    {t.label}
                  </button>
                );
              })}
            </nav>
          ) : badgeText ? (
            <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
              {badgeText}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
