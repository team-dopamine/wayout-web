/** 커스텀 테스트 케이스 전체 섹션 컴포넌트 */
import { useEffect, useRef, useState } from 'react';
import type { CustomTestCase, CustomTestCasesChangePayload } from './types';
import { CustomTestCaseItem } from './CustomTestCaseItem';
import FormActionButtons from '../common/FormActionButtons';
import { postTestcasesApi } from '@/apis/testcases/postTestcasesApi';

interface Props {
  problemId: number;
  onChange: (payload: CustomTestCasesChangePayload) => void;
}

export default function CustomTestCasesSection({ problemId, onChange }: Props) {
  const [cases, setCases] = useState<CustomTestCase[]>([]);

  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onChangeRef.current({ cases, isPublic: false });
  }, [cases]);

  const addCase = () => {
    setCases((prev) => [...prev, { id: crypto.randomUUID(), input: '', output: '' }]);
  };

  const clearForm = () => {
    setCases([]);
  };

  const submit = async () => {
    if (!Number.isInteger(problemId) || problemId <= 0) {
      alert('유효한 문제 번호가 필요합니다.');
      return;
    }

    const hasIncompleteCase = cases.some((c) => {
      const hasInput = c.input.trim() !== '';
      const hasOutput = c.output.trim() !== '';
      return hasInput !== hasOutput;
    });

    if (hasIncompleteCase) {
      alert('입력값과 출력값을 모두 작성하거나, 작성 중인 행을 삭제해주세요.');
      return;
    }

    const validCases = cases.filter((c) => c.input.trim() !== '' && c.output.trim() !== '');

    if (validCases.length === 0) {
      alert('제출할 테스트 케이스를 1개 이상 작성해주세요.');
      return;
    }

    try {
      const results = await Promise.allSettled(
        validCases.map((c) =>
          postTestcasesApi({
            problemId,
            input: c.input.trim(),
            output: c.output.trim(),
          }),
        ),
      );

      const failedCaseIds = validCases
        .filter((_, index) => results[index].status === 'rejected')
        .map((c) => c.id);

      const successCount = results.filter((result) => result.status === 'fulfilled').length;

      if (failedCaseIds.length === 0) {
        alert('테스트 케이스가 등록되었습니다.');
        setCases([]);
        return;
      }

      setCases((prev) =>
        prev.filter((c) => {
          const isEmpty = c.input.trim() === '' && c.output.trim() === '';
          const isFailed = failedCaseIds.includes(c.id);

          return isEmpty || isFailed;
        }),
      );

      if (successCount === 0) {
        alert('테스트 케이스 등록에 실패했습니다.');
        return;
      }

      alert(`${successCount}개의 테스트 케이스가 등록되었습니다.`);
    } catch (error) {
      alert('테스트 케이스 등록에 실패했습니다.');
    }
  };

  const updateCase = (id: string, field: 'input' | 'output', value: string) => {
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const removeCase = (id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section className="shadow-soft rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      {/** 본문 */}
      <div className="space-y-6 px-4 py-5 sm:p-8">
        {/** 헤더 */}
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200">
              커스텀 테스트 케이스
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              엣지 케이스를 직접 추가해 반례를 찾는 데 기여할 수 있습니다.
            </p>
          </div>

          {/** 케이스 추가 */}
          <button
            type="button"
            onClick={addCase}
            className="inline-flex items-center text-xs font-medium text-blue-500"
          >
            <span className="material-symbols-outlined mr-1 text-base">add_circle</span>
            추가하기
          </button>
        </div>

        {/** 테스트 케이스 목록 */}
        <div className="space-y-4">
          {cases.map((c) => (
            <CustomTestCaseItem
              key={c.id}
              input={c.input}
              output={c.output}
              onChangeInput={(v) => updateCase(c.id, 'input', v)}
              onChangeOutput={(v) => updateCase(c.id, 'output', v)}
              onRemove={() => removeCase(c.id)}
            />
          ))}
        </div>
      </div>

      {/** 하단 버튼 영역 */}
      <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-4 py-4 dark:border-slate-700 dark:bg-slate-700/50 sm:px-6">
        <FormActionButtons
          rightLabel="테스트 케이스 제출하기"
          rightIconName="send"
          onLeftClick={clearForm}
          onRightClick={submit}
        />
      </div>
    </section>
  );
}
