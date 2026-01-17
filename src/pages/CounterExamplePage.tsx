/**반례 찾기 페이지*/
import { useMemo, useState } from 'react';
import CounterExampleHeader from '@/components/counterexample/CounterExampleHeader';
import ProblemInfoCard from '@/components/counterexample/ProblemInfoCard';
import SolutionEditorPanel from '@/components/counterexample/SolutionEditorPanel';
import CounterExampleStatusPanel from '@/components/counterexample/CounterExampleStatusPanel';
import FooterLinks from '@/components/counterexample/FooterLinks';
import DarkModeToggle from '@/components/counterexample/DarkModeToggle';

import { DEFAULT_CODE, LANG_OPTIONS, MOCK_FAILED_CASES } from '@/constants/counterexample';
import type { FailedCase, Language } from '@/types/counterexample';

export default function CounterExamplePage() {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState(DEFAULT_CODE);

  const failedCases: FailedCase[] = useMemo(() => MOCK_FAILED_CASES, []);
  const failedCount = failedCases.length;

  const handleToggleDark = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // ignore
    }
  };

  const handleSubmit = () => {
    console.log('submit', { language, code });
  };

  return (
    // ✅ min-h-screen -> h-screen (스크롤 기준 고정)
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <CounterExampleHeader
        onLogoClick={() => console.log('logo')}
        onAllSubmissions={() => console.log('submissions')}
        onAllProblems={() => console.log('problems')}
        onSubmitSolution={() => console.log('submit-solution')}
        onSignIn={() => console.log('signin')}
      />

      {/* ✅ min-h-screen 제거 + flex-1로 남은 영역 차지 + 여기만 스크롤 */}
      <main className="relative flex-1 overflow-y-auto bg-slate-50 px-4 py-8 pb-24 pt-6 sm:px-6 lg:px-8 dark:bg-slate-900">
        <div className="pointer-events-none fixed right-0 top-20 -z-10 h-96 w-96 rounded-full bg-blue-400/5 blur-3xl" />
        <div className="pointer-events-none fixed bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-purple-400/5 blur-3xl" />

        <div className="mx-auto w-full max-w-7xl space-y-6">
          <ProblemInfoCard
            problemId="#1042"
            title="Maximum Subarray Sum"
            badgeText="Counterexamples Found"
          />

          <div className="grid h-[700px] grid-cols-1 gap-6 lg:grid-cols-3">
            <SolutionEditorPanel
              language={language}
              languageOptions={LANG_OPTIONS}
              onChangeLanguage={setLanguage}
              code={code}
              onChangeCode={setCode}
              onCopy={handleCopy}
              onRunExample={() => console.log('run example')}
              onFindCounterExample={handleSubmit}
              onSubmit={handleSubmit}
            />

            <CounterExampleStatusPanel failedCount={failedCount} cases={failedCases} />
          </div>
        </div>
      </main>

      <FooterLinks
        onAbout={() => console.log('about')}
        onHelp={() => console.log('help')}
        onContact={() => console.log('contact')}
      />

      <DarkModeToggle isDark={isDark} onToggle={handleToggleDark} />
    </div>
  );
}
