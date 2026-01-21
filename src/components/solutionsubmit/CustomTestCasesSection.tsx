/** 커스텀 테스트 케이스 전체 섹션 컴포넌트 */
import { useState } from 'react';
import { CustomTestCase, CustomTestCasesChangePayload } from './types';
import { CustomTestCaseItem } from './CustomTestCaseItem';
import { PublicSubmissionCheckbox } from './PublicSubmissionCheckbox';

interface Props {
  onChange: (payload: CustomTestCasesChangePayload) => void;
}

export default function CustomTestCasesSection({ onChange }: Props) {
  const [cases, setCases] = useState<CustomTestCase[]>([]);
  const [isPublic, setIsPublic] = useState(false);

  const notifyChange = (nextCases = cases, nextIsPublic = isPublic) => {
    onChange({ cases: nextCases, isPublic: nextIsPublic });
  };

  const addCase = () => {
    const next = [...cases, { id: crypto.randomUUID(), input: '', output: '' }];
    setCases(next);
    notifyChange(next);
  };

  const clearForm = () => {
    setCases([]);
    setIsPublic(false);
    notifyChange([], false);
  };

  return (
    <section className="border-border-light shadow-soft dark:border-border-dark dark:bg-card-dark rounded-xl border bg-white">
      {/* 본문 */}
      <div className="space-y-6 px-4 py-5 sm:p-8">
        {/* 헤더 */}
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Custom Test Cases
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Validate your solution with custom inputs before submitting.
            </p>
          </div>

          {/* Add Case */}
          <button
            type="button"
            onClick={addCase}
            className="inline-flex items-center text-xs font-medium text-blue-500 focus:outline-none"
          >
            <span className="material-icons mr-1 text-base text-blue-500">add_circle</span>
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
              onChangeInput={(v) =>
                setCases((prev) =>
                  prev.map((item) => (item.id === c.id ? { ...item, input: v } : item)),
                )
              }
              onChangeOutput={(v) =>
                setCases((prev) =>
                  prev.map((item) => (item.id === c.id ? { ...item, output: v } : item)),
                )
              }
              onRemove={() => setCases((prev) => prev.filter((item) => item.id !== c.id))}
            />
          ))}
        </div>

        <PublicSubmissionCheckbox
          checked={isPublic}
          onChange={(checked) => {
            setIsPublic(checked);
            notifyChange(cases, checked);
          }}
        />
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-4 py-4 dark:border-gray-700 dark:bg-gray-800/50 sm:px-6">
        {/* Clear Form */}
        <button
          type="button"
          onClick={clearForm}
          className="focus:ring-primary rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        >
          Clear Form
        </button>

        {/* Submit Solution */}
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-blue-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Solution
        </button>
      </div>
    </section>
  );
}
