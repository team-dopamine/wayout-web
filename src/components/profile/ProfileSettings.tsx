import type React from 'react';

type Props = {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  onSave: () => void;
  isSaving: boolean;
};

export default function ProfileSettings({ nickname, setNickname, email, onSave, isSaving }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
      <div className="grid max-w-md gap-6">
        {/* 이메일 섹션 */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold text-slate-500 dark:text-slate-400">
            이메일
          </label>
          <input
            type="text"
            value={email}
            readOnly
            className="w-full cursor-not-allowed rounded-lg border border-slate-100 bg-slate-50 px-4 py-2.5 text-sm text-slate-400 outline-none dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-500"
          />
        </div>

        {/* 사용자 이름 섹션 */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">
            사용자 이름
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={12}
              spellCheck={false}
              placeholder="닉네임을 입력하세요"
              className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving || nickname.trim().length === 0}
              className="flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700 active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-600"
            >
              {isSaving ? '변경 중' : '변경'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
