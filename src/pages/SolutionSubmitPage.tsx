/** 정답 코드 작성 및 제출 페이지 */
import { useState } from 'react';
import { SolutionCodeCard } from '@/components/solutionsubmit/SolutionCodeCard';
import { CustomTestCasesSection } from '@/components/solutionsubmit';
import type { CustomTestCasesChangePayload } from '@/components/solutionsubmit/types';

export default function SolutionSubmitPage() {
  const [value, setValue] = useState({
    problemId: '',
    language: 'c',
    code: '',
  });

  const [customTests, setCustomTests] = useState<CustomTestCasesChangePayload>({
    cases: [],
    isPublic: false,
  });

  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <SolutionCodeCard value={value} onChange={setValue} />
      <CustomTestCasesSection onChange={setCustomTests} />
    </main>
  );
}
