/**반례 찾기 페이지*/
import { useCallback, useEffect, useMemo, useState, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';
import SolutionEditorPanel from '@/components/counterexample/SolutionEditorPanel';
import CounterExampleStatusPanel from '@/components/counterexample/CounterExampleStatusPanel';
import ProblemInfoBar from '@/components/problem/ProblemInfoBar';
import { LANG_OPTIONS } from '@/constants/counterexample';
import { postCounterexampleApi } from '@/apis/submissions/postCounterExampleApi';
import { getProblemDetail } from '@/apis/problems/problems';
import type { ProblemDetail } from '@/apis/problems/problems.type';
import type { FailedCase } from '@/types/counterexample';
import { counterExampleReducer, initialState } from '@/types/counterExampleReducer';

const LANGUAGE_TO_API = {
  cpp: 'CPP',
  java: 'JAVA',
  python: 'PYTHON',
} as const;

function mapFailedCases(
  counterExamples: Array<{ input: string; expectedOutput: string; actualOutput: string }> = [],
): FailedCase[] {
  return counterExamples.map((item, index) => ({
    id: index + 1,
    input: item.input,
    expected: item.expectedOutput,
    output: item.actualOutput,
    timeMs: 0,
  }));
}

export default function CounterExamplePage() {
  const [searchParams] = useSearchParams();
  const currentProblemId = searchParams.get('id');
  const numericProblemId = useMemo(() => {
    const parsed = Number(currentProblemId);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
  }, [currentProblemId]);

  const [state, dispatch] = useReducer(counterExampleReducer, initialState);

  const [detail, setDetail] = useState<ProblemDetail | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);

  // 문제 상세 데이터 요청
  useEffect(() => {
    if (!numericProblemId) {
      setDetail(null);
      setIsLoadingDetail(false);
      return;
    }

    let isCancelled = false;

    const fetchDetail = async () => {
      setIsLoadingDetail(true);

      try {
        const data = await getProblemDetail(numericProblemId);

        if (!isCancelled) setDetail(data);
      } catch (error) {
        if (!isCancelled) console.error('문제 정보를 불러오는 데 실패했습니다.', error);
      } finally {
        if (!isCancelled) setIsLoadingDetail(false);
      }
    };

    fetchDetail();

    return () => {
      isCancelled = true;
    };
  }, [numericProblemId]);

  // 복사 핸들러
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(state.code);
      alert('코드가 복사되었습니다.');
    } catch {
      alert('복사에 실패했습니다.');
    }
  }, [state.code]);

  const handleChangeLanguage = useCallback((val: (typeof LANG_OPTIONS)[number]['value']) => {
    dispatch({ type: 'SET_LANGUAGE', value: val });
  }, []);

  const handleChangeCode = useCallback((val: string) => {
    dispatch({ type: 'SET_CODE', value: val });
  }, []);

  const handlePublicChange = useCallback((val: boolean) => {
    dispatch({ type: 'SET_PUBLIC', value: val });
  }, []);

  // 코드 제출 및 반례 찾기
  const handleFindCounterExample = useCallback(async () => {
    if (!state.code.trim()) return alert('코드를 입력해주세요.');
    if (!numericProblemId) return alert('문제 정보를 찾을 수 없습니다.');

    dispatch({ type: 'START_SEARCH' });

    try {
      const data = await postCounterexampleApi({
        problemId: numericProblemId,
        language: LANGUAGE_TO_API[state.language],
        sourceCode: state.code,
        isOpen: state.isPublic,
      });

      dispatch({ type: 'SEARCH_SUCCESS', payload: mapFailedCases(data.counterExamples) });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'SEARCH_FAILURE' });
      alert('반례 탐색에 실패했습니다.');
    }
  }, [state.code, state.isPublic, state.language, numericProblemId]);

  if (isLoadingDetail)
    return <div className="flex h-[400px] items-center justify-center">로딩 중...</div>;
  if (!detail)
    return (
      <div className="flex h-[400px] items-center justify-center">문제를 찾을 수 없습니다.</div>
    );

  return (
    <div className="flex w-full flex-col space-y-6">
      <header className="flex-shrink-0">
        <ProblemInfoBar data={detail} />
      </header>

      <main className="grid h-[750px] min-h-0 w-full grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="h-full min-h-0 lg:col-span-2">
          <SolutionEditorPanel
            language={state.language}
            languageOptions={LANG_OPTIONS}
            onChangeLanguage={handleChangeLanguage}
            code={state.code}
            onChangeCode={handleChangeCode}
            onCopy={handleCopy}
            onFindCounterExample={handleFindCounterExample}
            onSubmit={handleFindCounterExample}
            isPublic={state.isPublic}
            onPublicChange={handlePublicChange}
            isFindingCounterExample={state.isLoading}
          />
        </div>

        <div className="h-full min-h-0 lg:col-span-1">
          <CounterExampleStatusPanel
            failedCount={state.failedCases.length}
            cases={state.failedCases}
            isLoading={state.isLoading}
            hasSearched={state.hasSearched}
          />
        </div>
      </main>
    </div>
  );
}
