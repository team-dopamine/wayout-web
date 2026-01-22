/** 문제 ID, 언어 선택, 소스코드 입력(파일 로드 포함)을 한 카드 UI 컴포넌트 */
import { useMemo, useRef } from 'react';
import ProblemIdField from './ProblemIdField';
import LanguageSelectField from './LanguageSelectField';
import SourceCodeEditor from './SourceCodeEditor';
import type { LanguageOption, SolutionCodeCardValue } from './types';
import { PublicSubmissionCheckbox } from '../PublicSubmissionCheckbox';

type Props = {
  value: SolutionCodeCardValue;
  onChange: (next: SolutionCodeCardValue) => void;

  languageOptions?: LanguageOption[];
  enableLoadFromFile?: boolean;

  isPublic?: boolean;
  onPublicChange?: (checked: boolean) => void;

  className?: string;
};

const DEFAULT_LANGUAGES: LanguageOption[] = [
  { value: 'c', label: 'C', filename: 'main.c' },
  { value: 'cpp', label: 'C++', filename: 'main.cpp' },
  { value: 'java', label: 'Java', filename: 'main.java' },
  { value: 'python', label: 'Python 3', filename: 'main.py' },
];

const DEFAULT_PLACEHOLDER = `import sys
def solve():
    # Your code here
    pass
if __name__ == '__main__':
    solve()
`;

export default function SolutionCodeCard({
  value,
  onChange,
  languageOptions,
  enableLoadFromFile = true,
  isPublic,
  onPublicChange,
  className,
}: Props) {
  const options = languageOptions ?? DEFAULT_LANGUAGES;
  const currentLanguage = options.find((o) => o.value === value.language) ?? options[0];

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const accept = useMemo(() => '.txt,.py,.js,.ts,.cpp,.c,.java,.go,.rs', []);

  const handleLoadFromFileClick = () => {
    if (!enableLoadFromFile) return;
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (file: File | null) => {
    if (!file) return;
    try {
      const text = await file.text();
      onChange({ ...value, code: text });
    } catch {}
  };

  return (
    <section
      className={[
        'overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm',
        'dark:border-slate-700 dark:bg-slate-800',
        className ?? '',
      ].join(' ')}
    >
      <div className="space-y-8 px-4 py-5 sm:p-8">
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <ProblemIdField
              value={value.problemId}
              onChange={(problemId) => onChange({ ...value, problemId })}
            />
          </div>

          <div className="sm:col-span-2">
            <LanguageSelectField
              value={value.language}
              options={options}
              onChange={(language) => onChange({ ...value, language })}
            />
          </div>
        </div>

        <SourceCodeEditor
          label="Source Code"
          filename={currentLanguage.filename}
          value={value.code}
          onChange={(code) => onChange({ ...value, code })}
          placeholder={DEFAULT_PLACEHOLDER}
          enableLoadFromFile={enableLoadFromFile}
          onLoadFromFile={handleLoadFromFileClick}
          fileInputRef={fileInputRef}
          accept={accept}
          onFileSelected={handleFileSelected}
        />
        {typeof isPublic === 'boolean' && onPublicChange && (
          <PublicSubmissionCheckbox checked={isPublic} onChange={onPublicChange} />
        )}
      </div>
    </section>
  );
}
