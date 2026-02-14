import { useState } from 'react';
import MaterialSymbol from '@/components/common/MaterialSymbol';
import { patchMyNickname } from '@/apis/members';

const MAX_LENGTH = 12;
const NICKNAME_REGEX = /^[a-zA-Z0-9_]+$/;

type Props = {
  onSuccess: () => void;
};

export default function NicknameForm({ onSuccess }: Props) {
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const trimmedNickname = nickname.trim();

  const isValid =
    trimmedNickname.length > 0 &&
    trimmedNickname.length <= MAX_LENGTH &&
    NICKNAME_REGEX.test(trimmedNickname);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || isLoading) return;

    try {
      setIsLoading(true);
      await patchMyNickname({ nickname: trimmedNickname });
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('닉네임 변경에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
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
            className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <p
          className={`mt-2 flex items-center text-[11px] ${
            isValid || !trimmedNickname ? 'text-slate-400' : 'text-red-500'
          }`}
        >
          <MaterialSymbol name="info" className="mr-1 text-[14px]" />
          영문, 숫자, 언더스코어(_)만 사용할 수 있습니다.
        </p>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Get Started'}
          {!isLoading && <MaterialSymbol name="arrow_forward" className="ml-2 text-lg" />}
        </button>
      </div>
    </form>
  );
}
