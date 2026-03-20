import SubmissionHeader from './SubmissionHeader';
import SubmissionRow from './SubmissionRow';
import type { SubmissionTableItem, SubmissionTableMode } from '../../types/submissions.ui.type';

interface SubmissionTableProps {
  submissions: SubmissionTableItem[];
  mode?: SubmissionTableMode;
}

export default function SubmissionTable({ submissions, mode = 'problem' }: SubmissionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <SubmissionHeader mode={mode} />

        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {submissions.map((item) => (
            <SubmissionRow key={item.id} data={item} mode={mode} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
