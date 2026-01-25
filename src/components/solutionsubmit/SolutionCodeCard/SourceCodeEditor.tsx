/** 공통 CodeEditor 기반 소스코드 입력 카드 (SolutionEditorPanel 스타일) */
import CodeEditor from '@/components/common/CodeEditor';
import type { EditorLang } from '@/constants/editor';
/** ✅ 아래 import 누락 방지 */
import { PublicSubmissionCheckbox } from '@/components/common/PublicSubmissionCheckbox';

type Props = {
  label?: string; // "Solution Code" (옵션)
  language: EditorLang;
  languageOptions: { value: EditorLang; label: string }[];
  onChangeLanguage: (next: EditorLang) => void;

  value: string;
  onChange: (v: string) => void;

  onCopy?: () => void;
  onSubmit?: () => void;

  enableLoadFromFile?: boolean;
  onLoadFromFile?: () => void;

  fileInputRef?: React.RefObject<HTMLInputElement | null>;
  accept?: string;
  onFileSelected?: (file: File | null) => void;

  isPublic?: boolean;
  onPublicChange?: (checked: boolean) => void;

  onFindCounterExample?: () => void;
};

export default function SourceCodeEditor({
  label = 'Solution Code',
  language,
  languageOptions,
  onChangeLanguage,
  value,
  onChange,
  onCopy,
  onSubmit,
  enableLoadFromFile = true,
  onLoadFromFile,
  fileInputRef,
  accept,
  onFileSelected,
  isPublic,
  onPublicChange,
  onFindCounterExample,
}: Props) {
  return (
    <section className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* ✅ 상단바 (SolutionEditorPanel과 동일) */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>
          <div className="h-4 w-px bg-slate-300 dark:bg-slate-600" />

          {/* ✅ 언어 선택: SolutionEditorPanel select 스타일 그대로 */}
          <select
            value={language}
            onChange={(e) => onChangeLanguage(e.target.value as EditorLang)}
            className="cursor-pointer rounded-md border border-slate-300 bg-white py-1.5 pl-3 pr-8 text-sm shadow-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          >
            {languageOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ 우측 액션들: Load from file + Copy */}
        <div className="flex items-center gap-3">
          {enableLoadFromFile && (
            <>
              <button
                type="button"
                onClick={onLoadFromFile}
                className="text-xs font-medium text-blue-500 hover:text-blue-600"
              >
                Load from file
              </button>

              {fileInputRef && onFileSelected && (
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={accept}
                  className="hidden"
                  onChange={(e) => onFileSelected(e.target.files?.[0] ?? null)}
                />
              )}
            </>
          )}

          <button
            type="button"
            onClick={onCopy}
            className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="copy code"
          >
            ⧉
          </button>
        </div>
      </div>

      {/* ✅ 본문: CodeEditor 디자인 그대로 */}
      <div className="relative flex-grow overflow-hidden">
        <CodeEditor language={language} value={value} onChange={onChange} onSubmit={onSubmit} />
      </div>

      {/* ✅ 하단바 (SolutionEditorPanel과 동일) */}
      <div className="flex flex-shrink-0 items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
        {typeof isPublic === 'boolean' && onPublicChange ? (
          <div className="-mt-2">
            <PublicSubmissionCheckbox checked={isPublic} onChange={onPublicChange} />
          </div>
        ) : (
          <span className="text-xs text-slate-500 dark:text-slate-400"> </span>
        )}

        {onFindCounterExample ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={onFindCounterExample}
            >
              <span className="mr-2">🐞</span>
              Find Counterexample
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
