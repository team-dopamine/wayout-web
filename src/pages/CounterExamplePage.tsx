/**반례 찾기 페이지*/
import { useMemo, useState } from 'react';
import SolutionEditorPanel from '@/components/counterexample/SolutionEditorPanel';
import CounterExampleStatusPanel from '@/components/counterexample/CounterExampleStatusPanel';

import { DEFAULT_CODE_BY_LANG, LANG_OPTIONS, MOCK_FAILED_CASES } from '@/constants/counterexample';
import type { FailedCase, Language } from '@/types/counterexample';

export default function CounterExamplePage() {
  const [language, setLanguage] = useState<Language>('cpp');
  const [code, setCode] = useState(DEFAULT_CODE_BY_LANG.cpp);
  const [isPublic, setIsPublic] = useState(false);

  const failedCases: FailedCase[] = useMemo(() => MOCK_FAILED_CASES, []);
  const failedCount = failedCases.length;

  const handleChangeLanguage = (next: Language) => {
    setLanguage(next);
    setCode(DEFAULT_CODE_BY_LANG[next]);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {}
  };

  const handleSubmit = () => {
    console.log('submit', { language, code });
  };

  const handleFindCounterExample = () => {
    console.log('find counterexample', { language, code, isPublic });
  };

  return (
    <div className="grid h-[700px] grid-cols-1 gap-6 lg:grid-cols-3">
      <SolutionEditorPanel
        language={language}
        languageOptions={LANG_OPTIONS}
        onChangeLanguage={handleChangeLanguage}
        code={code}
        onChangeCode={setCode}
        onCopy={handleCopy}
        onFindCounterExample={handleFindCounterExample}
        onSubmit={handleSubmit}
        isPublic={isPublic}
        onPublicChange={setIsPublic}
      />

      <CounterExampleStatusPanel failedCount={failedCount} cases={failedCases} />
    </div>
  );
}
