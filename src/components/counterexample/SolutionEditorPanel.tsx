/** 반례 찾기 - 솔루션 편집기 패널 */
import type { Language } from '@/types/counterexample';

import CodeEditor from '@/components/common/CodeEditor';
import { PublicSubmissionCheckbox } from '@/components/common/PublicSubmissionCheckbox';

type LangOption = { value: Language; label: string };

type Props = {
  language: Language;
  languageOptions: LangOption[];
  onChangeLanguage: (next: Language) => void;

  code: string;
  onChangeCode: (next: string) => void;

  onCopy: () => void;
  onFindCounterExample: () => void;

  onSubmit: () => void; // Cmd/Ctrl + Enter
  isPublic: boolean;
  onPublicChange: (checked: boolean) => void;
};

export default function SolutionEditorPanel({
  language,
  languageOptions,
  onChangeLanguage,
  code,
  onChangeCode,
  onCopy,
  onSubmit,
  onFindCounterExample,
  isPublic,
  onPublicChange,
}: Props) {
  return (
    <section className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:col-span-2">
      {/** 상단바 */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            정답 코드
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
          aria-label="코드 복사"
        >
          ⧉
        </button>
      </div>

      {/** 공통 CodeEditor 사용 */}
      <div className="relative flex-grow overflow-hidden">
        <CodeEditor language={language} value={code} onChange={onChangeCode} onSubmit={onSubmit} />
      </div>

      {/** 하단바 */}
      <div className="flex flex-shrink-0 items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="-mt-2">
          <PublicSubmissionCheckbox checked={isPublic} onChange={onPublicChange} />
        </div>

        {/** 반례 찾기 버튼 */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onFindCounterExample}
          >
            반례 찾기
          </button>
        </div>
      </div>
    </section>
  );
}
