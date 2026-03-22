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

export const TABLE_HEADERS = ['ID', '문제', '언어', '상태', '제출 시각'] as const;

export const TYPE_PILL_CLASS: Record<ContributionType, string> = {
  'Correct Code': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Incorrect Code': 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
  Generator: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
};

export const TAB_LABEL: Record<TabKey, string> = {
  all: '사용자의 반례 찾기 기록',
  correct: '사용자가 기여한 정답',
  incorrect: '사용자가 기여한 오답 코드',
};

export function getTabButtonClass(isActive: boolean) {
  if (isActive) {
    return 'rounded-full border border-blue-600 bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm';
  }

  return 'rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100';
}
