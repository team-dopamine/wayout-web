/** 문제 ID 검색 입력 필드 컴포넌트 */
import SearchIcon from '@/assets/SearchIcon';

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function ProblemIdField({ value, onChange }: Props) {
  return (
    <div>
      <label
        htmlFor="problem_id"
        className="block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        Problem Number
      </label>

      <div className="relative mt-1 rounded-md shadow-sm">
        {/** TODO: 검색 아이콘 클릭 시 검색 되도록 */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-4 w-4 text-slate-400" />
        </div>

        <input
          id="problem_id"
          name="problem_id"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. 1042"
          className="block w-full rounded-md border border-slate-300 bg-white py-2.5 pl-10 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />
      </div>
    </div>
  );
}
