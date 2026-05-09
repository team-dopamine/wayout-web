import { useNavigate } from 'react-router-dom';
import { type Contribution } from '@/components/profile/contributions.constants';

function EmptyRow({ message, isLoading = false }: { message: string; isLoading?: boolean }) {
  return (
    <tr>
      <td colSpan={5} className="px-6 py-20 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${isLoading ? 'bg-slate-50 dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-800/50'} ring-8 ring-slate-50/50 dark:ring-slate-900/30`}
          >
            {isLoading ? (
              <svg className="h-6 w-6 animate-spin text-slate-400" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-400"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            )}
          </div>
          <p
            className={`text-sm font-medium ${isLoading ? 'animate-pulse text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}
          >
            {message}
          </p>
        </div>
      </td>
    </tr>
  );
}

export default function ContributionTableBody({
  contributions,
  isLoading = false,
  tabKey,
}: {
  contributions: Contribution[];
  isLoading?: boolean;
  tabKey: string;
}) {
  const navigate = useNavigate();
  const isContributionTab = tabKey === 'contributions';

  const handleContributionDetailClick = (item: Contribution) => {
    navigate(`/my-contribution/${item.platform}/${item.problemNo}?id=${item.codeId}`, {
      state: {
        platform: item.platform,
        problemNo: item.problemNo,
        problemTitle: item.problemName,
        language: item.language,
        submittedAt: item.submittedAt,
      },
    });
  };

  const handleProblemClick = (item: Contribution) => {
    navigate(`/problems/${item.platform.toLowerCase()}/${item.problemNo}?id=${item.problemId}`, {
      state: {
        platform: item.platform,
        problemNo: item.problemNo,
        problemTitle: item.problemName,
      },
    });
  };

  return (
    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
      {isLoading ? (
        <EmptyRow message="기여 내역을 불러오는 중입니다..." isLoading />
      ) : contributions.length === 0 ? (
        <EmptyRow message="표시할 내역이 없습니다." />
      ) : (
        contributions.map((item, index) => (
          <tr
            key={`${tabKey}-${item.codeId}-${index}`}
            onClick={() =>
              isContributionTab ? handleContributionDetailClick(item) : handleProblemClick(item)
            }
            className="cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/50"
          >
            <td className="px-6 py-4 text-sm font-medium text-blue-600 dark:text-blue-400">
              {isContributionTab ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContributionDetailClick(item);
                  }}
                  className="font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
                >
                  {item.codeId}
                </button>
              ) : (
                item.codeId
              )}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isContributionTab) {
                    handleContributionDetailClick(item);
                    return;
                  }

                  handleProblemClick(item);
                }}
                className="text-left font-medium text-slate-800 underline-offset-4 hover:text-blue-600 hover:underline dark:text-slate-200 dark:hover:text-blue-400"
              >
                {item.problemName}
              </button>
            </td>
            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
              {item.language}
            </td>
            <td className="px-6 py-4 font-mono text-sm text-slate-600 dark:text-slate-400">
              {item.platform}
            </td>
            <td className="px-6 py-4 font-mono text-sm text-slate-600 dark:text-slate-400">
              {item.submittedAt}
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
}
