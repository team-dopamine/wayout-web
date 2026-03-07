import ProblemHeader from './ProblemHeader';
import ProblemRow from './ProblemRow';
import { Problem } from '@/apis/problems/problems.type';

type Props = {
  problems: Problem[];
};

export default function ProblemTable({ problems }: Props) {
  return (
    <div className="custom-scrollbar overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
        <ProblemHeader />
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-slate-700 dark:bg-slate-900/50">
          {problems.map((problems) => (
            <ProblemRow key={problems.problemId} problems={problems} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
