import { useState } from 'react';
import MaterialSymbol from '@/components/common/MaterialSymbol';
import { updateMyNickname } from '@/apis/members/members';
import { MAX_LENGTH, validateNickname } from '@/constants/nickname';

type Props = {
  onSuccess: () => void;
};

export default function NicknameForm({ onSuccess }: Props) {
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trimmed = nickname.trim();
  const isValid = validateNickname(trimmed);
  const hasValue = trimmed.length > 0;

  const helperText = (() => {
    if (!hasValue) return `최대 ${MAX_LENGTH}자까지 입력 가능합니다.`;
    if (!isValid) return '영문, 숫자만 사용할 수 있습니다.';
    return '사용 가능한 닉네임입니다.';
  })();

  const helperColor = !hasValue || isValid ? 'text-slate-400' : 'text-red-500';

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
          type="text"
          maxLength={MAX_LENGTH}
          placeholder="예: algomaster"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          aria-invalid={!isValid && hasValue}
          className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />

        <p className={`mt-2 flex items-center text-[11px] ${helperColor}`}>
          <MaterialSymbol name="info" className="mr-1 text-[14px]" />
          {helperText}
        </p>
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? '저장 중...' : '시작하기'}
        {!isSubmitting && <MaterialSymbol name="arrow_forward" className="ml-2 text-lg" />}
      </button>
    </form>
  );
}
