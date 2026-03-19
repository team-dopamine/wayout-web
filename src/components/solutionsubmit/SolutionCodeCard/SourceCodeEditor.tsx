/** 공통 CodeEditor 기반 소스코드 입력 카드 */
import CodeEditor from '@/components/common/CodeEditor';
import type { EditorLang } from '@/constants/editor';
import { PublicSubmissionCheckbox } from '@/components/common/PublicSubmissionCheckbox';

type Props = {
  label?: string;
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

  /** 정답 제출 버튼 클릭 */
  onSubmitSolution?: () => void;
};

export default function SourceCodeEditor({
  label = '정답 코드',
  language,
  languageOptions,
  onChangeLanguage,
  value,
  onChange,
  onCopy,
  onSubmit,
  isPublic,
  onPublicChange,
  onSubmitSolution,
}: Props) {
  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>
          <div className="h-4 w-px bg-slate-300 dark:bg-slate-600" />
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

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCopy}
            className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="코드 복사"
          >
            ⧉
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <CodeEditor language={language} value={value} onChange={onChange} onSubmit={onSubmit} />
      </div>

      <div className="flex flex-shrink-0 items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
        {typeof isPublic === 'boolean' && onPublicChange ? (
          <div className="-mt-2">
            <PublicSubmissionCheckbox checked={isPublic} onChange={onPublicChange} />
          </div>
        ) : (
          <span className="text-xs text-slate-500 dark:text-slate-400"> </span>
        )}

        {onSubmitSolution ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={onSubmitSolution}
            >
              정답 제출하기
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
