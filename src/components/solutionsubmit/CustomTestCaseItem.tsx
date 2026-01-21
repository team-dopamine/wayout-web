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
    <div className="group relative rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900/40 dark:hover:border-gray-600">
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-3 top-1 text-red-500 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <span className="material-icons text-lg">close</span>
      </button>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => onChangeInput(e.target.value)}
            rows={4}
            placeholder="Enter test case input..."
            className="focus:border-primary focus:ring-primary w-full resize-none rounded-md border-gray-300 p-3 font-mono text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Expected Output
          </label>
          <textarea
            value={input}
            onChange={(e) => onChangeInput(e.target.value)}
            rows={4}
            placeholder="Enter test case input..."
            className="focus:border-primary focus:ring-primary w-full resize-none rounded-md border-gray-300 p-3 font-mono text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
      </div>
    </div>
  );
}
