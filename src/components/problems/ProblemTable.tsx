import ProblemHeader from './ProblemHeader';
import ProblemRow from './ProblemRow';

export interface Problem {
  id: number;
  title: string;
  createdBy: {
    name: string;
    badgeClass: string;
    textClass: string;
  };
  totalSubmissions: string;
  breaksFound: string;
}

interface ProblemTableProps {
  problems: Problem[];
}

const ProblemTable = ({ problems }: ProblemTableProps) => {
  return (
    <div className="custom-scrollbar overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
        <ProblemHeader />
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-slate-700 dark:bg-slate-900/50">
          {problems.map((problem) => (
            <ProblemRow key={problem.id} problem={problem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemTable;
