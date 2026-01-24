/** 파일명 표시 및 코드 입력 영역용 소스코드 에디터 컴포넌트 */
import EditorChrome from './EditorChrome';
import CodeEditor from '@/components/common/CodeEditor';
import type { EditorLang } from '@/constants/editor';

type Props = {
  label: string;
  filename: string;
  language: string;

  value: string;
  onChange: (v: string) => void;

  placeholder?: string;

  enableLoadFromFile?: boolean;
  onLoadFromFile?: () => void;

  fileInputRef?: React.RefObject<HTMLInputElement | null>;
  accept?: string;
  onFileSelected?: (file: File | null) => void;
};

const FALLBACK_LANG: EditorLang = 'cpp';

function toEditorLang(lang: string): EditorLang {
  if (lang === 'c' || lang === 'cpp' || lang === 'java' || lang === 'python') return lang;
  return FALLBACK_LANG;
}

export default function SourceCodeEditor({
  label,
  filename,
  language,
  value,
  onChange,
  placeholder,
  enableLoadFromFile = true,
  onLoadFromFile,
  fileInputRef,
  accept,
  onFileSelected,
}: Props) {
  return (
    <div>
      <div className="mb-2 flex items-end justify-between">
        <label
          htmlFor="code"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>

        {/** 파일 탐색 버튼 */}
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
      </div>

      <div className="overflow-hidden rounded-md border border-slate-300 shadow-sm transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 dark:border-slate-600">
        <EditorChrome filename={filename} />

        <div style={{ height: 'calc(16 * 1.625rem + 2rem)' }}>
          <CodeEditor language={toEditorLang(language)} value={value} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
