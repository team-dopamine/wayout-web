/** 파일명 표시 및 코드 입력 영역용 소스코드 에디터 컴포넌트 */
import EditorChrome from './EditorChrome';

type Props = {
  label: string;
  filename: string;

  value: string;
  onChange: (v: string) => void;

  placeholder?: string;

  enableLoadFromFile?: boolean;
  onLoadFromFile?: () => void;

  fileInputRef?: React.RefObject<HTMLInputElement | null>;
  accept?: string;
  onFileSelected?: (file: File | null) => void;
};

export default function SourceCodeEditor({
  label,
  filename,
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
        {/** 입력 필드 */}
        <textarea
          id="code"
          name="code"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={16}
          spellCheck={false}
          placeholder={placeholder}
          className="block w-full resize-none border-0 bg-white p-4 font-mono text-sm leading-relaxed text-slate-900 focus:ring-0 dark:bg-[#0d1117] dark:text-slate-200"
        />
      </div>
    </div>
  );
}
