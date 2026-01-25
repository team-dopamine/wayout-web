/** 닉네임 입력 및 제출 버튼을 포함한 폼 UI를 렌더링한다 */

import { useMemo, useState } from 'react';
import MaterialSymbol from '@/components/common/MaterialSymbol';

type Props = {
  /** 제출 시 실행될 콜백(추후 API 연동 시 사용) */
  onSubmitNickname?: (nickname: string) => void;
};

const MAX_LENGTH = 12;
const NICKNAME_REGEX = /^[a-zA-Z0-9_]+$/;

export default function NicknameForm({ onSubmitNickname }: Props) {
  const [nickname, setNickname] = useState<string>('');

  const isValid =
    nickname.length > 0 && nickname.length <= MAX_LENGTH && NICKNAME_REGEX.test(nickname);

  const helperText = useMemo(() => {
    if (!nickname) return '최대 12글자까지 가능합니다.';
    if (isValid) return '최대 12글자까지 가능합니다.';
    // TODO: 닉네임 설정 제한에 따라 변경
    return '영문, 숫자, 언더스코어(_)만 사용할 수 있습니다.';
  }, [nickname, isValid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_LENGTH);
    setNickname(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmitNickname?.(nickname);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="nickname"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          Username
        </label>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <MaterialSymbol name="alternate_email" className="text-xl text-slate-400" />
          </div>

          <input
            id="nickname"
            name="nickname"
            type="text"
            required
            maxLength={MAX_LENGTH}
            placeholder="e.g. algo_master"
            value={nickname}
            onChange={handleChange}
            aria-invalid={!isValid && nickname.length > 0}
            className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <p className="mt-2 flex items-center text-[11px] text-slate-400 dark:text-slate-400">
          <MaterialSymbol name="info" className="mr-1 text-[14px]" />
          {helperText}
        </p>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={!isValid}
          className="inline-flex w-full transform items-center justify-center rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Get Started
          <MaterialSymbol name="arrow_forward" className="ml-2 text-lg" />
        </button>
      </div>
    </form>
  );
}
