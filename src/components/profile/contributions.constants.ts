export const TABS = ['contributions', 'submissions'] as const;
export type TabKey = (typeof TABS)[number];

export const CONTRIBUTION_TYPES = ['Correct Code', 'Generator'] as const;
export type ContributionType = (typeof CONTRIBUTION_TYPES)[number];

export type Contribution = {
  codeId: string;
  problemName: string;
  language: string;
  platform: string;
  submittedAt: string;
};

export const TABLE_HEADERS = ['ID', '문제', '언어', '플랫폼', '제출 시각'] as const;

export const TAB_LABEL: Record<TabKey, string> = {
  contributions: '기여 내역',
  submissions: '제출 내역',
};

export function getTabButtonClass(isActive: boolean) {
  if (isActive) {
    return 'rounded-full border border-blue-600 bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm';
  }
  return 'rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100';
}
