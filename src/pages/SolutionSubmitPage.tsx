import { useCallback, useState } from 'react';
import { SolutionCodeCard } from '@/components/solutionsubmit/SolutionCodeCard';
import { CustomTestCasesSection } from '@/components/solutionsubmit';
import { DEFAULT_CODE_BY_LANG } from '@/constants/counterexample';
import { postSolutionApi, type PostSolutionRequest } from '@/apis/solutions/postSolutionApi';

const LANGUAGE_MAP = {
  cpp: 'CPP',
  java: 'JAVA',
  python: 'PYTHON',
} as const;

type ClientLang = keyof typeof LANGUAGE_MAP;

export default function SolutionSubmitPage() {
  const [value, setValue] = useState({
    problemId: '',
    language: 'cpp',
    code: DEFAULT_CODE_BY_LANG.cpp,
  });

  const [isPublic, setIsPublic] = useState(false);

  const handleSubmitSolution = useCallback(async () => {
    const problemId = Number(value.problemId);
    if (!Number.isInteger(problemId) || problemId <= 0) {
      console.error('[기여하기] Invalid problemId detected. Current value:', value.problemId);
      alert('유효하지 않은 문제 ID 입니다.');
      return;
    }

    const language: PostSolutionRequest['language'] = LANGUAGE_MAP[value.language as ClientLang];

    const sourceCode = value.code.trim();
    if (!sourceCode) {
      alert('코드를 입력해주세요.');
      return;
    }

    try {
      await postSolutionApi({
        problemId,
        language,
        isOpen: isPublic,
        sourceCode,
      });

      alert('정답 코드가 등록되었습니다.');
    } catch (error) {
      alert('정답 코드 등록에 실패했습니다.');
    }
  }, [value.problemId, value.language, value.code, isPublic]);

  return (
    <section className="space-y-8">
      <SolutionCodeCard
        value={value}
        onChange={setValue}
        isPublic={isPublic}
        onPublicChange={setIsPublic}
        onClear={() => {
          setValue((prev) => ({ ...prev, problemId: '', code: '' }));
        }}
        onSubmit={handleSubmitSolution}
      />

      <CustomTestCasesSection onChange={() => {}} />
    </section>
  );
}
