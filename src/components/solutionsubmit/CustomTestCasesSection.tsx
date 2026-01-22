/** 커스텀 테스트 케이스 전체 섹션 컴포넌트 */
import { useEffect, useRef, useState } from 'react';
import type { CustomTestCase, CustomTestCasesChangePayload } from './types';
import { CustomTestCaseItem } from './CustomTestCaseItem';
import FormActionButtons from '../common/FormActionButtons';

interface Props {
  onChange: (payload: CustomTestCasesChangePayload) => void;
}

export default function CustomTestCasesSection({ onChange }: Props) {
  const [cases, setCases] = useState<CustomTestCase[]>([]);

  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    onChangeRef.current({ cases, isPublic: false });
  }, [cases]);

  const addCase = () => {
    setCases((prev) => [...prev, { id: crypto.randomUUID(), input: '', output: '' }]);
  };

  const clearForm = () => {
    setCases([]);
  };

  const submit = () => {
    console.log('submit solution', cases);
  };

  const updateCase = (id: string, field: 'input' | 'output', value: string) => {
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const removeCase = (id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section className="shadow-soft rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      {/* 본문 */}
      <div className="space-y-6 px-4 py-5 sm:p-8">
        {/* 헤더 */}
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Custom Test Cases
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Validate your solution with custom inputs before submitting.
            </p>
          </div>

          {/* Add Case */}
          <button
            type="button"
            onClick={addCase}
            className="inline-flex items-center text-xs font-medium text-blue-500"
          >
            <span className="material-icons mr-1 text-base">add_circle</span>
            Add Case
          </button>
        </div>

        {/* 테스트 케이스 목록 */}
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

      {/* 하단 버튼 영역 */}
      <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-4 py-4 dark:border-slate-700 dark:bg-slate-700/50 sm:px-6">
        <FormActionButtons
          rightLabel="Submit Solution"
          rightIconName="send"
          onLeftClick={clearForm}
          onRightClick={submit}
        />
      </div>
    </section>
  );
}
