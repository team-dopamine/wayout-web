import { useMemo, useRef, useState } from 'react';
import SourceCodeEditor from './SourceCodeEditor';
import LanguageSelectField from './LanguageSelectField';
import type { LanguageOption, SolutionCodeCardValue } from './types';
import { PublicSubmissionCheckbox } from '@/components/common/PublicSubmissionCheckbox';
import FormActionButtons from '@/components/common/FormActionButtons';
import ProblemInfoCard from '@/components/common/ProblemInfoCard';
import { DEFAULT_CODE_BY_LANG } from '@/constants/counterexample';
import type { EditorLang } from '@/constants/editor';

type Props = {
  value: SolutionCodeCardValue;
  onChange: (next: SolutionCodeCardValue) => void;

  languageOptions?: LanguageOption[];
  enableLoadFromFile?: boolean;

  isPublic?: boolean;
  onPublicChange?: (checked: boolean) => void;

  onClear?: () => void;
  onSubmit?: () => void;

  className?: string;

  problemInfo?: {
    problemId: string;
    title: string;
    badgeText?: string;
  };
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
  onClear,
  onSubmit,
  className,
  problemInfo,
}: Props) {
  const options = languageOptions ?? DEFAULT_LANGUAGES;
  const currentLanguage = options.find((o) => o.value === value.language) ?? options[0];

  /**ProblemInfoCard 탭 전환 상태*/
  const [activeTab, setActiveTab] = useState<'find' | 'status' | 'contribute' | 'correct'>('find');

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

  const handleClear = () => {
    if (onClear) return onClear();
    onChange({ ...value, code: '' });
  };

  const handleSubmit = () => {
    onSubmit?.();
  };

  return (
    <section
      className={[
        'overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm',
        'dark:border-slate-700 dark:bg-slate-800',
        className ?? '',
      ].join(' ')}
    >
      <div className="space-y-6 px-4 py-5 sm:p-8">
        {/** 상단: 문제 정보 */}
        <div className="space-y-3">
          <ProblemInfoCard
            problemId={problemInfo?.problemId ?? '#'}
            title={problemInfo?.title ?? 'Problem'}
            badgeText={problemInfo?.badgeText}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          {/** 문제정보 박스 하단 */}
          <div className="w-full">
            <LanguageSelectField
              value={value.language}
              options={options}
              onChange={(nextLang) => {
                const lang = (['c', 'cpp', 'java', 'python'] as const).includes(nextLang as any)
                  ? (nextLang as EditorLang)
                  : 'cpp';

                onChange({
                  ...value,
                  language: nextLang,
                  code: DEFAULT_CODE_BY_LANG[lang],
                });
              }}
            />
          </div>
        </div>

        <SourceCodeEditor
          label="Source Code"
          filename={currentLanguage.filename}
          language={value.language}
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

      <div className="flex justify-end border-t border-slate-100 bg-slate-50 px-4 py-4 dark:border-slate-700 dark:bg-slate-700/50 sm:px-6">
        <FormActionButtons
          rightLabel="Submit Solution"
          rightIconName="send"
          onLeftClick={handleClear}
          onRightClick={handleSubmit}
        />
      </div>
    </section>
  );
}
