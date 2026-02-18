/** 문제 풀이 코드를 작성하고 제출하는 솔루션 입력 카드 컴포넌트 */

import { useCallback, useMemo, useRef } from 'react';

import SourceCodeEditor from './SourceCodeEditor';
import type { LanguageOption, SolutionCodeCardValue } from './types';

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
};

const DEFAULT_LANGUAGES: LanguageOption[] = [
  { value: 'cpp', label: 'C++', filename: 'main.cpp' },
  { value: 'java', label: 'Java', filename: 'main.java' },
  { value: 'python', label: 'Python 3', filename: 'main.py' },
];

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
}: Props) {
  const options = languageOptions ?? DEFAULT_LANGUAGES;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const accept = useMemo(() => '.txt,.py,.js,.ts,.cpp,.c,.java,.go,.rs', []);

  const handleChangeLanguage = useCallback(
    (nextLang: string) => {
      const lang = (['cpp', 'java', 'python'] as const).includes(nextLang as any)
        ? (nextLang as EditorLang)
        : 'cpp';

      onChange({
        ...value,
        language: nextLang,
        code: DEFAULT_CODE_BY_LANG[lang],
      });
    },
    [onChange, value],
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value.code);
    } catch {}
  }, [value.code]);

  const handleLoadFromFileClick = useCallback(() => {
    if (!enableLoadFromFile) return;
    fileInputRef.current?.click();
  }, [enableLoadFromFile]);

  const handleFileSelected = useCallback(
    async (file: File | null) => {
      if (!file) return;
      try {
        const text = await file.text();
        onChange({ ...value, code: text });
      } catch {}
    },
    [onChange, value],
  );

  const handleSubmit = useCallback(() => {
    onSubmit?.();
  }, [onSubmit]);

  return (
    <section
      className={[
        'overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm',
        'dark:border-slate-700 dark:bg-slate-800',
        className ?? '',
      ].join(' ')}
    >
      <div className="space-y-6 px-4 py-5 sm:p-8">
        <SourceCodeEditor
          label="정답 코드"
          language={value.language as EditorLang}
          languageOptions={options.map((o) => ({
            value: o.value as EditorLang,
            label: o.label,
          }))}
          onChangeLanguage={handleChangeLanguage}
          value={value.code}
          onChange={(code) => onChange({ ...value, code })}
          onCopy={handleCopy}
          onSubmit={handleSubmit}
          enableLoadFromFile={enableLoadFromFile}
          onLoadFromFile={handleLoadFromFileClick}
          fileInputRef={fileInputRef}
          accept={accept}
          onFileSelected={handleFileSelected}
          isPublic={typeof isPublic === 'boolean' ? isPublic : undefined}
          onPublicChange={onPublicChange}
          onSubmitSolution={handleSubmit}
        />
      </div>
    </section>
  );
}
