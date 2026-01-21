/** 커스텀 테스트 케이스 전체 섹션 컴포넌트 */
import { useEffect, useState } from 'react';
import type { CustomTestCase, CustomTestCasesChangePayload } from './types';
import { CustomTestCaseItem } from './CustomTestCaseItem';
import { PublicSubmissionCheckbox } from './PublicSubmissionCheckbox';

interface Props {
  onChange: (payload: CustomTestCasesChangePayload) => void;
}

export default function CustomTestCasesSection({ onChange }: Props) {
  const [cases, setCases] = useState<CustomTestCase[]>([]);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    onChange({ cases, isPublic });
  }, [cases, isPublic, onChange]);

  const addCase = () => {
    setCases((prev) => [...prev, { id: crypto.randomUUID(), input: '', output: '' }]);
  };

  const clearForm = () => {
    setCases([]);
    setIsPublic(false);
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

        <PublicSubmissionCheckbox checked={isPublic} onChange={setIsPublic} />
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-4 py-4 dark:border-slate-700 dark:bg-slate-700/50 sm:px-6">
        <button
          type="button"
          onClick={clearForm}
          className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
        >
          Clear Form
        </button>

        <button
          type="button"
          className="rounded-md bg-blue-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Solution
        </button>
      </div>
    </section>
  );
}
