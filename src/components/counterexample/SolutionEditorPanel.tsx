/** 반례 찾기 - 솔루션 편집기 패널 */
import type { Language } from '@/types/counterexample';

type LangOption = { value: Language; label: string };

type Props = {
  language: Language;
  languageOptions: LangOption[];
  onChangeLanguage: (next: Language) => void;

  code: string;
  onChangeCode: (next: string) => void;

  onCopy: () => void;
  onRunExample: () => void;
  onFindCounterExample: () => void;

  onSubmit: () => void; // Cmd/Ctrl + Enter
};

export default function SolutionEditorPanel({
  language,
  languageOptions,
  onChangeLanguage,
  code,
  onChangeCode,
  onCopy,
  onRunExample,
  onFindCounterExample,
  onSubmit,
}: Props) {
  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const isCmdEnter = (e.metaKey || e.ctrlKey) && e.key === 'Enter';
    if (isCmdEnter) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:col-span-2">
      {/** 상단바 */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Solution Code
          </span>
          <div className="h-4 w-px bg-slate-300 dark:bg-slate-600" />

          <select
            value={language}
            onChange={(e) => onChangeLanguage(e.target.value as Language)}
            className="cursor-pointer rounded-md border border-slate-300 bg-white py-1.5 pl-3 pr-8 text-sm shadow-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          >
            {languageOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={onCopy}
          className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
          aria-label="copy code"
        >
          ⧉
        </button>
      </div>

      {/** 본문 */}
      <div className="relative flex-grow overflow-hidden bg-[#1e1e1e] text-sm text-slate-300">
        <div className="absolute bottom-0 left-0 top-0 flex w-12 select-none flex-col items-end border-r border-[#333] bg-[#1e1e1e] pr-2 pt-4 text-slate-500">
          {Array.from({ length: 9 }).map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </div>

        <textarea
          value={code}
          onChange={(e) => onChangeCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="h-full w-full resize-none bg-transparent p-4 pl-14 font-mono text-slate-300 outline-none"
        />
      </div>

      {/** 하단바 */}
      <div className="flex flex-shrink-0 items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Press Cmd+Enter to submit
        </span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
            onClick={onRunExample}
          >
            Run Example
          </button>

          <button
            type="button"
            className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onFindCounterExample}
          >
            <span className="mr-2">🐞</span>
            Find Counterexample
          </button>
        </div>
      </div>
    </section>
  );
}
