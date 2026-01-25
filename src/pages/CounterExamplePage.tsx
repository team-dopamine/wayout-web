/**반례 찾기 페이지*/
import { useMemo, useState } from 'react';
import ProblemInfoCard from '@/components/common/ProblemInfoCard';
import SolutionEditorPanel from '@/components/counterexample/SolutionEditorPanel';
import CounterExampleStatusPanel from '@/components/counterexample/CounterExampleStatusPanel';

import { DEFAULT_CODE_BY_LANG, LANG_OPTIONS, MOCK_FAILED_CASES } from '@/constants/counterexample';
import type { FailedCase, Language } from '@/types/counterexample';

export default function CounterExamplePage() {
  const [language, setLanguage] = useState<Language>('c');
  const [code, setCode] = useState(DEFAULT_CODE_BY_LANG.c);
  const [isPublic, setIsPublic] = useState(false);
  const [activeTab, setActiveTab] = useState<'find' | 'status' | 'contribute' | 'correct'>('find');

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

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <main className="relative flex-1 overflow-y-auto bg-slate-50 px-4 py-8 pb-24 pt-6 dark:bg-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-6">
          <ProblemInfoCard
            problemId="#1042"
            title="Maximum Subarray Sum"
            badgeText="Counterexamples Found"
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="grid h-[700px] grid-cols-1 gap-6 lg:grid-cols-3">
            <SolutionEditorPanel
              language={language}
              languageOptions={LANG_OPTIONS}
              onChangeLanguage={handleChangeLanguage}
              code={code}
              onChangeCode={setCode}
              onCopy={handleCopy}
              onFindCounterExample={handleSubmit}
              onSubmit={handleSubmit}
              isPublic={isPublic}
              onPublicChange={setIsPublic}
            />

            <CounterExampleStatusPanel failedCount={failedCount} cases={failedCases} />
          </div>
        </div>
      </main>
    </div>
  );
}
