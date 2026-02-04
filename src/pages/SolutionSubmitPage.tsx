/** 정답 코드 작성 및 제출 페이지 */
import { useState } from 'react';
import { SolutionCodeCard } from '@/components/solutionsubmit/SolutionCodeCard';
import { CustomTestCasesSection } from '@/components/solutionsubmit';
import { DEFAULT_CODE_BY_LANG } from '@/constants/counterexample';

export default function SolutionSubmitPage() {
  const [value, setValue] = useState({
    problemId: '',
    language: 'c',
    code: DEFAULT_CODE_BY_LANG.c,
  });

  const [isPublic, setIsPublic] = useState(false);

  return (
    <section className="space-y-8">
      <SolutionCodeCard
        value={value}
        onChange={setValue}
        isPublic={isPublic}
        onPublicChange={setIsPublic}
        onClear={() => {
          setValue({ problemId: '', language: value.language, code: '' });
        }}
        onSubmit={() => {}}
      />

      {/** TODO: 커스텀 테스트 케이스 상태 연동 필요 */}
      <CustomTestCasesSection onChange={() => {}} />
    </section>
  );
}
