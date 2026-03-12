/**반례 찾기 페이지*/
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import SolutionEditorPanel from '@/components/counterexample/SolutionEditorPanel';
import CounterExampleStatusPanel from '@/components/counterexample/CounterExampleStatusPanel';

import { DEFAULT_CODE_BY_LANG, LANG_OPTIONS } from '@/constants/counterexample';
import { postCounterexampleApi } from '@/apis/submissions/postCounterExampleApi';
import type { FailedCase, Language } from '@/types/counterexample';

const LANGUAGE_TO_API = {
  cpp: 'CPP',
  java: 'JAVA',
  python: 'PYTHON',
} as const;

export default function CounterExamplePage() {
  const { problemId } = useParams();

  const [language, setLanguage] = useState<Language>('cpp');
  const [code, setCode] = useState(DEFAULT_CODE_BY_LANG.cpp);
  const [isPublic, setIsPublic] = useState(false);

  const [failedCases, setFailedCases] = useState<FailedCase[]>([]);
  const [isFindingCounterExample, setIsFindingCounterExample] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

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
    handleFindCounterExample();
  };

  const handleFindCounterExample = useCallback(async () => {
    if (!code.trim()) {
      alert('코드를 입력해주세요.');
      return;
    }

    if (!problemId) {
      alert('문제 정보를 찾을 수 없습니다.');
      return;
    }

    setIsFindingCounterExample(true);
    setHasSearched(true);

    try {
      const data = await postCounterexampleApi({
        problemId: Number(problemId),
        language: LANGUAGE_TO_API[language],
        sourceCode: code,
        isOpen: isPublic,
      });

      const mappedFailedCases: FailedCase[] = (data.counterExamples ?? []).map((item, index) => ({
        id: index + 1,
        input: item.input,
        expected: item.expectedOutput,
        output: item.actualOutput,
        timeMs: 0,
      }));

      setFailedCases(mappedFailedCases);
    } catch (error) {
      console.error(error);
      setFailedCases([]);
      alert('반례 탐색에 실패했습니다.');
    } finally {
      setIsFindingCounterExample(false);
    }
  }, [code, isPublic, language, problemId]);

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
        isFindingCounterExample={isFindingCounterExample}
      />

      <CounterExampleStatusPanel
        failedCount={failedCount}
        cases={failedCases}
        isLoading={isFindingCounterExample}
        hasSearched={hasSearched}
      />
    </div>
  );
}
