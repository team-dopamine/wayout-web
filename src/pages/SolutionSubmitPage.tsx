/** 정답 코드 작성 및 제출 페이지 */
import { useState } from 'react';
import { SolutionCodeCard } from '@/components/solutionsubmit/SolutionCodeCard';

export default function SolutionSubmitPage() {
  const [value, setValue] = useState({
    problemId: '',
    language: 'c',
    code: '',
  });

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <SolutionCodeCard value={value} onChange={setValue} />
    </main>
  );
}
