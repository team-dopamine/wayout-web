import { useState } from 'react';
import MaterialSymbol from '@/components/common/MaterialSymbol';
import { updateMyNickname } from '@/apis/members/members';

const MAX_LENGTH = 12;
const NICKNAME_REGEX = /^[a-zA-Z0-9]+$/;

type Props = {
  onSuccess: () => void;
};

export default function NicknameForm({ onSuccess }: Props) {
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trimmed = nickname.trim();

  const hasValue = trimmed.length > 0;
  const matchesPattern = NICKNAME_REGEX.test(trimmed);
  const isValid = hasValue && matchesPattern;

  const getHelperText = () => {
    if (!hasValue) return `최대 ${MAX_LENGTH}자까지 입력 가능합니다.`;
    if (!matchesPattern) return '영문, 숫자만 사용할 수 있습니다.';
    return '사용 가능한 닉네임입니다.';
  };

  const getHelperColor = () => {
    if (!hasValue || isValid) return 'text-slate-400';
    return 'text-red-500';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await updateMyNickname({ nickname: trimmed });
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('닉네임 변경에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="nickname"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          사용자 이름
        </label>

        <input
          id="nickname"
          name="nickname"
          type="text"
          maxLength={MAX_LENGTH}
          placeholder="예: algomaster"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          aria-invalid={!isValid && hasValue}
          className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-0 active:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />

        <p className={`mt-2 flex items-center text-[11px] ${getHelperColor()}`}>
          <MaterialSymbol name="info" className="mr-1 text-[14px]" />
          {getHelperText()}
        </p>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? '저장 중...' : '시작하기'}
          {!isSubmitting && <MaterialSymbol name="arrow_forward" className="ml-2 text-lg" />}
        </button>
      </div>
    </form>
  );
}
