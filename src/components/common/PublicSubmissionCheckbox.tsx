/** 코드 공개 여부를 설정하는 체크박스 공통 컴포넌트*/

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function PublicSubmissionCheckbox({ checked, onChange }: Props) {
  return (
    <div className="flex items-start pt-4 dark:border-gray-700/50">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="text-primary focus:ring-primary mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800"
      />
      <div className="ml-3 text-sm">
        <p className="font-medium text-gray-700 dark:text-gray-300">코드 공개하기</p>
        <p className="text-gray-500 dark:text-gray-500">내 코드를 다른 사용자에게 공개합니다.</p>
      </div>
    </div>
  );
}
