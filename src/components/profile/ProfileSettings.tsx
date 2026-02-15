import type React from 'react';
import MaterialSymbol from '@/components/common/MaterialSymbol';

type Props = {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  onSave: () => void;
  isSaving: boolean;
};

export default function ProfileSettings({ nickname, setNickname, email, onSave, isSaving }: Props) {
  return (
    <div className="max-w-2xl rounded-xl border border-slate-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-800/70 dark:shadow-none">
      <div className="grid gap-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            이메일
          </label>
          <input
            type="text"
            value={email}
            readOnly
            className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-4 py-2.5 pr-10 text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            사용자 이름
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={12}
            spellCheck={false}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-200 focus:outline-none focus:ring-0 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving || nickname.trim().length === 0}
            className="flex items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <MaterialSymbol name="save" className="text-lg" />
            {isSaving ? '변경 중...' : '사용자 이름 변경'}
          </button>
        </div>
      </div>
    </div>
  );
}
