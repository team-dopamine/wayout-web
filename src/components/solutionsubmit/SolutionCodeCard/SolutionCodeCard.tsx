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

  onSubmit?: () => void;

  className?: string;
};

const DEFAULT_LANGUAGES: LanguageOption[] = [
  { value: 'cpp', label: 'C++', filename: 'main.cpp' },
  { value: 'java', label: 'Java', filename: 'main.java' },
  { value: 'python', label: 'Python 3', filename: 'main.py' },
];
const DEFAULT_EDITOR_LANGUAGE_OPTIONS: Array<{ value: EditorLang; label: string }> = [
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python 3' },
];

function isEditorLang(lang: string): lang is EditorLang {
  return lang === 'cpp' || lang === 'java' || lang === 'python';
}

export default function SolutionCodeCard({
  value,
  onChange,
  languageOptions,
  enableLoadFromFile = true,
  isPublic,
  onPublicChange,
  onSubmit,
  className,
}: Props) {
  const options = languageOptions ?? DEFAULT_LANGUAGES;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const accept = useMemo(() => '.txt,.py,.js,.ts,.cpp,.c,.java,.go,.rs', []);
  const currentLanguage = useMemo(() => {
    return isEditorLang(value.language) ? value.language : 'cpp';
  }, [value.language]);
  const resolvedLanguageOptions = useMemo(() => {
    const mapped = options.flatMap((option) => {
      if (!isEditorLang(option.value)) {
        return [];
      }

      return [{ value: option.value, label: option.label }];
    });

    return mapped.length > 0 ? mapped : DEFAULT_EDITOR_LANGUAGE_OPTIONS;
  }, [options]);

  const handleChangeLanguage = useCallback(
    (nextLang: EditorLang) => {
      const lang = isEditorLang(nextLang) ? nextLang : 'cpp';

      onChange({
        ...value,
        language: lang,
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
      <div className="h-[600px]">
        <SourceCodeEditor
          label="정답 코드"
          language={currentLanguage}
          languageOptions={resolvedLanguageOptions}
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
