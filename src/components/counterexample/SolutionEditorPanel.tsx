/** 반례 찾기 - 솔루션 편집기 패널 */
import type { Language } from '@/types/counterexample';

import CodeEditor from '@/components/common/CodeEditor';
import { PublicSubmissionCheckbox } from '@/components/common/PublicSubmissionCheckbox';

type LangOption = { value: Language; label: string };

type Props = {
  readOnly?: boolean;
  language: Language;
  code: string;
  onCopy: () => void;

  // 아래 값들을 선택적으로
  languageOptions?: LangOption[];
  onChangeLanguage?: (next: Language) => void;
  onChangeCode?: (next: string) => void;
  onFindCounterExample?: () => void;
  onSubmit?: () => void;
  isPublic?: boolean;
  onPublicChange?: (checked: boolean) => void;
  isFindingCounterExample?: boolean;
};

export default function SolutionEditorPanel({
  readOnly = false,
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
  isFindingCounterExample,
}: Props) {
  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/** 상단바 */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {readOnly ? '제출된 코드' : '제출할 소스코드'}
          </span>
          <div className="h-4 w-px bg-slate-300 dark:bg-slate-600" />

          <select
            value={language}
            disabled={readOnly}
            onChange={(e) => onChangeLanguage?.(e.target.value as Language)}
            className={`rounded-md border border-slate-300 bg-white py-1.5 pl-3 pr-8 text-sm shadow-sm outline-none transition-colors dark:border-slate-600 dark:bg-slate-700 dark:text-white ${
              readOnly
                ? 'cursor-default opacity-80'
                : 'cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
            }`}
          >
            {languageOptions?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            )) || <option value={language}>{language}</option>}
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

      <CodeEditor
        language={language}
        value={code}
        onChange={readOnly ? () => {} : (onChangeCode ?? (() => {}))}
        onSubmit={readOnly ? () => {} : (onSubmit ?? (() => {}))}
        readOnly={readOnly}
      />

      {/** 하단바 */}
      {!readOnly && (
        <div className="flex flex-shrink-0 items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
          <div className="-mt-2">
            <PublicSubmissionCheckbox
              checked={isPublic ?? false}
              onChange={onPublicChange ?? (() => {})}
            />
          </div>

          <button
            type="button"
            onClick={onFindCounterExample}
            disabled={isFindingCounterExample}
            className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isFindingCounterExample ? '반례 찾는 중...' : '반례 찾기'}
          </button>
        </div>
      )}
    </section>
  );
}
