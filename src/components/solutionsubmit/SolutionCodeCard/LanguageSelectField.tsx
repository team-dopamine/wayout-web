/** 언어 선택 셀렉트 박스 컴포넌트 */
import type { LanguageOption } from './types';
import ArrowDownIcon from '@/assets/ArrowDownIcon';

type Props = {
  value: string;
  options: LanguageOption[];
  onChange: (value: string) => void;
};

export default function LanguageSelectField({ value, options, onChange }: Props) {
  return (
    <div>
      <label
        htmlFor="language"
        className="block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        Language
      </label>

      <div className="relative mt-1">
        <select
          id="language"
          name="language"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full appearance-none rounded-md border border-slate-300 bg-white py-2.5 pl-3 pr-10 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
          <ArrowDownIcon className="h-3 w-3 text-slate-500" />
        </div>
      </div>
    </div>
  );
}
