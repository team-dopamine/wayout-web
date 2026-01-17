/**반례 찾기 - 반례 상태 패널 */
import type { FailedCase } from '@/types/counterexample';

type Props = {
  failedCount: number;
  cases: FailedCase[];
};

export default function CounterExampleStatusPanel({ failedCount, cases }: Props) {
  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-1 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-800/50">
        <h2 className="flex items-center text-sm font-semibold text-slate-900 dark:text-white">
          <span className="mr-2">⚠️</span>
          Counterexample Status
        </h2>

        <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
          {failedCount} Failed
        </span>
      </div>

      <div className="flex-grow space-y-4 overflow-y-auto bg-white p-5 dark:bg-slate-800">
        <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
          The following test cases failed with your submitted solution.
        </p>

        {cases.map((tc) => (
          <div
            key={tc.id}
            className="rounded-lg border border-red-200 bg-red-50/50 p-3 text-sm dark:border-red-900/50 dark:bg-red-900/10"
          >
            <div className="mb-3 flex items-center justify-between border-b border-red-100 pb-2 dark:border-red-900/30">
              <span className="flex items-center text-xs font-medium text-red-700 dark:text-red-400">
                <span className="mr-1">✖</span>
                Test Case #{tc.id}
              </span>
              <span className="font-mono text-xs text-red-600 opacity-75 dark:text-red-400">
                {tc.timeMs}ms
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Input
                </span>
                <div className="mt-1 overflow-x-auto whitespace-nowrap rounded border border-slate-200 bg-white p-2 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  {tc.input}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Expected
                  </span>
                  <div className="mt-1 inline-block rounded border border-green-100 bg-green-50 px-2 py-1 font-mono text-xs text-green-600 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
                    {tc.expected}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Your Output
                  </span>
                  <div className="mt-1 inline-block rounded border border-red-100 bg-red-50 px-2 py-1 font-mono text-xs font-bold text-red-600 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400">
                    {tc.output}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
