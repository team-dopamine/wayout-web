import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SolutionCodeCard } from '@/components/solutionsubmit/SolutionCodeCard';
import { CustomTestCasesSection } from '@/components/solutionsubmit';
import { DEFAULT_CODE_BY_LANG } from '@/constants/counterexample';
import { postSolutionApi } from '@/apis/solutions/solutions';
import type { SolutionCodeCardValue } from '@/components/solutionsubmit/SolutionCodeCard/types';

const LANGUAGE_MAP = {
  cpp: 'CPP',
  java: 'JAVA',
  python: 'PYTHON',
} as const;

type ClientLang = keyof typeof LANGUAGE_MAP;
type SubmitFormValue = Omit<SolutionCodeCardValue, 'language'> & { language: ClientLang };

function isClientLang(language: string): language is ClientLang {
  return language === 'cpp' || language === 'java' || language === 'python';
}

function getApiLanguage(language: ClientLang) {
  return LANGUAGE_MAP[language];
}

export default function SolutionSubmitPage() {
  const [searchParams] = useSearchParams();

  const queryProblemId = searchParams.get('id') ?? '';

  const numericProblemId = useMemo(() => Number(queryProblemId), [queryProblemId]);

  const [value, setValue] = useState<SubmitFormValue>({
    problemId: queryProblemId,
    language: 'cpp',
    code: DEFAULT_CODE_BY_LANG.cpp,
  });

  const [isPublic, setIsPublic] = useState(false);

  const handleChangeValue = useCallback(
    (next: SolutionCodeCardValue) => {
      setValue({
        ...next,
        problemId: queryProblemId || next.problemId,
        language: isClientLang(next.language) ? next.language : 'cpp',
      });
    },
    [queryProblemId],
  );

  const handleSubmitSolution = useCallback(async () => {
    if (!numericProblemId || !Number.isInteger(numericProblemId) || numericProblemId <= 0) {
      alert('유효한 문제 ID가 없습니다.');
      return;
    }

    const language = getApiLanguage(value.language);
    const sourceCode = value.code.trim();

    if (!sourceCode) {
      alert('코드를 입력해주세요.');
      return;
    }

    try {
      await postSolutionApi({
        problemId: numericProblemId,
        language,
        isOpen: isPublic,
        sourceCode,
      });

      alert('정답 코드가 등록되었습니다.');
    } catch (error) {
      alert('정답 코드 등록에 실패했습니다.');
    }
  }, [numericProblemId, value.language, value.code, isPublic]);

  return (
    <section className="space-y-8">
      <CustomTestCasesSection problemId={numericProblemId} onChange={() => {}} />
      <div className="h-[700px]">
        <SolutionCodeCard
          value={{ ...value, problemId: queryProblemId }}
          onChange={handleChangeValue}
          isPublic={isPublic}
          onPublicChange={setIsPublic}
          onSubmit={handleSubmitSolution}
        />
      </div>
    </section>
  );
}
