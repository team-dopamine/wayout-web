import { TYPE_PILL_CLASS, type Contribution } from '@/components/profile/contributions.constants';

interface ContributionTableBodyProps {
  contributions: Contribution[];
  isLoading?: boolean;
}

function EmptyRow({ message }: { message: string }) {
  return (
    <tr>
      <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
        {message}
      </td>
    </tr>
  );
}

function ContributionRow({ contribution }: { contribution: Contribution }) {
  return (
    <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50">
      <td className="text-primary px-6 py-4 text-sm font-medium">{contribution.codeId}</td>

      <td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">
        {contribution.problemName}
      </td>

      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
        {contribution.language}
      </td>

      <td className="px-6 py-4">
        <span
          className={[
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
            TYPE_PILL_CLASS[contribution.type],
          ].join(' ')}
        >
          {contribution.type}
        </span>
      </td>

      <td className="px-6 py-4 font-mono text-sm text-slate-600 dark:text-slate-400">
        {contribution.submittedAt}
      </td>
    </tr>
  );
}

export default function ContributionTableBody({
  contributions,
  isLoading = false,
}: ContributionTableBodyProps) {
  if (isLoading) {
    return (
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
        <EmptyRow message="기여 내역을 불러오는 중입니다..." />
      </tbody>
    );
  }

  if (contributions.length === 0) {
    return (
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
        <EmptyRow message="표시할 기여 내역이 없습니다." />
      </tbody>
    );
  }

  return (
    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
      {contributions.map((contribution) => (
        <ContributionRow
          key={`${contribution.codeId}-${contribution.submittedAt}`}
          contribution={contribution}
        />
      ))}
    </tbody>
  );
}
