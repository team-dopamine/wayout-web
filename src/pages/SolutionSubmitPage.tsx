import { useCallback, useMemo, useState } from 'react';
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
  const [value, setValue] = useState<SubmitFormValue>({
    problemId: '',
    language: 'cpp',
    code: DEFAULT_CODE_BY_LANG.cpp,
  });

  const [isPublic, setIsPublic] = useState(false);
  const numericProblemId = useMemo(() => Number(value.problemId), [value.problemId]);
  const handleChangeValue = useCallback((next: SolutionCodeCardValue) => {
    setValue({
      ...next,
      language: isClientLang(next.language) ? next.language : 'cpp',
    });
  }, []);

  const handleSubmitSolution = useCallback(async () => {
    if (!Number.isInteger(numericProblemId) || numericProblemId <= 0) {
      console.error('[기여하기] Invalid problemId detected. Current value:', value.problemId);
      return;
    }

    const language = getApiLanguage(value.language);
    if (!language) {
      console.error('[기여하기] Invalid language detected. Current value:', value.language);
      return;
    }

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
  }, [numericProblemId, value.problemId, value.language, value.code, isPublic]);

  return (
    <section className="space-y-8">
      <div className="h-[700px]">
        <SolutionCodeCard
          value={value}
          onChange={handleChangeValue}
          isPublic={isPublic}
          onPublicChange={setIsPublic}
          onSubmit={handleSubmitSolution}
        />
      </div>

      <CustomTestCasesSection problemId={numericProblemId} onChange={() => {}} />
    </section>
  );
}
