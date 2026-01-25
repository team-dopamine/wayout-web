/** 코드 공개 여부 설정용 체크박스 공통 컴포넌트 */
interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function PublicSubmissionCheckbox({ checked, onChange }: Props) {
  return (
    <div className="flex items-start border-t border-gray-100 pt-4 dark:border-gray-700/50">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="text-primary focus:ring-primary mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800"
      />
      <div className="ml-3 text-sm">
        <p className="font-medium text-gray-700 dark:text-gray-300">Public Submission</p>
        <p className="text-gray-500 dark:text-gray-500">
          Allow other users to view your code and learn from it.
        </p>
      </div>
    </div>
  );
}
