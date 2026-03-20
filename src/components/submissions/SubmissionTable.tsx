import SubmissionHeader from './SubmissionHeader';
import SubmissionRow from './SubmissionRow';

export interface Submission {
  id: string;
  time: string;
  user: string;
  language: string;
  performance: { time: string; memory: string };
}

interface SubmissionTableProps {
  submissions: Submission[];
}

const SubmissionTable = ({ submissions }: SubmissionTableProps) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="w-full min-w-[900px] table-fixed divide-y divide-slate-200 dark:divide-slate-700">
        <SubmissionHeader />
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {submissions.map((item) => (
            <SubmissionRow key={item.id} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionTable;
