import ContributionTableBody from '@/components/profile/ContributionTableBody';
import {
  TABS,
  TAB_LABEL,
  TABLE_HEADERS,
  getTabButtonClass,
  type Contribution,
  type TabKey,
} from '@/components/profile/contributions.constants';

type Props = {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  contributions: Contribution[];
  isLoading?: boolean;
};

export type { Contribution, TabKey } from '@/components/profile/contributions.constants';

export default function ContributionsSection({
  activeTab,
  setActiveTab,
  contributions,
  isLoading = false,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-800/70 dark:shadow-none">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-white/70 p-6 dark:border-slate-700 dark:bg-slate-800/20">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={getTabButtonClass(activeTab === tab)}
          >
            {TAB_LABEL[tab]}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="border-b border-slate-200 bg-slate-50/90 dark:border-slate-700 dark:bg-slate-800/80">
            <tr>
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <ContributionTableBody
            contributions={contributions}
            isLoading={isLoading}
            tabKey={activeTab}
          />
        </table>
      </div>
    </div>
  );
}
