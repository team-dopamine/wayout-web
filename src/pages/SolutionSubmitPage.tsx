/** 정답 코드 작성 및 제출 페이지 */
import { useState } from 'react';
import { SolutionCodeCard } from '@/components/solutionsubmit/SolutionCodeCard';
import { CustomTestCasesSection } from '@/components/solutionsubmit';

export default function SolutionSubmitPage() {
  const [value, setValue] = useState({
    problemId: '',
    language: 'c',
    code: '',
  });

  const [isPublic, setIsPublic] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 transition-colors dark:bg-slate-900">
      <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 pb-32 text-slate-900 dark:text-slate-100 sm:px-6 lg:px-8">
        <SolutionCodeCard
          value={value}
          onChange={setValue}
          isPublic={isPublic}
          onPublicChange={setIsPublic}
        />

        {/** TODO: 커스텀 테스트 케이스 상태 연동 필요 */}
        <CustomTestCasesSection onChange={() => {}} />
      </main>
    </div>
  );
}
