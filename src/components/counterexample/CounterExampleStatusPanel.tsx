/** 반례 찾기 - 반례 상태 패널 */
import type { FailedCase } from '@/types/counterexample';

type Props = {
  failedCount: number;
  cases: FailedCase[];
  isLoading: boolean;
  hasSearched: boolean;
};

export default function CounterExampleStatusPanel({
  failedCount,
  cases,
  isLoading,
  hasSearched,
}: Props) {
  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
        반례를 탐색하고 있습니다...
      </div>
    );
  } else if (!hasSearched) {
    content = (
      <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
        아직 실행 결과가 없습니다.
      </div>
    );
  } else if (cases.length === 0) {
    content = (
      <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
        발견된 반례가 없습니다.
      </div>
    );
  } else {
    content = (
      <div className="space-y-4">
        <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
          제출한 코드에서 실패한 테스트 케이스입니다.
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

              {tc.timeMs !== undefined && (
                <span className="font-mono text-xs text-red-600 opacity-75 dark:text-red-400">
                  {tc.timeMs}ms
                </span>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  입력값
                </span>
                <div className="mt-1 overflow-x-auto whitespace-pre-wrap rounded border border-slate-200 bg-white p-2 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  {tc.input.replace(/\\n/g, '\n')}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    예상 출력
                  </span>
                  <div className="mt-1 inline-block rounded border border-green-100 bg-green-50 px-2 py-1 font-mono text-xs text-green-600 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
                    {tc.expected.replace(/\\n/g, '\n')}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    실제 출력
                  </span>
                  <div className="mt-1 inline-block rounded border border-red-100 bg-red-50 px-2 py-1 font-mono text-xs font-bold text-red-600 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400">
                    {tc.output.replace(/\\n/g, '\n')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:col-span-1">
      <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-800/50">
        <h2 className="flex items-center text-sm font-semibold text-slate-900 dark:text-white">
          <span className="mr-2">⚠️</span>
          실행 결과
        </h2>

        <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
          {failedCount} Failed
        </span>
      </div>

      <div className="flex-grow overflow-y-auto bg-white p-5 dark:bg-slate-800">{content}</div>
    </aside>
  );
}
