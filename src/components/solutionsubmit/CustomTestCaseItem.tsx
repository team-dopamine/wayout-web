/** 단일 커스텀 테스트 케이스 입력 카드 컴포넌트 */
interface Props {
  input: string;
  output: string;
  onChangeInput: (value: string) => void;
  onChangeOutput: (value: string) => void;
  onRemove: () => void;
}

export function CustomTestCaseItem({
  input,
  output,
  onChangeInput,
  onChangeOutput,
  onRemove,
}: Props) {
  return (
    <div className="group relative rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40">
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-3 top-2 text-red-500 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Remove test case"
      >
        <span className="material-symbols-outlined text-lg">close</span>
      </button>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => onChangeInput(e.target.value)}
            rows={4}
            placeholder="Enter test case input..."
            className="w-full resize-none rounded-md border border-slate-300 bg-white p-3 font-mono text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Expected Output
          </label>
          <textarea
            value={output}
            onChange={(e) => onChangeOutput(e.target.value)}
            rows={4}
            placeholder="Enter expected output..."
            className="w-full resize-none rounded-md border border-slate-300 bg-white p-3 font-mono text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
          />
        </div>
      </div>
    </div>
  );
}
